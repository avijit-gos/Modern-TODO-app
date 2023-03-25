/** @format */

import React from "react";
import {
  Box,
  Avatar,
  Button,
  useToast,
  Spinner,
  Input,
} from "@chakra-ui/react";
import { MdOutlineAddAPhoto, MdOutlineAlternateEmail } from "react-icons/md";
import { BsCloudUpload } from "react-icons/bs";
import ModalComp from "../ModalComp/ModalComp";
import { AiOutlineClose, AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { RiEditLine } from "react-icons/ri";
import InputComp from "../InputComp/InputComp";

const ProfileSettings = ({ profile }) => {
  const toast = useToast();
  const [image, setImage] = React.useState("");
  const [prevImage, setPrevImage] = React.useState("");
  const [profileImage, setProfileImage] = React.useState(
    profile.profilePic || ""
  );
  const [openProfileModal, setOpenProfileModal] = React.useState(false);
  const [isDisable, setIsDisable] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  // **** Profile name state
  const [name, setName] = React.useState(profile.name);
  const [openProfileNameModal, setOpenProfileNameModal] = React.useState(false);
  const [profileName, setProfileName] = React.useState(profile.name);
  const [disableNameBtn, setDisableNameBtn] = React.useState(true);

  // *** Profile username state
  const [username, setUsrername] = React.useState(profile.username);
  const [profileUsername, setProfileUsername] = React.useState(
    profile.username
  );
  const [disableUsernameBtn, setDisableUsernameBtn] = React.useState(true);
  const [openProfileUsernameModal, setOpenProfileUsernameModal] =
    React.useState(false);

  // *** Profile email state
  const [email, setEmail] = React.useState(profile.email);
  const [profileEmail, setProfileEmail] = React.useState(profile.email);
  const [disableEmailBtn, setDisableEmailBtn] = React.useState(true);
  const [openProfileEmailModal, setOpenProfileEmailModal] =
    React.useState(false);

  // **** Profile image upload modal close event
  const onClose = () => {
    setOpenProfileModal(false);
    setPrevImage("");
    setImage("");
    setOpenProfileNameModal(false);
    setName(profileName);
    setOpenProfileUsernameModal(false);
    setUsrername(profileUsername);
    setOpenProfileEmailModal(false);
    setEmail(profileEmail);
  };

  // *** Handle image file change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setPrevImage(URL.createObjectURL(e.target.files[0]));
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
    setPrevImage("");
  };

  // *** Event for Uploading Profile Image
  const handleUploadImage = () => {
    setIsDisable(true);
    setIsLoading(true);
    setProfileImage(prevImage);
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
        setIsLoading(false);
        setIsDisable(true);
        setImage("");
        setPrevImage("");
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
        setPrevImage("");
        setOpenProfileModal(false);
      });
  };

  React.useEffect(() => {
    if (!name.trim()) {
      setDisableNameBtn(true);
    } else {
      setDisableNameBtn(false);
    }
  }, [name]);

  // *** Handle update name
  const handleUpdateName = () => {
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
        toast({
          title: "Success",
          description: `Profile name has been updated`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setOpenProfileNameModal(false);
        setProfileName(name);
        setDisableNameBtn(false);
      })
      .catch((error) => console.log("error", error));
  };

  React.useEffect(() => {
    if (!username.trim()) {
      setDisableUsernameBtn(true);
    } else {
      setDisableUsernameBtn(false);
    }
  }, [username]);

  // *** Handle update name
  const handleUpdateUsername = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", localStorage.getItem("token"));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: username,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_LINK}user/update/profile/username`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setProfileUsername(username);
        toast({
          title: "Success",
          description: `Profile username has been updated`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setOpenProfileUsernameModal(false);
        setDisableUsernameBtn(false);
      })
      .catch((error) => console.log("error", error));
  };

  React.useEffect(() => {
    if (!email.trim()) {
      setDisableEmailBtn(true);
    } else {
      setDisableEmailBtn(false);
    }
  }, [email]);

  // *** Handle update name
  const handleUpdateEmail = () => {
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
        setProfileEmail(email);
        toast({
          title: "Success",
          description: `Profile email has been updated`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setOpenProfileEmailModal(false);
        setDisableEmailBtn(false);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <Box className='sub_settings_section'>
      {/* Profile image upload modal */}
      {openProfileModal && (
        <ModalComp
          isOpen={openProfileModal}
          onClose={onClose}
          title='Upload profile picture'
          body={
            <React.Fragment>
              {!prevImage.trim() ? (
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
                  <Avatar src={prevImage} className='preview_image_avatar' />
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
            prevImage.trim() && (
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

      {/* Profile name modal */}
      {openProfileNameModal && (
        <ModalComp
          isOpen={openProfileNameModal}
          onClose={onClose}
          title='Update name'
          body={
            <Box className=''>
              <InputComp
                type='text'
                placaeholder='Update profile name'
                className='auth_input'
                value={name}
                handleChange={(e) => setName(e.target.value)}
              />
            </Box>
          }
          footer={
            !disableNameBtn && (
              <Button
                disabled={disableNameBtn}
                className={
                  disableNameBtn
                    ? "upload_btn disable_upload_btn"
                    : "upload_btn"
                }
                onClick={handleUpdateName}>
                Update
              </Button>
            )
          }
        />
      )}

      {/* Profile username modal */}
      {openProfileUsernameModal && (
        <ModalComp
          isOpen={openProfileUsernameModal}
          onClose={onClose}
          title='Update username'
          body={
            <Box className=''>
              <InputComp
                type='text'
                placaeholder='Update profile username'
                className='auth_input'
                value={username}
                handleChange={(e) => setUsrername(e.target.value)}
              />
            </Box>
          }
          footer={
            !disableUsernameBtn && (
              <Button
                disabled={disableUsernameBtn}
                className={
                  disableUsernameBtn
                    ? "upload_btn disable_upload_btn"
                    : "upload_btn"
                }
                onClick={handleUpdateUsername}>
                Update
              </Button>
            )
          }
        />
      )}

      {/* Profile username modal */}
      {openProfileEmailModal && (
        <ModalComp
          isOpen={openProfileEmailModal}
          onClose={onClose}
          title='Update username'
          body={
            <Box className=''>
              <InputComp
                type='email'
                placaeholder='Update profile email'
                className='auth_input'
                value={email}
                handleChange={(e) => setEmail(e.target.value)}
              />
            </Box>
          }
          footer={
            !disableEmailBtn && (
              <Button
                disabled={disableEmailBtn}
                className={
                  disableEmailBtn
                    ? "upload_btn disable_upload_btn"
                    : "upload_btn"
                }
                onClick={handleUpdateEmail}>
                Update
              </Button>
            )
          }
        />
      )}
      <Box className='profile_avatar'>
        <Avatar src={profileImage} className='settings_profile_avatar' />
        <Button
          className='upload_modal_btn'
          onClick={() => setOpenProfileModal(true)}>
          <MdOutlineAddAPhoto />
        </Button>
      </Box>

      {/* Profile basic info */}
      <ol className='list'>
        {/* Name */}
        <li className='list_item'>
          <Box className='list_text'>
            <span className='list_icon'>
              <AiOutlineUser />
            </span>
            <span className='profile_list_info'>{profileName}</span>
          </Box>
          <Button
            className='list_btn'
            onClick={() => setOpenProfileNameModal(true)}>
            <RiEditLine />
          </Button>
        </li>

        {/* username */}
        <li className='list_item'>
          <Box className='list_text'>
            <span className='list_icon'>
              <MdOutlineAlternateEmail />
            </span>
            <span className='profile_list_info'>{profileUsername}</span>
          </Box>
          <Button
            className='list_btn'
            onClick={() => setOpenProfileUsernameModal(true)}>
            <RiEditLine />
          </Button>
        </li>

        {/* Email */}
        <li className='list_item'>
          <Box className='list_text'>
            <span className='list_icon'>
              <AiOutlineMail />
            </span>
            <span className='profile_list_info'>{profileEmail}</span>
          </Box>
          <Button
            className='list_btn'
            onClick={() => setOpenProfileEmailModal(true)}>
            <RiEditLine />
          </Button>
        </li>
      </ol>
    </Box>
  );
};

export default ProfileSettings;
