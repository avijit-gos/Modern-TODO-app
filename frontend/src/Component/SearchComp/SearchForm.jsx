/** @format */

import { Box } from "@chakra-ui/react";
import React from "react";
import InputComp from "../InputComp/InputComp";
import { BiSearchAlt2 } from "react-icons/bi";
import UserList from "../UserList/UserList";
import UserListLoader from "../SkeletonLoader/UserListLoader";

const SearchForm = () => {
  const [key, setKey] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [userList, setUserList] = React.useState([]);
  const [msg, setMsg] = React.useState("");
  const [disable, setDisable] = React.useState(true);

  const handleChange = (e) => {
    setKey(e.target.value);
  };

  React.useEffect(() => {
    if (key.trim()) {
      setDisable(false);
      setIsLoading(true);
      var myHeaders = new Headers();
      myHeaders.append("x-access-token", localStorage.getItem("token"));
      myHeaders.append("Content-Type", "application/json");
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      fetch(
        `${process.env.REACT_APP_LINK}user/find/user?key=${key}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setUserList(result);
          setIsLoading(false);
        })
        .catch((error) => console.log("error", error));
    } else {
      setDisable(true);
      setMsg("No recent searches.");
    }
  }, [key]);

  return (
    <Box className='search_form_container'>
      <Box className='search_input_container'>
        <BiSearchAlt2 className='search_input_icon' />
        <InputComp
          type='search'
          placaeholder='Search...'
          className='input_search'
          value={key}
          handleChange={handleChange}
        />
      </Box>

      <Box className='search_result_container'>
        {disable ? (
          <Box className='empty_search_result'>{msg}</Box>
        ) : (
          <Box className='search_result'>
            {isLoading ? (
              <UserListLoader />
            ) : (
              <React.Fragment>
                {(userList || []).length > 0 ? (
                  <React.Fragment>
                    {userList.map((user) => (
                      <UserList key={user._id} userData={user} />
                    ))}
                  </React.Fragment>
                ) : (
                  <Box className='empty_search_result'>No user found</Box>
                )}
              </React.Fragment>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SearchForm;
