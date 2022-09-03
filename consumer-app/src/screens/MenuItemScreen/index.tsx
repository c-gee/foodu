import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

import HeroImage from "../../components/HeroImage";
import { RootStackScreenProps } from "../../navigation/types";

const MenuItemScreen = ({ route }: RootStackScreenProps<"MenuItem">) => {
  const { menuItem } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");

  const addToBasket = () => {
    // add to redux store basket
  };

  return (
    <KeyboardAwareScrollView>
      <ScrollView className="flex-1 bg-white">
        <HeroImage imageURL={menuItem.imageURL} variant="menu_item" />
        <View className="pb-6 border-b-[1px] border-b-gray-200">
          <View className="flex justify-start space-y-4 px-6 pt-1">
            <View className="flex-row justify-between items-center space-x-3 truncate py-4 border-b-[1px] border-b-gray-300">
              <Text
                className="flex-1 text-3xl text-gray-900 font-bold"
                numberOfLines={2}
              >
                {menuItem.name}
              </Text>
            </View>
            <Text
              className="text-base text-gray-800 font-medium"
              numberOfLines={3}
            >
              {menuItem.description}
            </Text>
            <View className="flex flex-row justify-center items-center space-x-3">
              <TouchableOpacity
                disabled={quantity <= 1}
                className="self-middle flex justify-center items-center w-[58] h-[58] border-[1px] border-gray-300 rounded-2xl"
                onPress={() => setQuantity((prevQuantity) => prevQuantity - 1)}
              >
                <AntDesign
                  name="minus"
                  size={24}
                  color={`${quantity <= 1 ? "#E0E0E0" : "#1BAC4B"}`}
                />
              </TouchableOpacity>
              <View className="flex justify-center items-center  w-[58] h-[58] ">
                <Text className="text-2xl text-primary font-bold">
                  {quantity}
                </Text>
              </View>
              <TouchableOpacity
                className="self-middle flex justify-center items-center w-[58] h-[58] border-[1px] border-gray-200 rounded-2xl"
                onPress={() => setQuantity((prevQuantity) => prevQuantity + 1)}
              >
                <AntDesign name="plus" size={24} color="#1BAC4B" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="p-6">
          <TouchableOpacity
            className="flex justify-center items-center h-[58] bg-primary rounded-full shadow-md shadow-slate-300"
            onPress={addToBasket}
            style={{
              ...Platform.select({
                android: {
                  shadowOffset: {
                    width: 0,
                    height: 10
                  },
                  shadowColor: "#424242",
                  shadowRadius: 15,
                  shadowOpacity: 0.1,
                  elevation: 10
                }
              })
            }}
          >
            <Text className="text-base text-white font-bold">
              Add to Basket - RM{(quantity * menuItem.price).toFixed(2)}
            </Text>
          </TouchableOpacity>
        </View>
        <View className="p-6 pt-2">
          <TextInput
            className="bg-gray-100 text-sm leading-6 text-gray-500 font-regular rounded-2xl py-4"
            multiline
            maxLength={200}
            numberOfLines={2}
            textAlignVertical="top"
            onChangeText={(text) => setNote(text)}
            value={note}
            placeholder="Note to Restaurant (optional)"
            style={{
              padding: 24,
              paddingVertical: 30,
              minHeight: 90,
              maxHeight: 200
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default MenuItemScreen;
