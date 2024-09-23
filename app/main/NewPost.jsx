import {
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ScreenWrapper from "../../components/screen/ScreenWrapper";
import Header from "../../components/header/Header";
import {
  Box,
  Button,
  FlatList,
  Radio,
  TextArea,
  useToast,
  VStack,
  HStack,
} from "native-base";
import Avatar from "../../components/avatar/Avatar";
import { hp, wp } from "../../helpers/common";
import Icon from "../../assets/icons";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { themes } from "../../constants/theme";
import { createNewPost } from "../../services/PostService";
import { router } from "expo-router";
import { getMe } from "../../services/AuthUser";
import { useAuth } from "../../contexts/AuthContext";
import { uploadImage } from "../../services/ImageService";

const NewPost = () => {
  const { authUser } = useAuth();
  const [mediaFiles, setMediaFiles] = useState([]);
  const [value, setValue] = React.useState("public");
  const toast = useToast();

  const descriptionRef = useRef("");
  const modeRef = useRef("public");

  const handleAttachMedia = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      const newMediaFiles = result.assets.map((asset) => asset.uri);
      setMediaFiles((prev) => [...prev, ...newMediaFiles]);
    }
  };

  const handleRemoveMedia = (uri) => {
    setMediaFiles((prev) => prev.filter((item) => item !== uri));
  };

  const renderItem = ({ item }) => (
    <Box>
      <Pressable
        style={styles.removeButton}
        onPress={() => handleRemoveMedia(item)}
      >
        <Icon name={"delete"} color={themes.colors.primary} />
      </Pressable>
      <Image source={{ uri: item }} style={styles.image} />
    </Box>
  );

  const handleCreatePost = async () => {
    // Ensure the description is not empty
    if (!descriptionRef.current.trim()) {
      toast.show({
        placement: "bottom",
        description: "Please type something to post",
      });
      return;
    }

    let images = [];

    try {
      // If there are media files, upload them and get the URLs
      if (mediaFiles.length > 0) {
        const urlsImage = await uploadImage(mediaFiles);
        if (urlsImage && urlsImage.urls) {
          console.log(urlsImage);
          images = urlsImage.urls;
        }
      }

      // Prepare the data for creating the post
      let description = descriptionRef.current.trim();
      let mode = modeRef.current;

      const data = await createNewPost({
        images, // If there are no images, this will be an empty array
        content: description,
        mode: "public",
      });

      // Handle success
      if (data) {
        console.log("Post created successfully:", data);
        toast.show({
          placement: "top",
          description: data.message,
        });
        router.back(); // Navigate back after creating the post
      }
    } catch (error) {
      console.log("Error creating post:", error);
    }
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 32}
      >
        <Header title={"Create a post"} mb={24} />
        <VStack flex={1} justifyContent="space-between" px={4}>
          <Box>
            <HStack>
              <Avatar
                uri={authUser ? authUser.avatar : ""}
                size={hp(8)}
                rounded={50}
              />
              <VStack w={"80%"}>
                <Text>{`@${authUser.userName}`}</Text>
                <TextArea
                  onChangeText={(value) => (descriptionRef.current = value)}
                  size={"lg"}
                  variant={"unstyled"}
                  placeholder="✍ What's on your mind?"
                />
                {mediaFiles.length > 0 && (
                  <FlatList
                    horizontal
                    data={mediaFiles}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    style={styles.mediaList}
                    showsHorizontalScrollIndicator={false}
                  />
                )}
                <HStack space={4} mt={2}>
                  <Pressable onPress={handleAttachMedia}>
                    <Icon name="attach" />
                  </Pressable>
                  <Pressable onPress={() => console.log("feel")}>
                    <Icon name="feeling" />
                  </Pressable>
                </HStack>
              </VStack>
            </HStack>
            {/* <VStack mt={4}>
              <Radio.Group
                name="myRadioGroup"
                accessibilityLabel="favorite number"
                value={value}
                onChange={(radioVal) => {
                  setValue(radioVal);
                  modeRef.current = radioVal;
                }}
              >
                <HStack space={4}>
                  <Radio value="protected" my={1}>
                    Follower only
                  </Radio>
                  <Radio value="private" my={1}>
                    Only me
                  </Radio>
                  <Radio value="public" my={1}>
                    Public
                  </Radio>
                </HStack>
              </Radio.Group>
            </VStack> */}
          </Box>
          <VStack style={styles.bottomContainer} alignItems="center">
            <Button onPress={handleCreatePost} width="100%">
              Create
            </Button>
          </VStack>
        </VStack>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

export default NewPost;

const styles = StyleSheet.create({
  bottomContainer: {
    marginBottom: 16,
  },
  image: {
    width: 140,
    height: 140,
    marginHorizontal: wp(1.4),
  },
  removeButton: {
    position: "absolute",
    zIndex: 99,
    borderRadius: 3,
    right: 10,
    top: 4,
  },
});
