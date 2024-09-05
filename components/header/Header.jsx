import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { themes } from "../../constants/theme";
import { hp } from "../../helpers/common";
import BackButton from "../button/BackButton";

const Header = ({ title, showBackButton = true, mb = 0 }) => {
  const router = useRouter();
  return (
    <View style={[styles.container, { marginBottom: mb }]}>
      {showBackButton && (
        <View style={styles.showBackButton}>
          <BackButton router={router} />
        </View>
      )}
      <Text style={styles.title}>{title || ""}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    gap: 10,
  },
  title: {
    fontSize: hp(2.7),
    fontWeight: themes.fonts.semibold,
    color: themes.colors.textDark,
  },
  showBackButton: {
    position: "absolute",
    left: 20,
  },
});
