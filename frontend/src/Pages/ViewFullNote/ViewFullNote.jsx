/** @format */

import React from "react";
import Layout from "../../Layout/Layout";
import { Box } from "@chakra-ui/react";
import { GlobalContext } from "../../Context/Context";
import { useParams } from "react-router";
import "./FullPost.css";
import FullNote from "../../Component/FullPostComponent/FullNote";
import FullNoteLoading from "../../Component/SkeletonLoader/FullNoteLoading";

const ViewFullNote = () => {
  const { id } = useParams();
  const { setPageType, updateProfile, setUser } = GlobalContext();
  const [postLoading, setPostLoading] = React.useState(false);
  const [post, setPost] = React.useState(null);

  // Page layout effect
  React.useLayoutEffect(() => {
    setPageType("full_post");
  }, []);

  // Fetch note
  const fetchNote = () => {
    setPostLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", localStorage.getItem("token"));

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_LINK}note/full/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setPostLoading(false);
        setPost(result);
      })
      .catch((error) => console.log("error", error));
  };

  React.useEffect(() => {
    fetchNote();
  }, [id]);

  return (
    <Layout title='Full view'>
      <Box className='full_post_container'>
        {/* Post */}
        {postLoading ? (
          <FullNoteLoading />
        ) : (
          <>
            {post ? (
              <Box className='full_post_card'>
                <FullNote data={post} />
              </Box>
            ) : (
              <Box className='empty_post'>No post found</Box>
            )}
          </>
        )}

        {/* Comment */}
      </Box>
    </Layout>
  );
};

export default ViewFullNote;
