import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { themes } from "../../constants/theme";

const Loading = ({ size = "large", color = themes.colors.primary, type }) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator
        size={size}
        color={type === "default" ? "black" : color}
      />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
