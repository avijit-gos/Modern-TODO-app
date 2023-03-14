/** @format */

import React from "react";
import { Avatar, Box, Button } from "@chakra-ui/react";
import { BiUserCheck, BiUserPlus } from "react-icons/bi";
import { MdMarkEmailRead } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import "./UserCard.css";

const UserList = ({ userData }) => {
  const [followed, setFollowed] = React.useState(
    userData.flw
      ? userData.flwr.includes(JSON.parse(localStorage.getItem("user"))._id)
        ? true
        : false
      : false
  );

  const handleFollowUser = (id) => {
    console.log(id);
    var config = {
      method: "put",
      url: `${process.env.REACT_APP_LINK}user/follow/${id}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios(config)
      .then(function (response) {
        setFollowed((p) => !p);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // *** Handle create a single message
  const handleCreateSingleMessage = (id) => {
    alert(id);
  };

  return (
    <Box className='user_card'>
      <Box className='user_info_section'>
        <Avatar src={userData.profilePic} className='user_card_avatar' />
        <Link to={`/profile/${userData._id}`} className='user_card_name'>
          {userData.name}
        </Link>
        <span className='user_card_username'>@{userData.username}</span>
      </Box>
      <Button
        className='user_card_flw_btn'
        onClick={() => handleFollowUser(userData._id)}>
        {followed ? <BiUserCheck className='flwed' /> : <BiUserPlus />}
      </Button>

      <Button
        className='user_card_flw_btn'
        onClick={() => handleCreateSingleMessage(userData._id)}>
        <MdMarkEmailRead className='message_icon' />
      </Button>
    </Box>
  );
};

export default UserList;
