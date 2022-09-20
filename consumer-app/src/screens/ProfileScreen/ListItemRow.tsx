import { View, Text, TouchableOpacity, Switch } from "react-native";
import { ChevronRightIcon } from "react-native-heroicons/solid";

export type ListItemRowType = "Link" | "Switch";

type Props = {
  item: {
    icon: JSX.Element;
    title: string;
    type: ListItemRowType;
    onPress: () => void;
    value?: string | boolean;
  };
};

const ListItemRow = ({ item }: Props) => {
  return (
    <View className="h-[48px] flex flex-row justify-start items-center py-2">
      {item.type === "Link" ? (
        <TouchableOpacity
          className="flex-row items-center"
          onPress={item.onPress}
        >
          {item.icon}
          <Text className="ml-4 flex-1 text-lg text-gray-900 font-semibold">
            {item.title}
          </Text>
          {item.value && (
            <Text className="text-lg text-gray-900 font-semibold mr-4">
              {item.value}
            </Text>
          )}
          <ChevronRightIcon size={20} color="#111827" />
        </TouchableOpacity>
      ) : (
        <View className="flex-row items-center">
          {item.icon}
          <Text className="ml-4 flex-1 text-lg text-gray-900 font-semibold">
            {item.title}
          </Text>
          <View className="flex-0">
            <Switch
              trackColor={{ false: "#EEEEEE", true: "#1BAC4B" }}
              ios_backgroundColor={item.value ? "#1BAC4B" : "#EEEEEE"}
              thumbColor="#FFFFFF"
              onValueChange={item.onPress}
              value={item.value as boolean}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default ListItemRow;
