/** @format */

import React from "react";
import { Box } from "@chakra-ui/react";
import { GlobalContext } from "../../Context/Context";
import Layout from "../../Layout/Layout";
import "./Message.css";
import { useParams } from "react-router";
import axios from "axios";
import MessagePageHeader from "./MessagePageHeader";
import MessageFooter from "./MessageFooter";

const MessagePage = () => {
  const { id } = useParams();
  const { setPageType, setSelectChat, selectChat } = GlobalContext();

  React.useLayoutEffect(() => {
    setPageType("message");
  }, []);

  // *** Fetch chat details
  React.useEffect(() => {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_LINK}chat/single/${id}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setSelectChat(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

  return (
    <React.Fragment>
      {selectChat && (
        <Layout>
          <Box className='message_page_container'>
            <MessagePageHeader />

            <Box className='message_body'>Body</Box>

            <Box className='message_footer'>
              <MessageFooter />
            </Box>
          </Box>
        </Layout>
      )}
    </React.Fragment>
  );
};

export default MessagePage;
