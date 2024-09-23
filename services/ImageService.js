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

export const getImageSrc = (path) => {
  if (path) {
    return { uri: path };
  } else {
    return require("../assets/images/defaultavatar.avif");
  }
};

export const uploadImage = async (imageUris) => {
  const formData = new FormData();
  imageUris.forEach((imageUri, index) => {
    const file = {
      uri: Platform.OS === "ios" ? imageUri.replace("file://", "") : imageUri,
      type: `image/${imageUri.split(".").pop()}`,
      name: `image_${index}_${imageUri.split("/").pop()}`, // Unique file name for each image
    };

    formData.append("files", file);
  });

  const response = await axiosInstance.post("/file/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data", // Axios will set the boundary automatically
    },
  });
  return response.data;
};
