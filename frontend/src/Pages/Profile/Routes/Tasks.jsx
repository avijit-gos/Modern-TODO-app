/** @format */

import { Box } from "@chakra-ui/react";
import TaskCard from "../../../Component/TaskCard/TaskCard";
import React from "react";
import axios from "axios";

const Tasks = () => {
  const [tasks, setTasks] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  // *** Fetch task data
  React.useEffect(() => {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_LINK}task/fetch?filter=All`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios(config)
      .then(function (response) {
        setTasks(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Box>
      {(tasks || []).length > 0 ? (
        <>
          {tasks.map((data) => (
            <TaskCard key={data._id} taskData={data} />
          ))}
        </>
      ) : (
        <Box className='empty_profile_task_container'>No active task</Box>
      )}
    </Box>
  );
};

export default Tasks;
