import React from "react";
import { themes } from "../../constants/theme";
import ArrowLeft from "./ArrowLeft";
import Call from "./Call";
import Camera from "./Camera";
import Comment from "./Comment";
import Delete from "./Delete";
import Edit from "./Edit";
import Heart from "./Heart";
import Home from "./Home";
import Image from "./Image";
import Location from "./Location";
import Lock from "./Lock";
import Logout from "./logout";
import Mail from "./Mail";
import Plus from "./Plus";
import Search from "./Search";
import Send from "./Send";
import Share from "./Share";
import ThreeDotsCircle from "./ThreeDotsCircle";
import ThreeDotsHorizontal from "./ThreeDotsHorizontal";
import User from "./User";
import Video from "./Video";
import Inbox from "./Inbox";
import Followers from "./Followers";
import PasswordIcon from "./Password";
import { Box, Text } from "native-base";
import Write from "./Write";
import Attach from "./Attach";
import FaceFeeling from "./FaceFeeling";

const icons = {
  home: Home,
  mail: Mail,
  lock: Lock,
  user: User,
  heart: Heart,
  plus: Plus,
  search: Search,
  location: Location,
  call: Call,
  camera: Camera,
  edit: Edit,
  arrowLeft: ArrowLeft,
  threeDotsCircle: ThreeDotsCircle,
  threeDotsHorizontal: ThreeDotsHorizontal,
  comment: Comment,
  share: Share,
  send: Send,
  delete: Delete,
  logout: Logout,
  image: Image,
  video: Video,
  inbox: Inbox,
  followers: Followers,
  passwordSecurity: PasswordIcon,
  write: Write,
  attach: Attach,
  feeling: FaceFeeling,
};

const Icon = ({
  name,
  color = themes.colors.textLight,
  ml = 0,
  extra,
  ...props
}) => {
  const IconComponent = icons[name];
  return (
    <Box
      style={{
        marginLeft: ml,
        display: "flex",
        flexDirection: "row",
        gap: 2,
      }}
    >
      <IconComponent
        height={props.size || 24}
        width={props.size || 24}
        strokeWidth={props.strokeWidth || 1.9}
        color={color}
        {...props}
      />
      <Text>{extra}</Text>
    </Box>
  );
};

export default Icon;
