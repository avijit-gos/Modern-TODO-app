/** @format */

import React from "react";
import { GlobalContext } from "../../Context/Context";
import Layout from "../../Layout/Layout";
import { Box, Button, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import "./FollowerFollowing.css";
import UserListLoader from "../../Component/SkeletonLoader/UserListLoader";
import axios from "axios";
import UserList from "../../Component/UserList/UserList";

const FollowerFollowing = () => {
  const { setPageType } = GlobalContext();
  const [queryValue, setQueryValue] = React.useState("flwr");
  const [isLoading, setIsLoading] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(2);
  const [isVisible, setIsVisible] = React.useState(true);
  const [isBtnLoading, setIsBtnLoading] = React.useState(false);
  const { id } = useParams();

  React.useLayoutEffect(() => {
    setPageType("follower_following");
  }, []);

  // **** Handle change tab
  const handleChangeTab = (e) => {
    console.log(e.target.id);
    setQueryValue(e.target.id);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    fetchUsers(e.target.id);
  };

  const fetchUsers = (value) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_LINK}user/fetch/follower/${id}?queryValue=${value}&page=${page}&limit=${limit}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        if (response.data.flwr) {
          if (response.data.flwr.length === limit) {
            setIsVisible(true);
          }
          if (page === 0) {
            setUsers(response.data.flwr);
          } else {
            setUsers((prev) => [...prev, response.data.flwr]);
          }
        } else {
          if (response.data.flw.length === limit) {
            setIsVisible(true);
          }
          if (page === 0) {
            setUsers(response.data.flw);
          } else {
            setUsers((prev) => [...prev, response.data.flw]);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInrementPage = () => {
    setIsBtnLoading(true);
    setTimeout(() => {
      setIsBtnLoading(false);
    }, 1000);
    setPage((prev) => prev + 1);
    fetchUsers(queryValue);
  };
  return (
    <Layout title={"Follower Following"}>
      <Box className='follower_following_page_container'>
        <Box className='tab_section'>
          <Button
            className={
              queryValue === "flwr"
                ? "active_follower_tab_btn follower_tab_btn"
                : "follower_tab_btn"
            }
            onClick={(e) => handleChangeTab(e)}
            id='flwr'>
            Follower
          </Button>
          <Button
            className={
              queryValue === "flw"
                ? "active_follower_tab_btn follower_tab_btn"
                : "follower_tab_btn"
            }
            onClick={(e) => handleChangeTab(e)}
            id='flw'>
            Following
          </Button>
        </Box>

        {/* Rendering component */}
        {isLoading ? (
          <Box className='skeleton_loader_section'>
            <UserListLoader />
          </Box>
        ) : (
          <>
            {(users || []).length > 0 ? (
              <Box className='followers_user_section'>
                {users.map((data) => (
                  <UserList key={data._id} userData={data} />
                ))}
                {/* {isVisible && (
                  <Box className='pagination_btn_section'>
                    <Button
                      className='pagination_btn'
                      onClick={handleInrementPage}>
                      {isBtnLoading ? <Spinner /> : <>Loading</>}
                    </Button>
                  </Box>
                )} */}
              </Box>
            ) : (
              <Box className='empty_follower_following_list'>No user found</Box>
            )}
          </>
        )}
      </Box>
    </Layout>
  );
};

export default FollowerFollowing;
