import React, { useState } from "react";
import {
  Box,
  Input,
  Select,
  FormControl,
  FormLabel,
  Text,
  useMediaQuery,
  Button,
} from "@chakra-ui/react";
import commaNumber from "comma-number";
import { Formik, Form } from "formik";
import { generateRandom } from "../../../utls/utils";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../service/firbase";
import axios from "axios";

const nature = [
  {
    name: "Consumables",
    price: 30000,
  },
  {
    name: "Non-Consumables",
    price: 25000,
  },
];

const baseURL = "https://koke-emailing.onrender.com/api/send-email";

const Registration = () => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  const [business_nature, setBusinessNature] = useState("");
  const [loading, setLoading] = useState(false);
  const vendorsCollectionRef = collection(db, "vendors");

  let initialValues = {
    email: "",
    business_name: "",
    business_nature: "",
    phone: "",
    instagram: "",
  };

  const handleSubmit = async (doc) => {
    try {
      setLoading(true);
      let data = {
        _id: generateRandom(10),
        created_at: new Date(),
        checked_in: false,
        ticket_sent: false,
        invitation_code: null,
        paid: false,
        ...doc,
        business_nature: business_nature,
      };
      const sendEmail = {
        send_to: "kokeempire.ng@gmail.com",
        templateType: "ticketSold",
        templateData: {
          ticket: data.business_nature.name,
          fullname: data.business_name,
        },
      };
      await axios.post(baseURL, sendEmail),
        await addDoc(vendorsCollectionRef, data);
      window.location.href = "/success";
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBuisnessNature = (doc) => {
    let result = JSON.parse(doc);
    setBusinessNature(result);
  };
  return (
    <Box w={isLargerThan800 ? "500px" : "auto"}>
      <Text
        fontSize={30}
        fontFamily={"Luckiest Guy"}
        textAlign={"center"}
        mb="30px"
      >
        D'KOKE XPERIENCE Vendors Registration
      </Text>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ handleChange, setFieldValue }) => (
          <Form>
            <Box display={"flex"} flexDir={"column"} gap="24px">
              <FormControl isRequired>
                <FormLabel fontSize={14}>Email</FormLabel>
                <Input
                  type="email"
                  name={"email"}
                  onChange={(e) => {
                    setFieldValue("email", e.target.value);
                  }}
                  placeholder="Your Email"
                  focusBorderColor="#FFA630"
                  border="1px solid #1A1D22"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize={14}>Business Name</FormLabel>
                <Input
                  type="text"
                  name="business_name"
                  onChange={(e) => {
                    setFieldValue("business_name", e.target.value);
                  }}
                  placeholder="Your Business Name"
                  focusBorderColor="#FFA630"
                  border="1px solid #1A1D22"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontSize={14}>Nature of Business</FormLabel>
                <Select
                  onChange={(e) => handleBuisnessNature(e.target.value)}
                  focusBorderColor="#FFA630"
                  border="1px solid #1A1D22"
                >
                  <option>--Choose Nature of business--</option>
                  {nature.map((data, idx) => (
                    <option key={idx} value={JSON.stringify(data)}>{`${
                      data.name
                    } - NGN${commaNumber(data.price)}`}</option>
                  ))}
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize={14}>Phone Number</FormLabel>
                <Input
                  type="text"
                  name="phone"
                  onChange={handleChange}
                  placeholder="Your Phone Number"
                  focusBorderColor="#FFA630"
                  border="1px solid #1A1D22"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize={14}>Instagram Handle</FormLabel>
                <Input
                  type="text"
                  name="instagram"
                  onChange={handleChange}
                  placeholder="Your Instagram Handle"
                  focusBorderColor="#FFA630"
                  border="1px solid #1A1D22"
                />
              </FormControl>
            </Box>

            <Button
              w="full"
              mt="24px"
              bg="#FFA630"
              isLoading={loading}
              _hover={{
                bg: "#FFA630",
              }}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Registration;
