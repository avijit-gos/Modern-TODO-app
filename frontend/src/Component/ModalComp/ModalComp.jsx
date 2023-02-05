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
} from "@chakra-ui/react";

const ModalComp = ({ isOpen, onClose, title, body, footer }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className='modal_title'>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{body}</ModalBody>

        <ModalFooter>{footer}</ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalComp;
