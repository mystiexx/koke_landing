import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";
import { closePaymentModal } from "flutterwave-react-v3";

const PaymentDetails = ({
  isOpen,
  onClose,
  handleEmail,
  handleName,
  handleFlutterPayment,
  selected,
  handleTicket,
  loading,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="#1A1D22" pb="20px">
        <ModalHeader>{selected?.name} Ticket</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter Full Name"
              onChange={handleName}
              focusBorderColor="#FFA630"
            />
          </FormControl>
          <FormControl isRequired mt="16px">
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              placeholder="Enter Email Address"
              onChange={handleEmail}
              focusBorderColor="#FFA630"
            />
          </FormControl>

          <Button
            mt="24px"
            w="full"
            bg="#FFA630"
            isLoading={loading}
            isDisabled={loading}
            _hover={{
              bg: "#FFA630",
            }}
            onClick={() => {
              handleFlutterPayment({
                callback: (response) => {
                  handleTicket(response);
                  closePaymentModal();
                },
                onClose: () => {},
              });
            }}
          >
            {loading ? "Verifying payment..." : "Pay"}
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PaymentDetails;
