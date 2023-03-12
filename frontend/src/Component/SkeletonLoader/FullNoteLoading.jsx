/** @format */

import { Box } from "@chakra-ui/react";
import React from "react";
import "./Loader.css";

const FullNoteLoading = () => {
  return (
    <React.Fragment>
      <Box className='full_note_loader_header'>
        <Box className='full_note_logo skeleton'></Box>
        <Box className='full_note_name skeleton'></Box>
        <Box className='full_note_username skeleton'></Box>
        <Box className='full_note_time skeleton'></Box>
      </Box>
      <Box className='loader_note_details'>
        <Box className='loader_full_note_title skeleton'></Box>

        <Box className='loader_full_note_line_text skeleton'></Box>
        <Box className='loader_full_note_line_text skeleton'></Box>
        <Box className='loader_full_note_line_text skeleton'></Box>
        <Box className='loader_full_note_line_text skeleton'></Box>
        <Box className='loader_full_note_line_text skeleton'></Box>
        <Box className='loader_full_note_line_text skeleton'></Box>
        <Box className='loader_full_note_line_text skeleton'></Box>
        <Box className='loader_full_note_line_text skeleton'></Box>
        <Box className='loader_full_note_line_text skeleton'></Box>
        <Box className='loader_full_note_line_text skeleton'></Box>
        <Box className='loader_full_note_line_text skeleton'></Box>
        <Box className='loader_full_note_line_text skeleton'></Box>
        <Box className='loader_full_note_line_text skeleton'></Box>
        <Box className='loader_full_note_line_text skeleton'></Box>
        <Box className='loader_full_note_line_text skeleton'></Box>
        <Box className='loader_full_note_line_text skeleton'></Box>
        <Box className='loader_full_note_line_text skeleton'></Box>
        <Box className='loader_full_note_line_text skeleton'></Box>
        <Box className='loader_full_note_line_text skeleton'></Box>
        <Box className='loader_full_note_line_text skeleton'></Box>
      </Box>
    </React.Fragment>
  );
};

export default FullNoteLoading;
