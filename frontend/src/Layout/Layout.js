/** @format */
import { Box } from "@chakra-ui/react";
import React from "react";
import { GlobalContext } from "../Context/Context";

// import Headers
import HomeHeader from "../Component/Headers/HomeHeaders/HomeHeader";
import LeftNavbar from "../Component/LeftNavbar/LeftNavbar";
import DefaultHeader from "../Component/Headers/DefaultHeader/DefaultHeader";
import MessageHeader from "../Component/Headers/MessageHeader/MessageHeader";

const Header = ({ pageType, title }) => {
  if (pageType === "home") {
    return <HomeHeader />;
  } else if (pageType === "chat") {
    console.log("Message page");
    return <MessageHeader title={title} />;
  } else {
    return <DefaultHeader title={title} />;
  }
};

const Layout = ({ children, title }) => {
  const { pageType } = GlobalContext();
  const [windowSize, setWindowSize] = React.useState(0);

  React.useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  return (
    <Box
      className={
        localStorage.getItem("mode") === "day"
          ? "container"
          : "container night_mode"
      }>
      <Header pageType={pageType} title={title} />

      <Box className='app_container'>
        <LeftNavbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
