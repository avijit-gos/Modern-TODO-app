/** @format */

import { Box, Img } from "@chakra-ui/react";
import React from "react";
import Error from "../../Assests/Images/error.gif";

const NotFound = () => {
  return (
    <Box>
      <Img src={Error} />
    </Box>
  );
};

export default NotFound;
