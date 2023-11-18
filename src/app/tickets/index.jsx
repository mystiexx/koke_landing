import React, { useEffect, useState } from "react";
import Layout from "../../layout";
import {
  Box,
  Text,
  Image,
  Container,
  useMediaQuery,
  Grid,
  GridItem,
  Center,
  Button,
} from "@chakra-ui/react";
import { gallery_67 } from "../../assets/gallery";
import { tickets } from "../../utls/enums";
import commaNumber from "comma-number";
import { BiTransfer } from "react-icons/bi";
import { FaFile } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import PayTicket from "./components/payTicket";

const Tickets = () => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Image
        src={gallery_67}
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
              Tickets
            </Text>

            <Text textAlign="center" fontSize={"20px"} fontWeight={600}>
              Available Tickets
            </Text>
            <Grid templateColumns={"repeat(3, 1fr)"} gap="24px" mt="24px">
              {tickets.map((ticket, idx) => (
                <GridItem key={idx}>
                  <Box>
                    <Text textAlign="center" fontWeight={500}>
                      {ticket.name}
                    </Text>
                    <Text textAlign={"center"} fontWeight={600}>
                      NGN{commaNumber(ticket.price)}
                    </Text>
                  </Box>
                </GridItem>
              ))}
            </Grid>
          </Box>
        </Box>

        <Box py="100px">
          <Box>
            <Text
              textAlign={"center"}
              textTransform={"capitalize"}
              fontFamily={"Luckiest Guy"}
              fontSize={isLargerThan800 ? "60px" : "40px"}
            >
              How to buy a ticket
            </Text>
          </Box>

          <Grid
            templateColumns={isLargerThan800 ? "repeat(3, 1fr)" : "auto"}
            gap="24px"
            mt="24px"
          >
            <GridItem>
              <Center mb="24px">
                <BiTransfer size={60} color={"#FFA630"} />
              </Center>
              <Text
                textAlign="center"
                fontSize="20px"
                fontWeight="700"
                textTransform={"uppercase"}
              >
                Pay the ticket fee
              </Text>
              <Text mt="10px" textAlign={"center"} fontSize={"14px"}>
                First, transfer money to the account listed below
                <br />
                <span style={{ fontWeight: 600, color: "#FFA630" }}>
                  Bank: Moniepoint
                </span>
                <br />
                <span style={{ fontWeight: 600, color: "#FFA630" }}>
                  Account Number: 6428702725
                </span>
                <br />
                <span style={{ fontWeight: 600, color: "#FFA630" }}>
                  Account Name: Koke Empire Nig Ltd.
                </span>
              </Text>
            </GridItem>
            <GridItem>
              <Center mb="24px">
                <FaFile size={60} color={"#FFA630"} />
              </Center>
              <Text
                textAlign="center"
                fontSize="20px"
                fontWeight="700"
                textTransform={"uppercase"}
              >
                fill the guest form
              </Text>
              <Text mt="10px" textAlign={"center"} fontSize={"14px"}>
                After the transfer, click on the button below to fill out the
                guest form
              </Text>
            </GridItem>
            <GridItem>
              <Center mb="24px">
                <MdEmail size={60} color={"#FFA630"} />
              </Center>
              <Text
                textAlign="center"
                fontSize="20px"
                fontWeight="700"
                textTransform={"uppercase"}
              >
                wait for email confirmation
              </Text>
              <Text mt="10px" textAlign={"center"} fontSize={"14px"}>
                After your done, Koke Admin will send the ticket to your email
                after confirming payment
              </Text>
            </GridItem>
          </Grid>
        </Box>

        <Text textAlign={"center"} fontSize="20px" mb="24px">
          Click button below after payment
        </Text>
        <Center>
          <Button
            textTransform={"capitalize"}
            borderRadius={0}
            bg="#FFA630"
            onClick={() => setIsPaid(!isPaid)}
            _hover={{
              bg: "#FFA630",
            }}
          >
            I have paid
          </Button>
        </Center>

        {isPaid && (
          <Box mt="50px" display="grid" placeItems={"center"}>
            <PayTicket />
          </Box>
        )}
      </Container>
    </Layout>
  );
};
9;
export default Tickets;
