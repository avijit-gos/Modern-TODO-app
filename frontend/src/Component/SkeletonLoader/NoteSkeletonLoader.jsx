/** @format */

import { Box } from "@chakra-ui/react";
import React from "react";

const NoteSkeletonLoader = () => {
  return (
    <React.Fragment>
      <Box className='note_cared_loader'>
        <Box className='note_card_loader_header'>
          <Box className='loader_logo skeleton'></Box>
          <Box className='loader_user_name skeleton'></Box>
          <Box className='loader_user_username skeleton'></Box>
          <Box className='loadertime skeleton'></Box>
        </Box>

        <Box className='note_card_loader_body'>
          <Box className='note_loader_title skeleton'></Box>
          <Box className='note_loader_text skeleton'></Box>
          <Box className='note_loader_text skeleton'></Box>
        </Box>
      </Box>

      <Box className='note_cared_loader'>
        <Box className='note_card_loader_header'>
          <Box className='loader_logo skeleton'></Box>
          <Box className='loader_user_name skeleton'></Box>
          <Box className='loader_user_username skeleton'></Box>
          <Box className='loadertime skeleton'></Box>
        </Box>

        <Box className='note_card_loader_body'>
          <Box className='note_loader_title skeleton'></Box>
          <Box className='note_loader_text skeleton'></Box>
          <Box className='note_loader_text skeleton'></Box>
        </Box>
      </Box>

      <Box className='note_cared_loader'>
        <Box className='note_card_loader_header'>
          <Box className='loader_logo skeleton'></Box>
          <Box className='loader_user_name skeleton'></Box>
          <Box className='loader_user_username skeleton'></Box>
          <Box className='loadertime skeleton'></Box>
        </Box>

        <Box className='note_card_loader_body'>
          <Box className='note_loader_title skeleton'></Box>
          <Box className='note_loader_text skeleton'></Box>
          <Box className='note_loader_text skeleton'></Box>
        </Box>
      </Box>

      <Box className='note_cared_loader'>
        <Box className='note_card_loader_header'>
          <Box className='loader_logo skeleton'></Box>
          <Box className='loader_user_name skeleton'></Box>
          <Box className='loader_user_username skeleton'></Box>
          <Box className='loadertime skeleton'></Box>
        </Box>

        <Box className='note_card_loader_body'>
          <Box className='note_loader_title skeleton'></Box>
          <Box className='note_loader_text skeleton'></Box>
          <Box className='note_loader_text skeleton'></Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default NoteSkeletonLoader;
