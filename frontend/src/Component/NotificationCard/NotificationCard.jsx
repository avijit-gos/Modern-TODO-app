/** @format */

import React from "react";
import { Box, Avatar } from "@chakra-ui/react";
import timeDifference from "../../Utils/getTime";

const NotificationCard = ({ data }) => {
  return (
    <Box
      className={
        data.view
          ? "notification_card"
          : "notification_card not_view_notification_card"
      }>
      <Box className='notification_card_info'>
        <Avatar src={data.sender.profilePic} className='noti_user_avatar' />
        <span className='noti_user_name'>{data.sender.name}</span>
        {/* <span className='noti_text'>Some text</span> */}
        {data.Notitype === "0" ? (
          <span className='noti_text'>{process.env.REACT_APP_LIKE_TYPE}</span>
        ) : (
          <>
            {data.Notitype === "1" ? (
              <span className='noti_text'>
                {process.env.REACT_APP_DISLIKE_TYPE}
              </span>
            ) : (
              <>
                {data.Notitype === "2" ? (
                  <span className='noti_text'>
                    {process.env.REACT_APP_DISLIKE_TYPE}
                  </span>
                ) : (
                  <>
                    {data.Notitype === "3" ? (
                      <span className='noti_text'>
                        {process.env.REACT_APP_COMMENT_TYPE}
                      </span>
                    ) : (
                      <>
                        {data.Notitype === "4" ? (
                          <span className='noti_text'>
                            {process.env.REACT_APP_COMMENT_LIKE_TYPE}
                          </span>
                        ) : (
                          <>
                            {data.Notitype === "5" ? (
                              <span className='noti_text'>
                                {process.env.REACT_APP_COMMENT_DISLIKE_TYPE}
                              </span>
                            ) : (
                              <span className='noti_text'>
                                {process.env.REACT_APP_FOLLOW_TYPE}
                              </span>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </Box>
      <span className='noti_time'>
        {timeDifference(new Date(), new Date(data.createdAt))}
      </span>
    </Box>
  );
};

export default NotificationCard;
