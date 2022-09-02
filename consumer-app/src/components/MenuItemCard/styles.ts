type Variant = "regular" | "small";

const imageDimension = (variant: Variant) => {
  return variant === "small" ? 154 : 192;
};

export default {
  container: (variant: Variant) => {
    return {
      maxWidth: imageDimension(variant) + 28,
      padding: 14,
      paddingBottom: 16
    };
  },
  title: (variant: Variant) => {
    const fontSize = variant === "small" ? 18 : 20;

    return {
      fontSize
    };
  },
  price: {
    fontSize: 18
  },
  image: (variant: Variant) => {
    return {
      width: imageDimension(variant),
      height: imageDimension(variant),
      borderRadius: 20
    };
  }
};
