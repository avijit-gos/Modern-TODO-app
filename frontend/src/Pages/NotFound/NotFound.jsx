/** @format */

import { Box, Button, Img } from "@chakra-ui/react";
import React from "react";
import Error from "../../Assests/Images/error.gif";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const backToPrevPage = () => {
    navigate(-1);
  };
  return (
    <React.Fragment>
      <Box className='not found_page'>
        <Img src={Error} />
      </Box>
      <p className='error_text'>Opps! You lost your path.</p>
      <Button className='error_btn' onClick={backToPrevPage}>
        Go back
      </Button>
    </React.Fragment>
  );
};

export default NotFound;
