/** @format */

import React from "react";
import { Box, Button, Spinner, useToast } from "@chakra-ui/react";
import InputComp from "../InputComp/InputComp";
import ModalComp from "../ModalComp/ModalComp";
import { useNavigate } from "react-router";

const SecuritySettings = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [password, setPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [isDisable, setIsDisable] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!password.trim() || !newPassword.trim()) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [password, newPassword]);

  // *** Handle update name
  const handleUpdatePassword = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", localStorage.getItem("token"));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      password: password,
      newPassword: newPassword,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_LINK}user/reset/password`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setPassword("");
        setNewPassword("");
        setIsDisable(true);
        setIsLoading(false);
        if (result.error) {
          toast({
            title: result.error.status !== 200 ? "Error" : "Success",
            description: `${result.error.message}`,
            status: result.error.status === 200 ? "success" : "error",
            duration: 9000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Success",
            description: `${result.msg}`,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          navigate("/login");
          localStorage.clear();
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <Box className='sub_settings_section'>
      <Box className='sub_settings_section_header'>Change your password</Box>
      <Box className='auth_form'>
        <InputComp
          type='password'
          className='auth_input'
          placaeholder='Enter current password'
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
        />

        <InputComp
          type='password'
          className='auth_input'
          placaeholder='Enter new password'
          value={newPassword}
          handleChange={(e) => setNewPassword(e.target.value)}
        />

        {!isDisable && (
          <Button className='upload_btn' onClick={handleUpdatePassword}>
            {isLoading ? <Spinner /> : <>Update</>}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default SecuritySettings;
