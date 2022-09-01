import {
  View,
  TouchableOpacity,
  Image,
  Platform,
  ImageURISource
} from "react-native";

type Props = {
  image: ImageURISource; // allow use of require for now till API fetching is ready
  onPress: () => void;
};

const SpecialOffer = ({ image, onPress }: Props) => {
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
      <TouchableOpacity onPress={onPress} className="w-full">
        <Image
          source={image}
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
