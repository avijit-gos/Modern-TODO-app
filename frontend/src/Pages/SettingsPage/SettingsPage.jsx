/** @format */

import React from "react";
import { Box } from "@chakra-ui/react";
import { GlobalContext } from "../../Context/Context";
import Layout from "../../Layout/Layout";
import axios from "axios";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";
import "./SettingsPage.css";
import ProfileSettings from "../../Component/Settings/ProfileSettings";
import SecuritySettings from "../../Component/Settings/SecuritySettings";
import PrivacySettings from "../../Component/Settings/PrivacySettings";
import SettingsSkeletonLoader from "../../Component/SkeletonLoader/SettingsSkeletonLoader";

const SettingsPage = () => {
  const { setPageType } = GlobalContext();
  const [isLoading, setIsLoading] = React.useState(false);
  const [profile, setProfile] = React.useState(null);
  // profile image state
  const [image, setImage] = React.useState("");
  const [prevImage, setPrevImage] = React.useState("");
  const [profileImage, setProfileImage] = React.useState("");
  const [isBox1Open, setIsBox1Open] = React.useState(false);
  const [isBox2Open, setIsBox2Open] = React.useState(false);

  React.useLayoutEffect(() => {
    setPageType("settings");
  }, []);

  React.useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  React.useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", localStorage.getItem("token"));
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_LINK}user/fetch/user/${
        JSON.parse(localStorage.getItem("user"))._id
      }`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setProfile(result);
        setProfileImage(result.profilePic);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <Layout title={"Settings"}>
      {isLoading ? (
        <SettingsSkeletonLoader />
      ) : (
        <>
          {profile ? (
            <Box className='setting_page_contaiener'>
              {/* Profile settings */}
              <Box className='settings_section'>
                <Box className='settings_header'>Profile Settings</Box>
                <ProfileSettings profile={profile} />
              </Box>

              {/* General settings */}
              <Box className='settings_section'>
                <Box
                  className='settings_header settings_header_btn'
                  onClick={() => setIsBox1Open((p) => !p)}>
                  <span>Security Settings</span>
                  <span className='setting_header_icon'>
                    {!isBox1Open ? <BiDownArrow /> : <BiUpArrow />}
                  </span>
                </Box>
                {isBox1Open ? <SecuritySettings /> : null}
              </Box>

              {/* Privacy Settings */}
              <Box className='settings_section'>
                <Box
                  className='settings_header settings_header_btn'
                  onClick={() => setIsBox2Open((p) => !p)}>
                  <span>Privacy Settings</span>
                  <span className='setting_header_icon'>
                    {!isBox2Open ? <BiDownArrow /> : <BiUpArrow />}
                  </span>
                </Box>
                {isBox2Open ? <PrivacySettings profile={profile} /> : null}
              </Box>
            </Box>
          ) : (
            <Box className='empty_setting_page_contaiener'>No user found</Box>
          )}
        </>
      )}
    </Layout>
  );
};

export default SettingsPage;
