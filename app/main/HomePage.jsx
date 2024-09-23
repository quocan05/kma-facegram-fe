import React, { useCallback, useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { ScrollView } from "native-base";
import Icon from "../../assets/icons";
import Avatar from "../../components/avatar/Avatar";
import Post from "../../components/post/Post";
import { themes } from "../../constants/theme";
import { useAuth } from "../../contexts/AuthContext";
import { hp, wp } from "../../helpers/common";
import { getAllPost } from "../../services/PostService";
import ScreenWrapper from "../../components/screen/ScreenWrapper";

const HomePage = () => {
  const { authUser, logout, setAuth } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const getSuggestPosts = async () => {
    setLoading(true);
    const data = await getAllPost();
    if (data) {
      const sortedPosts = data.posts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPosts(sortedPosts);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (authUser) {
      getSuggestPosts();
    } else {
      logout();
    }
  }, [authUser]);

  // Handle pull-to-refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getSuggestPosts().finally(() => setRefreshing(false));
  }, []);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* header */}
        <View style={styles.header}>
          <Text style={styles.title}>FaceGram</Text>
          <View style={styles.icons}>
            <Pressable onPress={() => router.push("main/SearchUser")}>
              <Icon
                name={"search"}
                size={hp(3.2)}
                strokeWidth={2}
                color={themes.colors.text}
              />
            </Pressable>
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

            <Pressable onPress={() => router.push("main/chat/ListInboxes")}>
              <Icon
                name={"inbox"}
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
                uri={authUser.avatar ? authUser.avatar : ""}
                size={hp(4.3)}
                rounded={themes.radius.xxl}
                style={{ borderWidth: 2 }}
              />
            </Pressable>
          </View>
        </View>

        {/* ScrollView with refresh control */}
        <ScrollView
          style={{ marginBottom: 10 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {posts.length > 0 ? (
            posts.map((p) => (
              <Pressable
                key={p._id}
                onPress={() =>
                  router.push({
                    pathname: "main/DetailPost",
                    params: { postId: p._id },
                  })
                }
              >
                <Post key={p._id} post={p} currentUser={authUser} />
              </Pressable>
            ))
          ) : (
            <Text style={styles.noPosts}>No posts available</Text>
          )}
        </ScrollView>
      </View>
    </ScreenWrapper>
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
  icons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 18,
  },
  noPosts: {
    fontSize: hp(2),
    textAlign: "center",
    color: themes.colors.text,
    marginTop: 20,
  },
});
