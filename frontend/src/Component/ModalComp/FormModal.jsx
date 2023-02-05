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
    <Modal isOpen={isOpen} onClose={onClose} className='modal'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className='modal_title'>{title}</ModalHeader>

        <ModalBody className='modal_body'>{body}</ModalBody>

        <ModalFooter className='modal_footer'>{footer}</ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalComp;
