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
import { selectChatName } from "../../Utils/selectChatName";
import { useNavigate } from "react-router-dom";

const ChatCard = ({ chatData }) => {
  const navigate = useNavigate();

  return (
    <Box className='chat_card_container'>
      {chatData.isGroup ? (
        <Avatar
          src={chatData.image}
          className='chat_card_avatar'
          onClick={() => navigate(`/message/${chatData._id}`)}
        />
      ) : (
        <Avatar
          src={
            selectChatName(
              chatData.members,
              JSON.parse(localStorage.getItem("user"))._id
            ).profilePic
          }
          className='chat_card_avatar'
          onClick={() => navigate(`/message/${chatData._id}`)}
        />
      )}
      <Box className='chat_card_info_section'>
        <Box className='chat_card_info_box'>
          <Box
            className='card_chat_details'
            onClick={() => navigate(`/message/${chatData._id}`)}>
            {chatData.isGroup ? (
              <span className='chat_name'>{chatData.name}</span>
            ) : (
              <span className='chat_name'>
                {
                  selectChatName(
                    chatData.members,
                    JSON.parse(localStorage.getItem("user"))._id
                  ).name
                }
              </span>
            )}
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
                {JSON.parse(localStorage.getItem("user"))._id ===
                  chatData.admin && (
                  <MenuItem className='menu_item'>Settings</MenuItem>
                )}

                {JSON.parse(localStorage.getItem("user"))._id ===
                  chatData.admin && (
                  <MenuItem className='menu_item delete'>Delete</MenuItem>
                )}
              </MenuList>
            </Menu>
          )}
        </Box>
        <Box
          className='latest_msg_container'
          onClick={() => navigate(`/message/${chatData._id}`)}>
          {chatData.lastMsg ? chatData.lastMsg.content : ""}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatCard;
