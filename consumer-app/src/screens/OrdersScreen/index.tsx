import { View, Text } from "react-native";

import { MainTabScreenProps } from "../../navigation/types";

const OrdersScreen = ({ navigation }: MainTabScreenProps<"Orders">) => {
  return (
    <View className="flex-1 justify-center items-center bg-white ">
      <Text>OrdersScreen</Text>
    </View>
  );
};

export default OrdersScreen;
