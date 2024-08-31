import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import ScreenWrapper from "../../components/screen/ScreenWrapper";
import { useRouter } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";
import Header from "../../components/header/Header";
import Icon from "../../assets/icons";
import { themes } from "../../constants/theme";
import { hp, wp } from "../../helpers/common";
import { supabase } from "../../lib/supabase";
import Avatar from "../../components/avatar/Avatar";
import ButtonCommon from "../../components/button/CommonButton";
import Divider from "../../components/displays/Divider";

const Profile = () => {
  // const { user, setAuth } = useAuth();
  const user = {
    name: "Neymar Jr",
    username: "enejota",
    email: "ney@yopmail.com",
  };
  const router = useRouter();
  const onLogout = async () => {
    // setAuth(null);
    try {
      const { error } = await supabase.auth.signOut();
      console.log("lougout");
      if (error) {
        Alert.alert("Sign Out", "Sign Out error!");
      }
    } catch (error) {}
  };
  const handleLogout = async () => {
    // console.log("logout");
    Alert.alert("Sign out", "Are your sure want to log out?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel modal"),
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => onLogout(),
      },
    ]);
  };
  return (
    <ScreenWrapper>
      <UserHeader user={user} router={router} logOut={handleLogout} />
    </ScreenWrapper>
  );
};

const UserHeader = ({ user, router, logOut }) => {
  return (
    <View style={{ flex: 1 }}>
      <Header title={"Profile"} mb={20} />
      <TouchableOpacity style={styles.logoutButton} onPress={logOut}>
        <Icon name={"logout"} color={themes.colors.rose} />
      </TouchableOpacity>
      <View style={styles.container}>
        <View>
          <View style={styles.wrapperHeadProfile}>
            <View style={styles.infoUser}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text>{`@${user.username}`}</Text>
              <View>
                <Text>
                  this is bio Lorem ipsum dolor sit, amet consectetur
                  adipisicing elit. Iure reprehenderit dolorem atque,
                </Text>
                <Pressable onPress={() => console.log("click see followers")}>
                  <View style={styles.followers}>
                    <Icon size={20} name={"followers"} />
                    <Text style={{ color: themes.colors.dark }}>
                      999 followers
                    </Text>
                  </View>
                </Pressable>
              </View>
            </View>
            <View style={styles.avatarContainer}>
              <Avatar uri={""} size={hp(10)} rounded={50} />
              <Pressable
                style={styles.editIcon}
                onPress={() => router.push("main/EditProfile")}
              >
                <Icon name={"edit"} strokeWidth={2.5} size={20} />
              </Pressable>
            </View>
          </View>

          <View style={[styles.buttonGroup, { marginTop: 10 }]}>
            <ButtonCommon onPress={() => console.log("click")} title="Follow" />
            <ButtonCommon
              onPress={() => console.log("click 2")}
              title="Edit profile"
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Divider />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerContainer: {
    marginBottom: 20,
  },
  headerShape: {
    width: wp(100),
    height: hp(20),
  },
  wrapperHeadProfile: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatarContainer: {
    height: hp(12),
    width: hp(12),
  },
  infoUser: {
    display: "flex",
    gap: 4,
    width: "80%",
  },
  followers: {
    display: "flex",
    gap: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editIcon: {
    position: "absolute",
    bottom: 10,
    right: 20,
    padding: 7,
    borderRadius: 50,
    backgroundColor: "white",
    shadowColor: themes.colors.textLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7,
  },
  userName: {
    fontSize: hp(3),
    fontWeight: "500",
    color: themes.colors.textDark,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoText: {
    fontSize: hp(1.6),
    fontWeight: "500",
    color: themes.colors.textLight,
  },
  logoutButton: {
    position: "absolute",
    right: 20,
    padding: 5,
    borderRadius: themes.radius.sm,
    backgroundColor: "#fee2e2",
  },
  listStyle: {
    paddingHorizontal: wp(4),
    paddingBottom: 30,
  },
  noPost: {
    fontSize: hp(20),
    textAlign: "center",
    color: themes.colors.text,
  },
});
