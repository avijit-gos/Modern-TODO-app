/** @format */

import React from "react";
import Layout from "../../Layout/Layout";
import { Box } from "@chakra-ui/react";
import { GlobalContext } from "../../Context/Context";
import "./Search.css";
import SearchForm from "../../Component/SearchComp/SearchForm";
import SearchResult from "../../Component/SearchComp/SearchResult";

const Search = () => {
  const { setPageType, updateProfile } = GlobalContext();
  React.useLayoutEffect(() => {
    setPageType("search");
  }, []);
  return (
    <Layout title='Search'>
      <Box className='search_container'>
        <SearchForm />
      </Box>
    </Layout>
  );
};

export default Search;
