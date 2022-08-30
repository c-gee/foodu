import { TouchableOpacity, Image } from "react-native";

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
  );
};

export default SpecialOffer;
