import { View, Text } from "react-native";

import { MainTabScreenProps } from "../../navigation/types";

const MessageScreen = ({ navigation }: MainTabScreenProps<"Orders">) => {
  return (
    <View className="flex-1 justify-center items-center bg-white ">
      <Text>MessageScreen</Text>
    </View>
  );
};

export default MessageScreen;
