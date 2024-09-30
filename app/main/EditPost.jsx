import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Box, VStack, Text, useToast } from "native-base";
import { getPostDetailById, editPost } from "../../services/PostService";
import ScreenWrapper from "../../components/screen/ScreenWrapper";

const EditPost = () => {
  const { postId } = useLocalSearchParams();
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  // Fetch post details on load
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostDetailById(postId);
        if (data) {
          setPostContent(data.post.content);
          if (data.post.images && data.post.images.length > 0) {
            setPostImage(data.post.images[0]);
          }
        }
      } catch (error) {
        console.log("Error fetching post details:", error);
      }
    };
    fetchPost();
  }, [postId]);

  // Handle post update
  const handleUpdatePost = async () => {
    if (!postContent.trim()) {
      Alert.alert("Error", "Post content cannot be empty.");
      return;
    }

    setLoading(true);
    try {
      const data = await editPost(postId, { content: postContent });
      if (data) {
        toast.show({
          placement: "top",
          description: "Post updated successfully",
        });
        router.back();
      }
    } catch (error) {
      console.log("Error updating post:", error.response);
      toast.show({
        placement: "top",
        description: "Failed to update post",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("post id: >>", postId);
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScreenWrapper>
        <ScrollView contentContainerStyle={styles.container}>
          <VStack space={4}>
            <Text>Edit Post</Text>
            <TextInput
              style={styles.textInput}
              multiline
              numberOfLines={5}
              value={postContent}
              onChangeText={setPostContent}
              placeholder="Edit your post content"
            />
            {postImage && (
              <Box>
                <Image
                  source={{ uri: postImage }}
                  style={styles.image}
                  resizeMode="contain"
                />
              </Box>
            )}
            <Button
              title={loading ? "Updating..." : "Update Post"}
              onPress={handleUpdatePost}
              disabled={loading}
            />
          </VStack>
        </ScrollView>
      </ScreenWrapper>
    </KeyboardAvoidingView>
  );
};

export default EditPost;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  textInput: {
    height: 150,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
});
