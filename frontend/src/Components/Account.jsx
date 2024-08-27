import React, { useState } from "react";

import { Button, Heading, VStack } from "@chakra-ui/react";
import { Box, Flex, Text } from "@chakra-ui/react";
import SignUp from "./SignUp.jsx";
import LogIn from "./Login.jsx";

const Account = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);

  const openSignUp = () => {
    setShowSignUp(true);
    setShowLogIn(false);
  };

  const openLogIn = () => {
    setShowLogIn(true);
    setShowSignUp(false);
  };

  return (
    <div>
      <VStack
        justifyContent={"center"}
        alignItems={"center"}
        height={"110vh"}
        bg={"#CCE9D5"}
      >
        <Heading>CREATE AN ACCOUNT</Heading>
        <Box display={"flex"} flexDirection={"column"} w={"100%"}>
          <Button
            onClick={openSignUp}
            py={6}
            w={"20%"}
            mx={"40%"}
            size={"lg"}
            bg={"#1C4532"}
            color={"#fff"}
            mt={7}
            _hover={{ bg: "#00622E", color: "#CCE9D5" }}
          >
            SIGN-UP
          </Button>
          {showSignUp && (
            <SignUp
              userShow={showSignUp}
              closeUser={() => setShowSignUp(false)}
            />
          )}
          <Button
            onClick={openLogIn}
            py={6}
            w={"20%"}
            mx={"40%"}
            size={"lg"}
            bg={"#1C4532"}
            color={"#fff"}
            mt={7}
            _hover={{ bg: "#00622E", color: "#CCE9D5" }}
          >
            LOG-IN
          </Button>
          {showLogIn && (
            <LogIn
              nurseShow={showLogIn}
              closeNurse={() => setShowLogIn(false)}
            />
          )}
        </Box>
      </VStack>
    </div>
  );
};

export default Account;
