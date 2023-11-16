import React from "react";
import { Box, Container, Image, Text, Button } from "@chakra-ui/react";
import { gallery_59 } from "../../../assets/gallery";
import { FaInstagram } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { Slide } from "react-awesome-reveal";

const Partner = () => {
  return (
    <Box py="100px">
      <Image
        src={gallery_59}
        alt="background"
        position={"absolute"}
        w="100%"
        h="70vh"
        zIndex={"-1"}
        opacity={"0.4"}
        objectFit={"cover"}
      />
      <Container maxW={"container.xl"} py="100px">
        <Slide direction="'left" cascade triggerOnce>
          <Text fontFamily={"Luckiest Guy"} fontSize={"40px"}>
            To Partner
          </Text>
          <Text fontWeight={500}>
            If you're interested in sponsoring D'KOKE XPERIENCE, please contact
            us at <br /> +234 906 095 4759 & +234 814 004 5183. We'd be happy to
            discuss opportunities with you!
          </Text>

          <Box mt="24px" display="flex" flexDir={"column"} gap="24px">
            <a
              href="https://instagram.com/kokeempirenigeria?igshid=OGQ5ZDc2ODk2ZA=="
              target={"_blank"}
              rel="noreferrer noopener"
            >
              <Button
                leftIcon={<FaInstagram size={25} />}
                bg="#FFA630"
                color="#fff"
                _hover={{
                  bg: "#FFA630",
                }}
              >
                Follow us on instagram
              </Button>
            </a>
            <a href="tel:+234 906 095 4759">
              <Button
                leftIcon={<FaPhone size={25} />}
                bg="#FFA630"
                color="#fff"
                _hover={{
                  bg: "#FFA630",
                }}
              >
                Call us +234 906 095 4759
              </Button>
            </a>

            <a href="mailto:empirekoke@gmail.com">
              <Button
                leftIcon={<IoMdMail size={25} />}
                bg="#FFA630"
                color="#fff"
                _hover={{
                  bg: "#FFA630",
                }}
              >
                empirekoke@gmail.com
              </Button>
            </a>
          </Box>
        </Slide>
      </Container>
    </Box>
  );
};

export default Partner;
