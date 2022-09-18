import { View, ActivityIndicator, StyleSheet } from "react-native";

type Props = {
  position?: "top" | "center" | "bottom";
  transparent?: boolean;
};

const FullScreenLoader = ({
  position = "center",
  transparent = false
}: Props) => {
  return (
    <View
      className={`w-screen h-screen absolute z-50 flex items-center ${
        position === "center" && "justify-center"
      } ${transparent ? "transparent" : "bg-slate-50/40"}`}
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
