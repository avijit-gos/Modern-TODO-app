/** @format */

import React from "react";
import Layout from "../../Layout/Layout";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { GlobalContext } from "../../Context/Context";
import PostForm from "../../Component/PostForm/PostForm";
import axios from "axios";
import "./Home.css";
import TaskCard from "../../Component/TaskCard/TaskCard";
import { BiFilterAlt } from "react-icons/bi";
import TaskCardLoader from "../../Component/SkeletonLoader/TaskCardLoader";

const Home = () => {
  const { setPageType, updateTask } = GlobalContext();
  const [tasks, setTasks] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [filter, setFilter] = React.useState("All");
  const [deletedTaskId, setDeletedTaskId] = React.useState([]);

  React.useLayoutEffect(() => {
    setPageType("home");
  }, []);

  // *** Fetch all user related task
  React.useEffect(() => {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_LINK}task/fetch?filter=${filter}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setTasks(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [filter, updateTask]);

  React.useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Layout>
      <Box className='home_container'>
        <PostForm />
        <Box className='filter_section'>
          <Menu>
            Filtered by{" "}
            {filter === "High" ? (
              <span className='filter_value'>High priority</span>
            ) : filter === "Medium" ? (
              <span className='filter_value'>Medium Priority</span>
            ) : filter === "Low" ? (
              <span className='filter_value'>Low Priority</span>
            ) : (
              <span className='filter_value'>All</span>
            )}
            <MenuButton as={Button} className='fiter_btn'>
              <BiFilterAlt className='filter_icon' />
            </MenuButton>
            <MenuList>
              <MenuItem
                className='task_card_menu_item'
                onClick={() => setFilter("All")}>
                All
              </MenuItem>
              <MenuItem
                className='task_card_menu_item'
                onClick={() => setFilter("High")}>
                Higher Priority
              </MenuItem>
              <MenuItem
                className='task_card_menu_item'
                onClick={() => setFilter("Medium")}>
                Medium Priority
              </MenuItem>
              <MenuItem
                className='task_card_menu_item'
                onClick={() => setFilter("Low")}>
                Lower Priority
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <Box className='tasks_section'>
          {isLoading ? (
            <>
              <TaskCardLoader />
            </>
          ) : (
            <>
              {(tasks || []).length > 0 ? (
                <Box className='task_card_container'>
                  {tasks.map((task) => (
                    <React.Fragment key={task._id}>
                      {deletedTaskId.includes(task._id) ? null : (
                        <TaskCard
                          taskData={task}
                          setDeletedTaskId={setDeletedTaskId}
                          deletedTaskId={deletedTaskId}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </Box>
              ) : (
                <Box className='empty_task_container'>No active task</Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default Home;
