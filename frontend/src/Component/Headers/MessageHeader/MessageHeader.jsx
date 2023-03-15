/** @format */

import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
} from "@chakra-ui/react";
import { IoArrowBack } from "react-icons/io5";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CgMoreO } from "react-icons/cg";
import ModalComp from "../../ModalComp/ModalComp";
import { TbUserSearch } from "react-icons/tb";
import InputComp from "../../InputComp/InputComp";
import ChatUserList from "../../UserList/ChatUser";
import UserListLoader from "../../SkeletonLoader/UserListLoader";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

const MessageHeader = ({ title }) => {
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

  const backToPrevPage = () => {
    navigate(-1);
  };

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
          console.log(result);
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
  const handleCreateChat = () => {
    var data = {
      members: membersId,
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
        // *** From here redirect to message page
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
        // *** From here redirect to message page
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Box className='header_navbar_container'>
      {/* Single chat modal */}
      {openSingleChatModal && (
        <ModalComp
          isOpen={openSingleChatModal}
          onClose={onClose}
          title={"Create a new chat"}
          body={
            <Box className='single_create_chat_modal'>
              {(members || []).length > 0 && (
                <Box className='user_tags_section'>
                  {members.map((data) => (
                    <Button className='user_tag_btn' key={data._id}>
                      <span className='user_name'>{data.name}</span>
                      <AiOutlineClose className='btn_close_icon' />
                    </Button>
                  ))}
                </Box>
              )}
              <Box className='user_search_section'>
                <TbUserSearch className='user_search_icon' />
                <InputComp
                  type='search'
                  placaeholder='Search user to start chatting...'
                  className='search_input'
                  value={searchText}
                  handleChange={(e) => setSearchText(e.target.value)}
                />
              </Box>
              <Box className='modal_user_search_result_section'>
                {disable ? (
                  <Box className='empty_modal_user_list'>Start searching</Box>
                ) : (
                  <Box className='modal_user_list'>
                    {isLoading ? (
                      <UserListLoader />
                    ) : (
                      <React.Fragment>
                        {(userList || []).length > 0 ? (
                          <React.Fragment>
                            {userList.map((user) => (
                              <ChatUserList
                                key={user._id}
                                userData={user}
                                members={members}
                                setMembers={setMembers}
                                setMembersId={setMembersId}
                              />
                            ))}
                          </React.Fragment>
                        ) : (
                          <Box className='empty_search_result'>
                            No user found
                          </Box>
                        )}
                      </React.Fragment>
                    )}
                  </Box>
                )}
              </Box>
            </Box>
          }
          condition={members.length > 0 && true}
          handleCreateChat={handleCreateChat}
        />
      )}

      {/* Group chat modal */}
      {openGroupChatModal && (
        <ModalComp
          isOpen={openGroupChatModal}
          onClose={onClose}
          title={"Create a new group"}
          body={
            <Box className='single_create_chat_modal'>
              {(members || []).length > 0 && (
                <Box className='user_tags_section'>
                  {members.map((data) => (
                    <Button className='user_tag_btn' key={data._id}>
                      <span className='user_name'>{data.name}</span>
                      <AiOutlineClose className='btn_close_icon' />
                    </Button>
                  ))}
                </Box>
              )}
              <Box className='group_name_section'>
                <InputComp
                  type='text'
                  placaeholder='Enter group name'
                  className='search_input'
                  value={groupName}
                  handleChange={(e) => setGroupName(e.target.value)}
                />
              </Box>
              <Box className='user_search_section'>
                <TbUserSearch className='user_search_icon' />
                <InputComp
                  type='search'
                  placaeholder='Search user to start chatting...'
                  className='search_input'
                  value={searchText}
                  handleChange={(e) => setSearchText(e.target.value)}
                />
              </Box>
              <Box className='modal_user_search_result_section'>
                {disable ? (
                  <Box className='empty_modal_user_list'>Start searching</Box>
                ) : (
                  <Box className='modal_user_list'>
                    {isLoading ? (
                      <UserListLoader />
                    ) : (
                      <React.Fragment>
                        {(userList || []).length > 0 ? (
                          <React.Fragment>
                            {userList.map((user) => (
                              <ChatUserList
                                key={user._id}
                                userData={user}
                                members={members}
                                setMembers={setMembers}
                                setMembersId={setMembersId}
                              />
                            ))}
                          </React.Fragment>
                        ) : (
                          <Box className='empty_search_result'>
                            No user found
                          </Box>
                        )}
                      </React.Fragment>
                    )}
                  </Box>
                )}
              </Box>
            </Box>
          }
          condition={members.length > 0 && true}
          handleCreateChat={handleCreateGroupChat}
        />
      )}
      <Box className='header_box'>
        <Button className='back_btn' onClick={backToPrevPage}>
          <IoArrowBack />
        </Button>
        <span className='header_title'>{title}</span>
      </Box>

      <Menu className='header_menu'>
        <MenuButton as={Button} className='header_men_btn'>
          <CgMoreO className='header_menu_icon' />
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
    </Box>
  );
};

export default MessageHeader;
