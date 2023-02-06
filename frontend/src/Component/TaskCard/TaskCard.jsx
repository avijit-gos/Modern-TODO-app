/** @format */

import React from "react";
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { AiOutlineMore } from "react-icons/ai";
import "./TaskCard.css";
import ModalComp from "../ModalComp/FormModal";

const TaskCard = ({ taskData }) => {
  const [priority, setPriority] = React.useState(taskData.priority);
  const [type, setType] = React.useState(taskData.type);
  const [title, setTitle] = React.useState(taskData.title);
  const [description, setDescription] = React.useState(
    taskData.description || ""
  );
  const [status, setStatus] = React.useState(taskData.status);

  return (
    <Box
      className={
        taskData.priority === "High"
          ? "task_card high"
          : taskData.priority === "Medium"
          ? "task_card medium"
          : "task_card low"
      }>
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
            <MenuItem className='task_card_menu_item'>Edit</MenuItem>
            <MenuItem className='task_card_menu_item'>Complete</MenuItem>
            <MenuItem className='task_card_menu_item'>Change status</MenuItem>
            <MenuItem className='task_card_menu_item delete'>Delete</MenuItem>
          </MenuList>
        </Menu>
      </Box>
      {/* Body */}
      {description ? <Box className='task_card_body'>{description}</Box> : null}
    </Box>
  );
};

export default TaskCard;
