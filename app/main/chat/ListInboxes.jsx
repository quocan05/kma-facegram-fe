import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../components/screen/ScreenWrapper";
import Header from "../../../components/header/Header";
import { VStack } from "native-base";
import { getConversations } from "../../../services/CommunicationService";
import { useRouter } from "expo-router";
import Avatar from "../../../components/avatar/Avatar";
import { themes } from "../../../constants/theme";
import { useAuth } from "../../../contexts/AuthContext";

const ConversationItem = ({ conversation }) => {
  const { authUser } = useAuth(); // Moved authUser above for clarity
  const { firstUser, secondUser, lastMsg } = conversation;
  const [friend, setFriend] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check if authUser, firstUser, and secondUser are defined before setting friend
    if (authUser && firstUser && secondUser) {
      setFriend(authUser._id === firstUser._id ? secondUser : firstUser);
    }
  }, [authUser, firstUser, secondUser]);

  if (!authUser || !firstUser || !secondUser) {
    // Return null or a loading indicator if necessary
    return null;
  }

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "main/chat/ChatRoom",
          params: {
            friendId:
              authUser._id === firstUser._id ? secondUser._id : firstUser._id,
          },
        })
      }
    >
      <View style={styles.conversationItem}>
        <Avatar
          uri={friend?.avatar ? friend.avatar : ""}
          size={60}
          rounded={themes.radius.xxl}
        />
        <View style={styles.textContainer}>
          <Text style={styles.userName}>{friend?.displayName}</Text>
          <Text style={styles.lastMsg}>
            {`${lastMsg?.sender === authUser._id ? "You: " : "Your friend: "}${
              lastMsg?.content || ""
            }`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ListInboxes = () => {
  const [conversations, setConversations] = useState();
  const fetchConversations = async () => {
    try {
      const data = await getConversations();
      if (data) {
        console.log(data);
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
    gap: 10,
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
