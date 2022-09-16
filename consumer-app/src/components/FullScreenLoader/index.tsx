import { View, Dimensions, ActivityIndicator } from "react-native";

const FullScreenLoader = () => {
  return (
    <View
      className="absolute flex-1 justify-center items-center z-50 bg-slate-50/40"
      style={{
        width: "100%",
        height: Dimensions.get("window").height
      }}
    >
      <ActivityIndicator size="large" color="#1BAC4B" />
    </View>
  );
};

export default FullScreenLoader;
