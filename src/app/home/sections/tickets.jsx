import React from "react";
import {
  Box,
  Container,
  Text,
  Grid,
  useMediaQuery,
  GridItem,
  Image,
  Button,
} from "@chakra-ui/react";
import commaNumber from "comma-number";
import { Slide } from "react-awesome-reveal";
import koke from "../../../assets/Koke-web.jpg";
import { IoTicketOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Tickets = () => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  return (
    <Box>
      <Container maxW={"container.xl"} py="100px">
        <Grid
          templateColumns={isLargerThan800 ? "repeat(2, 1fr)" : "auto"}
          gap="24px"
        >
          <Slide direction="up" cascade triggerOnce>
            <GridItem>
              <Image src={koke} alt="koke" />
            </GridItem>

            <GridItem>
              <Text fontFamily={"Luckiest Guy"} fontSize={"50px"}>
                RESERVE YOUR SPOT
              </Text>
              <Text>
                Reserve your spot at the D'KOKE XPERIENCE today! Enjoy the peak
                of entertainment with live music and enjoying the company of
                friends and family. Buy your tickets now so you don't miss out
                on this incredible event.
              </Text>

              <Link to="/tickets">
                <Button
                  leftIcon={<IoTicketOutline />}
                  mt="24px"
                  bg="#FFA630"
                  color="#fff"
                  borderRadius={0}
                  _hover={{
                    bg: "#FFA630",
                  }}
                >
                  Buy Ticket
                </Button>
              </Link>

              <br />
              <Text textAlign={"left"} mt="40px">
                Tickets will be sold at the gate for NGN{commaNumber(3000)}
              </Text>
            </GridItem>
          </Slide>
        </Grid>
      </Container>
    </Box>
  );
};

export default Tickets;
