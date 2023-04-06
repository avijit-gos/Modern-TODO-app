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
import EmojiPicker from "emoji-picker-react";
import { GlobalContext } from "../../Context/Context";
import { useParams } from "react-router";
import { socket } from "../../App";

const MessageFooter = () => {
  const { id } = useParams();
  const { setMessages } = GlobalContext();
  const [isFocus, setIsFocus] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [prevImage, setPrevImage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDisable, setIsDisable] = React.useState(true);
  const [openEmoji, setOpenEmoji] = React.useState(false);
  const [text, setText] = React.useState("");
  const [openMenu, setOpenMenu] = React.useState(false);

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

  const onEmojiClick = (event, emojiObject) => {
    setText((prev) => prev + event.emoji);
  };

  const mobileMenuRef = React.useRef();

  const closeOpenMenus = React.useCallback(
    (e) => {
      if (
        mobileMenuRef.current &&
        openMenu &&
        !mobileMenuRef.current.contains(e.target)
      ) {
        setOpenMenu(false);
        setOpenEmoji(false);
      }
    },
    [openMenu]
  );

  React.useEffect(() => {
    document.addEventListener("mousedown", closeOpenMenus);
  }, [closeOpenMenus]);

  React.useEffect(() => {
    if (text.trim()) {
      setIsDisable(false);
    } else {
      if (image) {
        setIsDisable(false);
      } else {
        setIsDisable(true);
      }
    }
  }, [text, image]);

  // *** Handle submit message
  const handleSubmitMessage = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", localStorage.getItem("token"));

    var formdata = new FormData();
    formdata.append("content", text);
    formdata.append("image", image);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_LINK}message/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setText("");
        setImage("");
        setPrevImage("");
        setIsDisable(true);
        socket.emit("new message", result);
        setMessages((prev) => [...prev, result]);
      })
      .catch((error) => console.log("error", error));
  };

  const changeInput = (e) => {
    setText(e.target.value);
    socket.emit("typing", {
      user: JSON.parse(localStorage.getItem("user")).name,
      type: true,
    });
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

      {/* Emoji */}
      {openEmoji && (
        <Box className='emoji_container'>
          <EmojiPicker
            height={400}
            width={400}
            onEmojiClick={onEmojiClick}
            // disableAutoFocus={true}
            ref={mobileMenuRef}
          />
        </Box>
      )}

      {openMenu && (
        <Box className='msg_footer_menu' ref={mobileMenuRef}>
          <Box className='msg_menu_item'>
            <label htmlFor='msg_img' className='file_input_container'>
              Image
              <Input
                type='file'
                className='file_input'
                id='msg_img'
                onChange={(e) => handleImageChange(e)}
                accept='image/png, image/gif, image/jpeg'
              />
            </label>
          </Box>
          <Box className='msg_menu_item'>
            <label htmlFor='msg_file' className='file_input_container'>
              File
              <Input
                type='file'
                className='file_input'
                id='msg_file'
                onChange={(e) => handleImageChange(e)}
                accept='application/pdf,application/vnd.ms-excel'
              />
            </label>
          </Box>
        </Box>
      )}

      {isFocus ? (
        <Box className='input_group'>
          <Box className='msg_form'>
            <InputComp
              type='text'
              placeholder='Message...'
              className='message_input'
              value={text}
              handleChange={(e) => changeInput(e)}
            />
          </Box>
          {/* Emoji */}
          <Button
            className='emoji_btn'
            onClick={() => setOpenEmoji((prev) => !prev)}>
            <BsEmojiSmile className='message_footer_icon' />
          </Button>

          <Box className='input_file_sections'>
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
          </Box>

          <button className='msg_menu_btn' onClick={() => setOpenMenu(true)}>
            <FiMoreVertical />
          </button>

          {/* Menu button will visible smalll screen */}

          {/* send button */}
          {isDisable ? null : (
            <Button
              className='emoji_btn send_btn'
              onClick={handleSubmitMessage}>
              <GrSend className='message_footer_send_icon' />
            </Button>
          )}
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
