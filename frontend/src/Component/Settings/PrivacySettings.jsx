/** @format */

import React from "react";
import {
  Box,
  Avatar,
  Button,
  useToast,
  Spinner,
  Input,
  Stack,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";

const PrivacySettings = ({ profile }) => {
  const toast = useToast();
  const [profilePrivacy, setProfilePrivacy] = React.useState(
    profile.profilePrivacy || "all"
  );
  const [postPrivacy, setPostPrivacy] = React.useState(
    profile.postPrivacy || "all"
  );
  const [msgPrivacy, setMsgPrivacy] = React.useState(
    profile.msgPrivacy || "all"
  );

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
    <Box className='sub_settings_section'>
      <Box className='privacy_sub_box'>
        <Box className='privacy_sub_box_header'>
          <span className='sub_box_header_text'>Profile privacy</span>
          <br />
          <span className='sub_box_subheader_text'>
            Only selected people can view your profile
          </span>
        </Box>
        <Box className='radion_input_section'>
          <RadioGroup onChange={setProfilePrivacy} value={profilePrivacy}>
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

      <Box className='privacy_sub_box'>
        <Box className='privacy_sub_box_header'>
          <span className='sub_box_header_text'>Profile privacy</span>
          <br />
          <span className='sub_box_subheader_text'>
            Only selected people can view your posts
          </span>
        </Box>
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

      <Box className='privacy_sub_box'>
        <Box className='privacy_sub_box_header'>
          <span className='sub_box_header_text'>Message privacy</span>
          <br />
          <span className='sub_box_subheader_text'>
            Only selected people can send message to you
          </span>
        </Box>
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

      <Button className='upload_btn' onClick={handlePrivacy}>
        Update
      </Button>
    </Box>
  );
};

export default PrivacySettings;
