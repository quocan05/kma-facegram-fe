import dayjs from "dayjs";
import axiosInstance from "./AuthService";
import { Platform } from "react-native";

export const getUserImageSrc = (path) => {
  if (path) {
    return { uri: path };
  } else {
    return require("../assets/images/defaultavatar.avif");
  }
};

export const uploadImage = async (imageUri) => {
  const formData = new FormData();
  //append image\
  const file = {
    uri: Platform.OS === "ios" ? imageUri.replace("file://", "") : imageUri,
    type: `image/${imageUri.split(".").pop()}`, // Get MIME type
    name: imageUri.split("/").pop(),
  };

  formData.append("files", file);

  const response = await axiosInstance.post("file/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data", // Axios will set the boundary automatically
    },
  });
  return response.data;
};
