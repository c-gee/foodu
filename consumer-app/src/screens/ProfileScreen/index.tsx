import { View, Text } from "react-native";
import { ProfileStackScreenProps } from "../../navigation/types";

const ProfileScreen = ({ navigation }: ProfileStackScreenProps<"Profile">) => {
  return (
    <View>
      <Text>ProfileScreen</Text>
    </View>
  );
};

export default ProfileScreen;
