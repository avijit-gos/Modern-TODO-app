/** @format */

import React from "react";
import Layout from "../../Layout/Layout";
import { Box } from "@chakra-ui/react";
import { GlobalContext } from "../../Context/Context";
import "./Profile.css";
import ProfileImageSection from "../../Component/ProfileComp/ProfileImageSection";
import { useParams, NavLink } from "react-router-dom";
import ProfileLoader from "../../Component/SkeletonLoader/ProfileLoader";

const Profile = () => {
  const { id } = useParams();
  const { setPageType, updateProfile } = GlobalContext();
  const [profile, setProfile] = React.useState(null);
  const { token } = GlobalContext();

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
        console.log(result);
        setProfile(result);
      })
      .catch((error) => console.log("error", error));
  }, [id, token, updateProfile]);

  return (
    <Layout title='Profile'>
      {profile ? (
        <Box className='profile_container'>
          <ProfileImageSection profileData={profile} />

          {/* Nested routes */}
          <Box className='nested_route_container'>
            {/* Notes */}
            <NavLink
              to={`/profile/${id}`}
              className='profile_navlink'
              activeClassName='active_profile_navlink_'>
              Notes
            </NavLink>

            {/* Task */}
            <NavLink
              to={`/profile/${id}/task`}
              className='profile_navlink'
              activeClassName='active_profile_navlink'>
              Task
            </NavLink>

            {/* Analytics */}
            <NavLink
              to={`/profile/${id}/analytics`}
              className='profile_navlink'
              activeClassName='active_profile_navlink'>
              Analytics
            </NavLink>
          </Box>
        </Box>
      ) : (
        <ProfileLoader />
      )}
    </Layout>
  );
};

export default Profile;
