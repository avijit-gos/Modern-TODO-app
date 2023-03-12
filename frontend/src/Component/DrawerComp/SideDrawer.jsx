/** @format */

import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Box,
  Img,
} from "@chakra-ui/react";
import { BiHome } from "react-icons/bi";
import { AiOutlineUser, AiOutlineSetting } from "react-icons/ai";
import { TbNotes, TbMessages } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import Logo from "../../Assests/Images/writing.png";
import { Link, NavLink } from "react-router-dom";

const SideDrawer = ({ isOpen, onClose }) => {
  return (
    <React.Fragment>
      <Drawer placement='right' isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            {/* <Box className='left_navbar_logo_container'>
              <Img src={Logo} className='left_navbar_logo' />
            </Box> */}
          </DrawerHeader>

          <DrawerBody>
            {/* Home */}
            <Box className='nav_link'>
              <NavLink to='/' className='nav_item'>
                <BiHome />
              </NavLink>
            </Box>

            {/* Notes */}
            <Box className='nav_link'>
              <NavLink to='/notes' className='nav_item'>
                <TbNotes />
              </NavLink>
            </Box>

            {/* Profile */}
            <Box className='nav_link'>
              <NavLink
                to={`/profile/${JSON.parse(localStorage.getItem("user"))._id}`}
                className='nav_item'>
                <AiOutlineUser />
              </NavLink>
            </Box>

            {/* Message */}
            <Box className='nav_link'>
              <NavLink to='/message' className='nav_item active_nav_item'>
                <TbMessages />
              </NavLink>
            </Box>

            {/* Settings */}
            <Box className='nav_link'>
              <NavLink to='/settings' className='nav_item'>
                <AiOutlineSetting />
              </NavLink>
            </Box>

            {/* Logout */}
            <Box className='nav_link'>
              <NavLink to='/logout' className='nav_item'>
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
