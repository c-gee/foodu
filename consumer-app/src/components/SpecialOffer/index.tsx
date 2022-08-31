import { View, TouchableOpacity, Image, Platform } from "react-native";

type Props = {
  imageURL: string;
  navigationTarget: string;
  navigationTargetId: number;
};

const SpecialOffer = ({
  imageURL,
  navigationTarget,
  navigationTargetId
}: Props) => {
  return (
    <View
      className="shadow-lg shadow-slate-300"
      style={{
        ...Platform.select({
          android: {
            shadowOffset: {
              width: 0,
              height: 10
            },
            shadowColor: "#000000",
            shadowRadius: 20,
            shadowOpacity: 0.1,
            elevation: 15,
            borderRadius: 36,
            backgroundColor: "white"
          }
        })
      }}
    >
      <TouchableOpacity
        onPress={() => {
          /* navigation code here */
        }}
        className="w-full"
      >
        <Image
          source={require("../../../assets/speacial-offers-01.png")}
          style={{
            width: "100%",
            height: undefined,
            borderRadius: 36
          }}
          className="aspect-[2/1]"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SpecialOffer;
