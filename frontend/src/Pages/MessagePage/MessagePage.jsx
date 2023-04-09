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
import MessageCard from "../../Component/MessageCard/MessageCard";
import { socket } from "../../App";

const MessagePage = () => {
  const { id } = useParams();
  const {
    setPageType,
    setSelectChat,
    selectChat,
    updateChat,
    messages,
    setMessages,
  } = GlobalContext();
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(10);

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
        setSelectChat(response.data);
        socket.emit("join chat room", response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id, updateChat]);

  // Fetch messages related to the chat
  const fetchMessage = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", localStorage.getItem("token"));

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_LINK}message/${id}?page=${page}&limit=${limit}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (page === 0) {
          setMessages(result);
        } else {
          setMessages((prev) => [...result, ...prev]);
        }
      })
      .catch((error) => console.log("error", error));
  };

  React.useEffect(() => {
    socket.off("transmit new message").on("transmit new message", (data) => {
      if (!selectChat || selectChat._id !== data.chatId) {
        // send notification
        console.log("Notification send to user: ", data);
      } else {
        setMessages((prev) => [...prev, data]);
        scrollToBottom();
      }
    });
  });

  React.useEffect(() => {
    fetchMessage();
  }, [page, limit, id]);

  const scrollHandler = (e) => {
    let cl = e.currentTarget.clientHeight;
    let sy = Math.round(e.currentTarget.scrollTop);

    // console.log(cl);

    if (sy <= 30) {
      setPage((page) => page + 1);
    }
  };

  const messageRef = React.useRef(null);

  React.useEffect(() => {
    console.log(messageRef.current);
  }, []);

  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    if (page === 0) {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  };

  React.useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, []);

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <React.Fragment>
      {selectChat && (
        <Layout>
          <Box className='message_page_container'>
            <MessagePageHeader />

            <Box>
              {(messages || []).length > 0 ? (
                <Box
                  className='message_body'
                  onScroll={(e) => scrollHandler(e)}>
                  {messages.map((data) => (
                    <Box key={data._id}>
                      <MessageCard data={data} />
                      <Box ref={messagesEndRef} />
                    </Box>
                  ))}
                </Box>
              ) : (
                <Box className='empty_message'>Start chatting</Box>
              )}
            </Box>
            <div className='ref_div' />

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
