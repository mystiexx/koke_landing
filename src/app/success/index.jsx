import React from "react";
import { Box, Center, Container, Image, Text } from "@chakra-ui/react";
import Layout from "../../layout";
import success from "../../assets/success.gif";

const SuccessPage = () => {
  return (
    <Layout>
      <Container maxW="container.xl">
        <Box h="80vh" display={"grid"} placeItems={"center"}>
          <Box>
            <Center>
              <Image src={success} />
            </Center>
            <Text
              fontFamily={"Luckiest Guy"}
              color={"#FFA630"}
              textAlign="center"
              fontSize={40}
            >
              Thank you!!!
            </Text>
            <Text textAlign="center" mt="10px">
              We will be in touch for further instructions
            </Text>

            <Center mt="20px">
              <a
                href="https://wa.link/h93nvh"
                style={{ color: "#128C7E", fontWeight: 700 }}
              >
                Chat Admin on Whatsapp
              </a>
            </Center>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default SuccessPage;

export const TicketSuccess = () => {
  return (
    <Layout>
      <Container maxW="container.xl">
        <Box h="80vh" display={"grid"} placeItems={"center"}>
          <Box>
            <Center>
              <Image src={success} />
            </Center>
            <Text
              fontFamily={"Luckiest Guy"}
              color={"#FFA630"}
              textAlign="center"
              fontSize={40}
            >
              Thank you!!!
            </Text>
            <Text textAlign="center" mt="10px">
              After review, your ticket will be sent to your email.
            </Text>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};
