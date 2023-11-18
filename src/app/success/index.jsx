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
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default SuccessPage;
