import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import {
  Box,
  Divider,
  HStack,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  useToast,
  VStack,
} from "native-base";
import Avatar from "../../components/avatar/Avatar";
import { themes } from "../../constants/theme";
import { Image } from "expo-image";
import Icon from "../../assets/icons";
import { useLocalSearchParams } from "expo-router";
import {
  commentPost,
  deleteComment,
  getPostDetailById,
  dislikePost,
  likePost,
} from "../../services/PostService";
import { useAuth } from "../../contexts/AuthContext";
import Comment from "../../components/comment/Comment";

const DetailPost = () => {
  const { postId } = useLocalSearchParams();
  const { authUser } = useAuth();
  const toast = useToast();

  // State to store post data, like status, and like count
  const [post, setPost] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showButtonComment, setShowButtonComment] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // State to toggle text expansion
  const commentRef = useRef("");

  const fetchPost = async () => {
    try {
      const data = await getPostDetailById(postId);
      if (data) {
        setPost(data.post);
        setIsLiked(
          data.post.reacts.some((react) => react.author._id === authUser._id)
        );
        setLikeCount(data.post.reacts.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle like/unlike functionality
  const handleLikeToggle = async () => {
    if (isLiked) {
      const data = await dislikePost(postId);
      if (data) {
        setIsLiked(false);
        setLikeCount((prev) => prev - 1);
        toast.show({
          placement: "bottom",
          description: `Unliked ${postId}`,
        });
      }
    } else {
      const data = await likePost({ postId });
      if (data) {
        setIsLiked(true);
        setLikeCount((prev) => prev + 1);
        toast.show({
          placement: "bottom",
          description: `Liked ${postId}`,
        });
      }
    }
  };

  const handleCommentChange = (value) => {
    commentRef.current = value;
    setShowButtonComment(value.trim().length > 0);
  };

  const handleCommentPost = async () => {
    const comment = commentRef.current.trim();
    try {
      const data = await commentPost({
        postId: postId,
        content: comment,
      });
      if (data) {
        const newComment = {
          _id: data.comment._id,
          author: {
            _id: authUser._id,
            displayName: authUser.displayName,
            userName: authUser.userName,
          },
          content: comment,
          __v: 0,
        };
        setPost((prevPost) => ({
          ...prevPost,
          comments: [...prevPost.comments, newComment],
        }));
      }
    } catch (error) {
      console.log("Failed to post comment:", error);
    } finally {
      setShowButtonComment(false);
      toast.show({ placement: "top", description: "commented" });
      commentRef.current = "";
      Keyboard.dismiss();
    }
  };

  const handleDeleteComment = (commentId) => {
    try {
      Alert.alert(
        "Delete comment",
        "Are your sure want to delete this comment ?",
        [
          {
            text: "Nope",
            onPress: () => console.log("Cancel modal"),
            style: "cancel",
          },
          {
            text: "Yes bro",
            onPress: async () => {
              const data = await deleteComment(commentId);
              if (data) {
                toast.show({
                  placement: "top",
                  description: "deleted comment",
                });
                setPost((prevPost) => ({
                  ...prevPost,
                  comments: prevPost.comments.filter(
                    (p) => p._id !== commentId
                  ),
                }));
              }
            },
          },
        ]
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const postContentExceedsLimit = post.content?.length > 100; // Check if content exceeds 100 characters

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 32}
    >
      <VStack space={2} flex={1}>
        <HStack justifyContent={"space-between"} alignItems={"center"}>
          <HStack alignItems={"center"} space={3}>
            <Avatar uri={""} size={48} rounded={themes.radius.xxl} />
            <Pressable>
              <VStack>
                <Text bold fontSize={16}>
                  {post.author?.displayName}
                </Text>
                <Text fontSize={12}>@{post.author?.userName}</Text>
              </VStack>
            </Pressable>
          </HStack>
          <Pressable>
            <Icon name="threeDotsHorizontal" />
          </Pressable>
        </HStack>
        <ScrollView>
          <Text>
            {postContentExceedsLimit ? (
              <>
                {isExpanded
                  ? post.content
                  : `${post.content.substring(0, 100)}... `}
                <Pressable onPress={() => setIsExpanded(!isExpanded)}>
                  <Text color={themes.colors.textDark}>
                    {isExpanded ? "Show less" : "Read more"}
                  </Text>
                </Pressable>
              </>
            ) : (
              post.content
            )}
          </Text>
          <Box>
            <Image
              source={
                "https://i.pinimg.com/564x/4a/94/24/4a94244dfb56e10283cbc7fff0a98f8a.jpg"
              }
              style={styles.postImage}
            />
          </Box>

          <Divider />

          {/* Like, Comment, Share buttons */}
          <Box>
            <HStack space={4}>
              {/* Like Button */}
              <Pressable onPress={handleLikeToggle}>
                <Icon
                  name={"heart"}
                  size={24}
                  fill={isLiked ? themes.colors.rose : "none"}
                  color={isLiked ? themes.colors.rose : themes.colors.text}
                  extra={`${likeCount} likes`}
                />
              </Pressable>

              {/* Comment Button */}
              <Pressable>
                <Icon
                  name={"comment"}
                  extra={`${post.comments ? post.comments.length : 0} comments`}
                />
              </Pressable>

              {/* Share Button */}
              <Pressable>
                <Icon name={"share"} />
              </Pressable>
            </HStack>
          </Box>

          {post.comments && post.comments.length > 0 ? (
            post.comments.map((cmt) => (
              <Comment
                key={cmt._id}
                onDelete={() => handleDeleteComment(cmt._id)}
                comment={cmt}
              />
            ))
          ) : (
            <Text>No comments yet</Text>
          )}
        </ScrollView>

        <HStack
          space={2}
          alignItems="center"
          style={styles.commentInputContainer}
        >
          <TextInput
            onChangeText={handleCommentChange}
            placeholder="Add a comment..."
            style={styles.commentInput}
          />
          {showButtonComment && (
            <Pressable onPress={handleCommentPost}>
              <Icon fill={themes.colors.primaryDark} name="send" />
            </Pressable>
          )}
        </HStack>
      </VStack>
    </KeyboardAvoidingView>
  );
};

export default DetailPost;

const styles = StyleSheet.create({
  postImage: {
    width: "100%",
    aspectRatio: 1,
    objectFit: "contain",
  },
  commentInputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#e0e0e0",
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 12,
  },
});
