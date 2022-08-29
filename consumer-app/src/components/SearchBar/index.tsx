import { View, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";

const SearchBar = () => {
  return (
    <View className="flex flex-row justify-start items-center h-14 bg-gray-200 rounded-2xl">
      <Feather
        name="search"
        size={20}
        color="#BDBDBD"
        style={{ padding: 18 }}
      />
      <TextInput
        placeholder="What are you craving?"
        className="flex-1 text-sm pr-5"
      />
    </View>
  );
};

export default SearchBar;
