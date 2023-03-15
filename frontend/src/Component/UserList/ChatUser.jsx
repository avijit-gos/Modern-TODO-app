/** @format */

import React from "react";
import { Avatar, Box, Button } from "@chakra-ui/react";
import { BiUserCheck, BiUserPlus } from "react-icons/bi";
import { MdMarkEmailRead } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import "./UserCard.css";

const ChatUserList = ({ userData, members, setMembers, setMembersId }) => {
  // *** Handle create a single message
  const handleCreateSingleMessage = (id, data) => {
    const arr = members;
    if (!arr.includes(id)) {
      setMembers((prev) => [...prev, data]);
      setMembersId((prev) => [...prev, data._id]);
    }
  };

  return (
    <Box className='user_card'>
      <Box
        className='user_info_section'
        onClick={() => handleCreateSingleMessage(userData._id, userData)}>
        <Avatar src={userData.profilePic} className='user_card_avatar' />
        <p className='user_card_name'>{userData.name}</p>
        <span className='user_card_username'>@{userData.username}</span>
      </Box>
    </Box>
  );
};

export default ChatUserList;
