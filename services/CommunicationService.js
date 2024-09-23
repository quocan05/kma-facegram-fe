import axiosInstance from "./AuthService";

export const getConversations = async () => {
  const response = await axiosInstance.get("/chat/conversations");
  return response.data;
};

// Get conversation and messages with a friend
export const getConversationWithMessages = async (friendId) => {
  const response = await axiosInstance.get(
    `/chat/conversations/message?friendId=${friendId}`
  );
  return response.data;
};

// Get messages of a specific conversation
export const getMessages = async (conversationId) => {
  const response = await axiosInstance.get(
    `/chat/conversations/${conversationId}/messages`
  );
  return response.data;
};

// Test send message via API
export const sendMessage = async (conversationId, message) => {
  try {
    const response = await axiosInstance.post(
      `/chat/test/conversation/${conversationId}/send-message`,
      { content: message }
    );
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
