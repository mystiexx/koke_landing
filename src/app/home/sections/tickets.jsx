import React, { useState } from "react";
import {
  Box,
  Container,
  Text,
  Button,
  Grid,
  GridItem,
  Image,
  Center,
  useMediaQuery,
} from "@chakra-ui/react";
import { tickets } from "../../../utls/enums";
import commaNumber from "comma-number";
import display from "../../../assets/Koke-web.jpg";
import { useFlutterwave } from "flutterwave-react-v3";
import PaymentDetails from "../components/paymentDetails";
import { generateRandom } from "../../../utls/utils";
import emailjs from "@emailjs/browser";
import { db } from "../../../service/firbase";
import { addDoc, collection } from "firebase/firestore";
import toast from "react-hot-toast";
import { Slide } from "react-awesome-reveal";

const Tickets = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState({});
  const [price, setPrice] = useState(0);
  const ticketCollectionRef = collection(db, "tickets");
  const [loading, setLoading] = useState(false);
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  const config = {
    public_key: import.meta.env.VITE_FLUTTER_KEY,
    tx_ref: Date.now(),
    amount: price,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: email,
      name: name,
    },
    customizations: {
      title: "Koke Xperience",
      description: `Payment for ${selected.name} ticket `,
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSelected = (doc) => {
    setSelected(doc);
    setPrice(doc.price);
    setIsOpen(true);
  };

  const handleTicket = async (response) => {
    try {
      setLoading(true);
      console.log(response);
      const passcode = Math.random().toString(36).substring(2, 10);
      const ticket = {
        name: selected.name,
        price: selected.price,
      };
      const data = {
        _id: generateRandom(10),
        ticket_type: ticket,
        created_at: new Date(),
        name: name,
        email: email,
        checked_in: false,
        invitation_code: passcode,
        transaction_id: response.flw_ref,
      };

      const emailForm = {
        send_to: email,
        name: name,
        passcode: passcode,
        ticket: selected.name,
      };

      const form = document.createElement("form");

      Object.keys(emailForm).forEach((key) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = emailForm[key];
        form.appendChild(input);
      });
      const result = await emailjs.sendForm(
        "service_9habpmt",
        "template_gvv4akt",
        form,
        "16RoAxdl74LyfqcYM",
      );

      if (result.text === "OK") {
        await addDoc(ticketCollectionRef, data);
        toast.success("Please Check your email for your ticket!!!");
        setIsOpen(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box>
      <PaymentDetails
        isOpen={isOpen}
        onClose={() => setIsOpen(!isOpen)}
        handleName={handleName}
        handleEmail={handleEmail}
        selected={selected}
        handleFlutterPayment={handleFlutterPayment}
        handleTicket={handleTicket}
        loading={loading}
      />
      <Container maxW={"container.xl"} py="100px">
        <Text textAlign="center" fontFamily={"Luckiest Guy"} fontSize={"40px"}>
          Tickets
        </Text>

        <Text textAlign={"center"} mb="40px">
          Tickets will be sold at the gate for NGN{commaNumber(3000)}
        </Text>

        <Grid
          templateColumns={isLargerThan800 ? "repeat(3, 1fr)" : "auto"}
          gap="24px"
        >
          <Slide direction="up" cascade triggerOnce>
            {tickets.map((ticket, idx) => (
              <GridItem key={idx}>
                <Box bg="#1A1D22" borderRadius={"5px"}>
                  <Image src={display} alt="koke" />
                  <Box p="16px">
                    <Text textAlign={"center"} fontWeight={600} fontSize={20}>
                      {ticket.name}
                    </Text>
                    <Text textAlign={"center"}>
                      NGN{commaNumber(ticket.price)}
                    </Text>

                    <Center>
                      <Button
                        mt="24px"
                        bg="#FFA630"
                        _hover={{
                          bg: "#FFA630",
                        }}
                        onClick={() => handleSelected(ticket)}
                      >
                        Buy Ticket
                      </Button>
                    </Center>
                  </Box>
                </Box>
              </GridItem>
            ))}
          </Slide>
        </Grid>
      </Container>
    </Box>
  );
};

export default Tickets;
