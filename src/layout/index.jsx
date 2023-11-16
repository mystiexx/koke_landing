import React from "react";
import { Box } from "@chakra-ui/react";
import Footer from "../components/footer";
import NavBar from "../components/navbar";

const Layout = ({ children }) => {
  return (
    <Box display={"flex"} flexDir={"column"}>
      <NavBar />
      {children}
      <Footer />
    </Box>
  );
};

export default Layout;
