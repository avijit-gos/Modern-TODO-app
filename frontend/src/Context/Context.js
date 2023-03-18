/** @format */

import React, { createContext, useContext } from "react";

const StateContext = createContext();

function StateContextProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState("");
  const [pageType, setPageType] = React.useState("home");
  const [mode, setMode] = React.useState("day");
  const [updateProfile, setUpdateProfile] = React.useState(null);
  const [selectType, setSelectType] = React.useState("all");
  const [feedPosts, setFeedPosts] = React.useState([]);
  const [selectNote, setSelectNote] = React.useState(null);
  const [chats, setChats] = React.useState([]);
  const [selectChat, setSelectChat] = React.useState(null);
  const [updateTask, setUpdateTask] = React.useState(null);
  const [updateNote, setUpdateNote] = React.useState(null);
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
        selectType,
        setSelectType,
        feedPosts,
        setFeedPosts,
        selectNote,
        setSelectNote,
        chats,
        setChats,
        selectChat,
        setSelectChat,
        updateTask,
        setUpdateTask,
        updateNote,
        setUpdateNote,
      }}>
      {children}
    </StateContext.Provider>
  );
}

export const GlobalContext = () => {
  return useContext(StateContext);
};

export default StateContextProvider;
