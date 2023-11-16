import React from "react";
import styles from "./styles.module.css";
import { NavLink } from "react-router-dom";
import {
  Drawer,
  DrawerBody,
  Box,
  Button,
  DrawerContent,
  DrawerOverlay,
  Center,
} from "@chakra-ui/react";

const Mobile = ({ routes, isOpen, onClose }) => {
  return (
    <Drawer placement="right" isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bg="#1A1D22">
        <DrawerBody py="300px">
          <Center>
            <Box display={"flex"} flexDir={"column"} gap="30px">
              {routes.map((data, idx) => (
                <NavLink
                  key={idx}
                  to={data.to}
                  className={({ isActive }) =>
                    isActive ? styles.nav_active_mobile : styles.nav_mobile
                  }
                >
                  {" "}
                  {data.name}
                </NavLink>
              ))}
            </Box>
          </Center>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default Mobile;
