/** @format */

import React from "react";
import { Box } from "@chakra-ui/react";
import "./Loader.css";

const TaskCardLoader = () => {
  return (
    <React.Fragment>
      <Box className='loader_card'>
        <Box className='task_loader_title skeleton'></Box>
        <Box className='task_leader_tags_section'>
          <Box className='loader_tag skeleton'></Box>
          <Box className='loader_tag skeleton'></Box>
          <Box className='loader_tag skeleton'></Box>
        </Box>
        <Box className='loader_card_description'>
          <Box className='text_line skeleton'></Box>
          <Box className='text_line skeleton'></Box>
        </Box>
      </Box>

      <Box className='loader_card'>
        <Box className='task_loader_title skeleton'></Box>
        <Box className='task_leader_tags_section'>
          <Box className='loader_tag skeleton'></Box>
          <Box className='loader_tag skeleton'></Box>
          <Box className='loader_tag skeleton'></Box>
        </Box>
        <Box className='loader_card_description'>
          <Box className='text_line skeleton'></Box>
          <Box className='text_line skeleton'></Box>
        </Box>
      </Box>
      <Box className='loader_card'>
        <Box className='task_loader_title skeleton'></Box>
        <Box className='task_leader_tags_section'>
          <Box className='loader_tag skeleton'></Box>
          <Box className='loader_tag skeleton'></Box>
          <Box className='loader_tag skeleton'></Box>
        </Box>
        <Box className='loader_card_description'>
          <Box className='text_line skeleton'></Box>
          <Box className='text_line skeleton'></Box>
        </Box>
      </Box>

      <Box className='loader_card'>
        <Box className='task_loader_title skeleton'></Box>
        <Box className='task_leader_tags_section'>
          <Box className='loader_tag skeleton'></Box>
          <Box className='loader_tag skeleton'></Box>
          <Box className='loader_tag skeleton'></Box>
        </Box>
        <Box className='loader_card_description'>
          <Box className='text_line skeleton'></Box>
          <Box className='text_line skeleton'></Box>
        </Box>
      </Box>
      <Box className='loader_card'>
        <Box className='task_loader_title skeleton'></Box>
        <Box className='task_leader_tags_section'>
          <Box className='loader_tag skeleton'></Box>
          <Box className='loader_tag skeleton'></Box>
          <Box className='loader_tag skeleton'></Box>
        </Box>
        <Box className='loader_card_description'>
          <Box className='text_line skeleton'></Box>
          <Box className='text_line skeleton'></Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default TaskCardLoader;
