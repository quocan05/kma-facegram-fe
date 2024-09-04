import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import BackButton from "../components/button/BackButton";
import ScreenWrapper from "../components/screen/ScreenWrapper";
import { themes } from "../constants/theme";
import { hp, wp } from "../helpers/common";
import Input from "../components/input/Input";
import Icon from "../assets/icons";
import Button from "../components/button/Button";
import { authRegister } from "../services/AuthUser";
import { Box, Flex, ScrollView, useToast } from "native-base";

const SignUp = () => {
  const toast = useToast();
  const router = useRouter();
  const emailRef = useRef("");
  const phoneRef = useRef("");
  const passwordRef = useRef("");
  const userNameRef = useRef("");
  const firstNameRef = useRef("");
  const lastNameRef = useRef("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    console.log(emailRef, passwordRef);
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Sign up", "Please enter the fields!");
      return;
    }
    try {
      let name = userNameRef.current.trim();
      let password = passwordRef.current.trim();
      let email = emailRef.current.trim();
      let phone = phoneRef.current.trim();
      let firstName = firstNameRef.current.trim();
      let lastName = lastNameRef.current.trim();
      setLoading(true);
      const data = await authRegister({
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        userName: name,
        password: password,
      });
      if (data) {
        toast.show({
          title: data.msg,
          placement: "bottom",
        });
        setTimeout(() => {
          router.replace("Login");
        });
      }
      setLoading(false);
    } catch (error) {
      toast.show(error.msg);
    } finally {
      setLoading(false);
    }
    // next step
  };
  return (
    <>
      <StatusBar style="dark" />
      <ScrollView>
        <View style={styles.container}>
          <BackButton router={router} />
          <View>
            <Text style={styles.welcomeText}>Let's</Text>
            <Text style={styles.welcomeText}>Get started!</Text>
          </View>
          <View style={styles.form}>
            <Text style={{ fontSize: hp(1.5), color: themes.colors.text }}>
              Let's enter your info to start using Facegram
            </Text>
            <Input
              placeholder={"Enter your first name"}
              icon={<Icon name={"user"} size={26} strokeWidth={1.6} />}
              onChangeText={(value) => {
                firstNameRef.current = value;
              }}
            />
            <Input
              placeholder={"Enter your last name"}
              icon={<Icon name={"user"} size={26} strokeWidth={1.6} />}
              onChangeText={(value) => {
                lastNameRef.current = value;
              }}
            />
            <Input
              placeholder={"Enter your username"}
              icon={<Icon name={"user"} size={26} strokeWidth={1.6} />}
              onChangeText={(value) => {
                userNameRef.current = value;
              }}
            />
            <Input
              placeholder={"Enter your email"}
              icon={<Icon name={"mail"} size={26} strokeWidth={1.6} />}
              onChangeText={(value) => {
                emailRef.current = value;
              }}
            />
            <Input
              placeholder={"Enter your phone number"}
              icon={<Icon name={"call"} size={26} strokeWidth={1.6} />}
              onChangeText={(value) => {
                phoneRef.current = value;
              }}
            />
            <Input
              placeholder={"Enter your password"}
              icon={<Icon name={"lock"} size={26} strokeWidth={1.6} />}
              onChangeText={(value) => {
                passwordRef.current = value;
              }}
              secureTextEntry
            />
            {/* button */}
            <Button title="Register now" loading={loading} onPress={onSubmit} />
            {/* footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <Pressable onPress={() => router.replace("Login")}>
                <Text
                  style={[
                    styles.footerText,
                    {
                      color: themes.colors.primaryDark,
                      fontWeight: themes.fonts.semibold,
                    },
                  ]}
                >
                  Log in
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default SignUp;
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
    paddingBottom: 24,
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
