/** @format */

import { Box, Button, Spinner } from "@chakra-ui/react";
import React from "react";
import FeedPostComp from "../../../Component/FeedPostComp/FeedPostComp";
import NoteSkeletonLoader from "../../../Component/SkeletonLoader/NoteSkeletonLoader";
import { GlobalContext } from "../../../Context/Context";

const FollowersFeed = () => {
  const { selectType, setFeedPosts, feedPosts, updateNote } = GlobalContext();
  const [notes, setNotes] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [prevPage, setPrevPage] = React.useState(0);
  const [limit, setLimit] = React.useState(10);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isBtnLoading, setIsBtnLoading] = React.useState(false);

  const handleIncrementPage = () => {
    setPrevPage(page);
    setPage((prev) => prev + 1);
    setIsBtnLoading(true);
  };

  // Fetch user notes feed
  React.useEffect(() => {
    setIsBtnLoading(false);
    if (prevPage === page) {
      setFeedPosts([]);
    }
  }, [page, selectType, updateNote]);

  // Fetch user notes feed
  const fetchNotes = () => {
    const axios = require("axios");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_LINK}note/follower/feed`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box className='feed_container'>
      {isLoading ? (
        <NoteSkeletonLoader />
      ) : (
        <>
          {(feedPosts || []).length > 0 ? (
            <Box>
              {feedPosts.map((data) => (
                <FeedPostComp key={data._id} data={data} />
              ))}
              <Box className='pagination_btn_container'>
                {notes.length >= limit && (
                  <Button
                    className='pagination_btn'
                    onClick={() => handleIncrementPage()}>
                    {isBtnLoading ? <Spinner /> : <>Load more</>}
                  </Button>
                )}
              </Box>
            </Box>
          ) : (
            <Box className='empty_feed'>No post available</Box>
          )}
        </>
      )}
    </Box>
  );
};

export default FollowersFeed;
