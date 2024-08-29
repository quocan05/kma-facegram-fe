import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { themes } from "../../constants/theme";
import { hp } from "../../helpers/common";
import Loading from "../loading/Loading";

const Button = ({
  buttonStyle,
  textStyle,
  title = "",
  loading = false,
  hasShadow = true,
  onPress = () => {},
}) => {
  const shadowStyle = {
    shadowColor: themes.colors.dark,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  };
  if (loading) {
    return (
      <View style={[styles.button, buttonStyle, { backgroundColor: "white" }]}>
        <Loading />
      </View>
    );
  }
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, buttonStyle, hasShadow && shadowStyle]}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: themes.colors.primary,
    height: hp(6.6),
    justifyContent: "center",
    alignItem: "center",
    borderCurve: "continuous",
    borderRadius: themes.radius.xl,
  },
  text: {
    fontSize: hp(2.5),
    color: "white",
    textAlign: "center",
  },
});
