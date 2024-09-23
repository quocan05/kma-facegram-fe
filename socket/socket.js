import { io } from "socket.io-client";
import { baseConfig } from "../configs/baseConfig";

const socket = io(baseConfig.baseURL, {
  transports: ["websocket"],
  // Additional configurations if needed
  // auth: {
  //   token: "your_token",
  // }
});

export default socket;
