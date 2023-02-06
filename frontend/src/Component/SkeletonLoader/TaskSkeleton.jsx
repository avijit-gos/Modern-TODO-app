/** @format */

import { Box } from "@chakra-ui/react";
import React from "react";

const TaskSkeleton = () => {
  return (
    <Box className='task_skeleton_container'>
      <Box className='skeleton_task_card skeleton'></Box>
      <Box className='skeleton_task_card skeleton'></Box>
      <Box className='skeleton_task_card skeleton'></Box>
      <Box className='skeleton_task_card skeleton'></Box>
      <Box className='skeleton_task_card skeleton'></Box>
      <Box className='skeleton_task_card skeleton'></Box>
    </Box>
  );
};

export default TaskSkeleton;
