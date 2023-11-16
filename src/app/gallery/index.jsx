import React, { useState } from "react";
import { Box, Container, Text, Center, Button, Image } from "@chakra-ui/react";
import Masonry from "react-masonry-css";
import styles from "../home/styles.module.css";
import { shuffledGallery } from "../../utls/utils";
import Layout from "../../layout";

const GalleryPage = () => {
  const [slice, setSlice] = useState(10);
  const newImages = shuffledGallery();

  const loadMore = () => {
    setSlice((prev) => prev + 10);
  };
  return (
    <Layout>
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
            Check out some of the amazing highlights taken from D' KOKE
            XPERIENCE 1.0
          </Text>

          <Box mt="24px">
            <Masonry
              breakpointCols={{ default: 3, 1100: 3, 700: 2, 500: 1 }}
              className={styles.photo_gallery}
              columnClassName={styles.column}
            >
              {newImages.slice(0, slice).map((data, idx) => (
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
            <Button
              mt="24px"
              onClick={loadMore}
              bg="#FFA630"
              color="#fff"
              _hover={{
                bg: "#FFA630",
              }}
            >
              Load More
            </Button>
          </Center>
        </Container>
      </Box>
    </Layout>
  );
};

export default GalleryPage;
