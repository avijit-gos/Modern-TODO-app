/** @format */

import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Box,
  Button,
  Avatar,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { BiHome, BiSearchAlt2 } from "react-icons/bi";
import {
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineClose,
} from "react-icons/ai";
import { TbNotes, TbMessages } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import Logo from "../../Assests/Images/writing.png";
import { Link, NavLink, useNavigate } from "react-router-dom";

const SideDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate(`/profile/${JSON.parse(localStorage.getItem("user"))._id}`);
  };
  return (
    <React.Fragment>
      <Drawer placement='right' isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader className='drawer_header'>
            <Box className='drawr_profile_section'>
              <Avatar
                src={JSON.parse(localStorage.getItem("user")).profilePic}
                className='drawer_profile_avatar'
              />
              <Box
                className='drawer_profile_info_section'
                onClick={navigateToProfile}>
                <span className='drawer_name'>
                  {JSON.parse(localStorage.getItem("user")).name}
                </span>
                <br />
                <span className='drawer_profile_username'>
                  @{JSON.parse(localStorage.getItem("user")).username}
                </span>
              </Box>
            </Box>
            <DrawerCloseButton />
          </DrawerHeader>

          <DrawerBody>
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </React.Fragment>
  );
};

export default SideDrawer;
