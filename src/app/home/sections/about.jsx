import React from "react";
import {
  Box,
  Container,
  Text,
  Image,
  Center,
  useMediaQuery,
} from "@chakra-ui/react";
import jumbo from "../../../assets/banner_1.jpg";
import { Slide } from "react-awesome-reveal";

const About = () => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  return (
    <Box h="100vh" py="100px">
      <Container maxW={"container.xl"}>
        <Text
          textAlign="center"
          fontFamily={"Luckiest Guy"}
          fontSize={"40px"}
          mb="24px"
        >
          About Us
        </Text>

        <Center>
          <Slide direction="left" triggerOnce>
            <Box w={isLargerThan800 ? "800px" : "auto"}>
              <Text textAlign={"center"}>
                D' KOKE XPERIENCE is a lively outdoor event that combines the
                joy of partying with the excitement of making new connections,
                vibes nonstop, games, Live performances, Music and Dance,
                Challenges, Trivia and many more. It's a dynamic blend of
                socializing, enjoyment and embracing the vibrant energy of this
                festive season.
              </Text>
            </Box>
          </Slide>
        </Center>
        <Slide direction="right" triggerOnce>
          <Image
            src={jumbo}
            alt="koke"
            h={isLargerThan800 ? "50vh" : "auto"}
            w="full"
            objectFit={isLargerThan800 ? "cover" : "contain"}
            mt={isLargerThan800 ? "20px" : "20px"}
          />
        </Slide>
      </Container>
    </Box>
  );
};

export default About;
