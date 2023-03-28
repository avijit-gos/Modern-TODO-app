/** @format */

import React from "react";
import { Box, Avatar, Img } from "@chakra-ui/react";
import "./MessageCard.css";
import { selectChatName } from "../../Utils/selectChatName";
import getTime from "../../Utils/getTime";
import { Link } from "react-router-dom";

const MessageCard = ({ data }) => {
  return (
    <React.Fragment>
      {data.sender._id === JSON.parse(localStorage.getItem("user"))._id ? (
        <Box className='my_main_message_card'>
          <Box className='my_message_card'>
            {/* Message card body */}
            <Box className='my_message_card_body '>
              <Box className='my_message_content_section'>
                <Box className='my_message_content'>
                  {data.content || data.content}
                </Box>
                {data.image && (
                  <Box className='my_message_image_section'>
                    <Img src={data.image} className='my_message_image' />
                  </Box>
                )}
              </Box>
              <Box className='message_card_time'>
                {getTime(new Date(), new Date(data.createdAt))}
              </Box>
            </Box>
          </Box>
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
              <Box className='message_content'>{data.content}</Box>
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
      )}
    </React.Fragment>
  );
};

export default MessageCard;
