import {
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Comment from "../../components/comment/Comment";
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
import { commentPost, getPostDetailById } from "../../services/PostService";

const DetailPost = () => {
  const { postId } = useLocalSearchParams();
  const toast = useToast();
  const [showButtonComment, setShowButtonComment] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // State to toggle text expansion
  const [post, setPost] = useState({});

  const commentRef = useRef("");

  const fetchPost = async () => {
    try {
      const data = await getPostDetailById(postId);
      if (data) {
        setPost(data.post);
      }
    } catch (error) {
      console.log(error);
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
      commentRef.current = "";
      setShowButtonComment(false);
      toast.show({ placement: "top", description: "commented" });
      Keyboard.dismiss();
    } catch (error) {
      console.log("Failed to post comment:", error);
    }
  };

  handleDeleteComment = async();

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
                  Vang a Khac
                </Text>
                <Text fontSize={12}>@neymarjr</Text>
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
              post.content // If content is less than or equal to 100 chars, display full content
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

          <Box>
            <HStack space={4}>
              <Pressable>
                <Icon
                  name={"heart"}
                  extra={`${post.reacts ? post.reacts.length : 0} likes`}
                />
              </Pressable>
              <Pressable>
                <Icon
                  name={"comment"}
                  extra={`${post.comments ? post.comments.length : 0} comments`}
                />
              </Pressable>
              <Pressable>
                <Icon name={"share"} />
              </Pressable>
            </HStack>
          </Box>

          {post.comments && post.comments.length > 0 ? (
            post.comments.map((cmt) => <Comment comment={cmt} />)
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
