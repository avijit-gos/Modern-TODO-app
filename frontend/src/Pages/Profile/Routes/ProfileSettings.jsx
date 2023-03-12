/** @format */

import React from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../../Context/Context";
import { Box } from "@chakra-ui/react";
import Layout from "../../../Layout/Layout";
import ProfileSettingsComp from "../../../Component/ProfileComp/ProfileSettingsComp";

const ProfileSettings = () => {
  const { setPageType } = GlobalContext();
  const { id } = useParams();
  const [profile, setProfile] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useLayoutEffect(() => {
    setPageType("settings");
  }, []);

  React.useEffect(() => {
    setIsLoading(true);
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
        setIsLoading(false);
        setProfile(result);
      })
      .catch((error) => console.log("error", error));
  }, [id]);

  return (
    <Layout title='Settings'>
      {!isLoading ? (
        <Box className='settings_container'>
          {profile ? (
            <ProfileSettingsComp profileData={profile} />
          ) : (
            <Box className='empty_task_container'>No user avaliable</Box>
          )}
        </Box>
      ) : (
        <>Loading</>
      )}
    </Layout>
  );
};

export default ProfileSettings;
