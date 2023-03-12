/** @format */

import React from "react";
import {
  Box,
  Avatar,
  Button,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { GlobalContext, user } from "../../Context/Context";
import Layout from "../../Layout/Layout";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { BsCloudUpload } from "react-icons/bs";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import ModalComp from "../../Component/ModalComp/ModalComp";
import axios from "axios";
import "./Settings.css";
import InputComp from "../../Component/InputComp/InputComp";

const Settings = () => {
  const toast = useToast();
  const { setPageType, setUpdateProfile, updateProfile } = GlobalContext();
  const { id } = useParams();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [profileImg, setProfileImg] = React.useState("");
  const [profile, setProfile] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDisable, setIsDisable] = React.useState(true);
  const [openProfileModal, setOpenProfileModal] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState("");
  const [image, setImage] = React.useState("");

  // Account settings state
  const [openNameInput, setOpenNameInput] = React.useState(false);
  const [openEmailInput, setOpenEmailInput] = React.useState(false);
  const [openUsernameInput, setOpenUsernamInput] = React.useState(false);
  const [isLoading1, setIsLoading1] = React.useState(false);
  const [prevName, setPrevName] = React.useState("");
  const [prevEmail, setPrevEmail] = React.useState("");
  const [isDisableNameBtn, setIsDisableNameBtn] = React.useState(true);
  const [isDisableEmailBtn, setIsDisableEmailBtn] = React.useState(true);

  React.useLayoutEffect(() => {
    setPageType("settings");
  }, []);

  React.useEffect(() => {
    setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", localStorage.getItem("token"));
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_LINK}user/fetch/user/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setIsLoading(false);
        setProfile(result);
        setName(result.name);
        setPrevName(result.name);
        setPrevEmail(result.email);
        setEmail(result.email);
        setUsername(result.username);
        setProfileImg(result.profilePic);
      })
      .catch((error) => console.log("error", error));
  }, [id, updateProfile]);

  const onClose = () => {
    setOpenProfileModal(false);
  };

  // *** Handle image file change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

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

  // *** Handle name change
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // *** Handle username change
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // *** Handle email change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // *** Update account information
  const handleUpdateAccountInfo = () => {
    setIsLoading1(true);
  };

  React.useEffect(() => {
    if (!name.trim()) {
      setIsDisableNameBtn(true);
    } else {
      if (name.trim() === prevName.trim()) {
        setIsDisableNameBtn(true);
      } else {
        setIsDisableNameBtn(false);
      }
    }
  }, [name]);

  React.useEffect(() => {
    if (!email.trim()) {
      setIsDisableEmailBtn(true);
    } else {
      if (email.trim() === prevEmail.trim()) {
        setIsDisableEmailBtn(true);
      } else {
        setIsDisableEmailBtn(false);
      }
    }
  }, [email]);

  const handleCloseNameSettings = () => {
    setName(profile.name);
    setOpenNameInput(false);
    setEmail(profile.email);
    setOpenEmailInput(false);
    setOpenUsernamInput(false);
  };

  // *** Handle update name
  const handleUpdateName = () => {
    setIsLoading1(true);
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", localStorage.getItem("token"));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: name,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_LINK}user/update/profile/name`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setOpenNameInput(false);
        toast({
          title: "Success",
          description: `${result.msg}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setUpdateProfile(result.user);
      })
      .catch((error) => console.log("error", error));
  };

  // *** Handle update email
  const handleUpdateEmail = () => {
    setIsLoading1(true);
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", localStorage.getItem("token"));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: email,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_LINK}user/update/profile/email`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setOpenEmailInput(false);
        toast({
          title: "Success",
          description: `${result.msg}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setUpdateProfile(result.user);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <Layout title='Settings'>
      {!isLoading ? (
        <Box className='settings_container'>
          {profile ? (
            <React.Fragment>
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
                          <Avatar
                            src={previewImage}
                            className='preview_image_avatar'
                          />
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
                          isDisable
                            ? "upload_btn disable_upload_btn"
                            : "upload_btn"
                        }
                        onClick={handleUploadImage}>
                        {isLoading ? <Spinner /> : <>Upload</>}
                      </Button>
                    )
                  }
                />
              )}

              {/* Image settings */}
              <Box className='image_container'>
                <Avatar src={profileImg} className='profile_avatar' />
                <Button
                  className='image_upload_btn'
                  onClick={() => setOpenProfileModal(true)}>
                  <MdOutlineAddAPhoto className='camera_add_icon' />
                </Button>
              </Box>

              {/* Account Settings */}
              <Box className='account_settings_section'>
                {/* Name */}
                {openNameInput ? (
                  <Box className='settings_name_section'>
                    <InputComp
                      type='text'
                      placaeholder='Enter profile name'
                      className='auth_input'
                      value={name}
                      handleChange={handleNameChange}
                    />
                    {!isDisableNameBtn && (
                      <Button className='update_btn' onClick={handleUpdateName}>
                        Update
                      </Button>
                    )}
                    <Button
                      className='update_btn cancel_btn'
                      onClick={() => handleCloseNameSettings()}>
                      Cancel
                    </Button>
                  </Box>
                ) : (
                  <Box className='settings_name_section'>
                    <span className='settings_sub_header'>Profile name: </span>
                    <span className='settings_profile'>{name}</span>
                    <Button
                      className='setting_edit_btn'
                      onClick={() => setOpenNameInput((prev) => !prev)}>
                      <AiOutlineEdit className='settings_edit_icon' />
                    </Button>
                  </Box>
                )}

                {/* Email */}
                {openEmailInput ? (
                  <Box className='settings_name_section'>
                    <InputComp
                      type='email'
                      placaeholder='Enter profile email'
                      className='auth_input'
                      value={email}
                      handleChange={handleEmailChange}
                    />
                    {!isDisableEmailBtn && (
                      <Button
                        className='update_btn'
                        onClick={handleUpdateEmail}>
                        Update
                      </Button>
                    )}
                    <Button
                      className='update_btn cancel_btn'
                      onClick={() => handleCloseNameSettings()}>
                      Cancel
                    </Button>
                  </Box>
                ) : (
                  <Box className='settings_name_section'>
                    <span className='settings_sub_header'>Profile email: </span>
                    <span className='settings_profile'>{email}</span>
                    <Button
                      className='setting_edit_btn'
                      onClick={() => setOpenEmailInput((prev) => !prev)}>
                      <AiOutlineEdit className='settings_edit_icon' />
                    </Button>
                  </Box>
                )}

                {/* User */}
                {openUsernameInput ? (
                  <Box className='settings_name_section'>
                    <InputComp
                      type='text'
                      placaeholder='Enter profile username'
                      className='auth_input'
                      value={username}
                      handleChange={handleUsernameChange}
                    />
                    {!isDisableEmailBtn && (
                      <Button
                        className='update_btn'
                        onClick={handleUpdateEmail}>
                        Update
                      </Button>
                    )}
                    <Button
                      className='update_btn cancel_btn'
                      onClick={() => handleCloseNameSettings()}>
                      Cancel
                    </Button>
                  </Box>
                ) : (
                  <Box className='settings_name_section'>
                    <span className='settings_sub_header'>
                      Profile username:{" "}
                    </span>
                    <span className='settings_profile'>{username}</span>
                    <Button
                      className='setting_edit_btn'
                      onClick={() => setOpenUsernamInput((prev) => !prev)}>
                      <AiOutlineEdit className='settings_edit_icon' />
                    </Button>
                  </Box>
                )}
              </Box>
            </React.Fragment>
          ) : (
            <Box className='empty_task_container'>No user avaliable</Box>
          )}
        </Box>
      ) : (
        <>Loading</>
      )}
    </Layout>
  );
};

export default Settings;
