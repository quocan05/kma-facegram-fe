import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, Text, VStack } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "../../assets/icons";
import Avatar from "../../components/avatar/Avatar";
import ButtonCommon from "../../components/button/CommonButton";
import Header from "../../components/header/Header";
import Post from "../../components/post/Post";
import { themes } from "../../constants/theme";
import { useAuth } from "../../contexts/AuthContext";
import { hp, wp } from "../../helpers/common";
import { getMe } from "../../services/AuthUser";
import { getUser } from "../../services/UserService";
import { getPostOfUser } from "../../services/PostService";
import ScreenWrapper from "../../components/screen/ScreenWrapper";

const Profile = () => {
  const { auth } = useLocalSearchParams();
  const { authUser, logout } = useAuth();
  const [currentUser, setCurrentUser] = useState({});
  const [postsUser, setPostsUser] = useState([]);

  const isMe = auth === "me";

  const router = useRouter();
  const handleLogout = async () => {
    Alert.alert("Sign out", "Are your sure want to log out?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel modal"),
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: async () => await logout(),
      },
    ]);
  };

  const fetchAuthUser = async () => {
    try {
      const data = await getMe();
      setCurrentUser(data.user);
      if (data.user) {
        const postData = await getPostOfUser(data.user._id);
        if (postData.posts) {
          setPostsUser(postData.posts);
        }
      }
    } catch (error) {}
  };

  const fetchNormalUser = async () => {
    try {
      const data = await getUser("66d6e378d0bda1311f6c320c");
      setCurrentUser(data.user);
    } catch (error) {}
  };

  useEffect(() => {
    if (isMe) {
      fetchAuthUser();
    } else {
      fetchNormalUser();
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (isMe) {
        fetchAuthUser();
      } else {
        fetchNormalUser();
      }
    }, [])
  );

  return (
    <ScreenWrapper>
      <VStack>
        <Header title={"Profile"} mb={10} />
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name={"logout"} color={themes.colors.rose} />
        </TouchableOpacity>
        <ScrollView>
          <UserHeader isMe={isMe} user={currentUser} router={router} />
          {authUser && postsUser.length > 0 ? (
            postsUser.map((p) => (
              <Post key={p._id} post={p} currentUser={currentUser} />
            ))
          ) : (
            <Text>No posts available.</Text>
          )}
        </ScrollView>
      </VStack>
    </ScreenWrapper>
  );
};

const UserHeader = ({ user, isMe, router }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          <View style={styles.wrapperHeadProfile}>
            <View style={styles.infoUser}>
              <Text style={styles.userName} bold fontSize={"2xl"}>
                {user.displayName}
              </Text>
              <Text>{`@${user.userName}`}</Text>
              <View>
                <Text>{user.bio}</Text>
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
              <Avatar
                uri={user.avatar ? user.avatar : ""}
                size={hp(10)}
                rounded={50}
              />
              {isMe && (
                <Pressable
                  style={styles.editIcon}
                  onPress={() => router.push("main/EditProfile")}
                >
                  <Icon name={"edit"} strokeWidth={2.5} size={20} />
                </Pressable>
              )}
            </View>
          </View>

          <View style={[styles.buttonGroup, { marginTop: 10 }]}>
            <ButtonCommon onPress={() => console.log("click")} title="Follow" />
            <ButtonCommon
              onPress={() => console.log("click 2")}
              title="Send Message"
            />
          </View>
        </View>
      </View>
      <View style={{ marginTop: 10, paddingHorizontal: 20 }}>
        <Text bold fontSize={"xl"}>
          Posts
        </Text>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
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
    fontWeight: "700",
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
    top: 7,
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
