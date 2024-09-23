import { NativeBaseProvider } from "native-base";
import React from "react";
import { View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const ScreenWrapper = ({ children, bg }) => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top;
  return (
    <NativeBaseProvider>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          paddingTop: 24,
        }}
      >
        {children}
      </View>
    </NativeBaseProvider>
  );
};

export default ScreenWrapper;
