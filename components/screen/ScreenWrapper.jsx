import { View, Text } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";

const ScreenWrapper = ({ children, bg }) => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 5 : 30;
  return (
    <NativeBaseProvider>
      <View style={{ flex: 1, backgroundColor: bg, paddingTop }}>
        {children}
      </View>
    </NativeBaseProvider>
  );
};

export default ScreenWrapper;
