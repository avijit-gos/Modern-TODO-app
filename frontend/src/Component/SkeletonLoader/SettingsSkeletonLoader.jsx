/** @format */

import { Box } from "@chakra-ui/react";
import React from "react";

const SettingsSkeletonLoader = () => {
  return (
    <Box className='skeleton_settings_page'>
      <Box className='skeleton_profile_image_section'>
        <Box className='skeleton_profile_image skeleton'></Box>
      </Box>

      <Box className='skeleton_profile_section'>
        <Box className='skeleton_settings_box'>
          <Box className='settings_skeleton_inner_box skeleton'></Box>
          <Box className='settings_skeleton_inner_box2 skeleton'></Box>
        </Box>

        <Box className='skeleton_settings_box'>
          <Box className='settings_skeleton_inner_box skeleton'></Box>
          <Box className='settings_skeleton_inner_box2 skeleton'></Box>
        </Box>

        <Box className='skeleton_settings_box'>
          <Box className='settings_skeleton_inner_box skeleton'></Box>
          <Box className='settings_skeleton_inner_box2 skeleton'></Box>
        </Box>

        <Box className='skeleton_settings_box'>
          <Box className='settings_skeleton_inner_box skeleton'></Box>
          <Box className='settings_skeleton_inner_box2 skeleton'></Box>
        </Box>
      </Box>

      <Box className='seleton_seetings_tab'>
        <Box className='seleton_seetings_tab_one skeleton'></Box>
        <Box className='seleton_seetings_tab_two skeleton'></Box>
      </Box>

      <Box className='seleton_seetings_tab'>
        <Box className='seleton_seetings_tab_one skeleton'></Box>
        <Box className='seleton_seetings_tab_two skeleton'></Box>
      </Box>
    </Box>
  );
};

export default SettingsSkeletonLoader;
