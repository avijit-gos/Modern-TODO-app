/** @format */

import React from "react";
import {
  Button,
  Box,
  Avatar,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import ModalComp from "../ModalComp/ModalComp";
import { BsCloudUpload } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { GlobalContext } from "../../Context/Context";
import { BiUserCheck, BiUserPlus } from "react-icons/bi";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProfileImageSection = ({ profileData }) => {
  const toast = useToast();
  const { id } = useParams();
  const { setUpdateProfile } = GlobalContext();
  const [openProfileModal, setOpenProfileModal] = React.useState(false);
  const [image, setImage] = React.useState("");
  const [previewImage, setPreviewImage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDisable, setIsDisable] = React.useState(true);
  const [followed, setFollowed] = React.useState(
    profileData.flw
      ? profileData.flwr.includes(JSON.parse(localStorage.getItem("user"))._id)
        ? true
        : false
      : false
  );

  // **** Profile image upload modal close event
  const onClose = () => {
    setOpenProfileModal(false);
    setPreviewImage("");
    setImage("");
  };

  // *** Handle image file change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  React.useEffect(() => {
    if (!image) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [image]);

  // *** Close preview image event handler
  const closePreviewImage = () => {
    setImage("");
    setPreviewImage("");
  };

  // *** Event for Uploading Profile Image
  const handleUploadImage = () => {
    setIsDisable(true);
    setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", localStorage.getItem("token"));

    var formdata = new FormData();
    formdata.append("image", image);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    fetch(
      `${process.env.REACT_APP_LINK}user/update/profile/image`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setUpdateProfile(result);
        console.log(result);
        setIsLoading(false);
        setIsDisable(true);
        setImage("");
        setPreviewImage("");
        setOpenProfileModal(false);
        toast({
          title: "Success",
          description: `${result.msg}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => {
        setIsLoading(false);
        setIsDisable(true);
        setImage("");
        setPreviewImage("");
        setOpenProfileModal(false);
      });
  };

  const handleFollowUser = (id) => {
    console.log(id);
    var config = {
      method: "put",
      url: `${process.env.REACT_APP_LINK}user/follow/${id}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios(config)
      .then(function (response) {
        setFollowed((p) => !p);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Box className='profile_image_section'>
      {/* Profile image upload modal */}
      {openProfileModal && (
        <ModalComp
          isOpen={openProfileModal}
          onClose={onClose}
          title='Upload profile picture'
          body={
            <React.Fragment>
              {!previewImage.trim() ? (
                <Box className='profile_modal_body'>
                  <label htmlFor='profile_file'>
                    <BsCloudUpload className='upload_icon' />
                  </label>
                  <Input
                    type='file'
                    id='profile_file'
                    className='file_input'
                    onChange={(e) => handleImageChange(e)}
                  />
                </Box>
              ) : (
                <Box className='profile_modal_body'>
                  <Avatar src={previewImage} className='preview_image_avatar' />
                  <Button
                    className='image_close_btn'
                    onClick={closePreviewImage}>
                    <AiOutlineClose className='close_icon' />
                  </Button>
                </Box>
              )}
            </React.Fragment>
          }
          footer={
            previewImage.trim() && (
              <Button
                disabled={isDisable}
                className={
                  isDisable ? "upload_btn disable_upload_btn" : "upload_btn"
                }
                onClick={handleUploadImage}>
                {isLoading ? <Spinner /> : <>Upload</>}
              </Button>
            )
          }
        />
      )}
      {/* Avatar section */}
      <Box className='image_container'>
        <Avatar src={profileData.profilePic} className='profile_avatar' />
        {JSON.parse(localStorage.getItem("user"))._id === profileData._id && (
          <Button
            className='image_upload_btn'
            onClick={() => setOpenProfileModal(true)}>
            <MdOutlineAddAPhoto className='camera_add_icon' />
          </Button>
        )}
      </Box>

      {/* Profile info section */}
      <Box className='profile_info_section'>
        {/* Name */}
        <Box className='profile_main_box'>
          <Box className='profile_name_container'>
            {profileData.name ? (
              <span className='name'>{profileData.name}</span>
            ) : (
              <span className='name'>Anonymous User</span>
            )}
            <span className='username'>@{profileData.username}</span>
          </Box>
          {id === JSON.parse(localStorage.getItem("user"))._id ? (
            <Button className='edit_btn'>
              <AiOutlineEdit />
            </Button>
          ) : (
            <Button
              className='edit_btn'
              onClick={() => handleFollowUser(profileData._id)}>
              {followed ? <BiUserCheck className='flwed' /> : <BiUserPlus />}
            </Button>
          )}
        </Box>

        {/* Email */}
        <Box className='email_container'>
          <span>
            <HiOutlineMail className='email_icons' />
          </span>
          <span className='email'>{profileData.email}</span>
        </Box>

        {/* follwer-following */}
        <Box className='email_container'>
          <Button className='followers_btn'>
            <span className='flwr_text'>Follower: </span>
            <span className='flwr_count'>{profileData.flwr.length || "0"}</span>
          </Button>

          <Button className='followers_btn'>
            <span className='flwr_text'>Following: </span>
            <span className='flwr_count'>{profileData.flw.length || "0"}</span>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileImageSection;
