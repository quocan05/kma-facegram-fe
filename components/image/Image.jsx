import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { themes } from "../../constants/theme";
import { Image } from "expo-image";
import { getUserImageSrc } from "../../services/ImageService";

const ImagePost = ({ uri, size = 100, style = {} }) => {
  return (
    <Image
      source={getUserImageSrc(uri)}
      transition={100}
      style={[
        styles.image,
        { height: size, width: size, borderRadius: rounded },
        style,
      ]}
    />
  );
};

export default ImagePost;

const styles = StyleSheet.create({
  image: {
    borderCurve: "continuous",
    borderColor: themes.colors.darkLight,
    borderWidth: 1,
  },
});
