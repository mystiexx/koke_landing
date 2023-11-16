import React from "react";
import { Box, Text, Container, Image, Center, Button } from "@chakra-ui/react";
import styles from "../styles.module.css";
import Masonry from "react-masonry-css";
import { shuffledGallery } from "../../../utls/utils";
import { Link } from "react-router-dom";

const Gallery = () => {
  const newImages = shuffledGallery();
  return (
    <Box>
      <Container maxW="container.xl" py="100px">
        <Text
          textAlign="center"
          fontFamily={"Luckiest Guy"}
          fontSize={"40px"}
          mb="24px"
        >
          Gallery
        </Text>
        <Text textAlign={"center"}>
          Check out some of the amazing highlights taken from D' KOKE XPERIENCE
          1.0
        </Text>

        <Box mt="24px">
          <Masonry
            breakpointCols={{ default: 3, 1100: 3, 700: 2, 500: 1 }}
            className={styles.photo_gallery}
            columnClassName={styles.column}
          >
            {newImages.slice(0, 10).map((data, idx) => (
              <Box className={styles.photo} key={idx * 1}>
                <Image
                  src={data.image}
                  height={"auto"}
                  w="100%"
                  display={"block"}
                />
              </Box>
            ))}
          </Masonry>
        </Box>

        <Center>
          <Link to="/gallery">
            <Button
              mt="24px"
              bg="#FFA630"
              color="#fff"
              _hover={{
                bg: "#FFA630",
              }}
            >
              View More
            </Button>
          </Link>
        </Center>
      </Container>
    </Box>
  );
};

export default Gallery;
