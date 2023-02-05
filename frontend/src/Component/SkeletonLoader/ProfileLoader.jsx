/** @format */

import React from "react";
import { Box } from "@chakra-ui/react";
import "./Loader.css";

const ProfileLoader = () => {
  return (
    <Box className='skeleton_profile_container'>
      {/* Image sections */}
      <Box className='skeleton_image_section'>
        {/* Profile picture */}
        <Box className='skeleton_profile_image_section skeleton'></Box>

        {/* User info section */}
        <Box className='skeleton_user_info_section'>
          {/* name */}
          <Box className='skeleton_profile_name skeleton'></Box>

          {/* email */}
          <Box className='skeleton_profile_username skeleton'></Box>

          {/* follower following */}
          <Box className='skeleton_profile_follwers skeleton'></Box>
        </Box>
      </Box>
      {/* Navlinks */}
      <Box className='skeleton_netsed_routes_container'>
        <Box className='skeleton_route skeleton'></Box>
        <Box className='skeleton_route skeleton'></Box>
      </Box>

      {/* Cards */}
      <Box className='skeleton_card_container'>
        <Box className='skeleton_card skeleton'></Box>
        <Box className='skeleton_card skeleton'></Box>
        <Box className='skeleton_card skeleton'></Box>
        <Box className='skeleton_card skeleton'></Box>
        <Box className='skeleton_card skeleton'></Box>
        <Box className='skeleton_card skeleton'></Box>
        <Box className='skeleton_card skeleton'></Box>
        <Box className='skeleton_card skeleton'></Box>
        <Box className='skeleton_card skeleton'></Box>
      </Box>
    </Box>
  );
};

export default ProfileLoader;
