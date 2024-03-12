import React, { useEffect } from "react";
import {
  capitalizeFirstLetter,
  db,
  storage,
  useFirebase,
} from "../context/Firebase";
import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { IoMdImages, IoIosRemoveCircle } from "react-icons/io";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  HStack,
  Heading,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { getDownloadURL, ref as strgRef, uploadBytes } from "firebase/storage";
import { ref as dbRef, onValue, update } from "firebase/database";

export default function Profile() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isLoggedIn = useFirebase().isLoggedIn;
  const toast = useToast();
  const navigate = useNavigate();
  const inputRef = React.useRef(null);
  const [image, setImage] = React.useState("");
  const [profilePic, setProfilePic] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isEditable, setIsEditable] = React.useState(false);
  const nameRef = React.useRef(null);
  const user = useFirebase().user;
  const signOutUser = useFirebase().signOutUser;

  const handleImageChange = async (e) => {
    e.target.files[0] && setImage(URL.createObjectURL(e.target.files[0]));
    const folderName = "cover_pics";
    const file = `/${user.uid}/cover.jpg`;
    const storageRef = strgRef(storage, `${folderName}/${file}`);
    await uploadBytes(storageRef, e.target.files[0]);
    getDownloadURL(strgRef(storage, `${folderName}/${file}`)).then((url) => {
      update(dbRef(db, `users/${user.uid}`), { coverPic: url })
        .then(() => {
          toast({
            title: "Cover Picture Updated Successfully.",
            status: "success",
            variant: "subtle",
            position: "top",
            isClosable: true,
          });
        })
        .catch((error) => {
          toast({
            title: capitalizeFirstLetter(
              error.code.split("auth/")[1].split("-").join(" ")
            ),
            status: "error",
            variant: "subtle",
            position: "top",
            isClosable: true,
          });
        });
    });
  };

  const handleProfilePicChange = async (e) => {
    e.target.files[0] && setProfilePic(URL.createObjectURL(e.target.files[0]));
    const folderName = "profile_pics";
    const file = `/${user.uid}/profile.jpg`;
    const storageRef = strgRef(storage, `${folderName}/${file}`);
    await uploadBytes(storageRef, e.target.files[0]);
    getDownloadURL(strgRef(storage, `${folderName}/${file}`)).then((url) => {
      update(dbRef(db, `users/${user.uid}`), { profilePic: url })
        .then(() => {
          toast({
            title: "Profile Picture Updated Successfully.",
            status: "success",
            variant: "subtle",
            position: "top",
            isClosable: true,
          });
        })
        .catch((error) => {
          toast({
            title: capitalizeFirstLetter(
              error.code.split("auth/")[1].split("-").join(" ")
            ),
            status: "error",
            variant: "subtle",
            position: "top",
            isClosable: true,
          });
        });
    });
  };

  const handleProfilePicRemove = () => {
    update(dbRef(db, `users/${user.uid}`), { profilePic: "" })
      .then(() => {
        toast({
          title: "Profile Picture Removed Successfully.",
          status: "success",
          variant: "subtle",
          position: "top",
          isClosable: true,
        });
        setProfilePic("");
      })
      .catch((error) => {
        toast({
          title: capitalizeFirstLetter(
            error.code.split("auth/")[1].split("-").join(" ")
          ),
          status: "error",
          variant: "subtle",
          position: "top",
          isClosable: true,
        });
      });
  };

  const handleNameEdit = () => {
    if (isEditable) {
      setIsEditable(false);
    } else {
      setIsEditable(true);
    }
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (nameRef.current.value === "")
      return toast({
        title: "Name cannot be empty.",
        status: "error",
        variant: "subtle",
        position: "top",
        isClosable: true,
      });
    update(dbRef(db, `users/${user.uid}`), { name: nameRef.current.value })
      .then(() => {
        toast({
          title: "Name Updated Successfully.",
          status: "success",
          variant: "subtle",
          position: "top",
          isClosable: true,
        });
        setIsEditable(false);
      })
      .catch((error) => {
        toast({
          title: capitalizeFirstLetter(
            error.code.split("auth/")[1].split("-").join(" ")
          ),
          status: "error",
          variant: "subtle",
          position: "top",
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    document.title = "INDI - Profile";
    window.scrollTo(0, 0);
    if (!isLoggedIn) {
      navigate("/login", { state: { prevUrl: "/profile" } });
    }
    const getUserData = () => {
      if (user) {
        const dbR = dbRef(db, `users/${user?.uid}`);
        onValue(dbR, (snapshot) => {
          const data = snapshot?.val() || {};
          setProfilePic(data.profilePic);
          setImage(data.coverPic);
          setName(data.name);
          setEmail(data.email);
        });
      }
    };
    getUserData();
  }, [isLoggedIn, navigate, user?.uid, user]);

  return (
    <Box pt={["4rem", "6rem"]} pb={[0, "8rem"]} bg={"#222"}>
      <Input
        type="file"
        opacity={0}
        ref={inputRef}
        pos={"absolute"}
        zIndex={-500}
        accept="image/*"
        onChange={(e) => handleProfilePicChange(e)}
      />
      <Box minH={["fit-content", "40vh"]} pos={"relative"} px={[0, 20]}>
        <Image
          src={image}
          alt="cover pic"
          h={["200px", "450px"]}
          w={"100%"}
          borderRadius={[0, "1rem"]}
          bg={"linear-gradient(to right, #ff6e7f, #bfe9ff)"}
        />
        <Box pos={"absolute"} top={["10px", "1rem"]} right={["10px", "6rem"]}>
          <label htmlFor="file-upload">
            <Box
              p={2}
              zIndex={100}
              borderRadius={"full"}
              bg={"#fff"}
              cursor={"pointer"}
            >
              <FaCamera size={20} />
            </Box>
            <input
              id="file-upload"
              type="file"
              style={{ display: "none" }}
              onChange={(e) => handleImageChange(e)}
              accept="image/*"
            />
          </label>
        </Box>
        <Card
          direction={{ base: "column", sm: "row" }}
          variant="outline"
          maxW={["100%", "2xl"]}
          pos={["", "absolute"]}
          left={0}
          right={0}
          bottom={["", "-25%"]}
          margin={"auto"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
          p={[10, 6]}
          borderRadius={[0, "1rem"]}
        >
          <Avatar
            size={"2xl"}
            cursor={"pointer"}
            name={name}
            bg={"linear-gradient(to right, #ff416c, #ff4b2b)"}
            color={"white"}
            src={profilePic}
            transform={"scale(1.2)"}
            transition={"all 0.3s ease-in-out"}
            _hover={{ filter: "brightness(0.8)" }}
            onClick={onOpen}
          />

          <Stack>
            <CardBody textAlign={["center", "left"]}>
              <HStack justifyContent={["center", "left"]}>
                {isEditable ? (
                  <form onSubmit={handleNameSubmit}>
                    <Stack flexDir={["column", "row"]}>
                      <Input
                        type="text"
                        textAlign={["center", "left"]}
                        ref={nameRef}
                        placeholder="Enter Name"
                        variant={"flushed"}
                        autoFocus
                        _focusVisible={{ borderBottom: "1px solid #ff4e4e" }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <ButtonGroup
                        variant="outline"
                        size={["sm", "md"]}
                        mx={"auto"}
                      >
                        <Button colorScheme="red" type="submit">
                          Save
                        </Button>
                        <Button onClick={() => setIsEditable(false)}>
                          Cancel
                        </Button>
                      </ButtonGroup>
                    </Stack>
                  </form>
                ) : (
                  <>
                    <Heading
                      textTransform={"capitalize"}
                      size="md"
                      fontFamily={"'Inter', sans-serif"}
                    >
                      {name}
                    </Heading>
                    <IconButton
                      // variant={'outline'}
                      colorScheme="red"
                      size={"sm"}
                      icon={<CiEdit size={20} />}
                      onClick={handleNameEdit}
                    />
                  </>
                )}
              </HStack>

              <Text py="2" fontFamily={"'Inter', sans-serif"}>
                {email}
              </Text>
            </CardBody>

            <CardFooter>
              <Button
                variant="solid"
                colorScheme="red"
                leftIcon={<MdLogout size={20} />}
                mx={["auto", "0"]}
                onClick={() => {
                  signOutUser();
                  navigate("/");
                }}
              >
                Log Out
              </Button>
            </CardFooter>
          </Stack>
        </Card>
      </Box>
      <Modal isCentered size={["xs", "xl"]} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={"1rem"}>
          <ModalCloseButton _focusVisible={{ outline: "none" }} />
          <ModalBody p={8}>
            <Button
              variant={"ghost"}
              colorScheme="red"
              w={"100%"}
              justifyContent={"start"}
              my={2}
              onClick={() => {
                inputRef.current.click();
                onClose();
              }}
            >
              <HStack>
                <IconButton
                  variant={"outline"}
                  colorScheme="red"
                  size={"sm"}
                  icon={<IoMdImages size={20} />}
                  pointerEvents={"none"}
                />
                <Text fontFamily={"'Inter', sans-serif"}>
                  Change Profile Picture
                </Text>
              </HStack>
            </Button>
            <Divider />
            <Button
              variant={"ghost"}
              colorScheme="red"
              w={"100%"}
              justifyContent={"start"}
              my={2}
              onClick={() => {
                handleProfilePicRemove();
                onClose();
              }}
            >
              <HStack>
                <IconButton
                  variant={"outline"}
                  colorScheme="red"
                  size={"sm"}
                  icon={<IoIosRemoveCircle size={20} />}
                  pointerEvents={"none"}
                />
                <Text fontFamily={"'Inter', sans-serif"}>
                  Remove Profile Picture
                </Text>
              </HStack>
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
