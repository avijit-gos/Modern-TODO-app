/** @format */

import { Box, Button } from "@chakra-ui/react";
import { IoArrowBack } from "react-icons/io5";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BiMenuAltRight } from "react-icons/bi";
import SideDrawer from "../../DrawerComp/SideDrawer";

const DefaultHeader = ({ title }) => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const backToPrevPage = () => {
    navigate(-1);
  };
  return (
    <Box className='header_navbar_container'>
      <SideDrawer isOpen={openDrawer} onClose={setOpenDrawer} />
      <Box className='header_box_secion'>
        <Button className='back_btn' onClick={backToPrevPage}>
          <IoArrowBack />
        </Button>
        <span className='navbar_header_title'>{title}</span>
      </Box>
      <Button className='menu_btn' onClick={() => setOpenDrawer((p) => !p)}>
        <BiMenuAltRight
          className={
            localStorage.getItem("mode") === "night" ? "night_mode_icon" : null
          }
        />
      </Button>
    </Box>
  );
};

export default DefaultHeader;
