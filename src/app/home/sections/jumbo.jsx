import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Center,
  Container,
  Image,
  useMediaQuery,
} from "@chakra-ui/react";
import jumbo from "../../../assets/jumbo.jpg";
import { motion } from "framer-motion";

const Jumbo = () => {
  const targetDate = new Date("2023-12-26T00:00:00");
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  const [countdown, setCountdown] = useState(calculateCountdown());

  function calculateCountdown() {
    const now = new Date();
    const difference = targetDate - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateCountdown());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Image
        src={jumbo}
        alt="background"
        position={"absolute"}
        w="100%"
        h={isLargerThan800 ? "100vh" : "90vh"}
        zIndex={"-1"}
        opacity={"0.3"}
        objectFit={"cover"}
        top={0}
      />

      <Container maxW="container.xl" position={"relative"}>
        <Box h="90vh" display={"grid"} placeItems={"center"}>
          <Box>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1.5 }}
            >
              <Text
                fontSize={isLargerThan800 ? "100px" : "40px"}
                fontWeight={700}
                fontFamily={"Luckiest Guy"}
                textAlign={"center"}
                color={"#FFA630"}
              >
                D'KOKE XPERIENCE
              </Text>
            </motion.div>

            <Text fontSize={isLargerThan800 ? 18 : 16} textAlign={"center"}>
              Enjoy the peak of entertainment with live music and{" "}
              {isLargerThan800 ? <br /> : null} enjoying the company of friends
              and family.
            </Text>

            <Box>
              <Center>
                <Box display="flex" alignItems={"center"} gap="10px">
                  <Box>
                    <Text
                      fontSize={isLargerThan800 ? "60px" : "25px"}
                      fontWeight={"700"}
                      fontFamily={"Black Ops One"}
                      textAlign="center"
                    >
                      {countdown.days} :
                    </Text>
                    <Text
                      textAlign={"left"}
                      mt="0"
                      fontSize={isLargerThan800 ? null : "12px"}
                    >
                      Days
                    </Text>
                  </Box>

                  <Box>
                    <Text
                      fontSize={isLargerThan800 ? "60px" : "25px"}
                      fontWeight={"700"}
                      fontFamily={"Black Ops One"}
                      textAlign="center"
                    >
                      {countdown.hours} :
                    </Text>
                    <Text
                      textAlign={"left"}
                      mt="0"
                      fontSize={isLargerThan800 ? null : "12px"}
                    >
                      Hours
                    </Text>
                  </Box>

                  <Box>
                    <Text
                      fontSize={isLargerThan800 ? "60px" : "25px"}
                      fontWeight={"700"}
                      fontFamily={"Black Ops One"}
                      textAlign="center"
                    >
                      {countdown.minutes} :
                    </Text>
                    <Text
                      textAlign={"left"}
                      mt="0"
                      fontSize={isLargerThan800 ? null : "12px"}
                    >
                      minutes
                    </Text>
                  </Box>

                  <Box>
                    <Text
                      fontSize={isLargerThan800 ? "60px" : "25px"}
                      fontWeight={"700"}
                      fontFamily={"Black Ops One"}
                      textAlign="center"
                    >
                      {countdown.seconds}
                    </Text>
                    <Text
                      textAlign={"left"}
                      mt="0"
                      fontSize={isLargerThan800 ? null : "12px"}
                    >
                      seconds
                    </Text>
                  </Box>
                </Box>
              </Center>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Jumbo;
