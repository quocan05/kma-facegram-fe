export const getUserImageSrc = (path) => {
  if (path) {
    return { uri: path };
  } else {
    return require("../assets/images/defaultavatar.avif");
  }
};
