import { Box, HStack } from "native-base";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import Icon from "../../assets/icons";
import { themes } from "../../constants/theme";
import { useAuth } from "../../contexts/AuthContext";

const Comment = ({ comment, onDelete }) => {
  const { authUser } = useAuth();
  const { _id, author, content } = comment;

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
          <Pressable onPress={() => onDelete(_id)}>
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
