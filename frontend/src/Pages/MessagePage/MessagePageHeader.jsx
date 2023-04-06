/** @format */

import React from "react";
import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Img,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { GlobalContext } from "../../Context/Context";
import { IoArrowBack } from "react-icons/io5";
import { CgMoreO } from "react-icons/cg";
import { useNavigate, useParams } from "react-router";
import ModalComp from "../../Component/ModalComp/ModalComp";
import { AiOutlineClose } from "react-icons/ai";
import { BsCloudUpload } from "react-icons/bs";
import ChatUserList from "../../Component/UserList/ChatUser";
import ChatCreateModal from "../../Component/ModalComp/ChatCreateModal";
import { TbUserSearch } from "react-icons/tb";
import InputComp from "../../Component/InputComp/InputComp";
import UserListLoader from "../../Component/SkeletonLoader/UserListLoader";

import { selectChatName } from "../../Utils/selectChatName";
import axios from "axios";
import { socket } from "../../App";

const MessagePageHeader = () => {
  const toast = useToast();
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectChat, setUpdateChat, setSelectChat, updateChat } =
    GlobalContext();
  const [openImageModal, setOpenImageModal] = React.useState(false);
  const [isDisableImageBtn, setIsDisableImageBtn] = React.useState(true);
  const [isLoadingImageBtn, setIsLoadjingImageBtn] = React.useState(false);
  const [image, setImage] = React.useState("");
  const [prevImage, setPrevImage] = React.useState("");
  const [groupImage, setGroupImage] = React.useState(selectChat.image);
  const [groupName, setGroupName] = React.useState(selectChat.name);
  const [openAddMemberModal, setOpenAddMemberModal] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [disable, setDisable] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [userList, setUserList] = React.useState([]);
  const [members, setMembers] = React.useState([]);
  const [membersId, setMembersId] = React.useState([]);
  const [openRemoveMemberModal, setOpenRemoveMemberModal] =
    React.useState(false);
  const [openModModal, setOpenModModal] = React.useState(false);
  const [openSettingsModal, setOpenSettingsModal] = React.useState(false);
  const [groupDes, setGroupDes] = React.useState(selectChat.description || "");
  const [groupPrivacy, setGroupPrivacy] = React.useState(
    selectChat.privacy || "public"
  );
  const [isSettingsDisable, setIsSettingsDisable] = React.useState(true);
  const [openGroupModal, setOpenGroupModal] = React.useState(false);
  const [openGroupLeaveModal, setOpenGroupLeaveModal] = React.useState(false);
  const [openGroupLDeleteModal, setOpenGroupDeleteModal] =
    React.useState(false);

  const backToPrevPage = () => {
    navigate(-1);
  };

  // *** Close modal
  const closeModal = () => {
    setOpenImageModal(false);
    setOpenAddMemberModal(false);
    setOpenRemoveMemberModal(false);
    setOpenModModal(false);
    setOpenSettingsModal(false);
    setOpenGroupModal(false);
    setOpenGroupLeaveModal(false);
    setOpenGroupDeleteModal(false);
  };

  // *** Handle openImage modal
  const handleOpenImageModal = () => {
    setOpenImageModal(true);
  };

  // *** Handle change file input
  const handleFileChange = (e) => {
    setPrevImage(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  // *** Close preview image
  const closePreviewImage = () => {
    setImage("");
    setPrevImage("");
  };

  React.useEffect(() => {
    if (image) {
      setIsDisableImageBtn(false);
    } else {
      setIsDisableImageBtn(true);
    }
  }, [image]);

  // *** Handle upload group image
  const handleUploadGroupImage = () => {
    setIsDisableImageBtn(true);
    setIsLoadjingImageBtn(true);
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", localStorage.getItem("token"));

    var formdata = new FormData();
    formdata.append("image", image);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_LINK}chat/group/image/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setPrevImage("");
        setImage(null);
        closeModal();
        setGroupImage(prevImage);
        setIsLoadjingImageBtn(false);
      })
      .catch((error) => console.log("error", error));
  };

  // *** HAndle open add member modal
  const handleOpenAddMemberModal = () => {
    setOpenAddMemberModal(true);
  };

  // Search user
  React.useEffect(() => {
    if (searchText.trim()) {
      setDisable(false);
      setIsLoading(true);
      var myHeaders = new Headers();
      myHeaders.append("x-access-token", localStorage.getItem("token"));
      myHeaders.append("Content-Type", "application/json");
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      fetch(
        `${process.env.REACT_APP_LINK}user/find/user?key=${searchText}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setUserList(result);
          setIsLoading(false);
        })
        .catch((error) => console.log("error", error));
    } else {
      // setDisable(true);
      // setMsg("No recent searches.");
    }
  }, [searchText]);

  // *** Element group members
  const elementMember = (id) => {
    alert("Should be added");
  };

  // ** Handle add new members
  const handleAddMembers = (userId) => {
    var data = JSON.stringify({
      userId: userId,
    });

    var config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_LINK}chat/group/add/members/${id}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.parse(localStorage.getItem("user")).group);
        setUpdateChat(response.data);
        closeModal();
        setUserList([]);
        setSearchText("");
        if (JSON.parse(localStorage.getItem("user")).group.includes(id)) {
          navigate(-1);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // handle open Remove user modal
  const handleRemoveMember = () => {
    setOpenRemoveMemberModal(true);
  };

  // Handle group mods modal
  const handleGroupMods = () => {
    setOpenModModal(true);
  };

  // *** Handle Add/Remove group mods
  const handleAddMod = (userId) => {
    var data = JSON.stringify({
      userId: userId,
    });

    var config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_LINK}chat/group/add/mod/${id}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setUpdateChat(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // *** Handle open Settings modal
  const handleOpenSettingsModal = () => {
    setOpenSettingsModal(true);
  };

  React.useEffect(() => {
    if (!groupName.trim()) {
      setIsSettingsDisable(true);
    } else {
      setIsSettingsDisable(false);
    }
  }, [groupName]);

  // *** Handle update group info
  const updateGroupInfo = () => {
    var data = JSON.stringify({
      name: groupName,
      description: groupDes,
      privacy: groupPrivacy,
    });

    var config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_LINK}chat/group/name/${id}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        closeModal();
        toast({
          title: "Updated.",
          description: `${response.data.msg}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleOpenGroupModal = () => {
    setOpenGroupLeaveModal(true);
  };

  const handleDeleteModal = () => {
    setOpenGroupDeleteModal(true);
  };

  const handleDeleteGroup = () => {
    var config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_LINK}chat/${id}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setUpdateChat(response.data);
        navigate(-1);
        toast({
          title: "Delete.",
          description: `Chat has been deleted`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Handle redirect to profile
  const handleRedirect = (id) => {
    navigate(`/profile/${id}`);
  };

  return (
    <Box className='message_page_header'>
      {selectChat && (
        <React.Fragment>
          {/* Open image modal */}
          {openImageModal && (
            <ModalComp
              isOpen={openImageModal}
              onClose={closeModal}
              title='Upload group image'
              body={
                <Box className='modal_image_body'>
                  {prevImage ? (
                    <Box className='preview_image_box'>
                      <Img src={prevImage} className='modal_preview_image' />
                      <Button
                        className='modal_prev_image_close_btn'
                        onClick={closePreviewImage}>
                        <AiOutlineClose />
                      </Button>
                    </Box>
                  ) : (
                    <Box className='modal_file'>
                      <label htmlFor='modal_file'>
                        <BsCloudUpload className='upload_modal' />
                        <Input
                          type='file'
                          className='file_input'
                          id='modal_file'
                          onChange={(e) => handleFileChange(e)}
                        />
                      </label>
                    </Box>
                  )}
                </Box>
              }
              footer={
                <Box className='modal_footer_section'>
                  {isDisableImageBtn ? (
                    <Button className='disable_modal_btn'>
                      {isLoadingImageBtn ? <Spinner /> : <>Upload</>}
                    </Button>
                  ) : (
                    <Button
                      className='modal_btn'
                      onClick={handleUploadGroupImage}>
                      Upload
                    </Button>
                  )}
                </Box>
              }
            />
          )}

          {/* Add new members in group modal */}
          {openAddMemberModal && (
            <ChatCreateModal
              isOpen={openAddMemberModal}
              onClose={closeModal}
              title={
                <Box className='chat_modal_header'>
                  <span className='chat_modal_header_title'>Add member</span>
                  {(membersId || []).length > 0 ? (
                    <Button
                      className='chat_modal_close_btn'
                      onClick={closeModal}>
                      <AiOutlineClose />
                    </Button>
                  ) : (
                    <Button
                      className='chat_modal_close_btn'
                      onClick={closeModal}>
                      <AiOutlineClose />
                    </Button>
                  )}
                </Box>
              }
              body={
                <Box className='create_chat_modal_body'>
                  {(members || []).length > 0 && (
                    <Box className='select_user_section'>
                      {members.map((data) => (
                        <Box
                          className='select_user_tag'
                          key={data._id}
                          onClick={() => elementMember(data._id)}>
                          <span className='select_user_name'>{data.name}</span>
                          <AiOutlineClose className='close_icon' />
                        </Box>
                      ))}
                    </Box>
                  )}

                  <Box className='modal_chat_user_search_section'>
                    <TbUserSearch className='search_modal_icon' />
                    <InputComp
                      type='search'
                      className='modal_seach_input'
                      placaeholder='Search user to start chatting'
                      value={searchText}
                      handleChange={(e) => setSearchText(e.target.value)}
                    />
                  </Box>

                  {/* Rendering user list */}
                  <React.Fragment>
                    {isLoading ? (
                      <UserListLoader />
                    ) : (
                      <React.Fragment>
                        {(userList || []).length > 0 ? (
                          <Box className='user_modal_section'>
                            {userList.map((data) => (
                              <ChatUserList
                                key={data._id}
                                userData={data}
                                handleCreateSingleMessage={handleAddMembers}
                              />
                            ))}
                          </Box>
                        ) : (
                          <Box className='empty_user_section'>
                            No user found
                          </Box>
                        )}
                      </React.Fragment>
                    )}
                  </React.Fragment>
                </Box>
              }
            />
          )}

          {/* Remove member modal from modal */}
          {openRemoveMemberModal && (
            <ChatCreateModal
              isOpen={openRemoveMemberModal}
              onClose={closeModal}
              title={
                <Box className='chat_modal_header'>
                  <span className='chat_modal_header_title'>Remove member</span>
                  {(membersId || []).length > 0 ? (
                    <Button
                      className='chat_modal_close_btn'
                      onClick={closeModal}>
                      <AiOutlineClose />
                    </Button>
                  ) : (
                    <Button
                      className='chat_modal_close_btn'
                      onClick={closeModal}>
                      <AiOutlineClose />
                    </Button>
                  )}
                </Box>
              }
              body={
                <Box className='create_chat_modal_body'>
                  {/* Rendering user list */}
                  <React.Fragment>
                    {isLoading ? (
                      <UserListLoader />
                    ) : (
                      <React.Fragment>
                        {(selectChat.members || []).length > 0 ? (
                          <Box className='user_modal_section'>
                            {selectChat.members.map((data) => (
                              <ChatUserList
                                key={data._id}
                                userData={data}
                                handleCreateSingleMessage={handleAddMembers}
                                removeMember={true}
                              />
                            ))}
                          </Box>
                        ) : (
                          <Box className='empty_user_section'>
                            No user found
                          </Box>
                        )}
                      </React.Fragment>
                    )}
                  </React.Fragment>
                </Box>
              }
            />
          )}

          {/* Remove member modal from modal */}
          {openModModal && (
            <ChatCreateModal
              isOpen={openModModal}
              onClose={closeModal}
              title={
                <Box className='chat_modal_header'>
                  <span className='chat_modal_header_title'>
                    Group moderates
                  </span>
                  {(membersId || []).length > 0 ? (
                    <Button
                      className='chat_modal_close_btn'
                      onClick={closeModal}>
                      <AiOutlineClose />
                    </Button>
                  ) : (
                    <Button
                      className='chat_modal_close_btn'
                      onClick={closeModal}>
                      <AiOutlineClose />
                    </Button>
                  )}
                </Box>
              }
              body={
                <Box className='create_chat_modal_body'>
                  {/* Rendering user list */}
                  <React.Fragment>
                    {isLoading ? (
                      <UserListLoader />
                    ) : (
                      <React.Fragment>
                        {(selectChat.members || []).length > 0 ? (
                          <Box className='user_modal_section'>
                            {selectChat.members.map((data) => (
                              <ChatUserList
                                key={data._id}
                                userData={data}
                                handleCreateSingleMessage={handleAddMod}
                                mod={true}
                              />
                            ))}
                          </Box>
                        ) : (
                          <Box className='empty_user_section'>
                            No user found
                          </Box>
                        )}
                      </React.Fragment>
                    )}
                  </React.Fragment>
                </Box>
              }
            />
          )}

          {/* Open group settings modal */}
          {openSettingsModal && (
            <ChatCreateModal
              isOpen={openSettingsModal}
              onClose={closeModal}
              title={
                <React.Fragment>
                  {isSettingsDisable ? (
                    <Box className='chat_modal_header'>
                      <span className='chat_modal_header_title'>
                        Group settings
                      </span>
                      <Button
                        className='chat_modal_close_btn'
                        onClick={closeModal}>
                        <AiOutlineClose />
                      </Button>
                    </Box>
                  ) : (
                    <Box className='chat_modal_header'>
                      <span className='chat_modal_header_title'>
                        Group settings
                      </span>
                      <Button className='modal_btn' onClick={updateGroupInfo}>
                        Update
                      </Button>
                    </Box>
                  )}
                </React.Fragment>
              }
              body={
                <Box className='create_chat_modal_body'>
                  <InputComp
                    type={"text"}
                    placaeholder='Enter group name'
                    className='auth_input'
                    value={groupName}
                    handleChange={(e) => setGroupName(e.target.value(0, 100))}
                  />
                  <textarea
                    type='text'
                    placeholder='Enter group description'
                    className='__input_textarea'
                    value={groupDes}
                    onChange={(e) => setGroupDes(e.target.value.slice(0, 200))}
                  />

                  <Box>
                    <span className='radio_header_text'>Group privacy </span>
                    <label className='radio'>
                      <input
                        type='radio'
                        value='public'
                        checked={groupPrivacy === "public"}
                        onChange={(e) => setGroupPrivacy(e.target.value)}
                        className='radio_input'
                      />
                      <span className='radio_text'>Public</span>
                    </label>

                    <label className='radio'>
                      <input
                        type='radio'
                        value='private'
                        checked={groupPrivacy === "private"}
                        onChange={(e) => setGroupPrivacy(e.target.value)}
                        className='radio_input'
                      />
                      <span className='radio_text'>Private </span>
                    </label>
                  </Box>
                </Box>
              }
            />
          )}

          {/* Open group settings modal */}
          {openGroupModal && (
            <ChatCreateModal
              isOpen={openGroupModal}
              onClose={closeModal}
              title={
                <Box className='chat_modal_header'>
                  <span className='chat_modal_header_title'>
                    Group information
                  </span>
                  <Button className='chat_modal_close_btn' onClick={closeModal}>
                    <AiOutlineClose />
                  </Button>
                </Box>
              }
              body={
                <Box className='group_info_modal_body'>
                  <Img src={groupImage} className='group_image' />
                  <span className='group_modal_name'>{groupName}</span>
                  <br />
                  <span className='group_modal_desc'>{groupDes}</span>
                  <br />
                  <span className='group_modal_mem'>
                    <span className='group_modal_mem_header'>
                      Total members:{" "}
                    </span>{" "}
                    {selectChat.members.length}
                  </span>
                </Box>
              }
            />
          )}

          {/* Group leave modal */}
          {openGroupLeaveModal && (
            <ModalComp
              isOpen={openGroupLeaveModal}
              onClose={closeModal}
              title='Leave group'
              body={<Box>Do you want to leave this group?</Box>}
              footer={
                <Box className='modal_footer_section'>
                  <Button
                    className='modal_btn'
                    onClick={() =>
                      handleAddMembers(
                        JSON.parse(localStorage.getItem("user"))._id
                      )
                    }>
                    Yes !
                  </Button>
                </Box>
              }
            />
          )}

          {/* Group delete modal */}
          {openGroupLDeleteModal && (
            <ModalComp
              isOpen={openGroupLDeleteModal}
              onClose={closeModal}
              title='Leave group'
              body={<Box>Do you want to delete this group?</Box>}
              footer={
                <Box className='modal_footer_section'>
                  <Button
                    className='modal_btn delete_btn'
                    onClick={handleDeleteGroup}>
                    Yes !
                  </Button>
                </Box>
              }
            />
          )}
          <Box className='message_header_box_one'>
            <Button className='back_btn' onClick={backToPrevPage}>
              <IoArrowBack />
            </Button>
            {!selectChat.isGroup ? (
              <Box
                className='message_info_section'
                onClick={handleOpenGroupModal}>
                <Avatar
                  src={
                    selectChatName(
                      selectChat.members,
                      JSON.parse(localStorage.getItem("user"))._id
                    ).profilePic
                  }
                  className='message_header_avatar'
                />
                <Box className='group_info_section'>
                  <span className='message_header_name'>
                    {
                      selectChatName(
                        selectChat.members,
                        JSON.parse(localStorage.getItem("user"))._id
                      ).name
                    }
                  </span>
                </Box>
              </Box>
            ) : (
              <Box
                className='message_info_section'
                onClick={handleOpenGroupModal}>
                <Avatar src={groupImage} className='message_header_avatar' />
                <Box className='group_info_section'>
                  <span className='message_header_name'>{groupName}</span>
                  <span className='message_header_privacy'>{groupPrivacy}</span>
                  <br />
                  {groupDes.length > 75 ? (
                    <span className='message_header_des'>
                      {groupDes.slice(0, 75)}...
                    </span>
                  ) : (
                    <span className='message_header_des'>{groupDes}</span>
                  )}
                </Box>
              </Box>
            )}
          </Box>

          {selectChat.isGroup ? (
            <Menu className='header_menu'>
              <MenuButton as={Button} className='header_men_btn'>
                <CgMoreO className='header_menu_icon' />
              </MenuButton>
              <MenuList>
                {selectChat.admin ===
                  JSON.parse(localStorage.getItem("user"))._id && (
                  <MenuItem
                    className='header_menu_item'
                    onClick={handleOpenImageModal}>
                    Upload profile image
                  </MenuItem>
                )}

                {selectChat.admin ===
                  JSON.parse(localStorage.getItem("user"))._id && (
                  <MenuItem
                    className='header_menu_item'
                    onClick={handleOpenAddMemberModal}>
                    Add new members
                  </MenuItem>
                )}

                {selectChat.admin ===
                  JSON.parse(localStorage.getItem("user"))._id && (
                  <MenuItem
                    className='header_menu_item'
                    onClick={handleRemoveMember}>
                    Remove member
                  </MenuItem>
                )}

                {selectChat.admin ===
                  JSON.parse(localStorage.getItem("user"))._id && (
                  <MenuItem
                    className='header_menu_item'
                    onClick={handleGroupMods}>
                    Add mod
                  </MenuItem>
                )}

                {selectChat.admin !==
                  JSON.parse(localStorage.getItem("user"))._id && (
                  <MenuItem
                    className='header_menu_item delete'
                    onClick={handleOpenGroupModal}>
                    Leave group
                  </MenuItem>
                )}

                {selectChat.admin ===
                  JSON.parse(localStorage.getItem("user"))._id && (
                  <MenuItem
                    className='header_menu_item'
                    onClick={handleOpenSettingsModal}>
                    Settings
                  </MenuItem>
                )}

                {selectChat.admin ===
                  JSON.parse(localStorage.getItem("user"))._id && (
                  <MenuItem
                    className='header_menu_item delete'
                    onClick={handleDeleteModal}>
                    Delete group
                  </MenuItem>
                )}
              </MenuList>
            </Menu>
          ) : (
            <Menu className='header_menu'>
              <MenuButton as={Button} className='header_men_btn'>
                <CgMoreO className='header_menu_icon' />
              </MenuButton>
              <MenuList>
                <MenuItem
                  className='header_menu_item'
                  onClick={() =>
                    handleRedirect(
                      selectChatName(
                        selectChat.members,
                        JSON.parse(localStorage.getItem("user"))._id
                      )._id
                    )
                  }>
                  View profile
                </MenuItem>
                <MenuItem className='header_menu_item'>Block user</MenuItem>
                <MenuItem
                  className='header_menu_item delete'
                  onClick={handleDeleteModal}>
                  Delete chat
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </React.Fragment>
      )}
    </Box>
  );
};

export default MessagePageHeader;
