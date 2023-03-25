/** @format */

import React from "react";
import Layout from "../../Layout/Layout";
import { Box } from "@chakra-ui/react";
import { GlobalContext } from "../../Context/Context";
import "./Profile.css";
import ProfileImageSection from "../../Component/ProfileComp/ProfileImageSection";
import { useParams, NavLink, Outlet, useLocation } from "react-router-dom";
import ProfileLoader from "../../Component/SkeletonLoader/ProfileLoader";
import ProfileMain from "./ProfileMain";

const Profile = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { setPageType, updateProfile, setUser } = GlobalContext();
  const [profile, setProfile] = React.useState(null);
  const [scroll, setScroll] = React.useState(0);
  const { token } = GlobalContext();
  const [windowSize, setWindowSize] = React.useState(window.innerWidth);
  const [isPath, setIsPath] = React.useState("profile");

  React.useEffect(() => {
    console.log(pathname);
    if (pathname.includes("task")) {
      setIsPath("task");
    } else if (pathname.includes("analytics")) {
      setIsPath("analytics");
    } else {
      setIsPath("profile");
    }
  });

  React.useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  React.useLayoutEffect(() => {
    setPageType("profile");
  }, []);

  // *** Fetch user profile details
  React.useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", localStorage.getItem("token"));
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_LINK}user/fetch/user/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setProfile(result);
        if (result._id === JSON.parse(localStorage.getItem("user"))._id) {
          setUser(result);
        }
      })
      .catch((error) => console.log("error", error));
  }, [id, token, updateProfile]);

  const scrollRef = React.useRef(null);

  function handleScroll() {
    if (scrollRef.current) {
      setScroll(scrollRef.current.scrollTop);
    }
  }

  return (
    <Layout title='Profile'>
      {profile ? (
        <Box
          className='profile_container'
          ref={scrollRef}
          onScroll={handleScroll}>
          <ProfileImageSection profileData={profile} />

          {JSON.parse(localStorage.getItem("user"))._id === id ? (
            <ProfileMain
              profile={profile}
              id={id}
              isPath={isPath}
              windowSize={windowSize}
              scroll={scroll}
            />
          ) : (
            <React.Fragment>
              {profile.profilePrivacy === "all" ? (
                <ProfileMain
                  profile={profile}
                  id={id}
                  isPath={isPath}
                  windowSize={windowSize}
                  scroll={scroll}
                />
              ) : (
                <React.Fragment>
                  {profile.profilePrivacy === "flwrs" ? (
                    <React.Fragment>
                      {profile.flwr.includes(
                        JSON.parse(localStorage.getItem("user"))._id
                      ) ? (
                        <ProfileMain
                          profile={profile}
                          id={id}
                          isPath={isPath}
                          windowSize={windowSize}
                          scroll={scroll}
                        />
                      ) : (
                        <Box className='private_account'>
                          This is a private account
                        </Box>
                      )}
                    </React.Fragment>
                  ) : (
                    <Box className='private_account'>
                      This is a private account
                    </Box>
                  )}
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </Box>
      ) : (
        <ProfileLoader />
      )}
    </Layout>
  );
};

export default Profile;
