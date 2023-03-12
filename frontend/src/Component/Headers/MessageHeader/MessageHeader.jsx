/** @format */

import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { IoArrowBack } from "react-icons/io5";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CgMoreO } from "react-icons/cg";

const MessageHeader = ({ title }) => {
  const navigate = useNavigate();

  const backToPrevPage = () => {
    navigate(-1);
  };

  return (
    <Box className='header_navbar_container'>
      <Box className='header_box'>
        <Button className='back_btn'>
          <IoArrowBack />
        </Button>
        <span className='header_title'>{title}</span>
      </Box>

      <Menu className='header_menu'>
        <MenuButton as={Button} className='header_men_btn'>
          <CgMoreO className='header_menu_icon' />
        </MenuButton>
        <MenuList>
          <MenuItem className='header_menu_item'>Create single chat</MenuItem>
          <MenuItem className='header_menu_item'>Create a group chat</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default MessageHeader;
