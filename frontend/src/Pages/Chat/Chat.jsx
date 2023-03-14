/** @format */

import React from "react";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import Layout from "../../Layout/Layout";
import { GlobalContext } from "../../Context/Context";
import { TbMessages } from "react-icons/tb";
import "./Message.css";

const Chat = () => {
  const { setPageType } = GlobalContext();

  React.useLayoutEffect(() => {
    setPageType("chat");
  }, []);
  return (
    <Layout title={"Message"}>
      <Box className='message_conatiner'>
        <Menu>
          <MenuButton as={Button} className='message_floating_btn'>
            <TbMessages className='message_floating_btn_icon' />
          </MenuButton>
          <MenuList>
            <MenuItem className='header_menu_item'>Create single chat</MenuItem>
            <MenuItem className='header_menu_item'>
              Create a group chat
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Layout>
  );
};

export default Chat;
