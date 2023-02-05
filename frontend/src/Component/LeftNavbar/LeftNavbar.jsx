/** @format */

import { Box, Img } from "@chakra-ui/react";
import React from "react";
import { BiHome } from "react-icons/bi";
import { AiOutlineUser, AiOutlineSetting } from "react-icons/ai";
import { TbNotes, TbMessages } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import { BiSearchAlt2 } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../Assests/Images/writing.png";
import "./Navbar.css";

const LeftNavbar = () => {
  return (
    <Box className='left_navbar_container'>
      {/* Logo container */}
      <Box className='left_navbar_logo_container'>
        <Img src={Logo} className='left_navbar_logo' />
      </Box>
      {/* Home */}
      <Box className='nav_link'>
        <NavLink to='/' className='nav_item' activeClassName='active_nav_item'>
          <BiHome />
        </NavLink>
      </Box>

      {/* Search */}
      <Box className='nav_link'>
        <NavLink
          to='/search'
          className='nav_item'
          activeClassName='active_nav_item'>
          <BiSearchAlt2 />
        </NavLink>
      </Box>

      {/* Notes */}
      <Box className='nav_link'>
        <NavLink
          to='/notes'
          className='nav_item'
          activeClassName='active_nav_item'>
          <TbNotes />
        </NavLink>
      </Box>

      {/* Profile */}
      <Box className='nav_link'>
        <NavLink
          to={`/profile/${JSON.parse(localStorage.getItem("user"))._id}`}
          className='nav_item'
          activeClassName='active_nav_item'>
          <AiOutlineUser />
        </NavLink>
      </Box>

      {/* Message */}
      <Box className='nav_link'>
        <NavLink
          to='/message'
          className='nav_item'
          activeClassName='active_nav_item'>
          <TbMessages />
        </NavLink>
      </Box>

      {/* Settings */}
      <Box className='nav_link'>
        <NavLink
          to='/settings'
          className='nav_item'
          activeClassName='active_nav_item'>
          <AiOutlineSetting />
        </NavLink>
      </Box>

      {/* Logout */}
      <Box className='nav_link'>
        <NavLink
          to='/logout'
          className='nav_item'
          activeClassName='active_nav_item'>
          <FiLogOut />
        </NavLink>
      </Box>
    </Box>
  );
};

export default LeftNavbar;
