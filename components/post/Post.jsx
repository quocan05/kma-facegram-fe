import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { Box, Divider, HStack, Text, useToast, VStack } from "native-base";
import Avatar from "../avatar/Avatar";
import { hp } from "../../helpers/common";
import { themes } from "../../constants/theme";
import { Image } from "expo-image";
import Icon from "../../assets/icons";
import { dislikePost, likePost } from "../../services/PostService";
import { useRouter } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";

const Post = ({ post, currentUser }) => {
  const { _id, author, content, images, comments, reacts } = post;
  const { authUser } = useAuth();
  const router = useRouter();

  // Check if current user has already liked the post
  const [isLiked, setIsLiked] = useState(
    reacts.some((react) => react.author._id === currentUser._id)
  );
  const [likeCount, setLikeCount] = useState(reacts.length);

  const toast = useToast();

  // Update the state when the post data changes
  useEffect(() => {
    setIsLiked(reacts.some((react) => react.author._id === currentUser._id));
    setLikeCount(reacts.length);
  }, [post, reacts, currentUser]);

  const handleLikeToggle = async () => {
    if (isLiked) {
      const data = await dislikePost(_id);
      if (data) {
        setIsLiked(false);
        setLikeCount((prev) => prev - 1);
        toast.show({
          placement: "bottom",
          description: `Unliked ${_id}`,
        });
      }
    } else {
      const data = await likePost({ postId: _id });
      if (data) {
        setIsLiked(true);
        setLikeCount((prev) => prev + 1);
        toast.show({
          placement: "bottom",
          description: `Liked ${_id}`,
        });
      }
    }
  };

  return (
    <Box style={styles.postContainer}>
      <Divider />
      <HStack space={4} style={styles.post}>
        <Avatar
          size={hp(6)}
          rounded={themes.radius.xxl}
          uri={author.avatar ? author.avatar : ""}
        />
        <VStack space={2} w={310}>
          <HStack justifyContent={"space-between"} alignItems="center">
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "main/Profile",
                  params: {
                    userId: author._id,
                    auth: authUser._id === author._id ? "me" : "",
                  },
                })
              }
            >
              <Text bold fontSize={"lg"}>
                {author.displayName}
              </Text>
            </TouchableOpacity>
          </HStack>
          <Box>
            <Text fontSize={"md"}>{content}</Text>
            {images.length > 0 && (
              <Image
                style={styles.postImage}
                source={{
                  uri: images
                    ? images[0]
                    : "https://i.pinimg.com/564x/4a/94/24/4a94244dfb56e10283cbc7fff0a98f8a.jpg",
                  cache: "force-cache",
                }}
              />
            )}
          </Box>
          <Box>
            <HStack space={4}>
              {/* Like Button */}
              <Pressable onPress={handleLikeToggle}>
                <Icon
                  name={"heart"}
                  size={24}
                  fill={isLiked ? themes.colors.rose : "none"}
                  color={isLiked ? themes.colors.rose : themes.colors.text}
                  extra={likeCount}
                />
              </Pressable>

              {/* Comment Button */}
              <Pressable>
                <Icon name={"comment"} extra={comments.length} />
              </Pressable>

              {/* Share Button */}
              <Pressable>
                <Icon name={"share"} />
              </Pressable>
            </HStack>
          </Box>
        </VStack>
      </HStack>
    </Box>
  );
};

export default Post;

const styles = StyleSheet.create({
  postContainer: {
    width: "100%",
  },
  postImage: {
    width: "90%",
    aspectRatio: 1,
  },
  post: {
    padding: 10,
  },
});
