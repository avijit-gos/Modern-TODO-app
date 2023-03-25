/** @format */

import React from "react";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
} from "@chakra-ui/react";
import Layout from "../../Layout/Layout";
import { GlobalContext } from "../../Context/Context";
import { TbMessages } from "react-icons/tb";
import "./Message.css";
import axios from "axios";
import ChatCard from "../../Component/ChatCard/ChatCard";
import InputComp from "../../Component/InputComp/InputComp";
import { TbUserSearch } from "react-icons/tb";
import ChatCreateModal from "../../Component/ModalComp/ChatCreateModal";
import { AiOutlineClose } from "react-icons/ai";
import UserListLoader from "../../Component/SkeletonLoader/UserListLoader";
import ChatUserList from "../../Component/UserList/ChatUser";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const { setPageType, chats, setChats } = GlobalContext();
  const navigate = useNavigate();
  const [openSingleChatModal, setOpenSingleChatModal] = React.useState(false);
  const [openGroupChatModal, setOpenGroupChatModal] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [groupName, setGroupName] = React.useState("");
  const [members, setMembers] = React.useState([]);
  const [membersId, setMembersId] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [userList, setUserList] = React.useState([]);
  const [msg, setMsg] = React.useState("");
  const [disable, setDisable] = React.useState(true);
  const [disableGroupCreateBtn, setDisableGroupCreateBtn] =
    React.useState(true);

  React.useLayoutEffect(() => {
    setPageType("chat");
  }, []);

  // *** Fetch all user related chats
  const fetchChats = () => {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_LINK}chat`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        // console.log(response.data);
        setChats(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  React.useEffect(() => {
    fetchChats();
  }, []);

  // *** Close modal
  const onClose = () => {
    setOpenSingleChatModal(false);
    setOpenGroupChatModal(false);
    setGroupName("");
    setSearchText("");
    setMembers([]);
    setUserList([]);
  };

  // *** Handle open single chat modal
  const handleOpenSingleChatModal = () => {
    setOpenSingleChatModal(true);
  };

  // *** Handle open group chat modal
  const handleOpenGroupChatModal = () => {
    setOpenGroupChatModal(true);
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
      setMsg("No recent searches.");
    }
  }, [searchText]);

  // handle create single chat
  const handleCreateChat = (id, userData) => {
    var data = {
      members: [id],
    };
    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_LINK}chat`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log(response.data);
        onClose();
        // *** From here redirect to message page
        navigate(`/message/${response.data._id}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Handle create group chat
  const handleCreateGroupChat = () => {
    var data = {
      members: membersId,
      name: groupName,
    };

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_LINK}chat/group`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        onClose();
        setGroupName("");
        setMembers([]);
        setMembersId([]);
        setDisableGroupCreateBtn(true);
        // *** From here redirect to message page
        navigate(`/message/${response.data.group._id}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // *** Handle group create button disable
  React.useEffect(() => {
    if (!groupName.trim()) {
      setDisableGroupCreateBtn(true);
    } else {
      if (membersId.length < 2) {
        setDisableGroupCreateBtn(true);
      } else {
        setDisableGroupCreateBtn(false);
      }
    }
  }, [groupName, members]);

  // *** Handle add members for creating group chat
  const handleMembers = (id, userData) => {
    if (!membersId.includes(id)) {
      setMembersId((prev) => [...prev, id]);
      setMembers((prev) => [...prev, userData]);
    }
  };

  // *** Element group members
  const elementMember = (id) => {
    alert("This functionality should be added");
  };

  return (
    <Layout title={"Message"}>
      {/* Create single chat modal */}
      {openSingleChatModal && (
        <ChatCreateModal
          isOpen={openSingleChatModal}
          onClose={onClose}
          title={
            <Box className='chat_modal_header'>
              <span className='chat_modal_header_title'>Create chat</span>
              <Button className='chat_modal_close_btn' onClick={onClose}>
                <AiOutlineClose />
              </Button>
            </Box>
          }
          body={
            <Box className='create_chat_modal_body'>
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
                            members={members}
                            setMembers={setMembers}
                            setMembersId={setMembersId}
                            handleCreateSingleMessage={handleCreateChat}
                            onlyUser={true}
                          />
                        ))}
                      </Box>
                    ) : (
                      <Box className='empty_user_section'>No user found</Box>
                    )}
                  </React.Fragment>
                )}
              </React.Fragment>
            </Box>
          }
        />
      )}

      {/* Create group chat modal */}
      {openGroupChatModal && (
        <ChatCreateModal
          isOpen={openGroupChatModal}
          onClose={onClose}
          title={
            <Box className='chat_modal_header'>
              <span className='chat_modal_header_title'>Create group chat</span>
              {disableGroupCreateBtn ? (
                <Button className='chat_modal_close_btn' onClick={onClose}>
                  <AiOutlineClose />
                </Button>
              ) : (
                <Button
                  className='chat_modal_group_create_btn'
                  onClick={handleCreateGroupChat}>
                  Create
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
              <Box>
                <InputComp
                  type='text'
                  className='modal_seach_input'
                  placaeholder='Create group name'
                  value={groupName}
                  handleChange={(e) =>
                    setGroupName(e.target.value.slice(0, 100))
                  }
                />
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
                            members={members}
                            setMembers={setMembers}
                            setMembersId={setMembersId}
                            handleCreateSingleMessage={handleMembers}
                            onlyUser={true}
                          />
                        ))}
                      </Box>
                    ) : (
                      <Box className='empty_user_section'>No user found</Box>
                    )}
                  </React.Fragment>
                )}
              </React.Fragment>
            </Box>
          }
        />
      )}

      <Box className='message_conatiner'>
        <Menu>
          <MenuButton as={Button} className='message_floating_btn'>
            <TbMessages className='message_floating_btn_icon' />
          </MenuButton>
          <MenuList>
            <MenuItem
              className='header_menu_item'
              onClick={handleOpenSingleChatModal}>
              Create single chat
            </MenuItem>
            <MenuItem
              className='header_menu_item'
              onClick={handleOpenGroupChatModal}>
              Create a group chat
            </MenuItem>
          </MenuList>
        </Menu>

        {/* Chat header for large screen */}
        <Box className='chat_box_app_header'>
          <span className='chat_box_app_header_text'>Chats</span>
          <br />
          <Box className='chat_box_app_header_search_section'>
            <TbUserSearch className='search_chat_icon' />
            <InputComp
              type='search'
              placaeholder='Search...'
              className={"chat_search_input"}
            />
          </Box>
        </Box>

        {/* Rendering all chats  */}
        {(chats || []).length > 0 ? (
          <Box className='chat_card_section'>
            {chats.map((data) => (
              <ChatCard key={data._id} chatData={data} />
            ))}
          </Box>
        ) : (
          <Box className='empty_chat_list'>
            <span className='empty_chat_text'>No chat found</span>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default Chat;
