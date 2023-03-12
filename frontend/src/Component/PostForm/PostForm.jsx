/** @format */

import React from "react";
import { Button, Box, Spinner, Img, Textarea, Input } from "@chakra-ui/react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { FaTasks } from "react-icons/fa";
import { MdNotes } from "react-icons/md";
import FormModal from "../ModalComp/FormModal";
import SuccessGif from "../../Assests/Images/success.gif";
import InputComp from "../InputComp/InputComp";
import { IoIosAdd } from "react-icons/io";
import axios from "axios";

const PostForm = () => {
  const [onActive, setOnActive] = React.useState(false);
  const [openTaskForm, setOpenTaskForm] = React.useState(false);
  const [openNoteForm, setOpenNoteForm] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDisable, setIsDisable] = React.useState(true);
  const [isSuccess, setSuccess] = React.useState(false);
  const [addTaaskType, setAddTasktype] = React.useState(false);

  // task form
  const [taskTitle, setTaskTitle] = React.useState("");
  const [taskDetails, setTaskDetails] = React.useState("");
  const [taskType, setTaskType] = React.useState("");
  const [type, setType] = React.useState("");
  const [taskPriority, setTasPriority] = React.useState("");

  // **** Close modal handler
  const closeModal = () => {
    setOpenTaskForm(false);
    setOpenNoteForm(false);
    setIsDisable(true);
    setIsLoading(false);
  };

  const closeSuccessModal = () => {
    setSuccess(false);
  };

  const submitTask = () => {
    setIsLoading(true);
    setIsDisable(false);
    var data = JSON.stringify({
      title: taskTitle,
      description: taskDetails,
      priority: taskPriority,
      type: taskType,
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_LINK}task/create`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(response.data);
        setOpenTaskForm(false);
        setSuccess(true);
        setTaskTitle("");
        setTaskDetails("");
        setType("");
        setTaskType("");
        setTasPriority("");
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const addNewTask = () => {
    setAddTasktype((p) => !p);
    setTaskType("");
  };

  const handleAddTask = (e) => {
    setType(e.target.value.slice(0, 15));
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      setTaskType(type);
      setType("");
      setAddTasktype(false);
    }
  };

  React.useEffect(() => {
    if (
      !taskTitle.trim() ||
      !taskType.trim() ||
      !taskPriority.trim() ||
      !taskDetails.trim()
    ) {
      setIsDisable(true);
    } else {
      const titleLen = taskTitle.split(" ");
      const taskDetailsLen = taskDetails.split(" ");
      if (titleLen.length < 2) {
        setIsDisable(true);
      } else if (taskDetailsLen.length < 2) {
        setIsDisable(true);
      } else {
        setIsDisable(false);
      }
    }
  }, [taskTitle, taskType, taskPriority, taskDetails]);

  return (
    <Box className='action_button_section'>
      {/***** Success MODAL *****/}
      {isSuccess && (
        <FormModal
          isOpen={isSuccess}
          onClose={closeSuccessModal}
          body={
            <Box className='success_task_form_body_section'>
              <Img src={SuccessGif} className='success_gif' />
              <span className='success_text'>Your task has been saved</span>
            </Box>
          }
        />
      )}

      {/***** TASK FORM MODAL *****/}
      {openTaskForm && (
        <FormModal
          isOpen={openTaskForm}
          onClose={closeModal}
          title={
            <Box className='task_form_header_section'>
              <span className='task_header_title'>Create task</span>
              {!isDisable && (
                <Button
                  onClick={submitTask}
                  disabled={isDisable}
                  className={
                    isDisable
                      ? "create_task_btn disable_create_task_btn"
                      : "create_task_btn"
                  }>
                  {isLoading ? <Spinner /> : <>Create </>}
                </Button>
              )}
            </Box>
          }
          body={
            <Box className='task_form_body_section'>
              <InputComp
                type='text'
                placaeholder='Enter task title (require)'
                className='auth_input'
                value={taskTitle}
                handleChange={(e) => setTaskTitle(e.target.value.slice(0, 50))}
              />
              <Textarea
                type='text'
                placeholder='Enter task details (optional)'
                className='textarea'
                value={taskDetails}
                onChange={(e) =>
                  setTaskDetails(e.target.value.slice(0, 200))
                }></Textarea>

              <Box className='type_task_container'>
                <label className='task_type_label'>Select task type</label>
                {taskType && <Button className='task_type'>{taskType}</Button>}
                <br />
                <Button
                  className='type_task_btn'
                  id='Personal task'
                  onClick={(e) => setTaskType(e.target.id)}>
                  Personal task
                </Button>
                <Button
                  className='type_task_btn'
                  id='Work ask'
                  onClick={(e) => setTaskType(e.target.id)}>
                  Work task
                </Button>
                <Button className='add_task_type' onClick={() => addNewTask()}>
                  <IoIosAdd className='add_task_type_icon' />
                </Button>
              </Box>
              {addTaaskType && (
                <Input
                  type='text'
                  placaeholder='Enter task title (require)'
                  className='auth_input'
                  value={type}
                  onChange={(e) => handleAddTask(e)}
                  onKeyDown={handleKeyPress}
                />
              )}

              {/* Task priority */}
              <label className='task_type_label'>Select task priority</label>
              {taskPriority && (
                <Button className={`task_type ${taskPriority}`}>
                  {taskPriority}
                </Button>
              )}
              <br />
              <Button
                className='type_task_btn High'
                id='High'
                onClick={(e) => setTasPriority(e.target.id)}>
                High
              </Button>
              <Button
                className='type_task_btn Medium'
                id='Medium'
                onClick={(e) => setTasPriority(e.target.id)}>
                Medium
              </Button>
              <Button
                className='type_task_btn Low'
                id='Low'
                onClick={(e) => setTasPriority(e.target.id)}>
                Low
              </Button>
            </Box>
          }
        />
      )}
      <Button
        className='action_button'
        onClick={() => setOpenTaskForm((prev) => !prev)}>
        <HiOutlinePencilAlt className='post_icon' />
      </Button>
    </Box>
  );
};

export default PostForm;
