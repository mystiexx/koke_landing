import React from "react";
import { Box } from "@chakra-ui/react";
import Jumbo from "./sections/jumbo";
import About from "./sections/about";
import Tickets from "./sections/tickets";
import Overview from "./sections/overview";
import Gallery from "./sections/gallery";
import Partner from "./sections/partner";
import Layout from "../../layout";

const Home = () => {
  return (
    <Layout>
      <Box display={"flex"} flexDir={"column"}>
        <Jumbo />
        <Tickets />
        <About />
        <Overview />
        <Gallery />
        <Partner />
      </Box>
    </Layout>
  );
};

export default Home;
