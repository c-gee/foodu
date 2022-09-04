import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import NavigationTopBar from "../../components/NavigationTopBar";
import { RootStackScreenProps } from "../../navigation/types";

const SearchFilterScreen = ({ navigation }: RootStackScreenProps<"Search">) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <NavigationTopBar
        title="Filter"
        icon="close"
        onPress={navigation.goBack}
      />
    </SafeAreaView>
  );
};

export default SearchFilterScreen;
