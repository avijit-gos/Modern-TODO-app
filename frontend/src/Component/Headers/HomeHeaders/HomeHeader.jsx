/** @format */

import { Avatar, Box, Button, Img } from "@chakra-ui/react";
import Logo from "../../../Assests/Images/writing.png";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillSunFill, BsMoonFill } from "react-icons/bs";
import { GlobalContext } from "../../../Context/Context";
import { BiMenuAltRight, BiSearch } from "react-icons/bi";
import SearchDrawer from "../../DrawerComp/SearchDrawer";
import SideDrawer from "../../DrawerComp/SideDrawer";
import SearchForm from "../../SearchComp/SearchForm";

const HomeHeader = () => {
  const { mode, setMode } = GlobalContext();
  const [openSearch, setOpenSearch] = React.useState(false);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const navigate = useNavigate();

  const handleDayMode = () => {
    localStorage.setItem("mode", "day");
    setMode("day");
  };

  const handleNightMode = () => {
    localStorage.setItem("mode", "night");
    setMode("night");
  };

  return (
    <Box className='header_navbar_container'>
      {/*  */}
      <SideDrawer isOpen={openDrawer} onClose={setOpenDrawer} />
      {openSearch && (
        <SearchDrawer
          isOpen={openSearch}
          onClose={setOpenSearch}
          drawerBody={<SearchForm />}
        />
      )}
      <Box className='logo_box'>
        <Link to='/'>
          <Img src={Logo} className='logo' />
        </Link>
      </Box>

      <Box className='nav_link_container'>
        <Button className='search_btn'>
          <BiSearch
            onClick={() => setOpenSearch(true)}
            className={
              localStorage.getItem("mode") === "night"
                ? "night_mode_icon"
                : null
            }
          />
        </Button>
        {localStorage.getItem("mode") === "night" ? (
          <Button className='mode_changer_btn' onClick={handleDayMode}>
            <BsMoonFill className='moon' />
          </Button>
        ) : (
          <Button className='mode_changer_btn' onClick={handleNightMode}>
            <BsFillSunFill className='sun' />
          </Button>
        )}
        <Avatar
          src=''
          className='user_avatar'
          onClick={() =>
            navigate(`/profile/${JSON.parse(localStorage.getItem("user"))._id}`)
          }
        />
        {/* /profile/${JSON.parse(localStorage.getItem("user"))._id */}

        <Button className='menu_btn' onClick={() => setOpenDrawer((p) => !p)}>
          <BiMenuAltRight
            className={
              localStorage.getItem("mode") === "night"
                ? "night_mode_icon"
                : null
            }
          />
        </Button>
      </Box>
    </Box>
  );
};

export default HomeHeader;
