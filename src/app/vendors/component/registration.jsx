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
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { Formik, Form } from "formik";
import { generateRandom } from "../../../utls/utils";
import axios from "axios";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../service/firbase";
import toast from "react-hot-toast";

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
  const [email, setEmail] = useState("");
  const [business_name, setBusinessName] = useState("");
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const vendorsCollectionRef = collection(db, "vendors");

  let initialValues = {
    email: "",
    business_name: "",
    business_nature: "",
    phone: "",
    social_media: "",
  };

  const config = {
    public_key: import.meta.env.VITE_FLUTTER_KEY,
    tx_ref: Date.now(),
    amount: price,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: email,
      name: business_name,
    },
    customizations: {
      title: "Koke Xperience Vendor",
      description: `Payment for Vendor `,
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handleSubmit = async (doc, response) => {
    try {
      setLoading(true);
      const passcode = Math.random().toString(36).substring(2, 10);
      let data = {
        _id: generateRandom(10),
        created_at: new Date(),
        checked_in: false,
        invitation_code: passcode,
        transaction_id: response.flw_ref,
        ...doc,
        business_nature: business_nature,
      };
      const sendEmail = {
        send_to: data.email,
        templateType: "Vendor",
        templateData: {
          fullName: data.business_name,
          passcode,
        },
      };
      await axios.post(baseURL, sendEmail);
      await addDoc(vendorsCollectionRef, data);
      toast.success("Please check your email!!!!");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBuisnessNature = (doc) => {
    let result = JSON.parse(doc);
    setBusinessNature(result);
    setPrice(result.price);
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
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          handleFlutterPayment({
            callback: (response) => {
              handleSubmit(values, response);
              closePaymentModal();
            },
            onClose: () => {},
          });
        }}
      >
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
                    setEmail(e.target.value);
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
                    setBusinessName(e.target.value);
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
                <FormLabel fontSize={14}>Social Media Handle</FormLabel>
                <Input
                  type="text"
                  name="social_media"
                  onChange={handleChange}
                  placeholder="Your Socail Media Handle"
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
