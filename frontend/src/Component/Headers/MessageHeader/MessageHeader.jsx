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
import UserList from "../../UserList/UserList";
import UserListLoader from "../../SkeletonLoader/UserListLoader";

const MessageHeader = ({ title }) => {
  const navigate = useNavigate();
  const [openSingleChatModal, setOpenSingleChatModal] = React.useState(false);
  const [openGroupChatModal, setOpenGroupChatModal] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [groupName, setGroupName] = React.useState("");
  const [members, setMembers] = React.useState([]);
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

  return (
    <Box className='header_navbar_container'>
      {openSingleChatModal && (
        <ModalComp
          isOpen={openSingleChatModal}
          onClose={onClose}
          title={"Create a new chat"}
          body={
            <Box className='single_create_chat_modal'>
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
                              <UserList key={user._id} userData={user} />
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
