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
  const [updateChat, setUpdateChat] = React.useState(null);

  const [messages, setMessages] = React.useState([]);
  const [updateMessage, setUpdateMessage] = React.useState(null);
  const [notifications, setNotifications] = React.useState([]);
  const [notificationsCount, setNotificationsCount] = React.useState(0);

  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(15);
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
        updateChat,
        setUpdateChat,
        messages,
        setMessages,
        updateMessage,
        setUpdateMessage,
        notifications,
        setNotifications,
        page,
        setPage,
        limit,
        setLimit,
        notificationsCount,
        setNotificationsCount,
      }}>
      {children}
    </StateContext.Provider>
  );
}

export const GlobalContext = () => {
  return useContext(StateContext);
};

export default StateContextProvider;
