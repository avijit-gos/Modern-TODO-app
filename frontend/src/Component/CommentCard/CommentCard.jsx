/** @format */

import {
  Box,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useToast,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { FiMoreHorizontal } from "react-icons/fi";
import ModalComp from "../ModalComp/ModalComp";
import axios from "axios";
import { socket } from "../../App";

const CommentCard = ({ data, setComments, comments, setCommentsCount }) => {
  const toast = useToast();
  const [comment, setComment] = React.useState(data.comment);
  const [likes, setLikes] = React.useState(data.likes);
  const [likeCount, setLikesCount] = React.useState(data.likes.length);
  const [dislikes, setDislikes] = React.useState(data.dislikes);
  const [dislikeCount, setDislikesCount] = React.useState(data.dislikes.length);

  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [cmntId, setCmntId] = React.useState("");
  const [isDisable, setIsDisable] = React.useState(true);
  const [text, setText] = React.useState(data.comment);
  const [postId, setPostId] = React.useState("");

  // *** Handle close modal
  const handleCloseModal = () => {
    setOpenDeleteModal(false);
    setOpenEditModal(false);
    setCmntId("");
    setPostId("");
  };

  // *** Handle edit comment
  const handleEditComment = (id) => {
    setOpenEditModal(true);
    setCmntId(id);
  };
  React.useEffect(() => {
    if (!text.trim()) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [text]);
  const editComment = () => {
    setIsDisable(true);
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", localStorage.getItem("token"));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      comment: text,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_LINK}note/comment/edit/${cmntId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setComment(text);
        setOpenEditModal(false);
        toast({
          title: "Success",
          description: `${result.msg}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => console.log("error", error));
  };

  // Delete comment handler
  const handleDeleteComment = (id, post) => {
    setOpenDeleteModal(true);
    setCmntId(id);
    setPostId(post);
  };
  const handleDelete = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", localStorage.getItem("token"));

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_LINK}note/comment/${cmntId}/${postId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const arr = comments;
        const temp = arr.filter((data) => data._id !== cmntId);
        setComments(temp);
        handleCloseModal();
        setCommentsCount((prev) => prev - 1);
        toast({
          title: "Success",
          description: `${result.msg}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => console.log("error", error));
  };

  // *** Handle comment like
  const handleCommentLike = (id) => {
    if (dislikes.includes(JSON.parse(localStorage.getItem("user"))._id)) {
      console.log("Dislike first");
      const dislikeArr = dislikes;
      const index = dislikeArr.indexOf(
        JSON.parse(localStorage.getItem("user"))._id
      );
      // console.log(index);
      dislikeArr.splice(index, 1);
      setDislikes(dislikeArr);
      setDislikesCount((p) => p - 1);
      setLikes((prev) => [
        ...prev,
        JSON.parse(localStorage.getItem("user"))._id,
      ]);
      setLikesCount((p) => p + 1);
    } else {
      if (!likes.includes(JSON.parse(localStorage.getItem("user"))._id)) {
        setLikes((prev) => [
          ...prev,
          JSON.parse(localStorage.getItem("user"))._id,
        ]);
        setLikesCount((p) => p + 1);
      } else {
        const likeArr = likes;
        const index = likeArr.indexOf(
          JSON.parse(localStorage.getItem("user"))._id
        );
        likeArr.splice(index, 1);
        setLikes(likeArr);
        setLikesCount((p) => p - 1);
      }
    }
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_LINK}note/comment/like/${id}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        if (response.data.result) {
          socket.emit("notification receive", response.data);
        } else {
          console.log("Remove");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // *** Handle dislike comment
  const handleDislikeComment = (id) => {
    if (likes.includes(JSON.parse(localStorage.getItem("user"))._id)) {
      const likesArr = likes;
      const index = likesArr.indexOf(
        JSON.parse(localStorage.getItem("user"))._id
      );
      // console.log(index);
      likesArr.splice(index, 1);
      setLikes(likesArr);
      setLikesCount((p) => p - 1);
      setDislikes((prev) => [
        ...prev,
        JSON.parse(localStorage.getItem("user"))._id,
      ]);
      setDislikesCount((p) => p + 1);
    } else {
      if (!dislikes.includes(JSON.parse(localStorage.getItem("user"))._id)) {
        setDislikes((prev) => [
          ...prev,
          JSON.parse(localStorage.getItem("user"))._id,
        ]);
        setDislikesCount((p) => p + 1);
      } else {
        const dislikesArr = dislikes;
        const index = dislikesArr.indexOf(
          JSON.parse(localStorage.getItem("user"))._id
        );
        dislikesArr.splice(index, 1);
        setDislikes(dislikesArr);
        setDislikesCount((p) => p - 1);
      }
    }
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_LINK}note/comment/dislike/${id}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        if (response.data.result) {
          socket.emit("notification receive", response.data);
        } else {
          console.log("Remove");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box className='comment_card'>
      {/* Edit modal */}
      {openEditModal && (
        <ModalComp
          onClose={handleCloseModal}
          isOpen={openEditModal}
          title='Edit comment'
          body={
            <Textarea
              className='cmnt_textarea'
              placeholder='Enter comment'
              value={text}
              onChange={(e) =>
                setText(e.target.value.slice(0, 120))
              }></Textarea>
          }
          footer={
            <Box>
              {isDisable ? (
                <Button className='disable_edit_modal_btn edit_modal_btn'>
                  Update
                </Button>
              ) : (
                <Button className='edit_modal_btn' onClick={editComment}>
                  Update
                </Button>
              )}
            </Box>
          }
        />
      )}

      {/* Delete modal */}
      {openDeleteModal && (
        <ModalComp
          onClose={handleCloseModal}
          isOpen={openDeleteModal}
          title='Delete comment'
          body={"Do you want to delete this comment?"}
          footer={
            <Button
              className='modal_footer_btn delete_btn'
              onClick={handleDelete}>
              Delete
            </Button>
          }
        />
      )}

      {/* Comment card header */}
      <Box className='comment_card_header'>
        {/* User info */}
        <Box className='comment_user_section'>
          <Avatar
            src={data.user.profilePic || ""}
            className='cmnt_user_avatar'
          />
          <Link to={`/profile/${data.user._id}`} className='cmnt_user_name'>
            {data.user.name}
          </Link>
          <span className='cmnt_user_username'>@{data.user.username}</span>
        </Box>
        <Menu>
          <MenuButton className='cmnt_card_more_btn'>
            <FiMoreHorizontal className='cmnt_card_more_icon' />
          </MenuButton>
          <MenuList>
            {JSON.parse(localStorage.getItem("user"))._id === data.user._id && (
              <MenuItem
                className='cmnt_menu_item'
                onClick={() => handleEditComment(data._id)}>
                Edit
              </MenuItem>
            )}

            {JSON.parse(localStorage.getItem("user"))._id === data.user._id && (
              <MenuItem
                className='delete cmnt_menu_item'
                onClick={() => handleDeleteComment(data._id, data.postId)}>
                Delete
              </MenuItem>
            )}
          </MenuList>
        </Menu>
      </Box>

      {/* Comment card body */}
      <Box className='cmnt_card_body'>{comment}</Box>

      {/* Comment card footer */}
      <Box className='cmnt_card_footer'>
        <Button
          className={
            likes.includes(JSON.parse(localStorage.getItem("user"))._id)
              ? "cmnt_card_footer_btn active_cmnt_like"
              : "cmnt_card_footer_btn cmnt_like"
          }
          onClick={() => handleCommentLike(data._id)}>
          {likes.includes(JSON.parse(localStorage.getItem("user"))._id) ? (
            <AiFillLike className='cmnt_like_icon' />
          ) : (
            <AiOutlineLike />
          )}
          <span className='cmnt_like_count'>{likeCount}</span>
        </Button>
        <Button
          className='cmnt_card_footer_btn'
          onClick={() => handleDislikeComment(data._id)}>
          {dislikes.includes(JSON.parse(localStorage.getItem("user"))._id) ? (
            <AiFillDislike className='cmnt_dislike_icon' />
          ) : (
            <AiOutlineDislike />
          )}
          <span className='cmnt_dislike_count'>{dislikeCount}</span>
        </Button>
      </Box>
    </Box>
  );
};

export default CommentCard;
