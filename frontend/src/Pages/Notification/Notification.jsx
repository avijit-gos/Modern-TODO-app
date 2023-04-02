/** @format */

import React from "react";
import { Box } from "@chakra-ui/react";
import { GlobalContext } from "../../Context/Context";
import Layout from "../../Layout/Layout";
import "./Notification.css";
import NotificationCard from "../../Component/NotificationCard/NotificationCard";
import NotificationSkeleton from "../../Component/SkeletonLoader/NotificationSkeleton";

const Notification = () => {
  const { setPageType, notifications } = GlobalContext();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useLayoutEffect(() => {
    setPageType("notification");
  }, []);

  React.useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  return (
    <Layout title={"Notification"}>
      <Box className='notification_page'>
        {isLoading ? (
          <NotificationSkeleton />
        ) : (
          <React.Fragment>
            {(notifications || []).length > 0 ? (
              <Box className='notification_card_section'>
                {notifications.map((data) => (
                  <NotificationCard key={data._id} data={data} />
                ))}
              </Box>
            ) : (
              <Box className='empty_notification'>No active notification</Box>
            )}
          </React.Fragment>
        )}
      </Box>
    </Layout>
  );
};

export default Notification;
