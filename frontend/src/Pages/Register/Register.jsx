/** @format */

import { Box, Img } from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonComp from "../../Component/ButtonComp/ButtonComp";
import InputComp from "../../Component/InputComp/InputComp";
import axios from "axios";
import Pencil from "../../Assests/Images/pencil.png";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDisable, setIsDisable] = React.useState(true);
  const [err, setErr] = React.useState("");

  // *** Handle name change *** //
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // *** Handle email change *** //
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // *** Handle username change *** //
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // *** Handle password change *** //
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  React.useEffect(() => {
    if (!email.trim() || !username.trim() || !password.trim()) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [email, username, password]);

  // **** Handle Register **** //
  const handleRegister = () => {
    setIsLoading(true);
    setIsDisable(true);
    var data = JSON.stringify({
      name: name,
      username: username,
      email: email,
      password: password,
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_LINK}register`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
        setErr(error.response.data.error.message);
      });
  };

  return (
    <Box className='auth_container'>
      <Box className='auth_box_one'>
        <Box className='box_one_header'>Fizzo</Box>
        <Box className='box_one_text'>Start your journey with us</Box>
        <Box className='box_one_subtext_register'>
          Discover the world's best community for readers and writers.
        </Box>
      </Box>
      <Box className='auth_box_two'>
        <Box className='box_two_header'>
          <Img src={Pencil} className='auth_logo' />
          <span className='auth_text'>Fizzo</span>
        </Box>

        <Box className='auth_box'>
          {/* Header section */}
          <Box className='header_section'>
            <span className='auth_header_text'>SignUp</span>
            <br />
            {err && <span className='err_message'>{err}</span>}
          </Box>

          {/* Form section */}
          <Box className='auth_form_section'>
            <InputComp
              type='text'
              placaeholder='Enter your name'
              className='auth_input'
              value={name}
              handleChange={handleNameChange}
            />
            <InputComp
              type='email'
              placaeholder='Enter your email address'
              className='auth_input'
              value={email}
              handleChange={handleEmailChange}
            />

            <InputComp
              type='text'
              placaeholder='Enter your username'
              className='auth_input'
              value={username}
              handleChange={handleUsernameChange}
            />

            <InputComp
              type='password'
              placaeholder='Enter password'
              className='auth_input'
              value={password}
              handleChange={handlePasswordChange}
            />

            <Box className='auth_link_section'>
              Already have an account?{" "}
              <Link to='/login' login className='auth_link'>
                Login
              </Link>
            </Box>

            {/* Auth button */}
            <ButtonComp
              title='SignUp'
              className='auth_btn'
              disableClassName='disable_auth_btn'
              isDisable={isDisable}
              isLoading={isLoading}
              clickHandle={handleRegister}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
