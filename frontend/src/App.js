/** @format */

import React from "react";
import { Box } from "@chakra-ui/react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import "./App.css";
import Home from "./Pages/Home/Home";
// import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Profile from "./Pages/Profile/Profile";
import Search from "./Pages/Search/Search";
import Settings from "./Pages/Profile/Routes/ProfileSettings";
import { GlobalContext } from "./Context/Context";
import Tasks from "./Pages/Profile/Routes/Tasks";
import Notes from "./Pages/Profile/Routes/Notes";
import Analytics from "./Pages/Profile/Routes/Analytics";
import NotFound from "./Pages/NotFound/NotFound";
import NotesHome from "./Pages/Notes/NotesHome";
import Feed from "./Pages/Notes/Routes/Feed";
import FollowersFeed from "./Pages/Notes/Routes/FollowersFeed";
import NoteAnalytics from "./Pages/Analytics/NoteAnalytics";
import ViewFullNote from "./Pages/ViewFullNote/ViewFullNote";
import Chat from "./Pages/Chat/Chat";
import MessagePage from "./Pages/MessagePage/MessagePage";
import SearchChatPage from "./Pages/SearchChatPage/SearchChatPage";
import SettingsPage from "./Pages/SettingsPage/SettingsPage";

function App() {
  const { user, setUser, setToken, token } = GlobalContext();

  React.useEffect(() => {
    setToken(localStorage.getItem("token"));
    console.log(localStorage.getItem("token"));
  }, []);

  return (
    <Box className='App'>
      <Routes>
        App
        {/* Public routes */}
        <Route path='/register' exact element={<Register />} />
        <Route path='/login' exact element={<Login />} />
        {/* Protected routes */}
        {/* Home */}
        <Route path='/' exact element={<Home />} />
        {/* Search */}
        <Route path='/search' exact element={<Search />} />
        {/* Notes */}
        <Route path='/notes' exact element={<NotesHome />}>
          <Route path='' exact element={<Feed />} />
          <Route path='notes_following' exact element={<FollowersFeed />} />
        </Route>
        {/* Profile */}
        <Route path='/profile/:id' element={<Profile />}>
          <Route path='' element={<Notes />} />
          <Route path='task' element={<Tasks />} />
          <Route path='analytics' element={<Analytics />} />
        </Route>
        {/* Settings */}
        <Route path='/settings/:id' exact element={<Settings />} />
        {/* Note analytics page */}
        <Route path='/analytics/note/:id' exact element={<NoteAnalytics />} />
        {/* Full note view page */}
        <Route path='/full/note/:id' exact element={<ViewFullNote />} />
        {/* Full note view page */}
        <Route path='/message' exact element={<Chat />} />
        {/* Message */}
        <Route path='/message/:id' exact element={<MessagePage />} />
        {/* Chat search page */}
        <Route path='/chat/search' exact element={<SearchChatPage />} />
        {/* Settings page */}
        <Route path='/settings' exact element={<SettingsPage />} />
        {/* Not found link page */}
        <Route path='/*' exact element={<NotFound />} />
      </Routes>
    </Box>
  );
}

export default App;
