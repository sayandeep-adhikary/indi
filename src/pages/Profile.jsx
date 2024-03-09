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
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  HStack,
  Heading,
  IconButton,
  Image,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { getDownloadURL, ref as strgRef, uploadBytes } from "firebase/storage";
import { ref as dbRef, onValue, set, update } from "firebase/database";

export default function Profile() {
  const isLoggedIn = useFirebase().isLoggedIn;
  const toast = useToast();
  const navigate = useNavigate();
  const [image, setImage] = React.useState("https://dummyimage.com/hd1080");
  const [name, setName] = React.useState("");
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
          setImage(data.coverPic);
          setName(data.name);
        });
      }
    };
    getUserData();
  }, [isLoggedIn, navigate, user?.uid]);

  return (
    <Box pt={["4rem", "6rem"]} pb={[0, "8rem"]} bg={"#222"}>
      <Box minH={["fit-content", "40vh"]} pos={"relative"} px={[0, 20]}>
        <Image
          src={image}
          alt="cover pic"
          h={["200px", "450px"]}
          w={"100%"}
          borderRadius={[0, "1rem"]}
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
          maxW={"fit-content"}
          pos={["", "absolute"]}
          left={0}
          right={0}
          bottom={["", "-25%"]}
          margin={"auto"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          p={4}
          borderRadius={[0, "1rem"]}
        >
          <Avatar
            size={"2xl"}
            cursor={"pointer"}
            name="Segun Adebayo"
            src="https://bit.ly/sage-adebayo"
            transition={"all 0.3s ease-in-out"}
            _hover={{ filter: "brightness(0.8)" }}
          />

          <Stack>
            <CardBody textAlign={["center", "left"]}>
              <HStack justifyContent={["center", "left"]}>
                {isEditable ? (
                  <form onSubmit={handleNameSubmit}>
                    <Stack flexDir={['column', 'row']}>
                      <Input
                        type="text"
                        textAlign={["center", "left"]}
                        ref={nameRef}
                        placeholder="Enter Name"
                        variant={"flushed"}
                        autoFocus
                        _focusVisible={{ borderBottom: "1px solid #ff4e4e" }}
                      />
                      <ButtonGroup variant="outline" size={['sm', 'md']} mx={'auto'}>
                        <Button colorScheme="red" type="submit">Save</Button>
                        <Button onClick={()=>setIsEditable(false)}>Cancel</Button>
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
                Caffè latte is a coffee beverage of Italian origin made with
                espresso and steamed milk.
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
    </Box>
  );
}
