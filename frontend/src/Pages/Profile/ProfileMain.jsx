/** @format */

import React from "react";
import { Box } from "@chakra-ui/react";
import { NavLink, Outlet } from "react-router-dom";

const ProfileMain = ({ profile, id, isPath, windowSize, scroll }) => {
  return (
    <React.Fragment>
      {JSON.parse(localStorage.getItem("user"))._id === id && (
        <React.Fragment>
          {/* Nested routes */}
          <Box className='nested_route_container'>
            {/* Notes */}
            <NavLink
              to={`/profile/${id}`}
              className={
                isPath === "profile"
                  ? "profile_navlink active_profile_navlink"
                  : "profile_navlink"
              }>
              Notes
            </NavLink>

            {/* Task */}
            <NavLink
              to={`/profile/${id}/task`}
              className={
                isPath === "task"
                  ? "profile_navlink active_profile_navlink"
                  : "profile_navlink"
              }>
              Task
            </NavLink>

            {/* Analytics */}
            <NavLink
              to={`/profile/${id}/analytics`}
              className={
                isPath === "analytics"
                  ? "profile_navlink active_profile_navlink"
                  : "profile_navlink"
              }>
              Analytics
            </NavLink>
          </Box>
        </React.Fragment>
      )}

      <Box
        className={
          windowSize <= 699
            ? scroll >= 256
              ? "task_route_container scroll_task_route_container"
              : "task_route_container"
            : ""
        }>
        <Outlet />
      </Box>
    </React.Fragment>
  );
};

export default ProfileMain;
