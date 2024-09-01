import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "../../components/screen/ScreenWrapper";
import Header from "../../components/header/Header";
import {
  Box,
  Button,
  Center,
  Divider,
  FlatList,
  Flex,
  Input,
  Spacer,
  TextArea,
  theme,
} from "native-base";
import Avatar from "../../components/avatar/Avatar";
import { hp, wp } from "../../helpers/common";
import Icon from "../../assets/icons";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { themes } from "../../constants/theme";

const NewPost = () => {
  const [mediaFiles, setMediaFiles] = useState([]);
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
  return (
    <ScreenWrapper>
      <Header title={"Create a post"} />
      <Flex direction="column" justifyContent={"space-between"} h={"80%"}>
        <Flex direction="row" marginX={4}>
          <Avatar uri={""} size={hp(8)} rounded={50} />
          <Box w={"80%"} h={"full"}>
            <Text>{`@username`}</Text>
            <TextArea
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
          </Box>
        </Flex>

        <Flex
          style={styles.bottomContainer}
          justifyContent="flex-end"
          direction="row"
        >
          <Box style={{ width: 100 }}>
            <Button>Create</Button>
          </Box>
        </Flex>
      </Flex>
    </ScreenWrapper>
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
