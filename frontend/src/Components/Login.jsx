import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useNavigate } from "react-router";
import { showErrorToast, showSuccessToast } from "./toastify.js";

const LogIn = ({ nurseShow, closeNurse }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your server for user login
      const response = await axios.post("/backend/api/v1/users/login", {
        email,
        password,
      });

      // Assuming your server responds with a success message and user data
      if (response.data.success) {
        // Handle successful login, e.g., redirect or set user state
        console.log("Login successful!");
        showSuccessToast(response.data.message);
        navigate("/Nurseui");
      } else {
        // Handle login failure, e.g., show an error message
        showErrorToast(response.data.message);
        console.error("Login failed: " + response.data.message);
      }
    } catch (error) {
      showErrorToast(error.response.data.message); 
      console.error("Login failed:", error);
    }
  };

  if (!nurseShow) return null;

  return ReactDOM.createPortal(
    <Box
      position="absolute"
      top="auto"
      left="50%"
      mt="-30px"
      transform="translate(-50%, -100%)"
      zIndex="1000"
      bg={"rgba(0,0,0,0.2)"}
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      onClick={closeNurse}
    >
      <Box
        h={"40%"}
        w={"30%"}
        bgColor={"#CCE9D5"}
        borderRadius={15}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <VStack>
          <Heading color={"#13522E"} mt={2}>
            Get In Touch
          </Heading>
          <FormControl p={4}>
            <HStack p={4} py={6}>
              <FormLabel color={"#13522E"} w={"14vh"}>
                Email:
              </FormLabel>
              <Input
                type="email"
                placeholder="ABC@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </HStack>
            <HStack p={4} py={6}>
              <FormLabel color={"#13522E"} w={"14vh"}>
                Password:
              </FormLabel>
              <Input
                type="phone-no"
                placeholder="7789777777"
                onChange={(e) => setPassword(e.target.value)}
              />
            </HStack>
            <Link to="/Nurseui">
              <Button
                my={3}
                bgColor={"#13522E"}
                color={"#fff"}
                p={4}
                width={"30%"}
                mx={"35%"}
                type="submit"
                _hover={{ bg: "#00622E", color: "#CCE9D5" }}
                onClick={handleSubmit}
              >
                Log-In
              </Button>
            </Link>
            <HStack w={"100%"} justifyContent={"center"} py={3}>
              <Text fontSize="xl">You don't have an existing account?</Text>
              <Link fontSize={"xl"} color={"blue.500"} href="/">
                Sign-Up
              </Link>
            </HStack>
          </FormControl>
        </VStack>
      </Box>
    </Box>,
    document.getElementById("user")
  );
};

export default LogIn;
