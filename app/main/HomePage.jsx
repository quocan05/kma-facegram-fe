import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ScreenWrapper from "../../components/screen/ScreenWrapper";

import { useRouter } from "expo-router";
import Icon from "../../assets/icons";
import Avatar from "../../components/avatar/Avatar";
import { themes } from "../../constants/theme";
import { hp, wp } from "../../helpers/common";
import { getToken } from "../../services/storage";
import { useAuth } from "../../contexts/AuthContext";

const HomePage = () => {
  const { authUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("authen user>>>", authUser);
  }, [authUser]);

  return (
    <>
      <View style={styles.container}>
        {/* header */}
        <View style={styles.header}>
          <Text style={styles.title}>FaceGram</Text>
          <View style={styles.icons}>
            <Pressable onPress={() => router.push("main/Notifications")}>
              <Icon
                name={"heart"}
                size={hp(3.2)}
                strokeWidth={2}
                color={themes.colors.text}
              />
            </Pressable>
            <Pressable onPress={() => router.push("main/NewPost")}>
              <Icon
                name={"plus"}
                size={hp(3.2)}
                strokeWidth={2}
                color={themes.colors.text}
              />
            </Pressable>
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "main/Profile",
                  params: {
                    auth: "me",
                  },
                })
              }
            >
              <Avatar
                uri={""}
                size={hp(4.3)}
                rounded={themes.radius.sm}
                style={{ borderWidth: 2 }}
              />
            </Pressable>
            <Pressable>
              <Icon
                name={"inbox"}
                size={hp(3.2)}
                strokeWidth={2}
                color={themes.colors.text}
              />
            </Pressable>
          </View>
          <Pressable onPress={() => console.log(authUser)}>
            <Text>Click</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    marginHorizontal: wp(4),
  },
  title: {
    color: themes.colors.text,
    fontSize: hp(3.2),
    fontWeight: themes.fonts.bold,
  },
  avatarImage: {
    height: hp(4.3),
    width: hp(4.3),
    borderRadius: themes.radius.sm,
    borderCurve: "continuous",
    borderColor: themes.colors.gray,
    borderWidth: 3,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 18,
  },
  listStyle: {
    paddingTop: 20,
    paddingHorizontal: wp(4),
  },
  noPosts: {
    fontSize: hp(2),
    textAlign: "center",
    color: themes.colors.text,
  },
  pill: {
    position: "absolute",
    right: -10,
    top: -4,
    height: hp(2.2),
    width: hp(2.2),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: themes.colors.roseLight,
  },
  pillText: {
    color: "white",
    fontSize: hp(1.2),
    fontWeight: themes.fonts.bold,
  },
});
