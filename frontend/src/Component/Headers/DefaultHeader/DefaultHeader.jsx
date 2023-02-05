/** @format */

import { Box, Button } from "@chakra-ui/react";
import { IoArrowBack } from "react-icons/io5";
import React from "react";
import { useHistory } from "react-router-dom";

const DefaultHeader = ({ title }) => {
  const history = useHistory();

  const backToPrevPage = () => {
    history.goBack();
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
