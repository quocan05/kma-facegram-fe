import { Pressable, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import {
  Box,
  Divider,
  Flex,
  HStack,
  Text,
  useToast,
  VStack,
} from "native-base";
import Avatar from "../avatar/Avatar";
import { hp, wp } from "../../helpers/common";
import { themes } from "../../constants/theme";
import { Image } from "expo-image";
import Icon from "../../assets/icons";
import { likePost } from "../../services/PostService";

const Post = ({ post }) => {
  const { _id, author, content, image, comments, reacts } = post;
  const toast = useToast();
  const handleLikePost = async () => {
    const data = await likePost({
      postId: _id,
      type: "like",
    });
    if (data) {
      toast.show({
        placement: "bottom",
        description: `Liked ${_id}`,
      });
    }
  };

  return (
    <Box style={styles.postContainer}>
      <Divider />
      <HStack space={4} style={styles.post}>
        <Avatar size={hp(6)} rounded={themes.radius.xxl} />
        <VStack space={2} w={320}>
          <Flex justifyContent={"space-between"} direction="row" align="center">
            <Text bold fontSize={"lg"}>
              {author.displayName}
            </Text>
            <Pressable>
              <Icon name={"threeDotsHorizontal"} />
            </Pressable>
          </Flex>
          <Box>
            <Text fontSize={"md"}>{content}</Text>
            <Image
              style={styles.postImage}
              source={
                "https://instagram.fhan17-1.fna.fbcdn.net/v/t51.29350-15/458387850_397299600137898_3371909595937664264_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi43Njh4NzY4LnNkci5mMjkzNTAuZGVmYXVsdF9pbWFnZSJ9&_nc_ht=instagram.fhan17-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=dc_DoiVVZK8Q7kNvgHB9WoT&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzQ0OTkwMzU5Mzk4NDU5NDMxNQ%3D%3D.3-ccb7-5&oh=00_AYDgEL6uJ-VFPDU3JYTX2P1m__q9BIEZ020lqnJMR-adqQ&oe=66DF338E&_nc_sid=10d13b"
              }
            />
          </Box>
          <Box>
            <HStack space={4}>
              <Pressable onPress={() => handleLikePost()}>
                <Icon name={"heart"} extra={reacts.length} />
              </Pressable>
              <Pressable>
                <Icon name={"comment"} extra={9} />
              </Pressable>
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
    width: "100%",
    height: 300,
  },
  post: {
    padding: 10,
  },
});
