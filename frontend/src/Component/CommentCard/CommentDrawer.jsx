/** @format */

import React from "react";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
} from "@chakra-ui/react";
import CommentForm from "../Comments/CommentForm";
import CommentCard from "./CommentCard";

const CommentDrawer = ({
  isOpen,
  onClose,
  postId,
  comments,
  setComments,
  setCommentsCount,
  setPage,
  limit,
}) => {
  return (
    <React.Fragment>
      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader className='drawer_header'>Comment</DrawerHeader>

          <DrawerBody>
            <CommentForm
              postId={postId}
              setCommentsCount={setCommentsCount}
              setComments={setComments}
            />

            <Box className='comments_drawer_container'>
              {(comments || []).length > 0 ? (
                <React.Fragment>
                  {comments.map((data) => (
                    <CommentCard
                      key={data._id}
                      data={data}
                      setComments={setComments}
                      comments={comments}
                      setCommentsCount={setCommentsCount}
                    />
                  ))}
                  {comments.length >= limit && (
                    <Box className='load_more_btn_container'>
                      <Button
                        className='load_more_btn'
                        onClick={() => setPage((prev) => prev + 1)}>
                        Load more
                      </Button>
                    </Box>
                  )}
                </React.Fragment>
              ) : (
                <Box className='empty_comment_drawer'>No comment found</Box>
              )}
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </React.Fragment>
  );
};

export default CommentDrawer;
