/** @format */

import React from "react";
import { Box, Button } from "@chakra-ui/react";
import Layout from "../../Layout/Layout";
import { GlobalContext } from "../../Context/Context";
import { TbMessages } from "react-icons/tb";

const Chat = () => {
  const { setPageType } = GlobalContext();

  React.useLayoutEffect(() => {
    setPageType("chat");
  }, []);
  return (
    <Layout title={"Message"}>
      <Box className='message_conatiner'>Message</Box>
    </Layout>
  );
};

export default Chat;
