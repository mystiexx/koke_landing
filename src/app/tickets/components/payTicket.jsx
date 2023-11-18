import React, { useState, useRef } from "react";
import {
  Box,
  Input,
  Select,
  FormControl,
  FormLabel,
  Text,
  useMediaQuery,
  Button,
  Image,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { tickets } from "../../../utls/enums";
import { generateRandom } from "../../../utls/utils";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../service/firbase";
import toast from "react-hot-toast";
import { FileUploadToCloud } from "../../../service/fileupload";
import { RiImageAddFill } from "react-icons/ri";
import axios from "axios";

const baseUrl = "https://koke-emailing.onrender.com/api/send-email";

const PayTicket = () => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  const [loading, setLoading] = useState(false);
  const ticketCollectionRef = collection(db, "tickets");
  const [image, setImage] = useState("");
  const imageRef = useRef();
  const [uploading, setUploading] = useState(false);

  let initialValues = {
    name: "",
    email: "",
    ticket_type: "",
    reference: "",
  };

  const handleSubmit = async (docs, { resetForm }) => {
    try {
      setLoading(true);
      const data = {
        _id: generateRandom(10),
        ...docs,
        ticket_type: JSON.parse(docs.ticket_type),
        checked_in: false,
        invitation_code: null,
        created_at: new Date(),
        ticket_sent: false,
        proof: image,
      };
      const sendEmail = {
        send_to: "kokeempire.ng@gmail.com",
        templateType: "ticketSold",
        subject: "Ticket Sold!!!",
        templateData: {
          ticket: data.ticket_type.name,
          fullname: name,
        },
      };
      await axios.post(baseUrl, sendEmail);
      await addDoc(ticketCollectionRef, data);
      toast.success("Saved!!");
      resetForm();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImage = async (e) => {
    setUploading(true);
    const file = e.target.files[0];
    const response = await FileUploadToCloud(file);
    setUploading(false);
    setImage(response?.secure_url);
  };

  const handleImageClick = () => {
    imageRef?.current?.click();
  };

  return (
    <Box w={isLargerThan800 ? "500px" : "full"}>
      <Input type="file" onChange={handleImage} display="none" ref={imageRef} />
      <Text
        mb="30px"
        textAlign="center"
        fontSize={20}
        textTransform={"capitalize"}
      >
        Fill the form below
      </Text>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, handleChange }) => (
          <Form>
            <Box display={"flex"} flexDir={"column"} gap="24px">
              <FormControl isRequired>
                <FormLabel fontSize={14}>Full Name</FormLabel>
                <Input
                  type="text"
                  name={"name"}
                  onChange={handleChange}
                  value={values.name}
                  placeholder="Your Name"
                  focusBorderColor="#FFA630"
                  border="1px solid #1A1D22"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize={14}>Email</FormLabel>
                <Input
                  type="email"
                  value={values.email}
                  name={"email"}
                  onChange={handleChange}
                  placeholder="Your Email"
                  focusBorderColor="#FFA630"
                  border="1px solid #1A1D22"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize={14}>Ticket</FormLabel>
                <Select
                  name="ticket_type"
                  focusBorderColor="#FFA630"
                  border="1px solid #1A1D22"
                  value={values.ticket_type}
                  onChange={handleChange}
                >
                  <option>--Choose ticket type--</option>
                  {tickets.map((ticket, idx) => (
                    <option key={idx} value={JSON.stringify(ticket)}>
                      {ticket.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize={14}>
                  Transaction Reference Number
                </FormLabel>
                <Input
                  type="text"
                  name={"reference"}
                  value={values.reference}
                  onChange={handleChange}
                  placeholder="Your Transaction Reference"
                  focusBorderColor="#FFA630"
                  border="1px solid #1A1D22"
                />
              </FormControl>

              <Box>
                {image ? (
                  <Image src={image} h="40vh" objectFit={"cover"} w="full" />
                ) : (
                  <Box>
                    {uploading ? (
                      <Box display={"grid"} placeItems={"center"} h="40vh">
                        {" "}
                        <Spinner size="xl" color="#FFA630" />
                      </Box>
                    ) : (
                      <Box
                        onClick={handleImageClick}
                        cursor={"pointer"}
                        display="grid"
                        placeItems={"center"}
                        h="40vh"
                        w="full"
                        border="1px solid #1A1D22"
                      >
                        <Box>
                          <Center>
                            <RiImageAddFill size="50" color="#1A1D22" />
                          </Center>
                          <Text
                            textTransform={"capitalize"}
                            mt="10px"
                            fontSize={"14px"}
                          >
                            Add Proof of payment
                          </Text>
                        </Box>
                      </Box>
                    )}
                  </Box>
                )}
              </Box>

              <Button
                w="full"
                bg="#FFA630"
                isLoading={loading}
                _hover={{
                  bg: "#FFA630",
                }}
                type="submit"
              >
                Submit
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default PayTicket;
