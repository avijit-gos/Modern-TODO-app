/** @format */

import React from "react";
import Layout from "../../Layout/Layout";
import { Box, Button } from "@chakra-ui/react";
import { GlobalContext } from "../../Context/Context";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import "./Notes.css";
import NotesForm from "../../Component/PostForm/NotesForm";

const NotesHome = () => {
  const { pathname } = useLocation();
  const { setPageType, setFeedPosts, setSelectType, selectType } =
    GlobalContext();
  const [isPath, setIsPath] = React.useState("notes");

  // *** Page layout
  React.useLayoutEffect(() => {
    setPageType("notes");
  }, []);

  const handleChangeType = (value) => {
    setFeedPosts([]);
    setSelectType(value);
  };

  React.useEffect(() => {
    console.log(pathname);
    if (pathname.includes("notes_following")) {
      setIsPath("notes_following");
    } else {
      setIsPath("notes");
    }
  });

  return (
    <Layout title={"Notes"}>
      <Box className='notes_page'>
        {/* Tags container */}
        <Box className='note_tags_container'>
          <Button
            className={
              selectType === "Educations"
                ? "note_tag active_note_tag"
                : "note_tag"
            }
            onClick={() => handleChangeType("Educations")}>
            Educational
          </Button>
          <Button
            className={
              selectType === "Financial"
                ? "note_tag active_note_tag"
                : "note_tag"
            }
            onClick={() => handleChangeType("Financial")}>
            Financial
          </Button>
          <Button
            className={
              selectType === "Medical" ? "note_tag active_note_tag" : "note_tag"
            }
            onClick={() => handleChangeType("Medical")}>
            Medical
          </Button>
          <Button
            className={
              selectType === "Technology"
                ? "note_tag active_note_tag"
                : "note_tag"
            }
            onClick={() => handleChangeType("Technology")}>
            Technology
          </Button>
          <Button
            className={
              selectType === "Others" ? "note_tag active_note_tag" : "note_tag"
            }
            onClick={() => handleChangeType("Others")}>
            Others
          </Button>
        </Box>

        {/* Nested tabs */}
        <Box className='notes_nested_tab_container'>
          <NavLink
            to=''
            className={
              isPath === "notes"
                ? "nested_navlink active_nested_navlink"
                : "nested_navlink"
            }>
            For you
          </NavLink>
          <NavLink
            to='notes_following'
            className={
              isPath === "notes_following"
                ? "nested_navlink active_nested_navlink"
                : "nested_navlink"
            }>
            Following
          </NavLink>
        </Box>
        <Outlet />

        {/* Post form */}
        <NotesForm />
      </Box>
    </Layout>
  );
};

export default NotesHome;
