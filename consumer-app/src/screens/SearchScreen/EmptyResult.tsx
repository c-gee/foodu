import { View, Text } from "react-native";

import NotFound from "../../../assets/not-found.svg";
import Empty from "../../../assets/empty.svg";

type Props = {
  isSearch: boolean;
};

const EmptyResult = ({ isSearch }: Props) => {
  return isSearch ? (
    <>
      <View className="px-4">
        <NotFound
          width={340}
          height={250}
          style={{
            maxWidth: "100%"
          }}
        />
      </View>
      <Text className="text-2xl text-gray-900 font-bold">Not Found</Text>
      <Text className="text-lg text-gray-900 font-regular text-center">
        Sorry, the keyword you entered cannot be found, please check again or
        search with another keyword.
      </Text>
    </>
  ) : (
    <>
      <View className="px-4 mb-3">
        <Empty
          width={280}
          height={273}
          style={{
            maxWidth: "100%"
          }}
        />
      </View>
      <Text className="text-2xl text-gray-900 font-bold">Empty</Text>
      <Text className="text-lg text-gray-900 font-regular text-center">
        Sorry, nothing matched the keyword.
      </Text>
    </>
  );
};

export default EmptyResult;
