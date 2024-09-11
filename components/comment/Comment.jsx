import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Box, Flex, HStack } from "native-base";
import { AntDesign } from "@expo/vector-icons"; // AntDesign icons include the heart
import Avatar from "../avatar/Avatar";
import { themes } from "../../constants/theme";
import Icon from "../../assets/icons";
import { useAuth } from "../../contexts/AuthContext";

const Comment = ({ comment }) => {
  const { authUser } = useAuth();
  const { _id, author, content } = comment;

  const handleDeleteComment = async () => {
    console.log("click delete comment");
  };

  return (
    <Box py={2.5}>
      <HStack alignItems="center" space={4}>
        {/* Avatar */}
        {/* <Avatar size={42} uri={""} rounded={themes.radius.xxl} /> */}
        <Box flex={1}>
          {/* Username and Comment */}
          <Text>
            <Text
              style={[
                styles.username,
                {
                  color:
                    authUser.userName === author.userName
                      ? themes.colors.primary
                      : "black",
                },
              ]}
            >{`@${author.userName}`}</Text>{" "}
            {content}
          </Text>
        </Box>
        {/* Heart Icon */}
        {authUser._id === author._id && (
          <Pressable onPress={handleDeleteComment}>
            <Icon name={"delete"} size={18} />
          </Pressable>
        )}
      </HStack>
    </Box>
  );
};

export default Comment;

const styles = StyleSheet.create({
  username: {
    fontWeight: "bold",
    marginRight: 4,
  },
  likedComment: {
    fontSize: 12,
    color: themes.colors.dark,
  },
});
