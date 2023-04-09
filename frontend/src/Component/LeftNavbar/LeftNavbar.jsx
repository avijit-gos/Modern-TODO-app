/** @format */

import { Box, Img } from "@chakra-ui/react";
import React from "react";
import { BiHome } from "react-icons/bi";
import { AiOutlineUser, AiOutlineSetting } from "react-icons/ai";
import { TbNotes, TbMessages } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsBell } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../Assests/Images/pencil.png";
import { GlobalContext } from "../../Context/Context";
import "./Navbar.css";
import axios from "axios";

const LeftNavbar = () => {
  const {
    setNotifications,
    page,
    limit,
    notificationsCount,
    setNotificationsCount,
  } = GlobalContext();
  const navigate = useNavigate();

  // *** Fetch all notification
  React.useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_LINK}notification?page=${page}&limit=${limit}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        const arr = response.data.filter((data) => data.view !== true);
        setNotificationsCount(arr.length);
        if (page > 0) {
          setNotifications((prev) => [...prev, ...response.data]);
        } else {
          setNotifications(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // *** View notification
  const handleNotification = () => {
    navigate("/notification");

    // Call the api for updating notification view
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_LINK}notification/update`,
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
    <Box className='left_navbar_container'>
      {/* Logo container */}
      <Box className='left_navbar_logo_container'>
        <Img src={Logo} className='left_navbar_logo' />
      </Box>
      {/* Home */}
      <Box className='nav_link'>
        <NavLink
          to='/'
          className={(navData) =>
            navData.isActive ? "nav_item active_nav_item" : "nav_item"
          }>
          <BiHome />
        </NavLink>
      </Box>

      {/* Search */}
      <Box className='nav_link'>
        <NavLink
          to='/search'
          className={(navData) =>
            navData.isActive ? "nav_item active_nav_item" : "nav_item"
          }>
          <BiSearchAlt2 />
        </NavLink>
      </Box>

      {/* Notes */}
      <Box className='nav_link'>
        <NavLink
          to='/notes'
          className={(navData) =>
            navData.isActive ? "nav_item active_nav_item" : "nav_item"
          }>
          <TbNotes />
        </NavLink>
      </Box>

      <Box className='nav_link notification_bell' onClick={handleNotification}>
        <NavLink
          to='/notification'
          className={(navData) =>
            navData.isActive ? "nav_item active_nav_item" : "nav_item"
          }>
          <BsBell />
          {notificationsCount > 0 && (
            <span className='notification_count'>{notificationsCount}</span>
          )}
        </NavLink>
      </Box>

      {/* Profile */}
      <Box className='nav_link'>
        <NavLink
          to={`/profile/${JSON.parse(localStorage.getItem("user"))._id}`}
          className={(navData) =>
            navData.isActive ? "nav_item active_nav_item" : "nav_item"
          }>
          <AiOutlineUser />
        </NavLink>
      </Box>

      {/* Message */}
      <Box className='nav_link'>
        <NavLink
          to='/message'
          className={(navData) =>
            navData.isActive ? "nav_item active_nav_item" : "nav_item"
          }>
          <TbMessages />
        </NavLink>
      </Box>

      {/* Settings */}
      <Box className='nav_link'>
        <NavLink
          to='/settings'
          className={(navData) =>
            navData.isActive ? "nav_item active_nav_item" : "nav_item"
          }>
          <AiOutlineSetting />
        </NavLink>
      </Box>

      {/* Logout */}
      <Box className='nav_link'>
        <NavLink
          to='/logout'
          className={(navData) =>
            navData.isActive ? "nav_item active_nav_item" : "nav_item"
          }>
          <FiLogOut />
        </NavLink>
      </Box>
    </Box>
  );
};

export default LeftNavbar;
