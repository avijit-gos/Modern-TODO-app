/** @format */

import React from "react";
import {
  Box,
  Input,
  Button,
  Img,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import InputComp from "../../Component/InputComp/InputComp";
import { BsEmojiSmile } from "react-icons/bs";
import {
  AiOutlineFileImage,
  AiOutlineClose,
  AiOutlinePaperClip,
} from "react-icons/ai";
import { GrSend } from "react-icons/gr";
import { FiMoreVertical } from "react-icons/fi";

const MessageFooter = () => {
  const [isFocus, setIsFocus] = React.useState(false);
  const [image, setImage] = React.useState("");
  const [prevImage, setPrevImage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDisable, setIsDisable] = React.useState(true);

  // *** Handle image file change
  const handleImageChange = (e) => {
    setPrevImage(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  // *** Handle close image
  const closeImage = () => {
    setPrevImage("");
    setImage("");
  };

  return (
    <Box className='message_footer_box'>
      {prevImage && (
        <Box className='msg_preview_image_section'>
          <Img src={prevImage} className='msg_preview_image' />
          <Button className='msg_prev_image_close_btn' onClick={closeImage}>
            <AiOutlineClose />
          </Button>
        </Box>
      )}
      {isFocus ? (
        <Box className='input_group'>
          <InputComp
            type='text'
            placeholder='Message...'
            className='message_input'
          />
          {/* Emoji */}
          <Button className='emoji_btn'>
            <BsEmojiSmile className='message_footer_icon' />
          </Button>

          {/* file */}
          <label htmlFor='msg_file' className='file_input_container'>
            <AiOutlinePaperClip className='message_footer_icon' />
            <Input
              type='file'
              className='file_input'
              id='msg_file'
              onChange={(e) => handleImageChange(e)}
              accept='application/pdf,application/vnd.ms-excel'
            />
          </label>

          {/* Image */}
          <label htmlFor='msg_img' className='file_input_container'>
            <AiOutlineFileImage className='message_footer_icon' />
            <Input
              type='file'
              className='file_input'
              id='msg_img'
              onChange={(e) => handleImageChange(e)}
              accept='image/png, image/gif, image/jpeg'
            />
          </label>

          {/* Menu button will visible smalll screen */}
          <Menu className='msg_footer_menu'>
            <MenuButton as={Button} className='emoji_btn msg_footer_menu_btn'>
              <FiMoreVertical className='message_footer_icon' />
            </MenuButton>
            <MenuList>
              <MenuItem htmlFor='msg_img'>
                Image
                {/* <label className='file_input_container'>
                  <AiOutlineFileImage className='message_footer_icon' /> */}
                <Input
                  type='file'
                  className='file_input'
                  id='msg_img'
                  onChange={(e) => handleImageChange(e)}
                />
                {/* </label> */}
              </MenuItem>
              <MenuItem>File</MenuItem>
            </MenuList>
          </Menu>

          {/* send button */}
          <Button className='emoji_btn send_btn'>
            <GrSend className='message_footer_send_icon' />
          </Button>
        </Box>
      ) : (
        <Input
          type='text'
          placeholder='Message...'
          className='message_input'
          onFocus={() => setIsFocus(true)}
        />
      )}
    </Box>
  );
};

export default MessageFooter;
