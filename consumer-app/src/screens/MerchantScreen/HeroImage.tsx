import { View, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { HeartIcon, PaperAirplaneIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

const HeroImage = () => {
  const navigation = useNavigation();

  return (
    <View className="relative">
      <Image
        source={{
          uri: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/vimdb/270590.jpg"
        }}
        style={{
          width: "100%"
        }}
        resizeMode="cover"
        className="aspect-square"
      />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute top-[52] left-5 w-12 h-12 rounded-full bg-gray-900/50 p-3"
      >
        <AntDesign name="arrowleft" size={24} color="white" />
      </TouchableOpacity>
      <View className="absolute top-[52] right-5 flex-row space-x-3">
        <TouchableOpacity
          onPress={() => {
            /* favorite this restaurant */
          }}
          className="w-12 h-12 rounded-full bg-gray-900/50 p-3"
        >
          <HeartIcon size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            /* share this page */
          }}
          className="w-12 h-12 rounded-full bg-gray-900/50 p-3 -rotate-45"
        >
          <PaperAirplaneIcon size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeroImage;
