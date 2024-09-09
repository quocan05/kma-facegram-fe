import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Box, Flex, HStack } from "native-base";
import { AntDesign } from "@expo/vector-icons"; // AntDesign icons include the heart
import Avatar from "../avatar/Avatar";
import { themes } from "../../constants/theme";
import Icon from "../../assets/icons";

const Comment = ({ avatarUrl, username, content }) => {
  return (
    <Box py={2}>
      <HStack alignItems="center" space={3}>
        {/* Avatar */}
        <Avatar size={42} uri={""} rounded={themes.radius.xxl} />
        <Box flex={1}>
          {/* Username and Comment */}
          <Text>
            <Text style={styles.username}>@neymarjr</Text> You need to learn how
            to say PUNDE in 🇲🇾 Amo ver voces felizes 😍❤️🫶🏼
          </Text>
          <Text style={styles.likedComment}>People liked comment</Text>
        </Box>
        {/* Heart Icon */}
        <Icon name={"heart"} size={18} />
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
