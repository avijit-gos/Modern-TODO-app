/** @format */

import { Box, Img } from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonComp from "../../Component/ButtonComp/ButtonComp";
import InputComp from "../../Component/InputComp/InputComp";
import axios from "axios";
import { GlobalContext } from "../../Context/Context";
import Pencil from "../../Assests/Images/pencil.png";

const Login = () => {
  const { setUser, setToken } = GlobalContext();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDisable, setIsDisable] = React.useState(true);
  const [err, setErr] = React.useState("");

  // *** Handle email change *** //
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // *** Handle password change *** //
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  React.useEffect(() => {
    if (!email.trim() || !password.trim()) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [email, password]);

  const handleLogin = () => {
    setIsLoading(true);
    setIsDisable(true);
    if (email.includes("@") && email.includes(".com")) {
      var data = JSON.stringify({
        // username: "",
        email: email,
        password: password,
      });
      var config = {
        method: "post",
        url: "http://localhost:5001/api/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setIsLoading(true);
          setIsDisable(false);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("token", JSON.stringify(response.data.token));
          setToken(response.data.token);
          setUser(response.data.user);
          navigate("/");
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      var data1 = JSON.stringify({
        username: email,
        // email: "",
        password: password,
      });
      var config1 = {
        method: "post",
        url: `${process.env.REACT_APP_LINK}login`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data1,
      };

      axios(config1)
        .then(function (response) {
          setIsLoading(true);
          setIsDisable(false);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("token", response.data.token);
          navigate("/");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <Box className='auth_container'>
      <Box className='auth_box_one'>
        <Box className='box_one_header'>Fizzo</Box>
        <Box className='box_one_text'>Let's sign you in</Box>
        <Box className='box_one_subtext'>Welcome back. You've been missed!</Box>
      </Box>
      <Box className='auth_box_two'>
        <Box className='box_two_header'>
          <Img src={Pencil} className='auth_logo' />
          <span className='auth_text'>Fizzo</span>
        </Box>
        <Box className='auth_box'>
          {/* Header section */}
          <Box className='header_section'>
            <span className='auth_header_text'>SignIn</span>
            <br />
            {err && <span className='err_message'>{err}</span>}
          </Box>

          <Box className='auth_form_section'>
            <InputComp
              type='email'
              placaeholder='Enter your email address'
              className='auth_input'
              value={email}
              handleChange={handleEmailChange}
            />

            <InputComp
              type='password'
              placaeholder='Enter password'
              className='auth_input'
              value={password}
              handleChange={handlePasswordChange}
            />

            <Box className='auth_link_section'>
              Don't have an account?{" "}
              <Link to='/register' className='auth_link'>
                SignUp
              </Link>
            </Box>

            {/* Auth button */}
            <ButtonComp
              title='SignUp'
              className='auth_btn'
              disableClassName='disable_auth_btn'
              isDisable={isDisable}
              isLoading={isLoading}
              clickHandle={handleLogin}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
