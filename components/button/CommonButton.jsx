import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { themes } from "../../constants/theme";
import { hp, wp } from "../../helpers/common";
import Loading from "../loading/Loading";

const ButtonCommon = ({
  buttonStyle,
  textStyle,
  title = "",
  loading = false,
  hasShadow = false,
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
        <Loading type={"default"} />
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

export default ButtonCommon;

const styles = StyleSheet.create({
  button: {
    backgroundColor: themes.colors.gray,
    height: hp(3.6),
    width: wp(32),
    justifyContent: "center",
    alignItem: "center",
    borderCurve: "continuous",
    borderColor: "black",
    borderRadius: themes.radius.sm,
  },
  text: {
    fontSize: hp(1.4),
    color: "black",
    textAlign: "center",
  },
});