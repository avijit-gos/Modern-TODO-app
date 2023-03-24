/** @format */

import React from "react";
import { Box, Button, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router";
import { GlobalContext } from "../../../Context/Context";
import NoteSkeletonLoader from "../../../Component/SkeletonLoader/NoteSkeletonLoader";
import FeedPostComp from "../../../Component/FeedPostComp/FeedPostComp";

const Notes = () => {
  const { id } = useParams();
  const { selectType, setFeedPosts, feedPosts, updateNote } = GlobalContext();
  const [notes, setNotes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [prevPage, setPrevPage] = React.useState(0);
  const [prevNoteCount, setPrevNoteCount] = React.useState(0);
  const [limit, setLimit] = React.useState(10);
  const [isBtnLoading, setIsBtnLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [selectType]);

  // *** Fetch notes
  const fetchNotes = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_LINK}note/fetch/${id}?page=${page}&limit=${limit}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        setPrevNoteCount(response.data.length);
        setNotes((prev) => [...prev, ...response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    fetchNotes();
  }, [id, updateNote, page]);

  // *** Handle increment page
  const handleIncrementPage = () => {
    setPrevPage(page);
    setPage((prev) => prev + 1);
    setIsBtnLoading(true);
  };

  return (
    <Box className='profile_note_page'>
      {isLoading ? (
        <NoteSkeletonLoader />
      ) : (
        <>
          {(notes || []).length > 0 ? (
            <Box>
              {notes.map((data) => (
                <FeedPostComp key={data._id} data={data} />
              ))}
              <Box className='pagination_btn_container'>
                {prevNoteCount >= limit && (
                  <Button
                    className='pagination_btn'
                    onClick={() => handleIncrementPage()}>
                    {isBtnLoading ? <Spinner /> : <>Load more</>}
                  </Button>
                )}
              </Box>
            </Box>
          ) : (
            <Box className='profile_empty_feed'>No post available</Box>
          )}
        </>
      )}
    </Box>
  );
};

export default Notes;
