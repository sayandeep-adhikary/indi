import {
  Button,
  Grid,
  GridItem,
  HStack,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaFacebook, FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/indi-logo.svg";
import { useFirebase } from "../context/Firebase";

export default function Login() {
  const [isSignInClicked, setIsSignInClicked] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const firebase = useFirebase();
  const createUserWithPassword = firebase.createUserWithPassword;
  const signinWithEmailAndPassword = firebase.signinWithEmailAndPassword;
  const signInAnonymousUser = firebase.signInAnonymousUser;
  const signupWithGoogle = firebase.signupWithGoogle;
  const signupWithFacebook = firebase.signupWithFacebook;
  const isLoggedIn = firebase.isLoggedIn;
  // const signOutUser = firebase.signOutUser;

  const navigate = useNavigate();
  const location = useLocation();

  const handleSignInClick = () => {
    setIsSignInClicked(true);
    setName("");
    setEmail("");
    setPassword("");
    setPasswordVisible(false);
  };
  const handleRegisterClick = () => {
    setIsSignInClicked(false);
    setName("");
    setEmail("");
    setPassword("");
    setPasswordVisible(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isSignInClicked) {
      signinWithEmailAndPassword(email, password);
    } else {
      createUserWithPassword(email, password);
    }
  };

  useEffect(() => {
    document.title = "Login | INDI";
    window.scrollTo(0, 0);
    if(isLoggedIn){
      navigate(location.state?.prevUrl ? location.state.prevUrl : "/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <Grid
      h="120vh"
      templateRows={"1fr"}
      templateColumns="repeat(5, 1fr)"
      bg={"linear-gradient(to right top, #d3cce3, #e9e4f0)"}
      px={10}
    >
      <GridItem
        colSpan={3}
        display={["none", "flex"]}
        letterSpacing={"3px"}
        flexDirection={"column"}
        p={10}
        pb={0}
      >
        <Heading
          color={"white"}
          fontFamily={"'Bebas Neue', sans-serif"}
          fontSize={"3rem"}
          textShadow={
            "1px 1px 0 #000,-1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000"
          }
        >
          Welcome to &nbsp;
          <span
            style={{
              color: "#ff4e4e",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "3.5rem",
            }}
          >
            INDI
          </span>
        </Heading>
        <Text
          color={"gray.600"}
          fontSize={["0.9rem", "1rem"]}
          fontFamily={"'Inter', sans-serif"}
          letterSpacing={"2px"}
          fontWeight={900}
          pr={5}
          lineHeight={"180%"}
        >
          From cult classics to modern masterpieces. Stay updated with the
          latest movies, news and articles from INDI. <br />
          <span
            style={{
              color: "#ff4e4e",
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "1px",
            }}
          >
            Join Now!
          </span>
        </Text>
        <lottie-player
          src="https://lottie.host/ba3db215-d01b-4e13-89f3-707bba2441cd/waPCrTinod.json"
          background="#d3cce3, #e9e4f0"
          speed={1}
          style={{ width: 350, height: 350, alignSelf: "center" }}
          loop
          autoPlay
          direction={1}
          mode="normal"
        />
      </GridItem>
      <GridItem colSpan={[5, 2]} p={[2, 20]} py={20}>
        <HStack justifyContent={"space-between"} gap={5}>
          <Link to={"/"}>
            <Image src={logo} alt="logo" width={"3rem"} />
          </Link>
          <HStack gap={2}>
            <Button
              variant={"ghost"}
              color="#ff4e4e"
              rounded={"xl"}
              _hover={{ bg: "#ffdcdc" }}
              onClick={handleSignInClick}
            >
              Sign In
            </Button>
            <Button
              variant={"outline"}
              bg={"#f0f4fc"}
              color="#ff4e4e"
              rounded={"xl"}
              border={"1px solid #ff4e4e"}
              _hover={{ bg: "#ffdcdc" }}
              boxShadow={"0 10px 20px 0 #ffbaba"}
              onClick={handleRegisterClick}
            >
              Register
            </Button>
          </HStack>
        </HStack>
        <VStack spacing={5} w={"full"} pt={10} align={"self-start"}>
          <Text
            fontSize={["0.9rem", "1rem"]}
            fontFamily={"'Inter', sans-serif"}
            letterSpacing={"1px"}
            fontWeight={900}
            pr={5}
          >
            {isSignInClicked ? "Sign In" : "Register"}
          </Text>
          <VStack w={"full"}>
            <form
              style={{ width: "100%" }}
              onSubmit={(e) => handleFormSubmit(e)}
            >
              {!isSignInClicked && (
                <Input
                  type="text"
                  placeholder="Enter your name"
                  fontSize={"1rem"}
                  boxShadow={"0 10px 20px 0 #ffbaba"}
                  _focusVisible={{ border: "none" }}
                  transition={"all 0.2s"}
                  mb={5}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              )}
              <Input
                type="email"
                placeholder="Enter your email"
                fontSize={"1rem"}
                boxShadow={"0 10px 20px 0 #ffbaba"}
                _focusVisible={{ border: "none" }}
                transition={"all 0.2s"}
                mb={5}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <InputGroup>
                <InputRightElement color={"gray.600"} cursor={"pointer"}>
                  {passwordVisible ? (
                    <VscEye
                      size={"1.5rem"}
                      onClick={() => setPasswordVisible(false)}
                    />
                  ) : (
                    <VscEyeClosed
                      size={"1.5rem"}
                      onClick={() => setPasswordVisible(true)}
                    />
                  )}
                </InputRightElement>
                <Input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  fontSize={"1rem"}
                  boxShadow={"0 10px 20px 0 #ffbaba"}
                  _focusVisible={{ border: "none" }}
                  transition={"all 0.2s"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </InputGroup>
              <Button
                w={"full"}
                bg={"#ff4e4e"}
                color={"white"}
                rounded={"xl"}
                _hover={{ bg: "#ff8989" }}
                my={10}
                type="submit"
              >
                {isSignInClicked ? "Sign In" : "Register"}
              </Button>
            </form>
          </VStack>
          <Text
            color={"gray.500"}
            fontSize={["0.9rem", "1rem"]}
            fontFamily={"'Inter', sans-serif"}
            letterSpacing={"1px"}
            fontWeight={900}
            pr={5}
            alignSelf={"center"}
          >
            Or Continue With
          </Text>
          <HStack spacing={5} w={"full"} align={"center"} justify={"center"}>
            <Tooltip hasArrow label="Guest User">
              <IconButton
                size="lg"
                icon={<FaUser size={20} color="#1DA1F2" />}
                boxShadow={"0 10px 20px 0 #ffbaba"}
                onClick={signInAnonymousUser}
              />
            </Tooltip>
            <Tooltip hasArrow label="Google">
              <IconButton
                size="lg"
                icon={<FcGoogle size={25} />}
                boxShadow={"0 10px 20px 0 #ffbaba"}
                onClick={signupWithGoogle}
              />
            </Tooltip>
            <Tooltip hasArrow label="Facebook">
              <IconButton
                size="lg"
                icon={<FaFacebook size={25} color="#316ff6" />}
                boxShadow={"0 10px 20px 0 #ffbaba"}
                onClick={signupWithFacebook}
              />
            </Tooltip>
          </HStack>
          {/* {
            isLoggedIn && (
              <Button
                w={"full"}
                bg={"#ff4e4e"}
                color={"white"}
                rounded={"xl"}
                _hover={{ bg: "#ff8989" }}
                my={10}
                onClick={signOutUser}
              >
                Sign Out
              </Button>
            )
          } */}
        </VStack>
      </GridItem>
    </Grid>
  );
}
