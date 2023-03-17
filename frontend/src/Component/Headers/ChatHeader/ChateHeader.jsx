/** @format */

import React from "react";
import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { GlobalContext } from "../../../Context/Context";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router";
import { CgMoreO } from "react-icons/cg";

const ChateHeader = () => {
  const navigate = useNavigate();
  const { selectChat } = GlobalContext();

  const backToPrevPage = () => {
    navigate(-1);
  };

  return (
    <Box className='header_navbar_container'>
      <Box className='header_box'>
        <Button className='back_btn' onClick={backToPrevPage}>
          <IoArrowBack />
        </Button>
        {!selectChat.isGroup ? (
          <Box className='message_info_section'>Single</Box>
        ) : (
          <Box className='message_info_section'>
            <Avatar src={selectChat.image} className='message_header_avatar' />
            <span className='message_header_name'>{selectChat.name}</span>
          </Box>
        )}

        <Menu className='header_menu'>
          <MenuButton as={Button} className='header_men_btn'>
            <CgMoreO className='header_menu_icon' />
          </MenuButton>
          <MenuList>
            {selectChat.admin ===
              JSON.parse(localStorage.getItem("user"))._id && (
              <MenuItem className='header_menu_item'>
                Upload profile image
              </MenuItem>
            )}

            {selectChat.admin ===
              JSON.parse(localStorage.getItem("user"))._id && (
              <MenuItem className='header_menu_item'>Add new members</MenuItem>
            )}

            {selectChat.admin ===
              JSON.parse(localStorage.getItem("user"))._id && (
              <MenuItem className='header_menu_item'>Remove member</MenuItem>
            )}

            {selectChat.admin ===
              JSON.parse(localStorage.getItem("user"))._id && (
              <MenuItem className='header_menu_item'>Add mod</MenuItem>
            )}

            {selectChat.admin !==
              JSON.parse(localStorage.getItem("user"))._id && (
              <MenuItem className='header_menu_item delete'>
                Leave group
              </MenuItem>
            )}

            {selectChat.admin ===
              JSON.parse(localStorage.getItem("user"))._id && (
              <MenuItem className='header_menu_item delete'>
                Delete group
              </MenuItem>
            )}
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
};

export default ChateHeader;
