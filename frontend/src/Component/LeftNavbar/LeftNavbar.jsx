/** @format */

import { Box, Img, Tooltip } from "@chakra-ui/react";
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
        <Tooltip hasArrow label='Home' aria-label='A tooltip'>
          <NavLink to='/' className='nav_item active_nav_item'>
            <BiHome />
          </NavLink>
        </Tooltip>
      </Box>

      {/* Search */}
      <Box className='nav_link'>
        <Tooltip hasArrow label='Search' aria-label='A tooltip'>
          <NavLink to='/search' className='nav_item'>
            <BiSearchAlt2 />
          </NavLink>
        </Tooltip>
      </Box>

      {/* Notes */}
      <Box className='nav_link'>
        <Tooltip hasArrow label='Notes' aria-label='A tooltip'>
          <NavLink to='/notes' className='nav_item'>
            <TbNotes />
          </NavLink>
        </Tooltip>
      </Box>

      {/* Profile */}
      <Box className='nav_link'>
        <Tooltip hasArrow label='Profile' aria-label='A tooltip'>
          <NavLink
            to={`/profile/${JSON.parse(localStorage.getItem("user"))._id}`}
            className='nav_item'>
            <AiOutlineUser />
          </NavLink>
        </Tooltip>
      </Box>

      {/* Message */}
      <Box className='nav_link'>
        <Tooltip hasArrow label='Message' aria-label='A tooltip'>
          <NavLink to='/message' className='nav_item'>
            <TbMessages />
          </NavLink>
        </Tooltip>
      </Box>

      {/* Settings */}
      <Box className='nav_link'>
        <Tooltip hasArrow label='Settings' aria-label='A tooltip'>
          <NavLink to='/settings' className='nav_item'>
            <AiOutlineSetting />
          </NavLink>
        </Tooltip>
      </Box>

      {/* Logout */}
      <Box className='nav_link'>
        <Tooltip hasArrow label='Logout' aria-label='A tooltip'>
          <NavLink to='/logout' className='nav_item'>
            <FiLogOut />
          </NavLink>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default LeftNavbar;
