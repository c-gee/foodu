type Variant = "xs" | "sm" | "base" | "lg" | "xl";
type Orientation = "vertical" | "horizontal";

const imageDimension = (variant: Variant) => {
  switch (variant) {
    case "xs":
      return 80;
    case "sm":
      return 100;
    case "lg":
      return 154;
    case "xl":
      return 192;
    default:
      return 120; // base
  }
};

export default {
  container: (variant: Variant, orientation: Orientation) => {
    const maxWidth =
      orientation === "vertical" ? imageDimension(variant) + 28 : "auto";

    return {
      maxWidth,
      padding: 14
    };
  },
  title: (variant: Variant) => {
    const fontSize = variant === "xl" ? 20 : 18;

    return { fontSize };
  },
  image: (variant: Variant) => {
    const borderRadius = variant === "sm" ? 24 : 20;

    return {
      width: imageDimension(variant),
      height: imageDimension(variant),
      borderRadius
    };
  }
};
