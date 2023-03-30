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
  Input,
} from "@chakra-ui/react";
import "./MessageCard.css";
import getTime from "../../Utils/getTime";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import axios from "axios";
import { AiOutlineMore } from "react-icons/ai";
import ModalComp from "../ModalComp/ModalComp";
import TextareaComp from "../InputComp/TextareaComp";
import { AiOutlineClose } from "react-icons/ai";
import { BsCloudUpload } from "react-icons/bs";
import { GlobalContext } from "../../Context/Context";

const MessageCard = ({ data }) => {
  const { setMessages, messages } = GlobalContext();
  const [like, setLike] = React.useState(data.like);
  const [content, setContent] = React.useState(data.content || "");
  const [image, setImage] = React.useState(data.image || "");
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [updateImage, setUpdateImage] = React.useState("");
  const [updatePreviewImage, setUpdatePreviewImage] = React.useState("");
  const [isDisable, setIsDiable] = React.useState(true);
  const [msgId, setMsgId] = React.useState("");

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

  const onClose = () => {
    setOpenEditModal(false);
    setOpenDeleteModal(false);
    setContent(data.content);
    setImage(data.image);
  };

  // *** Handle image change
  const handleImageChange = (e) => {
    setUpdateImage(e.target.files[0]);
    setUpdatePreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  React.useEffect(() => {
    if (content.trim()) {
      setIsDiable(false);
    } else {
      if (!updateImage) {
        setIsDiable(true);
      } else {
        setIsDiable(false);
      }
    }
  }, [content, updateImage, updatePreviewImage]);

  // *** Handle Delete message
  const handleDeleteMessage = (id) => {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_LINK}message/${id}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data.data._id);
        const arr = messages;
        const result = arr.filter(
          (data) => data._id !== response.data.data._id
        );
        console.log("After filter:", result.length);
        setMessages(result);
        setOpenDeleteModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditModal = (id) => {
    setOpenEditModal(true);
    setMsgId(id);
  };

  // *** Handle update message
  const handleUpdateMessage = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", localStorage.getItem("token"));

    var formdata = new FormData();
    formdata.append("content", content);
    formdata.append("image", updateImage);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_LINK}message/${msgId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setImage(updatePreviewImage);
        setOpenEditModal(false);
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <Box className='message'>
      {/* Message edit modal */}
      {openEditModal && (
        <ModalComp
          isOpen={openEditModal}
          onClose={onClose}
          title='Update message'
          body={
            <Box className='modal_message_edit_body'>
              <Box className='message_edit_form'>
                <TextareaComp
                  placeholder='Update message content'
                  className='textarea_input'
                  value={content}
                  handleChange={(e) => setContent(e.target.value)}
                />
              </Box>

              {image ? (
                <Box className='message_image_container'>
                  <Img src={image} className='modal_image' />
                  <Button
                    className='modal_image_close_btn'
                    onClick={() => setImage("")}>
                    <AiOutlineClose />
                  </Button>
                </Box>
              ) : (
                <Box className='msg_image_upload'>
                  {updatePreviewImage ? (
                    <Box className='message_image_container'>
                      <Img src={updatePreviewImage} className='modal_image' />
                      <Button
                        className='modal_image_close_btn'
                        onClick={() => setUpdatePreviewImage("")}>
                        <AiOutlineClose />
                      </Button>
                    </Box>
                  ) : (
                    <Box className='msg_label_input'>
                      <label htmlFor='msg_image'>
                        <BsCloudUpload className='msg_image_upload_icon' />
                      </label>
                      <Input
                        type='file'
                        className='file_input'
                        id='msg_image'
                        onChange={(e) => handleImageChange(e)}
                      />
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          }
          footer={
            <Box className=''>
              {!isDisable && (
                <Button
                  className='modal_footer_btn'
                  onClick={handleUpdateMessage}>
                  Update
                </Button>
              )}
            </Box>
          }
        />
      )}

      {openDeleteModal && (
        <ModalComp
          isOpen={openDeleteModal}
          onClose={onClose}
          title='Delete message'
          body='Do you want to delete this message?'
          footer={
            <Button
              className='delete_btn'
              onClick={() => handleDeleteMessage(data._id)}>
              Delete
            </Button>
          }
        />
      )}
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
              {/* <MenuItem className='card_menu_list'>Pin</MenuItem> */}
              <MenuItem
                className='card_menu_list'
                onClick={() => handleEditModal(data._id)}>
                Edit
              </MenuItem>
              <MenuItem
                className='card_menu_list delete'
                onClick={() => setOpenDeleteModal(true)}>
                Delete
              </MenuItem>
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
