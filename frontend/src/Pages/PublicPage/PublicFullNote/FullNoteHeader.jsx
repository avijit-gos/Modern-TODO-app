/** @format */

import { Box, Button, Img } from "@chakra-ui/react";
import React from "react";
import Pencil from "../../../Assests/Images/pencil.png";

const FullNoteHeader = () => {
  return (
    <Box className='public_full_note_header'>
      <Img className='navbar_logo' src={Pencil} />

      <Button className='login_nav_btn'>Login</Button>
    </Box>
  );
};

export default FullNoteHeader;
