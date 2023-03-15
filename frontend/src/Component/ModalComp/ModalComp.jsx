/** @format */

import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Button,
} from "@chakra-ui/react";

const ModalComp = ({
  isOpen,
  onClose,
  title,
  body,
  footer,
  condition,
  handleCreateChat,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className='modal_title_section'>
          <span className='modal_title'>{title}</span>
          {!condition ? (
            <ModalCloseButton />
          ) : (
            <Box className='modal_header_btn_section'>
              <Button className='create_chat' onClick={handleCreateChat}>
                Create
              </Button>
              <Button className='close_modal_chat' onClick={onClose}>
                Close
              </Button>
            </Box>
          )}
        </ModalHeader>

        <ModalBody>{body}</ModalBody>

        <ModalFooter>{footer}</ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalComp;
