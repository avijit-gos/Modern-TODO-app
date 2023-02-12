/** @format */

import React from "react";
import { Box } from "@chakra-ui/react";
import { Switch, Route } from "react-router-dom";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import "./App.css";
import Home from "./Pages/Home/Home";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Profile from "./Pages/Profile/Profile";
import Search from "./Pages/Search/Search";

function App() {
  return (
    <Box className='App'>
      <Switch>
        {/* Public routes */}
        <Route path='/register' exact comp={() => <Register />} />
        <Route path='/login' exact comp={() => <Login />} />

        {/* Protected routes */}
        <ProtectedRoute path='/' exact comp={Home} />
        <ProtectedRoute path='/profile/:id' comp={Profile} />
        <ProtectedRoute path='/search' exact comp={Search} />
      </Switch>
    </Box>
  );
}

export default App;
