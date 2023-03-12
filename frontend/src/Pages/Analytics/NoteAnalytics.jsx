/** @format */

import { Box, Button } from "@chakra-ui/react";
import Layout from "../../Layout/Layout";
import React from "react";
import { GlobalContext } from "../../Context/Context";
import { Pie, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import { useParams } from "react-router";
import "./Analytics.css";
import { BsInfoCircle } from "react-icons/bs";
import abbreviateNumber from "../../Utils/convertNumber";

ChartJS.register(ArcElement, Tooltip, Legend);

const NoteAnalytics = () => {
  const { id } = useParams();
  const { selectNote, setSelectNote, setPageType } = GlobalContext();
  const [likes, setLikes] = React.useState(
    selectNote ? selectNote.likes.length : 0
  );
  const [dislikes, setDislikes] = React.useState(
    selectNote ? selectNote.dislikes.length : 0
  );
  const [comments, setComments] = React.useState(
    selectNote ? selectNote.comment.length : 0
  );
  const [shares, setShares] = React.useState(
    selectNote ? selectNote.shares.length : 0
  );
  const [engagement, setEngagement] = React.useState(
    selectNote
      ? selectNote.likes.length +
          selectNote.shares.length +
          selectNote.dislikes.length +
          selectNote.comment.length
      : 0
  );

  const state = {
    labels: ["Likes", "Dislikes", "Comments", "Shares", "User engagement"],
    datasets: [
      {
        label: "Analytics",
        backgroundColor: [
          "#DC143C",
          "rgba(47, 53, 66, 1)",
          "rgba(46, 213, 115, 1)",
          "#3742fa",
          "#ffa502",
        ],
        hoverBackgroundColor: [
          "#DC143C",
          "rgba(47, 53, 66, 1)",
          "rgba(46, 213, 115, 1)",
          "#3742fa",
          "#ffa502",
        ],
        data: [likes, dislikes, comments, shares, engagement],
      },
    ],
  };

  // *** Page layout
  React.useLayoutEffect(() => {
    setPageType("profile");
  }, []);

  React.useEffect(() => {
    if (!selectNote) {
      var config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_LINK}note/${id}`,
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      };

      axios(config)
        .then(function (response) {
          console.log(response.data);
          setSelectNote(response.data.note);
          setLikes(response.data.note.likes.length);
          setDislikes(response.data.note.dislikes.length);
          setComments(response.data.note.comment.length);
          setShares(response.data.note.shares.length);
          setEngagement(
            response.data.note.likes.length +
              response.data.note.dislikes.length +
              response.data.note.comment.length +
              response.data.note.shares.length
          );
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);

  return (
    <React.Fragment>
      {selectNote && (
        <Layout title={"Note analytics"}>
          <Box className='note_analytics_page_container'>
            <Box className='chart_container'>
              <Pie
                data={state}
                options={{
                  title: {
                    display: true,
                    text: "Note analytics",
                    fontSize: 20,
                  },
                  legend: {
                    display: true,
                    position: "right",
                  },
                }}
              />
            </Box>

            <Box className='count_box_container'>
              <Box className='count_box likes_count_box'>
                <p className='count_text'>Likes</p>
                <p className='count_number'>{abbreviateNumber(likes)}</p>
              </Box>

              <Box className='count_box dislikes_count_box'>
                <p className='count_text'>Dislikes</p>
                <p className='count_number'>{abbreviateNumber(dislikes)}</p>
              </Box>

              <Box className='count_box comments_count_box'>
                <p className='count_text'>Comments</p>
                <p className='count_number'>{abbreviateNumber(comments)}</p>
              </Box>

              <Box className='count_box shares_count_box'>
                <p className='count_text'>Shares</p>
                <p className='count_number'>{abbreviateNumber(shares)}</p>
              </Box>

              <Box className='count_box engagement_count_box'>
                <p className='count_text'>Enagement</p>
                <p className='count_number'>{abbreviateNumber(engagement)}</p>
              </Box>
            </Box>
          </Box>
        </Layout>
      )}
    </React.Fragment>
  );
};

export default NoteAnalytics;
