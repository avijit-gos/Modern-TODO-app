/** @format */

import { Avatar, Box, Button, Img } from "@chakra-ui/react";
import Logo from "../../../Assests/Images/writing.png";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsBell } from "react-icons/bs";
import { GlobalContext } from "../../../Context/Context";
import { BiMenuAltRight, BiSearch } from "react-icons/bi";
import SearchDrawer from "../../DrawerComp/SearchDrawer";
import SideDrawer from "../../DrawerComp/SideDrawer";
import SearchForm from "../../SearchComp/SearchForm";
import axios from "axios";

const HomeHeader = () => {
  const {
    setNotifications,
    page,
    limit,
    notificationsCount,
    setNotificationsCount,
  } = GlobalContext();
  const [openSearch, setOpenSearch] = React.useState(false);
  const [openDrawer, setOpenDrawer] = React.useState(false);
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

        <Button className='notification_container' onClick={handleNotification}>
          <BsBell />
          {notificationsCount > 0 && (
            <span className='header_notification_count'>
              {notificationsCount}
            </span>
          )}
        </Button>

        <Avatar
          src={`${JSON.parse(localStorage.getItem("user")).profilePic}`}
          className='user_avatar'
          onClick={() =>
            navigate(`/profile/${JSON.parse(localStorage.getItem("user"))._id}`)
          }
        />

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
