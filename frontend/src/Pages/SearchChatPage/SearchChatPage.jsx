/** @format */

import { Box } from "@chakra-ui/react";
import React from "react";
import { GlobalContext } from "../../Context/Context";
import Layout from "../../Layout/Layout";
import InputComp from "../../Component/InputComp/InputComp";
import { TbUserSearch } from "react-icons/tb";
import ChatCard from "../../Component/ChatCard/ChatCard";
import axios from "axios";
import ChatLoader from "../../Component/SkeletonLoader/ChatLoader";

const SearchChatPage = () => {
  const { setPageType } = GlobalContext();
  const [searchKey, setSearchKey] = React.useState("");
  const [viewSearchResult, setviewSearchResult] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [searchChats, setSearchChats] = React.useState([]);

  React.useLayoutEffect(() => {
    setPageType("search_chat");
  }, []);

  // *** Search chat search result
  React.useEffect(() => {
    if (searchKey.trim()) {
      setLoading(true);
      let data = JSON.stringify({
        search_chat: searchKey,
      });

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_LINK}chat/search_chat?key=${searchKey}`,
        headers: {
          "x-access-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(response);
          setLoading(false);
          setSearchChats(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [searchKey]);

  return (
    <Layout title='Search Chat'>
      <Box className='chat_search_page'>
        <Box className='chat_box_app_header'>
          <span className='chat_box_app_header_text'>Chats</span>
          <br />
          <Box className='chat_box_app_header_search_section'>
            <TbUserSearch className='search_chat_icon' />
            <InputComp
              type='search'
              placaeholder='Search'
              className={"chat_search_input"}
              value={searchKey}
              handleChange={(e) => setSearchKey(e.target.value)}
            />
          </Box>
        </Box>

        <Box>
          {loading ? (
            <ChatLoader />
          ) : (
            <>
              {(searchChats || []).length > 0 ? (
                <>
                  {searchChats.map((data) => (
                    <ChatCard key={data._id} chatData={data} />
                  ))}
                </>
              ) : (
                <Box className='empty_chat_search_result'>
                  No search result found
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default SearchChatPage;
