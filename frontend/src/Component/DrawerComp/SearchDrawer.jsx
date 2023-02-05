/** @format */

import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import InputComp from "../InputComp/InputComp";

const SearchDrawer = ({ isOpen, onClose, drawerBody }) => {
  return (
    <React.Fragment>
      <Drawer placement='top' isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader className='drawer_header'>Search user</DrawerHeader>

          <DrawerBody className='drawer_body'>{drawerBody}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </React.Fragment>
  );
};

export default SearchDrawer;
