type Variant = "regular" | "small" | "large";
type Orientation = "vertical" | "horizontal";

const imageDimension = (variant: Variant) => {
  switch (variant) {
    case "small":
      return 100;
    case "large":
      return 192;
    default:
      return 154;
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
    const fontSize = variant === "large" ? 20 : 18;

    return { fontSize };
  },
  price: {
    fontSize: 18
  },
  image: (variant: Variant) => {
    const borderRadius = variant === "small" ? 24 : 20;

    return {
      width: imageDimension(variant),
      height: imageDimension(variant),
      borderRadius
    };
  }
};
