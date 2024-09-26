import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { Text } from "native-base";
import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView, // Import KeyboardAvoidingView
  Platform,
} from "react-native";
import Icon from "../../../assets/icons";
import Avatar from "../../../components/avatar/Avatar"; // Assuming Avatar component
import { themes } from "../../../constants/theme"; // Assuming theme file
import {
  getConversationWithMessages,
  sendMessage,
} from "../../../services/CommunicationService";
import socket from "../../../socket/socket";
import dayjs from "dayjs";
import { useAuth } from "../../../contexts/AuthContext";
import { baseConfig } from "../../../configs/baseConfig";
import socketIOClient from "socket.io-client";
import { getUser } from "../../../services/UserService";

const ChatRoom = () => {
  const { authUser } = useAuth();
  const { friendId } = useLocalSearchParams();
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [friend, setFriend] = useState({});
  const flatListRef = useRef(null);

  const socketRef = useRef();

  const fetchConversationMessages = async () => {
    try {
      const data = await getConversationWithMessages(friendId);
      setConversation(data.conversation);
      setMessages(data.messages);
    } catch (error) {
      console.error(error);
    } finally {
      console.log("conv>>>>>>", conversation.id);
    }
  };

  const fetchFriend = async () => {
    try {
      const data = await getUser(friendId);
      setFriend(data.user);
    } catch (error) {}
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      const sentMessage = {
        content: newMessage,
        sender: authUser._id,
        status: "sending",
      };

      if (sentMessage) {
        socketRef.current.emit("sendMessage", conversation._id, sentMessage);
      }
      setNewMessage("");
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    } catch (error) {
      console.error("Error sending message:", error.response);
    }
  };

  useEffect(() => {
    if (conversation?._id) {
      socketRef.current = socketIOClient.connect(baseConfig.baseSocketUrl);
      socketRef.current.emit("joinRoom", conversation._id);
      console.log(`Joined room: ${conversation._id}`);

      const handleReceiveMessage = (message) => {
        setMessages((prevMessages) => [message, ...prevMessages]);
      };
      socketRef.current.on("receiveMessage", handleReceiveMessage);
      return () => {
        socketRef.current.off("receiveMessage");
        socketRef.current.emit("leaveRoom", conversation._id);
        console.log("leave room");
      };
    }
  }, [conversation]);

  useFocusEffect(
    useCallback(() => {
      fetchFriend();
      fetchConversationMessages();
    }, [])
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjusts for iOS keyboard
      keyboardVerticalOffset={20} // Offset if there's a header or tab bar
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Avatar uri={friend?.avatar} size={44} rounded={themes.radius.xxl} />
          <Text bold fontSize={18}>
            {friend?.displayName}
          </Text>
        </View>
        <TouchableOpacity onPress={() => console.log("cov>>>", conversation)}>
          <Icon name="call" size={24} color={themes.colors.textDark} />
        </TouchableOpacity>
      </View>

      {/* Messages FlatList */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={({ item: message }) => (
          <View
            key={message._id}
            style={[
              styles.messageBubble,
              message.sender === authUser._id
                ? styles.myMessage
                : styles.friendMessage,
            ]}
          >
            <Text style={styles.messageText}>{message.content}</Text>
            <Text style={styles.timestamp}>
              {dayjs(message.createdAt).format("h:mm A")}
            </Text>
          </View>
        )}
        inverted // Invert the list so the newest message is at the bottom
        contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1 }}
      />

      {/* Input Box */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write a message..."
          placeholderTextColor={themes.colors.textLight}
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Icon name="send" size={24} color={themes.colors.primary} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.light.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: themes.light.borderLight,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  messageBubble: {
    maxWidth: "80%",
    borderRadius: themes.radius.lg,
    padding: 12,
    marginVertical: 8,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: themes.colors.messageBubbleOwn,
  },
  friendMessage: {
    alignSelf: "flex-start",
    backgroundColor: themes.colors.messageBubbleFriend,
  },
  messageText: {
    color: themes.colors.textDark,
  },
  timestamp: {
    marginTop: 4,
    fontSize: 12,
    color: themes.colors.textLight,
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: themes.light.borderLight,
    backgroundColor: themes.light.background,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: themes.light.backgroundLight,
    borderRadius: themes.radius.lg,
    marginRight: 8,
    fontSize: 16,
    color: themes.colors.textDark,
  },
  sendButton: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
