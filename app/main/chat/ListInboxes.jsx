import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../components/screen/ScreenWrapper";
import Header from "../../../components/header/Header";
import { VStack } from "native-base";
import { getConversations } from "../../../services/CommunicationService";

// Sample conversation data
const conversations = [
  {
    _id: "66eaf1b7e4a06a90c0914fd6",
    firstUser: {
      _id: "66d803e0162be4e90d92d91a",
      displayName: "Johnnyabc Khac",
      avatar:
        "https://tanhuet.s3.ap-southeast-1.amazonaws.com/66e95392a3eef545608e6823",
    },
    secondUser: {
      _id: "66da7aaf162be4e90d92df49",
      displayName: "david bip 12345",
      avatar:
        "https://tanhuet.s3.ap-southeast-1.amazonaws.com/66e48f3b2a256536642df933",
    },
    __v: 0,
  },
];

const ConversationItem = ({ conversation }) => {
  const { firstUser, secondUser } = conversation;

  return (
    <View style={styles.conversationItem}>
      <Image source={{ uri: firstUser.avatar }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.userName}>{secondUser.displayName}</Text>
        <Text style={styles.lastMsg}>
          {"the last message here.............................."}
        </Text>
      </View>
    </View>
  );
};

const ListInboxes = () => {
  const [conversations, setConversations] = useState();
  const fetchConversations = async () => {
    try {
      const data = await getConversations();
      if (data) {
        console.log(data.conversations);
        setConversations(data.conversations);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);
  return (
    <ScreenWrapper>
      <VStack space={6}>
        <Header title={"Chats"} />
        <FlatList
          data={conversations}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <ConversationItem conversation={item} />}
        />
      </VStack>
    </ScreenWrapper>
  );
};

export default ListInboxes;

const styles = StyleSheet.create({
  conversationItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  lastMsg: {
    fontSize: 14,
  },
});
