import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import ScreenWrapper from "../components/screen/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import { hp, wp } from "../helpers/common";
import { themes } from "../constants/theme";
import Button from "../components/button/Button";
import { router } from "expo-router";
import { getToken, removeToken } from "../services/storage";
const Welcome = () => {
  return (
    <ScreenWrapper>
      <StatusBar style="black" />
      <View style={styles.container}>
        {/* welcome image */}
        <Image
          style={styles.welcomeImage}
          resizeMode="contain"
          source={require("../assets/images/vegetawelcome.png")}
        />
        <View style={{ gap: 20 }}>
          <Text style={styles.title}>Facegram</Text>
          <Text style={styles.punchLine}>
            Don't use Facebook, Instagram, use Facegram !
          </Text>
        </View>
        {/* footer */}
        <View style={styles.footer}>
          <Button
            title={"Get started!"}
            buttonStyle={{ marginHorizontal: wp(3) }}
            onPress={() => router.push("SignUp")}
          />
          <View style={styles.bottomText}>
            <Text style={[styles.loginText]}>Already have account ?</Text>
            <Pressable
              onPress={() => {
                router.push("Login");
              }}
            >
              <Text
                style={[
                  styles.loginText,
                  {
                    color: themes.colors.primaryDark,
                    fontWeight: themes.fonts.semibold,
                  },
                ]}
              >
                Login here
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    // backgroundColor: "white",
    paddingHorizontal: wp(4),
  },
  welcomeImage: {
    height: hp(40),
    width: wp(100),
    alignSelf: "center",
  },
  title: {
    color: themes.colors,
    fontSize: hp(6),
    textAlign: "left",
    fontWeight: themes.fonts.extraBold,
  },
  punchLine: {
    color: themes.colors,
    fontSize: hp(2),
    textAlign: "center",
    fontWeight: themes.fonts.medium,
  },
  footer: {
    gap: 30,
    width: "100%",
    textAlign: "center",
  },
  bottomText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  loginText: {
    color: themes.colors.text,
    textAlign: "center",
    fontSize: hp(1.6),
  },
});
