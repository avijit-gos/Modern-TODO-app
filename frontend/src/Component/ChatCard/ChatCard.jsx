/** @format */

import {
  Avatar,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { FiMoreVertical } from "react-icons/fi";

const ChatCard = ({ chatData }) => {
  console.log(chatData);
  return (
    <Box className='chat_card_container'>
      <Avatar src={chatData.image} className='chat_card_avatar' />
      <Box className='chat_card_info_section'>
        <Box className='chat_card_info_box'>
          <Box className='card_chat_details'>
            <span className='chat_name'>{chatData.name}</span>
            {chatData.admin === JSON.parse(localStorage.getItem("user"))._id ? (
              <span className='chat_card_admin_tag'>Admin</span>
            ) : null}
          </Box>

          {chatData.isGroup && (
            <Menu>
              <MenuButton>
                <FiMoreVertical />
              </MenuButton>
              <MenuList>
                <MenuItem className='menu_item'>Bookmark</MenuItem>
                <MenuItem className='menu_item'>Settings</MenuItem>
                <MenuItem className='menu_item delete'>Delete</MenuItem>
              </MenuList>
            </Menu>
          )}
        </Box>
        <Box className='latest_msg_container'>Latest message</Box>
      </Box>
    </Box>
  );
};

export default ChatCard;
