import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { AuthProvider } from "../contexts/AuthContext";
import ScreenWrapper from "../components/screen/ScreenWrapper";

const _layout = () => {
  useEffect(() => {
    console.log("render 1");
  }, []);
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
      <Stack.Screen name="SignUp" />
      <Stack.Screen name="Login" />
      <Stack.Screen name="main/HomePage" options={{ gestureEnabled: false }} />
      <Stack.Screen name="Welcome" options={{ gestureEnabled: false }} />
    </Stack>
  );
};

export default _layout;
