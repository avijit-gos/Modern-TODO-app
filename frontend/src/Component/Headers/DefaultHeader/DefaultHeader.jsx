/** @format */

import { Box, Button } from "@chakra-ui/react";
import { IoArrowBack } from "react-icons/io5";
import React from "react";
import { useNavigate } from "react-router-dom";

const DefaultHeader = ({ title }) => {
  const navigate = useNavigate();

  const backToPrevPage = () => {
    navigate(-1);
  };
  return (
    <Box className='header_navbar_container'>
      <Button className='back_btn' onClick={backToPrevPage}>
        <IoArrowBack />
      </Button>
      <span className='navbar_header_title'>{title}</span>
    </Box>
  );
};

export default DefaultHeader;
