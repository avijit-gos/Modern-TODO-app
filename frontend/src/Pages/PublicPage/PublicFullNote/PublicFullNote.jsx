/** @format */

import { Box } from "@chakra-ui/react";
import React from "react";
import FullNoteHeader from "./FullNoteHeader";
import "../Public.css";
import FullNote from "../../../Component/FullPostComponent/FullNote";

const PublicFullNote = ({ post }) => {
  console.log(post);
  return (
    <Box className='public_full_note_container'>
      {/* Header */}
      <FullNoteHeader />
      <FullNote data={post} />
    </Box>
  );
};

export default PublicFullNote;
