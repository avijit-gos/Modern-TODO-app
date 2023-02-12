/** @format */

import React from "react";
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { AiOutlineMore } from "react-icons/ai";
import { BsPinAngleFill } from "react-icons/bs";
import "./TaskCard.css";
import ModalComp from "../ModalComp/ModalComp";
import InputComp from "../InputComp/InputComp";
import { IoIosAdd } from "react-icons/io";
import axios from "axios";

const TaskCard = ({ taskData, setDeletedTaskId, deletedTaskId }) => {
  const [priority, setPriority] = React.useState(taskData.priority);
  const [type, setType] = React.useState(taskData.type);
  const [title, setTitle] = React.useState(taskData.title);
  const [description, setDescription] = React.useState(
    taskData.description || ""
  );
  const [pinnedTask, setPinnedTask] = React.useState(taskData.pinned || false);
  const [taskId, setTaskId] = React.useState("");
  const [status, setStatus] = React.useState(taskData.status);

  // modal states
  const [openPriorityModal, setOpenPriorityModal] = React.useState(false);
  const [openPinModal, setOpenPinModal] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [openTaskDoneModal, setOpenTaskDoneModal] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [addTaaskType, setAddTasktype] = React.useState(false);
  const [taskPriority, setTaskPriority] = React.useState(taskData.priority);

  // *** Handle close modal
  const onClose = () => {
    setTaskId("");
    setOpenPriorityModal(false);
    setOpenEditModal(false);
    setOpenTaskDoneModal(false);
    setOpenDeleteModal(false);
    setOpenPinModal(false);
  };

  // Handle open task prirotiy modal
  const handleTaskPriorityModal = (id) => {
    setTaskId(id);
    setOpenPriorityModal(true);
  };

  const handleTaskPriority = () => {
    setPriority(taskPriority);
    var config = {
      method: "put",
      url: `${process.env.REACT_APP_LINK}task/update/priority/${taskId}?priority=${taskPriority}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        onClose();
      })
      .catch(function (error) {
        setPriority(priority);
        onClose();
      });
  };

  // *** Handle open complete task modal
  const handleCompleteTaskModal = (id) => {
    setTaskId(id);
    setOpenTaskDoneModal(true);
  };

  const updateTaskStatus = () => {
    setStatus("completed");
    var config = {
      method: "put",
      url: `${process.env.REACT_APP_LINK}task/update/status/${taskId}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        onClose();
      })
      .catch(function (error) {
        console.log(error);
        setStatus("active");
        onClose();
      });
  };

  // *** Handle delete task modal
  const handleDeleteTaskModal = (id) => {
    setTaskId(id);
    setOpenDeleteModal(true);
  };

  const handleDeleteTask = () => {
    setDeletedTaskId((prev) => [...prev, taskId]);
    var config = {
      method: "delete",
      url: `${process.env.REACT_APP_LINK}task/delete/${taskId}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        onClose();
      })
      .catch(function (error) {
        var arr = deletedTaskId;
        var index = arr.indexOf(taskId);
        var temp = arr.slice(index, 1);
        setDeletedTaskId(temp);
        console.log(error);
        onClose();
      });
  };

  // Handle edit task modal
  const handleEditTaskModal = (id) => {
    setOpenEditModal(true);
    setTaskId(id);
  };

  const handleEditTask = () => {
    var data = JSON.stringify({
      title: title,
      description: description,
      priority: priority,
      status: status,
    });

    var config = {
      method: "put",
      url: `${process.env.REACT_APP_LINK}task/update/${taskId}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        onClose();
      })
      .catch(function (error) {
        console.log(error);
        onClose();
      });
  };

  // Handle task pin modal
  const handlePinnedTask = (id) => {
    setOpenPinModal(true);
    setTaskId(id);
  };

  const handleUpdatePin = () => {
    if (!pinnedTask) {
      var config = {
        method: "put",
        url: `${process.env.REACT_APP_LINK}task/pin/${taskId}`,
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          setPinnedTask(true);
          onClose();
        })
        .catch(function (error) {
          console.log(error);
          setPinnedTask(false);
          onClose();
        });
    } else {
      var config = {
        method: "put",
        url: `${process.env.REACT_APP_LINK}task/unpin/${taskId}`,
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          setPinnedTask(false);
          onClose();
        })
        .catch(function (error) {
          console.log(error);
          setPinnedTask(true);
          onClose();
        });
    }
  };

  const handleAddTask = (e) => {
    setType(e.target.value.slice(0, 15));
  };

  const addNewTask = () => {
    setAddTasktype((p) => !p);
    setType("");
  };

  return (
    <Box
      className={
        taskData.priority === "High"
          ? "task_card high"
          : taskData.priority === "Medium"
          ? "task_card medium"
          : "task_card low"
      }>
      {/* Change priority modal */}
      {openPriorityModal && (
        <ModalComp
          isOpen={openPriorityModal}
          onClose={onClose}
          title='Change task priority'
          body={
            <div className='modal_body_section'>
              <label className='task_type_label'>Selected task type</label>
              {taskPriority && (
                <Button className={`task_type ${taskPriority}`}>
                  {taskPriority}
                </Button>
              )}
              <br />
              <Button
                className='type_task_btn High'
                id='High'
                onClick={(e) => setTaskPriority(e.target.id)}>
                High
              </Button>
              <Button
                className='type_task_btn Medium'
                id='Medium'
                onClick={(e) => setTaskPriority(e.target.id)}>
                Medium
              </Button>
              <Button
                className='type_task_btn Low'
                id='Low'
                onClick={(e) => setTaskPriority(e.target.id)}>
                Low
              </Button>
            </div>
          }
          footer={
            <Button className='modal_button' onClick={handleTaskPriority}>
              Update
            </Button>
          }
        />
      )}

      {/* Complete task modal */}
      {openTaskDoneModal && (
        <ModalComp
          isOpen={openTaskDoneModal}
          onClose={onClose}
          title='Complete task'
          body='Do you complete this task?'
          footer={
            <Button className='modal_button' onClick={updateTaskStatus}>
              Yes!
            </Button>
          }
        />
      )}

      {/* Edit task modal */}
      {openEditModal && (
        <ModalComp
          isOpen={openEditModal}
          onClose={setOpenEditModal}
          title='Edit task'
          body={
            <Box className='task_form_body_section'>
              <InputComp
                type='text'
                placaeholder='Enter task title (require)'
                className='auth_input'
                value={title}
                handleChange={(e) => setTitle(e.target.value.slice(0, 50))}
              />
              <Textarea
                type='text'
                placeholder='Enter task details (optional)'
                className='textarea'
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value.slice(0, 200))
                }></Textarea>

              <Box className='type_task_container'>
                <label className='task_type_label'>Select task type</label>
                {type && <Button className='task_type'>{type}</Button>}
                <br />
                <Button
                  className='type_task_btn'
                  id='Personal task'
                  onClick={(e) => setType(e.target.id)}>
                  Personal task
                </Button>
                <Button
                  className='type_task_btn'
                  id='Work ask'
                  onClick={(e) => setType(e.target.id)}>
                  Work task
                </Button>
                <Button className='add_task_type' onClick={() => addNewTask()}>
                  <IoIosAdd className='add_task_type_icon' />
                </Button>
              </Box>
              {addTaaskType && (
                <InputComp
                  type='text'
                  placaeholder='Enter task title (require)'
                  className='auth_input'
                  value={type}
                  handleChange={(e) => handleAddTask(e)}
                />
              )}

              {/* Task priority */}
              <label className='task_type_label'>Select task priority</label>
              {priority && (
                <Button className={`task_type ${priority}`}>{priority}</Button>
              )}
              <br />
              <Button
                className='type_task_btn High'
                id='High'
                onClick={(e) => setPriority(e.target.id)}>
                High
              </Button>
              <Button
                className='type_task_btn Medium'
                id='Medium'
                onClick={(e) => setPriority(e.target.id)}>
                Medium
              </Button>
              <Button
                className='type_task_btn Low'
                id='Low'
                onClick={(e) => setPriority(e.target.id)}>
                Low
              </Button>
            </Box>
          }
          footer={
            <Button className='modal_button' onClick={handleEditTask}>
              Update
            </Button>
          }
        />
      )}

      {/* Delete task modal */}
      {openDeleteModal && (
        <ModalComp
          isOpen={openDeleteModal}
          onClose={onClose}
          title='Delete task'
          body='Do you delete this task?'
          footer={
            <Button
              className='modal_button delete_btn'
              onClick={handleDeleteTask}>
              Yes!
            </Button>
          }
        />
      )}

      {/* Pinn task modal */}
      {openPinModal && (
        <ModalComp
          isOpen={openPinModal}
          onClose={onClose}
          title={pinnedTask ? <>Unpinn task</> : <>Pinn task</>}
          body={
            pinnedTask ? (
              <>Do you want to unpinned this task?</>
            ) : (
              <>Do you want to pinned this task?</>
            )
          }
          footer={
            <Button className='modal_button' onClick={handleUpdatePin}>
              {pinnedTask ? <>Unpinn</> : <>Pinn</>}
            </Button>
          }
        />
      )}

      {pinnedTask && <BsPinAngleFill className='pin_icon' />}
      {/* Header */}
      <Box className='task_card_header'>
        {/* Title */}
        <Box className='task_header_box'>
          <p className='task_card_title'>{title}</p>
          <span className='task_card_status'>{status}</span>
          <span className='task_card_type'>{type}</span>
          <span
            className={
              priority === "High"
                ? "task_card_priority High"
                : priority === "Medium"
                ? "task_card_priority Medium"
                : "task_card_priority Low"
            }>
            {priority}
          </span>
        </Box>
        <Menu>
          <MenuButton as={Button} className='task_card_menu_btn'>
            <AiOutlineMore />
          </MenuButton>
          <MenuList>
            {status === "completed" ? null : (
              <MenuItem
                className='task_card_menu_item'
                onClick={() => handleEditTaskModal(taskData._id)}>
                Edit
              </MenuItem>
            )}
            {status === "completed" ? null : (
              <MenuItem
                className='task_card_menu_item'
                onClick={() => handleCompleteTaskModal(taskData._id)}>
                Complete
              </MenuItem>
            )}
            {status === "completed" ? null : (
              <MenuItem
                className='task_card_menu_item'
                onClick={() => handlePinnedTask(taskData._id)}>
                {pinnedTask ? <>Unpinn</> : <>Pinn</>}
              </MenuItem>
            )}
            {status === "completed" ? null : (
              <MenuItem
                className='task_card_menu_item'
                onClick={() => handleTaskPriorityModal(taskData._id)}>
                Change priority
              </MenuItem>
            )}
            <MenuItem
              className='task_card_menu_item delete'
              onClick={() => handleDeleteTaskModal(taskData._id)}>
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      {/* Body */}
      {description ? <Box className='task_card_body'>{description}</Box> : null}
    </Box>
  );
};

export default TaskCard;
