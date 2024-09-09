import { Platform, Pressable, StyleSheet, TextInput, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Comment from "../../components/comment/Comment";
import {
  Box,
  Divider,
  HStack,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import Avatar from "../../components/avatar/Avatar";
import { themes } from "../../constants/theme";
import { Image } from "expo-image";
import Icon from "../../assets/icons";
import { useLocalSearchParams } from "expo-router";

const DetailPost = () => {
  const { postId } = useLocalSearchParams();

  const [showButtonComment, setShowButtonComment] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // State to toggle text expansion

  const commentRef = useRef("");

  const fullPostContent =
    "Trao đổi với Tuổi Trẻ Online sáng 9-9, bà Trịnh Thị Minh Thanh - phó bí thư thường trực Tỉnh ủy Quảng Ninh (điều hành hoạt động của Tỉnh ủy) - cho biết lãnh đạo tỉnh cùng các sở ngành của địa phương đang tích cực triển khai công tác cứu hộ cứu nạn, khắc phục hậu quả sau cơn bão Yagi.";
  const truncatedText = fullPostContent.substring(0, 100); // Limit to 100 characters

  const handleCommentChange = (value) => {
    commentRef.current = value;
    // Show the send button only if commentRef is not empty
    setShowButtonComment(value.trim().length > 0);
  };

  useEffect(() => {
    console.log("post id>>>", postId);
  }, [postId]);

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
            {isExpanded ? fullPostContent : `${truncatedText}... `}
            <Pressable onPress={() => setIsExpanded(!isExpanded)}>
              <Text color={themes.colors.textDark}>
                {isExpanded ? "Show less" : "Read more"}
              </Text>
            </Pressable>
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
                <Icon name={"heart"} extra={`xx likes`} />
              </Pressable>
              <Pressable>
                <Icon name={"comment"} extra={`9 comments`} />
              </Pressable>
              <Pressable>
                <Icon name={"share"} />
              </Pressable>
            </HStack>
          </Box>

          <Comment />
          {/* Add more comments here */}
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
            <Pressable>
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
    height: 300,
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
