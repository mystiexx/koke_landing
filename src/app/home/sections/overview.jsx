import React from "react";
import {
  Box,
  Text,
  Container,
  Grid,
  GridItem,
  Image,
  useMediaQuery,
} from "@chakra-ui/react";
import koke from "../../../assets/legacy.png";
import { Slide } from "react-awesome-reveal";

const Overview = () => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  return (
    <Box>
      <Container maxW="container.xl" py="100px">
        <Grid
          templateColumns={isLargerThan800 ? "repeat(2,1fr)" : "auto"}
          gap="24px"
          alignItems={"center"}
        >
          <GridItem>
            <Slide direction="up" triggerOnce>
              <Image src={koke} alt="koke" />
            </Slide>
          </GridItem>
          <GridItem>
            <Slide direction="right" triggerOnce>
              <Text
                textAlign="left"
                fontFamily={"Luckiest Guy"}
                fontSize={"40px"}
                mb="24px"
              >
                Overview
              </Text>
              <Text>
                Koke Empire Nigeria Ltd stands out as a dynamic and enterprising
                brand dedicated to delivering unparalleled entertainment
                experiences. Our expertise lies in curating events that are not
                only memorable but also set a standard for unbeatable fun in our
                community. Since our establishment in 2021, we have consistently
                organized and executed exceptional events and projects. <br />{" "}
                <br /> Our specialties encompass a wide range of services,
                including event planning, media coverage, artiste management,
                public relations, publicity, promotions, and clothing and
                fashion. Noteworthy among our successes is the well-received
                Koke Xperience 1.0 and our vibrant indoor parties. We take pride
                in creating leisure and fun-filled moments that leave a lasting
                impact on our community.
              </Text>
            </Slide>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default Overview;
