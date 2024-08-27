import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  VStack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const SignUp = ({ userShow, closeUser }) => {
  const [firstName, setfirstName] = useState("");
  const [secondName, setsecondName] = useState("");
  const [mobileNo, setmobileNo] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your server for user registration
      const response = await axios.post(
        "/backend/api/v1/users/signUp", // Added a slash at the beginning to make it an absolute path
        { firstName, secondName, email, mobileNo, password }
      );

      // Assuming your server responds with a success message and user data
      if (response.data.success) {
        // Handle successful registration, e.g., redirect or set user state
        console.log("SignUp successful!");
        navigate("/Nurseui")
      } else {
        // Handle registration failure, e.g., show an error message
        console.error("SignUp failed: " + response.data.message);
      }
    } catch (error) {
      console.error("SignUp failed:", error);
    }
  };

  if (!userShow) return null;

  return ReactDOM.createPortal(
    <Box
      position="absolute"
      top="auto"
      left="50%"
      mt="-40px"
      transform="translate(-50%, -100%)"
      zIndex="1000"
      bg={"rgba(0,0,0,0.2)"}
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      onClick={closeUser}
    >
      <Box
        h={"70%"}
        w={"50%"}
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
                First Name:
              </FormLabel>
              <Input
                type="text"
                name="firstName"
                placeholder="ABC"
                onChange={(e) => setfirstName(e.target.value)}
              />
            </HStack>
            <HStack p={4} py={6}>
              <FormLabel color={"#13522E"} w={"14vh"}>
                Last Name:
              </FormLabel>
              <Input
                type="text"
                name="secondName"
                placeholder="XYZ"
                onChange={(e) => setsecondName(e.target.value)}
              />
            </HStack>
            <HStack p={4} py={6}>
              <FormLabel color={"#13522E"} w={"14vh"}>
                Email:
              </FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="ABC@gmail.com"
                onChange={(e) => setemail(e.target.value)}
              />
            </HStack>
            <HStack p={4} py={6}>
              <FormLabel color={"#13522E"} w={"14vh"}>
                Mobile-No:
              </FormLabel>
              <Input
                type="text"
                name="mobileNo"
                placeholder="7789778977"
                onChange={(e) => setmobileNo(e.target.value)}
              />
            </HStack>
            <HStack p={4} py={6}>
              <FormLabel color={"#13522E"} w={"14vh"}>
                Password:
              </FormLabel>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </HStack>
            <Button
              my={6}
              bgColor={"#13522E"}
              color={"#fff"}
              p={4}
              width={"30%"}
              mx={"35%"}
              type="submit"
              _hover={{ bg: "#00622E", color: "#CCE9D5" }}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <HStack w={"100%"} justifyContent={"center"} mt={3}>
              <Text fontSize="xl">Already a user?</Text>
              <Link fontSize={"xl"} color={"blue.500"} to="/login">
                Log-In
              </Link>
            </HStack>
          </FormControl>
        </VStack>
      </Box>
    </Box>,
    document.getElementById("user")
  );
};

export default SignUp;
