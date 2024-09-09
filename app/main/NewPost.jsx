import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import ScreenWrapper from "../../components/screen/ScreenWrapper";
import Header from "../../components/header/Header";
import {
  Box,
  Button,
  Center,
  Divider,
  FlatList,
  Flex,
  HStack,
  Input,
  Radio,
  Spacer,
  TextArea,
  theme,
  useToast,
} from "native-base";
import Avatar from "../../components/avatar/Avatar";
import { hp, wp } from "../../helpers/common";
import Icon from "../../assets/icons";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { themes } from "../../constants/theme";
import { createNewPost } from "../../services/PostService";
import { router } from "expo-router";

const NewPost = () => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [value, setValue] = React.useState("public");
  const toast = useToast();

  const descriptionRef = useRef("");
  const modeRef = useRef("public");
  const imagesRef = useRef("");

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
    console.log("cleck remove");
    console.log(uri);
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
    if (!descriptionRef.current) {
      toast.show({
        placement: "bottom",
        description: "Please type something to post ",
      });
      return;
    }

    try {
      let description = descriptionRef.current.trim();
      let mode = modeRef.current;
      const data = await createNewPost({
        content: description,
        mode: mode,
      });
      if (data) {
        toast.show({
          placement: "top",
          description: data.message,
        });
        router.back();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Header title={"Create a post"} />
      <Flex direction="column" justifyContent={"space-between"} h={"80%"}>
        <Flex direction="row" marginX={4}>
          <Avatar uri={""} size={hp(8)} rounded={50} />
          <Box w={"80%"} h={"full"}>
            <Text>{`@username`}</Text>
            <TextArea
              onChangeText={(value) => (descriptionRef.current = value)}
              size={"lg"}
              variant={"unstyled"}
              placeholder="✍ What's on your mind? "
            />
            <Box>
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
            </Box>{" "}
            <Flex direction="row" style={{ gap: 6 }}>
              <Pressable onPress={() => handleAttachMedia()}>
                <Icon name="attach" />
              </Pressable>
              <Pressable onPress={() => console.log("feel")}>
                <Icon name="feeling" />
              </Pressable>
            </Flex>
            <Box>
              <Radio.Group
                name="myRadioGroup"
                accessibilityLabel="favorite number"
                value={value}
                onChange={(radioVal) => {
                  setValue(radioVal);
                  modeRef.current = radioVal;
                }}
              >
                <HStack space={2}>
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
            </Box>
          </Box>
        </Flex>

        <Flex
          style={styles.bottomContainer}
          justifyContent="flex-end"
          direction="row"
        >
          <Box style={{ width: 100 }}>
            <Button onPress={() => handleCreatePost()}>Create</Button>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default NewPost;

const styles = StyleSheet.create({
  bottomContainer: {
    marginHorizontal: 16,
    // backgroundColor: "#000",
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
