/** @format */

import React from "react";
import Layout from "../../Layout/Layout";
import { Box } from "@chakra-ui/react";
import { GlobalContext } from "../../Context/Context";
import PostForm from "../../Component/PostForm/PostForm";
import "./Home.css";

const Home = () => {
  const { setPageType } = GlobalContext();

  React.useLayoutEffect(() => {
    setPageType("home");
  }, []);

  return (
    <Layout>
      <Box className='home_container'>
        <PostForm />
      </Box>
    </Layout>
  );
};

export default Home;
