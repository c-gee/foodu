import { View, Text } from "react-native";

import { MainTabScreenProps } from "../../navigation/types";

const WalletScreen = ({ navigation }: MainTabScreenProps<"Orders">) => {
  return (
    <View className="flex-1 justify-center items-center bg-white ">
      <Text>WalletScreen</Text>
    </View>
  );
};

export default WalletScreen;
