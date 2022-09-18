import { View, ActivityIndicator, StyleSheet } from "react-native";

type Props = {
  position?: "top" | "center" | "bottom";
};

const FullScreenLoader = ({ position = "center" }: Props) => {
  return (
    <View
      className={`w-screen h-screen absolute z-50 bg-slate-50/40 flex items-center ${
        position === "center" && "justify-center"
      }`}
    >
      <View style={styles[position]}>
        <ActivityIndicator size="large" color="#1BAC4B" />
      </View>
    </View>
  );
};

export default FullScreenLoader;

const styles = StyleSheet.create({
  top: {
    position: "absolute",
    top: 100
  },
  bottom: {
    position: "absolute",
    bottom: 100
  },
  center: {}
});
