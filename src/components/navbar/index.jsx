import React, { useState } from "react";
import {
  Box,
  Container,
  Image,
  useMediaQuery,
  IconButton,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./styles.module.css";
import logo from "../../assets/new_logo.png";
import Mobile from "./mobile";
import { FiMenu } from "react-icons/fi";

const NavBar = () => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    {
      name: "Home",
      to: "/",
    },
    {
      name: "Tickets",
      to: "/tickets",
    },
    {
      name: "Vendors",
      to: "/vendors",
    },
    {
      name: "Gallery",
      to: "/gallery",
    },
  ];
  return (
    <motion.div
      initial={{ y: -250 }}
      animate={{ y: -10 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
    >
      <Mobile
        routes={routes}
        isOpen={isOpen}
        onClose={() => setIsOpen(!isOpen)}
      />
      <Container
        maxW={"container.xl"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        py="25px"
      >
        <Image src={logo} alt="logo" h="90px" objectFit={"cover"} />

        <IconButton
          icon={<FiMenu />}
          onClick={() => setIsOpen(!isOpen)}
          display={isLargerThan800 ? "none" : "block"}
          bg="transparent"
          color="#fff"
          fontSize={"30px"}
          _hover={{
            bg: "transparent",
          }}
          _active={{
            bg: "transparent",
          }}
        />
        <Box display={isLargerThan800 ? "flex" : "none"} gap="30px">
          {routes.map((nav, idx) => (
            <NavLink
              to={nav.to}
              key={idx}
              className={({ isActive }) =>
                isActive ? styles.nav_active : styles.nav
              }
            >
              {nav.name}
            </NavLink>
          ))}
        </Box>
      </Container>
    </motion.div>
  );
};

export default NavBar;
