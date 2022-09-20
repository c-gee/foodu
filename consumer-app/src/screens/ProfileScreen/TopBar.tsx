import { View, Text } from "react-native";

import FooduLogo from "../../../assets/foodu-logo.svg";

const TopBar = () => {
  return (
    <View className="h-[48px] flex-row justify-start items-center space-x-2 bg-white">
      <View className="p-2 ">
        <FooduLogo
          width={28}
          height={28}
          style={{
            maxWidth: "100%"
          }}
        />
      </View>
      <Text className="text-2xl text-gray-900 font-bold">Profile</Text>
    </View>
  );
};

export default TopBar;
