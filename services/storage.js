import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN } from "../constants/variables";

export const setToken = async (key, token) => {
  try {
    await AsyncStorage.setItem(key, token);
    console.log(token);
  } catch (error) {
    console.error("Error saving token", error);
  }
};

export const getToken = async (token) => {
  try {
    return await AsyncStorage.getItem(token);
  } catch (error) {
    console.error("Error retrieving token", error);
    return null;
  }
};

export const removeToken = async (token) => {
  try {
    await AsyncStorage.removeItem(token);
  } catch (error) {
    console.error("Error removing token", error);
  }
};

export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Error clearing Async Storage", error);
  }
};
