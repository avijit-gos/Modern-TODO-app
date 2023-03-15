/** @format */

import React from "react";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Img,
} from "@chakra-ui/react";
import Layout from "../../Layout/Layout";
import { GlobalContext } from "../../Context/Context";
import { TbMessages } from "react-icons/tb";
import "./Message.css";
import axios from "axios";
import ChatImg from "../../Assests/Images/chat.svg";
import ChatCard from "../../Component/ChatCard/ChatCard";

const Chat = () => {
  const { setPageType, chats, setChats } = GlobalContext();

  React.useLayoutEffect(() => {
    setPageType("chat");
  }, []);

  // *** Fetch all user related chats
  const fetchChats = () => {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_LINK}chat`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setChats(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  React.useEffect(() => {
    fetchChats();
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

        {/* Rendering all chats  */}
        {(chats || []).length > 0 ? (
          <Box className='chat_card_section'>
            {chats.map((data) => (
              <ChatCard key={data._id} chatData={data} />
            ))}
          </Box>
        ) : (
          <Box className='empty_chat_list'>
            <span className='empty_chat_text'>No chat found</span>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default Chat;
