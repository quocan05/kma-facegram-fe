import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import BackButton from "../components/button/BackButton";
import ScreenWrapper from "../components/screen/ScreenWrapper";
import { themes } from "../constants/theme";
import { hp, wp } from "../helpers/common";
import Input from "../components/input/Input";
import Icon from "../assets/icons";
import Button from "../components/button/Button";
import { authLogin } from "../services/AuthUser";
import { getToken, setToken } from "../services/storage";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const router = useRouter();
  const userNameRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);

  const { authUser, setAuth } = useAuth();

  const onSubmit = async () => {
    if (!userNameRef.current || !passwordRef.current) {
      Alert.alert("Login", "Please enter the fields!");
      return;
    }
    try {
      let password = passwordRef.current.trim();
      let userName = userNameRef.current.trim();
      setLoading(true);
      const data = await authLogin({ userName, password });
      if (data) {
        await setToken("authToken", data.user.token);
        await setAuth();
      }
    } catch (error) {
      console.log("err>>>", error);
    } finally {
      router.replace("main/HomePage");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authUser) {
      router.replace("main/HomePage");
    }
  }, [authUser]);

  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <BackButton router={router} />
        <View>
          <Text style={styles.welcomeText}>Wassup,</Text>
          <Text style={styles.welcomeText}>Welcome back!</Text>
        </View>
        <View style={styles.form}>
          <Text style={{ fontSize: hp(1.5), color: themes.colors.text }}>
            Login to continue
          </Text>
          <Input
            placeholder={"Enter email, user name, or phone to continue"}
            icon={<Icon name={"mail"} size={26} strokeWidth={1.6} />}
            onChangeText={(value) => {
              userNameRef.current = value;
            }}
          />
          <Input
            placeholder={"Enter password"}
            icon={<Icon name={"lock"} size={26} strokeWidth={1.6} />}
            onChangeText={(value) => {
              passwordRef.current = value;
            }}
            secureTextEntry
          />
          <Text style={styles.forgotPassword}>Forgot password ?</Text>
          {/* button */}
          <Button title="Login" loading={loading} onPress={onSubmit} />
          {/* footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have account? </Text>
            <Pressable onPress={() => router.push("SignUp")}>
              <Text
                style={[
                  styles.footerText,
                  {
                    color: themes.colors.primaryDark,
                    fontWeight: themes.fonts.semibold,
                  },
                ]}
              >
                Sign up
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
    paddingHorizontal: wp(5),
  },
  welcomeText: {
    color: themes.colors,
    fontSize: hp(6),
    textAlign: "left",
    fontWeight: themes.fonts.extraBold,
  },
  form: {
    gap: 24,
  },
  forgotPassword: {
    textAlign: "right",
    fontWeight: themes.fonts.semibold,
    color: themes.colors.text,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    textAlign: "center",
    color: themes.colors.text,
    fontSize: hp(1.6),
  },
});
