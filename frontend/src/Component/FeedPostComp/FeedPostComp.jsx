/** @format */

import {
  Box,
  Img,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spinner,
  Textarea,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMoreHorizontal } from "react-icons/fi";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
  AiOutlineClose,
  AiTwotonePushpin,
} from "react-icons/ai";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { GoComment } from "react-icons/go";
import { IoIosShareAlt } from "react-icons/io";
import ModalComp from "../ModalComp/ModalComp";
import FormModal from "../ModalComp/FormModal";
import InputComp from "../InputComp/InputComp";
import axios from "axios";
import { GlobalContext } from "../../Context/Context";
import CommentForm from "../Comments/CommentForm";
import CommentCard from "../CommentCard/CommentCard";
import getTime from "../../Utils/getTime";

const tags = ["Educations", "Financial", "Medical", "Technology", "Others"];

const FeedPostComp = ({ data }) => {
  const { setSelectNote } = GlobalContext();
  const navigate = useNavigate();
  const toast = useToast();
  const [title, setTitle] = React.useState(data.title);
  const [description, setDescription] = React.useState(data.description);
  const [image, setImage] = React.useState(data.image || "");
  const [likes, setLikes] = React.useState(data.likes);
  const [likesCount, setLikesCount] = React.useState(data.likes.length || 0);

  const [dislikes, setDislikes] = React.useState(data.dislikes);
  const [dislikesCount, setDislikesCount] = React.useState(
    data.dislikes.length || 0
  );
  const [bookmark, setBookmark] = React.useState(data.bookmark);
  const [catagory, setCatagory] = React.useState(data.catagory);
  const [openCommentSection, setOpenCommentSection] = React.useState(false);
  const [pin, setPin] = React.useState(data.pin);
  const [sharesCount, setSharesCount] = React.useState(data.shares.length || 0);
  const [commentsCount, setCommentsCount] = React.useState(data.cmnt_count);
  const [openPinModal, setOpenPinModal] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [openBookmarkModal, setOpenBookmarkModal] = React.useState(false);
  const [openPrivacyModal, setOpenPrivacyModal] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [postId, setPostId] = React.useState("");
  const [isDisable, setIsDisable] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDelete, setIsDelete] = React.useState(false);
  const [comments, setComments] = React.useState(data.comment);
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(5);
  const [openShareModal, setOpenShareModal] = React.useState(false);

  // *** Handle pin modal
  const handlePinModal = (id) => {
    setOpenPinModal(true);
    setPostId(id);
  };
  // *** Handle pine note
  const pinnedTask = () => {
    setPin((prev) => !prev);
    var config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_LINK}note/pin/${postId}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios(config)
      .then(function (response) {
        // console.log(response.data);
        handleCloseModal();
        toast({
          title: "Success.",
          description: `${response.data.msg}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch(function (error) {
        console.log(error);
        handleCloseModal();
        toast({
          title: "Error.",
          description: `${error.response.data.msg}`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  // *** Handle edit modal
  const handleEditModal = (id) => {
    setOpenEditModal(true);
    setPostId(id);
  };
  // *** Handle edit note
  const handleEditNote = () => {
    setIsDisable(true);

    var data = JSON.stringify({
      title: title,
      description: description,
      catagory: catagory,
    });

    var config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_LINK}note/update/${postId}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        toast({
          title: "Success.",
          description: `${response.data.msg}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        handleCloseModal();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  React.useEffect(() => {
    if (!title.trim() || !description.trim() || !catagory.trim()) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [title, description, catagory]);

  // *** Handle Bookmark modal
  const handleBookmarkModal = (id) => {
    setOpenBookmarkModal(true);
    setPostId(id);
  };
  const handleBookmark = () => {
    if (!bookmark.includes(JSON.parse(localStorage.getItem("user"))._id)) {
      console.log("First");
      setBookmark((prev) => [
        ...prev,
        JSON.parse(localStorage.getItem("user"))._id,
      ]);
    } else {
      const arr = bookmark;
      const index = arr.indexOf(JSON.parse(localStorage.getItem("user"))._id);
      // console.log(index);
      arr.splice(index, 1);
      setBookmark(arr);
    }
    var config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_LINK}note/bookmark/${postId}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        handleCloseModal();
        toast({
          title: "Success.",
          description: `${response.data.msg}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch(function (error) {
        console.log(error);
        handleCloseModal();
        toast({
          title: "Error.",
          description: `${error.response.data.msg}`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  // *** Handle privacy modal
  const handlePrivacyModal = (id) => {
    setOpenPrivacyModal(true);
    setPostId(id);
  };

  // *** Handle Delete modal
  const handleDeleteModal = (id) => {
    setOpenDeleteModal(true);
    setPostId(id);
  };

  // *** Handle delete note
  const handleDeleteNote = () => {
    setIsDelete(true);
    var config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_LINK}note/delete/${postId}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        toast({
          title: "Success.",
          description: `${response.data.msg}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        handleCloseModal();
      })
      .catch(function (error) {
        console.log(error);
        setIsDelete(false);
      });
  };

  // *** Handle close modal
  const handleCloseModal = () => {
    setOpenPinModal(false);
    setOpenEditModal(false);
    setOpenBookmarkModal(false);
    setOpenPrivacyModal(false);
    setOpenDeleteModal(false);
    setPostId("");
    setOpenShareModal(false);
  };

  // *** Handle like
  const handleLike = (id) => {
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
    var config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_LINK}note/like/${id}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // *** Handle like
  const handleDislike = (id) => {
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
    var config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_LINK}note/dislike/${id}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // *** Handle redirect to analytics
  const handleRedirectToAdmin = (data) => {
    navigate(`/analytics/note/${data._id}`);
    setSelectNote(data);
  };

  // *** Handle open comment section
  const handleOpenComment = (id) => {
    setPostId(id);
    setOpenCommentSection((prev) => !prev);
  };

  const handleSharePostModal = (id) => {
    setPostId(id);
    setOpenShareModal(true);
  };

  return (
    <React.Fragment>
      {!isDelete && (
        <React.Fragment>
          <Box className='feed_post_container'>
            {/* Share post modal */}
            {openShareModal && (
              <ModalComp
                isOpen={openShareModal}
                onClose={handleCloseModal}
                title={<>Share post</>}
                body={
                  <Box className='modal_body_link'>
                    <Box className='ur_link_section'>
                      http://localhost:3000/full/note/{postId}
                    </Box>
                    <Button
                      className='copy_btn'
                      onClick={() =>
                        navigator.clipboard.writeText(
                          `http://localhost:3000/full/note/${postId}`
                        )
                      }>
                      Copy
                    </Button>
                  </Box>
                }
              />
            )}
            {/* Pinn post modal */}
            {openPinModal && (
              <ModalComp
                isOpen={openPinModal}
                onClose={handleCloseModal}
                title={pin ? <>Unpinn post</> : <>Pinn post</>}
                body={
                  pin ? (
                    <>Do you want to unpinn this post?</>
                  ) : (
                    <>Do you want to pinned this post?</>
                  )
                }
                footer={
                  <Button className='modal_footer_btn' onClick={pinnedTask}>
                    {pin ? <>Unpin</> : <>Pin</>}
                  </Button>
                }
              />
            )}

            {/* Edit Modal */}
            {openEditModal && (
              <FormModal
                isOpen={openEditModal}
                onClose={handleCloseModal}
                title={
                  <Box className='note_form_title'>
                    <span className='not_modal_title'>Create note</span>
                    {isDisable ? (
                      <Button
                        className='note_modal_header_close_btn'
                        onClick={handleCloseModal}>
                        Close
                      </Button>
                    ) : (
                      <Button
                        className='note_modal_header_btn'
                        onClick={handleEditNote}>
                        {isLoading ? <Spinner /> : <>Create</>}
                      </Button>
                    )}
                  </Box>
                }
                body={
                  <Box className='task_form_body_section'>
                    {/* Title */}
                    <InputComp
                      type='text'
                      placaeholder='Enter note title (require)'
                      className='auth_input'
                      value={title}
                      handleChange={(e) =>
                        setTitle(e.target.value.slice(0, 50))
                      }
                    />

                    {/* Description */}
                    <Textarea
                      type='text'
                      placeholder='Enter task details (optional)'
                      className='note_textarea'
                      value={description}
                      onChange={(e) =>
                        setDescription(e.target.value)
                      }></Textarea>

                    <Box className='tags_form'>
                      <span className='tag_title'>
                        What type of note is this?
                      </span>
                      <br />
                      {tags.map((data, index) => (
                        <Button
                          key={index}
                          className={
                            catagory === data
                              ? "tag_btn active_tag_btn"
                              : "tag_btn"
                          }
                          onClick={() => setCatagory(data)}>
                          {data}
                        </Button>
                      ))}
                      <br />

                      {catagory && catagory !== "all" && (
                        <span className='tag_title'>
                          You selected{" "}
                          <Button
                            className='tag_btn active_tag_btn'
                            // onClick={() => closeCatagory()}
                          >
                            {catagory}
                            <AiOutlineClose className='close_icon' />
                          </Button>
                        </span>
                      )}
                    </Box>
                  </Box>
                }
              />
            )}

            {/* Bookmark post modal */}
            {openBookmarkModal && (
              <ModalComp
                isOpen={openBookmarkModal}
                onClose={handleCloseModal}
                title={
                  bookmark.includes(
                    JSON.parse(localStorage.getItem("user"))._id
                  ) ? (
                    <>Remove post</>
                  ) : (
                    <>Save post</>
                  )
                }
                body={
                  bookmark.includes(
                    JSON.parse(localStorage.getItem("user"))._id
                  ) ? (
                    <>Do you want to remove this post?</>
                  ) : (
                    <>Do you want to bookmark this post?</>
                  )
                }
                footer={
                  <Button className='modal_footer_btn' onClick={handleBookmark}>
                    {bookmark.includes(
                      JSON.parse(localStorage.getItem("user"))._id
                    ) ? (
                      <>Remove</>
                    ) : (
                      <>Bookmark</>
                    )}
                  </Button>
                }
              />
            )}

            {/* Delete post modal */}
            {openDeleteModal && (
              <ModalComp
                isOpen={openDeleteModal}
                onClose={handleCloseModal}
                title={"Delete post"}
                body={"Do you want to delete this post"}
                footer={
                  <Button
                    className='modal_footer_btn delete_btn'
                    onClick={handleDeleteNote}>
                    Delete
                  </Button>
                }
              />
            )}

            {pin ? <AiTwotonePushpin className='pin_note' /> : null}
            {bookmark.includes(JSON.parse(localStorage.getItem("user"))._id) ? (
              <BsFillBookmarkStarFill className='bookmark_icon' />
            ) : null}

            {/* Post card Header */}
            <Box className='post_card_header'>
              <Box className='post_card_user_info_section'>
                <Link to={`/profile/${data.user._id}`}>
                  <Avatar
                    src={data.user.profilePic}
                    className='post_card_profilePic'
                  />
                </Link>
                <Box className='post_card_user_info'>
                  <Link to={`/profile/${data.user._id}`}>
                    <span className='post_card_name'>{data.user.name}</span>
                  </Link>
                  <span className='post_card_username'>
                    @{data.user.username}
                  </span>
                  <span className='post_card_username timestamp'>
                    {getTime(new Date(), new Date(data.createdAt))}
                  </span>
                </Box>
              </Box>
              <Menu>
                <MenuButton
                  className='card_menu_btn'
                  as={Button}
                  rightIcon={<FiMoreHorizontal />}></MenuButton>
                <MenuList>
                  {/* Pinn menu item */}
                  {JSON.parse(localStorage.getItem("user"))._id ===
                    data.user._id && (
                    <MenuItem
                      className='card_menu_list'
                      onClick={() => handlePinModal(data._id)}>
                      Pin
                    </MenuItem>
                  )}

                  {/* Edit menu item */}
                  {JSON.parse(localStorage.getItem("user"))._id ===
                    data.user._id && (
                    <MenuItem
                      className='card_menu_list'
                      onClick={() => handleEditModal(data._id)}>
                      Edit
                    </MenuItem>
                  )}

                  {/* Bookmark menu item */}
                  {JSON.parse(localStorage.getItem("user"))._id ===
                    data.user._id && (
                    <MenuItem
                      className='card_menu_list'
                      onClick={() => handleBookmarkModal(data._id)}>
                      Bookmark
                    </MenuItem>
                  )}

                  {/* Download pdf menu item */}
                  <MenuItem className='card_menu_list'>
                    Download as pdf
                  </MenuItem>

                  {/* Analytics menu item */}
                  {JSON.parse(localStorage.getItem("user"))._id ===
                    data.user._id && (
                    <MenuItem
                      className='card_menu_list'
                      onClick={() => handleRedirectToAdmin(data)}>
                      Analytics
                    </MenuItem>
                  )}

                  {/* Privacy menu item */}
                  {JSON.parse(localStorage.getItem("user"))._id ===
                    data.user._id && (
                    <MenuItem
                      className='card_menu_list'
                      onClick={() => handlePrivacyModal(data._id)}>
                      Privacy
                    </MenuItem>
                  )}

                  {/* Delete menu item */}
                  {JSON.parse(localStorage.getItem("user"))._id ===
                    data.user._id && (
                    <MenuItem
                      className='card_menu_list delete'
                      onClick={() => handleDeleteModal(data._id)}>
                      Delete
                    </MenuItem>
                  )}
                </MenuList>
              </Menu>
            </Box>

            {/* Post card body */}
            <Box className='post_card_body_section'>
              <p className='card_title'>{title}</p>
              {image && <Img src={image} className='post_card_image' />}
              <p className='card_description'>
                {description.slice(0, 70)}...
                <Link to={`/full/note/${data._id}`} className='card_link'>
                  Read more
                </Link>
              </p>
            </Box>

            {/* Post card footer */}
            <Box className='post_card_footer_section'>
              <Button
                className='post_card_footer_btn like_btn'
                onClick={() => handleLike(data._id)}>
                {likes.includes(
                  JSON.parse(localStorage.getItem("user"))._id
                ) ? (
                  <AiFillLike className='like_fill' />
                ) : (
                  <AiOutlineLike />
                )}
                <span className='like_count'>{likesCount}</span>
              </Button>

              {/* Dislike */}
              <Button
                className='post_card_footer_btn dislike_btn'
                onClick={() => handleDislike(data._id)}>
                {dislikes.includes(
                  JSON.parse(localStorage.getItem("user"))._id
                ) ? (
                  <AiFillDislike className='dislike_fill' />
                ) : (
                  <AiOutlineDislike />
                )}
                <span className='like_count'>{dislikesCount}</span>
              </Button>

              {/* Comment */}
              <Button
                className='post_card_footer_btn cmnt_btn'
                onClick={() => handleOpenComment(data._id)}>
                <GoComment />
                <span className='like_count'>{commentsCount}</span>
              </Button>

              {/* Share */}
              <Button
                className='post_card_footer_btn'
                onClick={() => handleSharePostModal(data._id)}>
                <IoIosShareAlt />
              </Button>
            </Box>
          </Box>

          {/* Comment section */}
          {openCommentSection && (
            <Box className='comment_section_container'>
              {/* Comment Input section */}
              <Box className='comment_form_section'>
                <CommentForm
                  postId={postId}
                  setCommentsCount={setCommentsCount}
                  setOpenCommentSection={setOpenCommentSection}
                  setComments={setComments}
                />
              </Box>

              {/* Comment card section */}
              <Box className='comment_card_section'>
                {(comments || []).length > 0 ? (
                  <Box>
                    {comments.map((data) => (
                      <CommentCard
                        key={data._id}
                        data={data}
                        setCommentsCount={setCommentsCount}
                        setComments={setComments}
                        comments={comments}
                      />
                    ))}
                    {commentsCount > 1 && (
                      <Link
                        to={`/full/note/${data._id}`}
                        className='comments_link'>
                        View more comments
                      </Link>
                    )}
                  </Box>
                ) : (
                  <Box className='empty_comment'>No comment available</Box>
                )}
              </Box>
            </Box>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default FeedPostComp;
