/** @format */

import React, { createContext, useContext } from "react";

const StateContext = createContext();

function StateContextProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState("");
  const [pageType, setPageType] = React.useState("home");
  const [mode, setMode] = React.useState("day");
  const [updateProfile, setUpdateProfile] = React.useState(null)
  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        pageType,
        setPageType,
        mode,
        setMode,
        updateProfile,
        setUpdateProfile,
      }}>
      {children}
    </StateContext.Provider>
  );
}

export const GlobalContext = () => {
  return useContext(StateContext);
};

export default StateContextProvider;
