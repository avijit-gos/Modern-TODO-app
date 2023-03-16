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

const ChatCreateModal = ({ isOpen, onClose, title, body, footer }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className='chat_modal'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className='modal_title'>{title}</ModalHeader>

        <ModalBody className='modal_body'>{body}</ModalBody>

        <ModalFooter className='modal_footer'>{footer}</ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ChatCreateModal;
