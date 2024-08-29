import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import { Box, NativeBaseProvider } from "native-base";

const _layout = () => {
  useEffect(() => {
    console.log("render 1");
  }, []);
  return (
    <NativeBaseProvider>
      <MainLayout />
    </NativeBaseProvider>
  );
};

const MainLayout = () => {
  // const { setAuth } = useAuth();
  // useEffect(() => {
  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     console.log("session user", session.user.id);
  //     if (session && session.user) {
  //       setAuth(session.user);
  //       //go to home screen
  //       router.replace("main/Home");
  //     } else {
  //       setAuth(null);
  //       //go to welcome
  //       router.push("Welcome");
  //     }
  //   });
  // }, []);

  const router = useRouter();
  useEffect(() => {
    console.log("render a2a");
    router.replace("main/Home");
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default _layout;
