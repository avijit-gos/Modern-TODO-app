/** @format */

import React from "react";
import { Avatar, Box, Button } from "@chakra-ui/react";
import { FaUserCog } from "react-icons/fa";
import { FiUserMinus, FiUserCheck } from "react-icons/fi";
import "./UserCard.css";
import { GlobalContext } from "../../Context/Context";

const ChatUserList = ({
  userData,
  handleCreateSingleMessage,
  removeMember,
  onlyUser,
  mod,
}) => {
  const { selectChat } = GlobalContext();
  return (
    <React.Fragment>
      {onlyUser ? (
        <Box className={"user_card"}>
          <Box
            className='user_info_section'
            onClick={() => handleCreateSingleMessage(userData._id, userData)}>
            <Avatar src={userData.profilePic} className='user_card_avatar' />
            <p className='user_card_name'>{userData.name}</p>
            <span className='user_card_username'>@{userData.username}</span>
          </Box>
        </Box>
      ) : (
        <Box
          className={
            userData.group.includes(selectChat._id)
              ? "user_card group_members"
              : "user_card"
          }>
          {userData.group.includes(selectChat._id) ? (
            <Box className='member_user'>
              <Box className='user_info_section'>
                <Avatar
                  src={userData.profilePic}
                  className='user_card_avatar'
                />
                <p className='user_card_name'>{userData.name}</p>
                <span className='user_card_username'>@{userData.username}</span>
                {userData._id === selectChat.admin && (
                  <span className='admin'>Admin</span>
                )}
                {selectChat.mods.includes(userData._id) && (
                  <span className='admin'>Mod</span>
                )}
              </Box>
              {removeMember && (
                <>
                  {selectChat.admin !== userData._id && (
                    <Button
                      className='remove_user_btn'
                      onClick={() => handleCreateSingleMessage(userData._id)}>
                      <FiUserMinus />
                    </Button>
                  )}
                </>
              )}

              {mod && (
                <>
                  {selectChat.admin !== userData._id && (
                    <Button
                      className='remove_user_btn'
                      onClick={() => handleCreateSingleMessage(userData._id)}>
                      {selectChat.mods.includes(userData._id) ? (
                        <FaUserCog className='mod_icon' />
                      ) : (
                        <FiUserCheck className='mod_icon' />
                      )}
                    </Button>
                  )}
                </>
              )}
            </Box>
          ) : (
            <Box
              className='user_info_section'
              onClick={() => handleCreateSingleMessage(userData._id, userData)}>
              <Avatar src={userData.profilePic} className='user_card_avatar' />
              <p className='user_card_name'>{userData.name}</p>
              <span className='user_card_username'>@{userData.username}</span>
            </Box>
          )}
        </Box>
      )}
    </React.Fragment>
  );
};

export default ChatUserList;
