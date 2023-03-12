/** @format */

import { Box, Button } from "@chakra-ui/react";
import React from "react";
import InputComp from "../InputComp/InputComp";
import axios from "axios";

const CommentForm = ({ postId, setCommentsCount, setComments }) => {
  const [text, setText] = React.useState("");
  const [isDisable, setIsDisable] = React.useState(true);

  React.useEffect(() => {
    if (!text.trim()) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [text]);

  // Create comment
  const createComment = () => {
    setIsDisable(true);
    var data = JSON.stringify({
      comment: text,
    });

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_LINK}note/comment/${postId}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setText("");
        console.log(response.data);
        setCommentsCount((prev) => prev + 1);
        // setOpenCommentSection(false);
        setComments((prev) => [response.data.comment, ...prev]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <Box className='comment_form_container'>
        <InputComp
          type='text'
          className={"comment_input"}
          placaeholder='Comment...'
          value={text}
          handleChange={(e) => setText(e.target.value.slice(0, 120))}
        />

        {!isDisable ? (
          <Button className='commnet_sent' onClick={createComment}>
            Send
          </Button>
        ) : (
          <Button className='disable_comment_btn commnet_sent'>Send</Button>
        )}
      </Box>
    </React.Fragment>
  );
};

export default CommentForm;
