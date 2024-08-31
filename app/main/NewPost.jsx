import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "../../components/screen/ScreenWrapper";
import Header from "../../components/header/Header";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Input,
  Spacer,
  TextArea,
} from "native-base";
import Avatar from "../../components/avatar/Avatar";
import { hp } from "../../helpers/common";
import Icon from "../../assets/icons";

const NewPost = () => {
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
            {/* <Divider orientation="vertical" /> */}
            <Flex direction="row" style={{ gap: 6 }}>
              <Pressable onPress={() => console.log("attach file")}>
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
});
