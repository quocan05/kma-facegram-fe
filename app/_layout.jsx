import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { AuthProvider } from "../contexts/AuthContext";
import ScreenWrapper from "../components/screen/ScreenWrapper";

const _layout = () => {
  return (
    <AuthProvider>
      <ScreenWrapper>
        <MainLayout />
      </ScreenWrapper>
    </AuthProvider>
  );
};

const MainLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default _layout;
