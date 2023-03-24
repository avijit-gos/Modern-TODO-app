/** @format */

import React from "react";
import { Box, Collapse, useDisclosure } from "@chakra-ui/react";
import { GlobalContext } from "../../Context/Context";
import Layout from "../../Layout/Layout";
import axios from "axios";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";
import "./SettingsPage.css";

const SettingsPage = () => {
  const { setPageType } = GlobalContext();
  const { isOpen, onToggle } = useDisclosure();
  const [profile, setProfile] = React.useState(null);
  const [openProfileBox, setOpenProfileBox] = React.useState(true);
  const [openNoteBox, setOpenNoteBox] = React.useState(false);
  const [openPrivacyBox, setOpenPrivacyBox] = React.useState(false);

  React.useLayoutEffect(() => {
    setPageType("settings");
  }, []);
  return (
    <Layout title={"settings"}>
      <Box className='setting_page_contaiener'>
        {/* Profile Settings */}
        <Box className='profile_settings_section'>
          <span className='collapse_section_btn_header'>Profile settings</span>
          <span className='collapse_icons'>
            {openProfileBox ? <BiUpArrow /> : <BiDownArrow />}
          </span>
        </Box>
        {openProfileBox && (
          <Box className='profile_settings_form_box'>
            Profile settings form box
          </Box>
        )}

        {/* Notes settings */}
        <Box
          className='profile_settings_section'
          onClick={() => setOpenNoteBox((prev) => !prev)}>
          <span className='collapse_section_btn_header'>Notes settings</span>
          <span className='collapse_icons'>
            {openNoteBox ? <BiUpArrow /> : <BiDownArrow />}
          </span>
        </Box>
        {openNoteBox && (
          <Box className='profile_settings_form_box'>
            Notes settings form box
          </Box>
        )}

        {/* Privacy settings settings */}
        <Box
          className='profile_settings_section'
          onClick={() => setOpenPrivacyBox((prev) => !prev)}>
          <span className='collapse_section_btn_header'>Notes settings</span>
          <span className='collapse_icons'>
            {openPrivacyBox ? <BiUpArrow /> : <BiDownArrow />}
          </span>
        </Box>
        {openPrivacyBox && (
          <Box className='profile_settings_form_box'>
            Notes settings form box
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default SettingsPage;
