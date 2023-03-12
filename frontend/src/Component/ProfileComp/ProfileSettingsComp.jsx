/** @format */

import React from "react";
import {
  Box,
  Avatar,
  Button,
  Input,
  Spinner,
  useToast,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../Context/Context";
import { MdOutlineAddAPhoto, MdOutlineMailOutline } from "react-icons/md";
import { BsCloudUpload } from "react-icons/bs";
import { AiOutlineClose, AiOutlineEdit, AiOutlineUser } from "react-icons/ai";
import ModalComp from "../../Component/ModalComp/ModalComp";
import InputComp from "../../Component/InputComp/InputComp";

const ProfileSettingsComp = ({ profileData }) => {
  const toast = useToast();
  const { setPageType, setUpdateProfile, updateProfile } = GlobalContext();
  const { id } = useParams();
  const [name, setName] = React.useState(profileData.name);
  const [email, setEmail] = React.useState(profileData.email);
  const [profileImg, setProfileImg] = React.useState(profileData.profilePic);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDisable, setIsDisable] = React.useState(true);
  const [openProfileModal, setOpenProfileModal] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState("");
  const [image, setImage] = React.useState("");

  // Account settings state
  const [openNameInput, setOpenNameInput] = React.useState(false);
  const [openEmailInput, setOpenEmailInput] = React.useState(false);
  const [prevName, setPrevName] = React.useState(profileData.name);
  const [prevEmail, setPrevEmail] = React.useState(profileData.email);
  const [isDisableNameBtn, setIsDisableNameBtn] = React.useState(true);
  const [isDisableEmailBtn, setIsDisableEmailBtn] = React.useState(true);
  const [profilePrivacy, setProfilePrivacy] = React.useState(
    profileData.profilePrivacy
  );
  const [postPrivacy, setPostPrivacy] = React.useState(profileData.postPrivacy);
  const [msgPrivacy, setMsgPrivacy] = React.useState(profileData.msgPrivacy);

  const onClose = () => {
    setOpenProfileModal(false);
  };

  // *** Handle image file change
  const handleImageChange = (e) => {
    setIsDisable(false);
    setImage(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  // *** Close preview image event handler
  const closePreviewImage = () => {
    setImage("");
    setPreviewImage("");
    setIsDisable(true);
  };

  // *** Event for Uploading Profile Image
  const handleUploadImage = () => {
    setIsDisable(true);
    setProfileImg(previewImage);
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
        setProfileImg(profileData.profilePic);
      });
  };

  // *** Handle name change
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // *** Handle email change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
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
    // setName(profile.name);
    setOpenNameInput(false);
    // setEmail(profile.email);
    setOpenEmailInput(false);
  };

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
        setOpenNameInput(false);
        setPrevName(name);
        setIsDisableNameBtn(false);
      })
      .catch((error) => console.log("error", error));
  };

  // *** Handle update email
  const handleUpdateEmail = () => {
    setIsDisableEmailBtn(true);
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
        if (result.error) {
          toast({
            title: "Error",
            description: `${result.error.message}`,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else {
          setOpenEmailInput(false);
          setPrevEmail(email);
          toast({
            title: "Success",
            description: `${result.msg}`,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }
      })
      .catch((error) => console.log("error", error));
  };

  // *** Handle profile privacy
  const handlePrivacy = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", localStorage.getItem("token"));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      profilePrivacy: profilePrivacy,
      postPrivacy: postPrivacy,
      msgPrivacy: msgPrivacy,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_LINK}user/update/profile/privacy`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        toast({
          title: "Success",
          description: `Profile privacy has been updated`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => console.log("error", error));
  };

  return (
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
      {/* Image settings */}
      <Box className='image_settings'>
        <Box className='image_settings_header'>Profile Picture</Box>
        <Box className='image_container'>
          <Avatar src={profileImg} className='profile_avatar' />
          <Button
            className='image_upload_btn'
            onClick={() => setOpenProfileModal(true)}>
            <MdOutlineAddAPhoto className='camera_add_icon' />
          </Button>
        </Box>
      </Box>

      {/* Details */}
      <Box className='details_section'>
        <Box className='details_section_header'>Profile Details</Box>
        <Box className='profile_details_info'>
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
              <span className='settings_sub_header'>
                <AiOutlineUser />{" "}
              </span>
              <span className='settings_profile'>{name}</span>
              <Button
                className='setting_edit_btn'
                onClick={() => setOpenNameInput((prev) => !prev)}>
                <AiOutlineEdit className='settings_edit_icon' />
              </Button>
            </Box>
          )}

          {/* Email update */}
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
                <Button className='update_btn' onClick={handleUpdateEmail}>
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
                <MdOutlineMailOutline />
              </span>
              <span className='settings_profile'>{email}</span>
              <Button
                className='setting_edit_btn'
                onClick={() => setOpenEmailInput((prev) => !prev)}>
                <AiOutlineEdit className='settings_edit_icon' />
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      {/* Privacy settings */}
      <Box className='details_section'>
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as='span' flex='1' textAlign='left'>
                  Profile Privacy
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {/* Profile Privacy */}
              <Box className='settings_profile_privacy'>
                <span className='settings_profile_privacy_header'>
                  Who can see your profile details
                </span>
                <br />
                <span className='settings_profile_privacy_subheader'>
                  Only selected persons can see your profile details like your
                  email/username
                </span>

                {/* Radio input */}
                <Box className='radion_input_section'>
                  <RadioGroup
                    onChange={setProfilePrivacy}
                    value={profilePrivacy}
                    className='radio_input'>
                    <Stack direction='row'>
                      <Radio value='all' className='radio_input'>
                        <span className='radio_input'>All</span>
                      </Radio>
                      <Radio value='flwrs' className='radio_input'>
                        <span className='radio_input'>Only followers</span>
                      </Radio>
                      <Radio value='me' className='radio_input'>
                        <span className='radio_input'>Only me</span>
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </Box>
              </Box>

              {/* Post Privacy  */}
              <Box className='settings_profile_privacy'>
                <span className='settings_profile_privacy_header'>
                  Who can see your posts
                </span>
                <br />
                <span className='settings_profile_privacy_subheader'>
                  Only selected persons can see your posts
                </span>

                {/* Radio input */}
                <Box className='radion_input_section'>
                  <RadioGroup onChange={setPostPrivacy} value={postPrivacy}>
                    <Stack direction='row'>
                      <Radio value='all' className='radio_input'>
                        <span className='radio_input'>All</span>
                      </Radio>
                      <Radio value='flwrs' className='radio_input'>
                        <span className='radio_input'>Only followers</span>
                      </Radio>
                      <Radio value='me' className='radio_input'>
                        <span className='radio_input'>Only me</span>
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </Box>
              </Box>

              {/* Message Privacy */}
              <Box className='settings_profile_privacy'>
                <span className='settings_profile_privacy_header'>
                  Who can see message you
                </span>
                <br />
                <span className='settings_profile_privacy_subheader'>
                  Only selected persons can send you message
                </span>

                {/* Radio input */}
                <Box className='radion_input_section'>
                  <RadioGroup onChange={setMsgPrivacy} value={msgPrivacy}>
                    <Stack direction='row'>
                      <Radio value='all' className='radio_input'>
                        <span className='radio_input'>All</span>
                      </Radio>
                      <Radio value='flwrs' className='radio_input'>
                        <span className='radio_input'>Only followers</span>
                      </Radio>
                      <Radio value='me' className='radio_input'>
                        <span className='radio_input'>Only me</span>
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </Box>
              </Box>

              <Button className='update_btn' onClick={handlePrivacy}>
                Update
              </Button>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </React.Fragment>
  );
};

export default ProfileSettingsComp;
