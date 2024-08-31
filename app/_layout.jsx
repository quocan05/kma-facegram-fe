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
  const user = {
    uid: 1234,
  };
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
    router.replace({ pathname: "main/NewPost", params: { id: user.uid } });
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="main/Password" initialParams={{ id: user.uid }} />
    </Stack>
  );
};

export default _layout;
