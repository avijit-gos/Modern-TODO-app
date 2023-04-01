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
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

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
        <Route
          path='/'
          exact
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        {/* Search */}
        <Route
          path='/search'
          exact
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />
        {/* Notes */}
        <Route
          path='/notes'
          exact
          element={
            <ProtectedRoute>
              <NotesHome />
            </ProtectedRoute>
          }>
          <Route
            path=''
            exact
            element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            }
          />
          <Route
            path='notes_following'
            exact
            element={
              <ProtectedRoute>
                <FollowersFeed />
              </ProtectedRoute>
            }
          />
        </Route>
        {/* Profile */}
        <Route
          path='/profile/:id'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }>
          <Route
            path=''
            element={
              <ProtectedRoute>
                <Notes />
              </ProtectedRoute>
            }
          />
          <Route
            path='task'
            element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            }
          />
          <Route
            path='analytics'
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />
        </Route>
        {/* Settings */}
        <Route
          path='/settings/:id'
          exact
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        {/* Note analytics page */}
        <Route
          path='/analytics/note/:id'
          exact
          element={
            <ProtectedRoute>
              <NoteAnalytics />
            </ProtectedRoute>
          }
        />
        {/* Full note view page */}
        <Route path='/full/note/:id' exact element={<ViewFullNote />} />
        {/* Full note view page */}
        <Route
          path='/message'
          exact
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        {/* Message */}
        <Route
          path='/message/:id'
          exact
          element={
            <ProtectedRoute>
              <MessagePage />
            </ProtectedRoute>
          }
        />
        {/* Chat search page */}
        <Route
          path='/chat/search'
          exact
          element={
            <ProtectedRoute>
              <SearchChatPage />
            </ProtectedRoute>
          }
        />
        {/* Settings page */}
        <Route
          path='/settings'
          exact
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        {/* Not found link page */}
        <Route path='/*' exact element={<NotFound />} />
      </Routes>
    </Box>
  );
}

export default App;
