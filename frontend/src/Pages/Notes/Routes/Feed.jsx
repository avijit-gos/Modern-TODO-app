/** @format */

import { Box, Button, Spinner } from "@chakra-ui/react";
import React from "react";
import FeedPostComp from "../../../Component/FeedPostComp/FeedPostComp";
import NoteSkeletonLoader from "../../../Component/SkeletonLoader/NoteSkeletonLoader";
import { GlobalContext } from "../../../Context/Context";
import { socket } from "../../../App";

const Feed = () => {
  const { selectType, setFeedPosts, feedPosts, updateNote } = GlobalContext();
  const [notes, setNotes] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [prevPage, setPrevPage] = React.useState(0);
  const [limit, setLimit] = React.useState(10);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isBtnLoading, setIsBtnLoading] = React.useState(false);

  // React.useEffect(() => {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);
  // }, [selectType]);

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
    if (page === 0) {
      setIsLoading(true);
    }
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", localStorage.getItem("token"));

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_LINK}note/feed?page=${page}&limit=${limit}&type=${selectType}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setNotes(result);
        setFeedPosts((prev) => [...prev, ...result]);
        setIsLoading(false);
      })
      .catch((error) => console.log("error", error));
  }, [page, selectType, updateNote]);

  socket.off("feed").on("feed", (data) => {
    setFeedPosts((prev) => [data.note, ...prev]);
    setNotes(data.note);
    console.log(data);
  });

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

export default Feed;
