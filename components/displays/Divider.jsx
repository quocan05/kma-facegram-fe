import React from "react";
import { View, StyleSheet } from "react-native";

const Divider = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    height: 1, // Thickness of the divider
    width: "100%", // 100% width of the parent
    backgroundColor: "#E0E0E0", // Color of the divider
  },
});

export default Divider;
