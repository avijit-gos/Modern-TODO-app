/** @format */

import React from "react";
import {
  Box,
  Avatar,
  Img,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import "./MessageCard.css";
import getTime from "../../Utils/getTime";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import axios from "axios";
import { AiOutlineMore } from "react-icons/ai";

const MessageCard = ({ data }) => {
  const [like, setLike] = React.useState(data.like);
  const [content, setContent] = React.useState(data.content || "");
  const [image, setImage] = React.useState(data.image || "");

  // *** Like message handle
  const handleLikeMessage = (id) => {
    if (!like.includes(JSON.parse(localStorage.getItem("user"))._id)) {
      setLike((prev) => [
        ...prev,
        JSON.parse(localStorage.getItem("user"))._id,
      ]);
    } else {
      const likeArr = like;
      const index = likeArr.indexOf(
        JSON.parse(localStorage.getItem("user"))._id
      );
      likeArr.splice(index, 1);
      setLike(likeArr);
    }
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_LINK}message/like/${id}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box className='message'>
      {data.sender._id === JSON.parse(localStorage.getItem("user"))._id ? (
        <Box className='my_main_message_card message_card'>
          <Box className='my_message_card'>
            {/* Message card body */}
            <Box className='my_message_card_body '>
              <Box className='my_message_content_section'>
                <Box className='my_message_content'>{content}</Box>
                {data.image && (
                  <Box className='message_image_section'>
                    <Img src={data.image} className='message_image' />
                  </Box>
                )}
              </Box>
              <Box className='message_card_time'>
                {getTime(new Date(), new Date(data.createdAt))}
              </Box>
            </Box>
          </Box>
          <Menu className='card_menu_btn'>
            <MenuButton>
              <AiOutlineMore />
            </MenuButton>
            <MenuList>
              <MenuItem className='card_menu_list'>Pin</MenuItem>
              <MenuItem className='card_menu_list'>Edit</MenuItem>
              <MenuItem className='card_menu_list delete'>Delete</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      ) : (
        <Box className='other_message_card message_card'>
          {/* Message card header */}
          <Avatar
            src={data.sender.profilePic}
            className='message_card_avatar'
          />

          {/* Message card body */}
          <Box className='message_card_body'>
            <Box className='message_content_section'>
              <Link
                to={`/profile/${data.sender._id}`}
                className='message_sender_name'>
                {data.sender.name}
              </Link>
              <Box className='message_content'>{content}</Box>
              {data.image && (
                <Box className='message_image_section'>
                  <Img src={image} className='message_image' />
                </Box>
              )}
            </Box>
            <Box className='other_message_card_time'>
              {getTime(new Date(), new Date(data.createdAt))}
            </Box>

            <Button
              className='message_like_btn'
              onClick={() => handleLikeMessage(data._id)}>
              {like.includes(JSON.parse(localStorage.getItem("user"))._id) ? (
                <AiFillHeart className='message_heart message_like_heart' />
              ) : (
                <AiOutlineHeart className='message_heart' />
              )}
              <span className='message_like_count'>{like.length}</span>
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MessageCard;
