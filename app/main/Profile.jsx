import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { HStack, ScrollView, Text, VStack } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "../../assets/icons";
import Avatar from "../../components/avatar/Avatar";
import ButtonCommon from "../../components/button/CommonButton";
import Header from "../../components/header/Header";
import Post from "../../components/post/Post";
import ScreenWrapper from "../../components/screen/ScreenWrapper";
import { themes } from "../../constants/theme";
import { useAuth } from "../../contexts/AuthContext";
import { hp } from "../../helpers/common";
import { getMe } from "../../services/AuthUser";
import { getPostOfUser } from "../../services/PostService";
import { followUser, getUser, unfollowUser } from "../../services/UserService";

const Profile = () => {
  const { auth, userId } = useLocalSearchParams();
  const { logout } = useAuth();
  const [currentUser, setCurrentUser] = useState({});
  const [postsUser, setPostsUser] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [followings, setFollowings] = useState(0);
  const isMe = auth === "me";
  const router = useRouter();

  const handleLogout = async () => {
    Alert.alert("Sign out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel modal"),
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: async () => {
          router.dismissAll();
          router.replace("Login");
          await logout();
        },
      },
    ]);
  };

  const fetchAuthUser = async () => {
    try {
      const data = await getMe();
      if (data?.user) {
        setCurrentUser(data.user);
        setFollowers(data.followers || 0);
        setFollowings(data.followings || 0);
        const postData = await getPostOfUser(data.user._id);
        if (postData?.posts) {
          const sortedPosts = postData.posts.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setPostsUser(sortedPosts);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNormalUser = async () => {
    try {
      const data = await getUser(userId);
      if (data?.user) {
        setCurrentUser(data.user);
        setFollowers(data.followers || 0);
        setFollowings(data.followings || 0);
        const postData = await getPostOfUser(data.user._id);
        if (postData?.posts) {
          const sortedPosts = postData.posts.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setPostsUser(sortedPosts);
        }
      }
    } catch (error) {
      console.log("err when set user", error);
    }
  };

  useEffect(() => {
    if (isMe) {
      fetchAuthUser();
    } else {
      fetchNormalUser();
    }
  }, [userId]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (isMe) {
      fetchAuthUser().finally(() => setRefreshing(false));
    } else {
      fetchNormalUser().finally(() => setRefreshing(false));
    }
  }, [isMe, userId]);

  return (
    <ScreenWrapper>
      <VStack style={{ paddingBottom: 10, flex: 1 }}>
        <Header title={"Profile"} mb={10} />
        {isMe && (
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name={"logout"} color={themes.colors.rose} />
          </TouchableOpacity>
        )}
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <UserHeader
            isMe={isMe}
            user={currentUser}
            router={router}
            followers={followers}
            followings={followings}
          />
          {postsUser.length > 0 ? (
            postsUser.map((p) => (
              <Pressable
                key={p._id}
                onPress={() =>
                  router.push({
                    pathname: "main/DetailPost",
                    params: { postId: p._id },
                  })
                }
              >
                <Post key={p._id} post={p} currentUser={currentUser} />
              </Pressable>
            ))
          ) : (
            <Text>No posts available.</Text>
          )}
        </ScrollView>
      </VStack>
    </ScreenWrapper>
  );
};

const UserHeader = ({ user, isMe, router, followers, followings }) => {
  const { authUser, reloadFollow, authFollowings } = useAuth();
  const [isFollowed, setIsFollowed] = useState(false);

  const handleFollow = async () => {
    try {
      if (isFollowed) {
        // Call the unfollow API
        await unfollowUser(user._id);
        setIsFollowed(false);
      } else {
        // Call the follow API
        await followUser(user._id);
        setIsFollowed(true);
      }
    } catch (error) {
      console.log("got error when follow", error);
    } finally {
      reloadFollow(authUser._id);
    }
  };

  const checkFollowed = async () => {
    const check = authFollowings.some((f) => f.author._id === user._id);
    setIsFollowed(check);
  };

  useEffect(() => {
    reloadFollow(authUser._id);
  }, []);

  useEffect(() => {
    checkFollowed();
  }, [authFollowings]);

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
                <HStack space={4}>
                  <TouchableOpacity
                    onPress={() => console.log("click see followers")}
                  >
                    <View style={styles.followers}>
                      <Icon size={20} name={"followers"} />
                      <Text style={{ color: themes.colors.dark }}>
                        {`${followers ?? 0} followers`}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => reloadFollow(authUser._id)}>
                    <View style={styles.followers}>
                      <Icon size={20} name={"followers"} />
                      <Text style={{ color: themes.colors.dark }}>
                        {`${followings ?? 0} followings`}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </HStack>
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
          {!isMe && (
            <View style={[styles.buttonGroup, { marginTop: 10 }]}>
              <ButtonCommon
                buttonStyle={{
                  backgroundColor: isFollowed
                    ? themes.colors.gray
                    : themes.colors.primary,
                }}
                onPress={handleFollow}
                title={isFollowed ? "Unfollow" : "Follow"}
              />
              <ButtonCommon
                onPress={() =>
                  router.push({
                    pathname: "main/chat/ChatRoom",
                    params: { friendId: user._id },
                  })
                }
                title="Send Message"
              />
            </View>
          )}
        </View>
      </View>
      <View style={{ marginTop: 10, paddingHorizontal: 20 }}>
        <Text bold fontSize={"xl"}>
          {isMe && `Your `}Posts
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
  logoutButton: {
    position: "absolute",
    top: 7,
    right: 20,
    padding: 5,
    borderRadius: themes.radius.sm,
    backgroundColor: "#fee2e2",
  },
});
