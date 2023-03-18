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
  Img,
  Input,
} from "@chakra-ui/react";
import { GlobalContext } from "../../../Context/Context";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router";
import { CgMoreO } from "react-icons/cg";
import ModalComp from "../../ModalComp/ModalComp";
import { AiOutlineClose } from "react-icons/ai";
import { BsCloudUpload } from "react-icons/bs";

const ChateHeader = () => {
  const navigate = useNavigate();
  const { selectChat } = GlobalContext();
  const [openImageModal, setOpenImageModal] = React.useState(false);
  const [isDisableImageBtn, setIsDisableImageBtn] = React.useState(true);
  const [isLoadingImageBtn, setIsLoadjingImageBtn] = React.useState(false);
  const [image, setImage] = React.useState("");
  const [prevImage, setPrevImage] = React.useState("");

  const backToPrevPage = () => {
    navigate(-1);
  };

  // *** Close modal
  const closeModal = () => {
    setOpenImageModal(false);
  };

  // *** Handle openImage modal
  const handleOpenImageModal = () => {
    setOpenImageModal(true);
  };

  // *** Handle change file input
  const handleFileChange = (e) => {
    setPrevImage(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  return (
    <Box className='header_navbar_container'>
      {/* Open image modal */}
      {openImageModal && (
        <ModalComp
          isOpen={openImageModal}
          onClose={closeModal}
          title='Upload group image'
          body={
            <Box className='modal_image_body'>
              {prevImage ? (
                <Box className='preview_image_box'>
                  <Img src={prevImage} className='modal_preview_image' />
                  <Button className='modal_prev_image_close_btn'>
                    <AiOutlineClose />
                  </Button>
                </Box>
              ) : (
                <Box className='modal_file'>
                  <label htmlFor='modal_file'>
                    <BsCloudUpload className='upload_modal' />
                    <Input
                      type='file'
                      className='file_input'
                      id='modal_file'
                      onChange={(e) => handleFileChange(e)}
                    />
                  </label>
                </Box>
              )}
            </Box>
          }
          footer={
            <Box className='modal_footer_section'>
              {isDisableImageBtn ? (
                <Button className='disable_modal_btn'></Button>
              ) : (
                <Button className='modal_btn'></Button>
              )}
            </Box>
          }
        />
      )}
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
              <MenuItem
                className='header_menu_item'
                onClick={handleOpenImageModal}>
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
