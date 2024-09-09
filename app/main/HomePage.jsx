import React, { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useFocusEffect, useRouter } from "expo-router";
import { FlatList, Modal, ScrollView } from "native-base";
import Icon from "../../assets/icons";
import Avatar from "../../components/avatar/Avatar";
import Post from "../../components/post/Post";
import { themes } from "../../constants/theme";
import { useAuth } from "../../contexts/AuthContext";
import { hp, wp } from "../../helpers/common";
import { getAllPost } from "../../services/PostService";
import DetailPost from "./DetailPost";

const HomePage = () => {
  const { authUser, logout } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSuggestPosts = async () => {
    const data = await getAllPost();
    if (data) {
      const sortedPosts = data.posts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setPosts(sortedPosts);
    }
  };

  useEffect(() => {
    if (authUser) {
      console.log("auht user>>", authUser);
      getSuggestPosts();
    } else {
      logout();
    }
  }, [authUser]);

  useFocusEffect(
    useCallback(() => {
      getSuggestPosts();
    }, [])
  );

  return (
    <>
      <View style={styles.container}>
        {/* header */}
        <View style={styles.header}>
          <Text style={styles.title}>FG</Text>
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
        </View>
        {/* <FlatList data={posts} renderItem={(p) => <Post post={p} />} /> */}
        <ScrollView>
          {posts &&
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
                <Post key={p._id} post={p} />
              </Pressable>
            ))}
        </ScrollView>
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
