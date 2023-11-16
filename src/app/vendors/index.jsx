import React from "react";
import {
  Box,
  Center,
  Container,
  Image,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import Layout from "../../layout";
import { gallery_51 } from "../../assets/gallery";
import { ListItem, UnorderedList } from "@chakra-ui/react";
import Registration from "./component/registration";

const Vendors = () => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  return (
    <Layout>
      <Image
        src={gallery_51}
        alt="background"
        position={"absolute"}
        w="100%"
        h={"50vh"}
        zIndex={"-1"}
        opacity={"0.3"}
        objectFit={"cover"}
        top={0}
      />
      <Container maxW="container.xl">
        <Box h="30vh" display={"grid"} placeItems={"center"} w="full">
          <Box>
            <Text
              textAlign={"center"}
              fontSize={isLargerThan800 ? "60px" : "40px"}
              fontWeight={700}
              fontFamily={"Luckiest Guy"}
              color={"#FFA630"}
            >
              Vendor Registration
            </Text>
            <Text textAlign={"center"} fontWeight={600}>
              Please read our terms and conditions before filling out the form
            </Text>
          </Box>
        </Box>

        <Box py="100px">
          <Text fontWeight={700} fontFamily={"Luckiest Guy"} fontSize={40}>
            Terms $ Conditions
          </Text>

          <Box>
            <UnorderedList fontSize={18}>
              <ListItem>
                NGN30,000 for consumable products and services{" "}
              </ListItem>
              <ListItem>NGN25,000 for non consumable products </ListItem>
              <ListItem>
                A free space to sell products and render services
              </ListItem>
              <ListItem>3 tickets entry assigned to each vendor.</ListItem>
            </UnorderedList>
          </Box>
        </Box>

        <Box pt="50px">
          <Center>
            <Registration />
          </Center>
        </Box>
      </Container>
    </Layout>
  );
};

export default Vendors;
