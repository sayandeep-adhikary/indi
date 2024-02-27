import {
  Box,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function OfficialVideos() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [videos, setVideos] = useState([]);
  const [videoKey, setVideoKey] = useState("");
  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: true,
    arrows: false,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    const getVideos = async () => {
      const videos = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
      );
      setVideos(videos.data.results);
      // console.log(videos.data.results)
    };
    getVideos();
  }, [id, API_KEY]);

  return (
    <Box p={[4, 8]} py={10} bgColor={"#232323"}>
      <Heading
        color={"white"}
        fontFamily={"'Inter', sans-serif"}
        alignSelf={"flex-start"}
      >
        Official Videos
      </Heading>
      {videos.length > 1 ? (
        <Slider {...settings}>
          {videos.map((video) => (
            <Box
              key={video.key}
              p={2}
              m={4}
              onClick={() => {
                onOpen();
                setVideoKey(video.key);
              }}
              cursor={"pointer"}
              pos={"relative"}
            >
              <Image
                src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                alt={video.name}
                borderRadius={"1rem"}
                _hover={{ filter: "brightness(50%)" }}
                aspectRatio={16 / 9}
                className="videoThumbnail"
              />
              <svg
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                id="play"
                viewBox="0 0 163 163"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                width={"75px"}
              >
                <g fill="none">
                  <g transform="translate(2.000000, 2.000000)" strokeWidth={4}>
                    <path
                      d="M10,80 C10,118.107648 40.8923523,149 79,149 L79,149 C117.107648,149 148,118.107648 148,80 C148,41.8923523 117.107648,11 79,11"
                      id="lineOne"
                      stroke="#ff4e4e"
                    />
                    <path
                      d="M105.9,74.4158594 L67.2,44.2158594 C63.5,41.3158594 58,43.9158594 58,48.7158594 L58,109.015859 C58,113.715859 63.4,116.415859 67.2,113.515859 L105.9,83.3158594 C108.8,81.1158594 108.8,76.6158594 105.9,74.4158594 L105.9,74.4158594 Z"
                      id="triangle"
                      stroke="#ff4e4e"
                    />
                    <path
                      d="M159,79.5 C159,35.5933624 123.406638,0 79.5,0 C35.5933624,0 0,35.5933624 0,79.5 C0,123.406638 35.5933624,159 79.5,159 L79.5,159"
                      id="lineTwo"
                      stroke="#ff4e4e"
                    />
                  </g>
                </g>
              </svg>
            </Box>
          ))}
        </Slider>
      ) : (
        <Text color={'gray'}>Nothing to show up here...</Text>
      )}
      {/* <Slider {...settings}>
        {videos.map((video) => (
          <Box
            key={video.key}
            p={2}
            m={4}
            onClick={() => {
              onOpen();
              setVideoKey(video.key);
            }}
            cursor={"pointer"}
            pos={"relative"}
          >
            <Image
              src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
              alt={video.name}
              borderRadius={"1rem"}
              _hover={{ filter: "brightness(50%)" }}
              aspectRatio={16 / 9}
              className="videoThumbnail"
            />
            <svg
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
              id="play"
              viewBox="0 0 163 163"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              width={"75px"}
            >
              <g fill="none">
                <g transform="translate(2.000000, 2.000000)" strokeWidth={4}>
                  <path
                    d="M10,80 C10,118.107648 40.8923523,149 79,149 L79,149 C117.107648,149 148,118.107648 148,80 C148,41.8923523 117.107648,11 79,11"
                    id="lineOne"
                    stroke="#ff4e4e"
                  />
                  <path
                    d="M105.9,74.4158594 L67.2,44.2158594 C63.5,41.3158594 58,43.9158594 58,48.7158594 L58,109.015859 C58,113.715859 63.4,116.415859 67.2,113.515859 L105.9,83.3158594 C108.8,81.1158594 108.8,76.6158594 105.9,74.4158594 L105.9,74.4158594 Z"
                    id="triangle"
                    stroke="#ff4e4e"
                  />
                  <path
                    d="M159,79.5 C159,35.5933624 123.406638,0 79.5,0 C35.5933624,0 0,35.5933624 0,79.5 C0,123.406638 35.5933624,159 79.5,159 L79.5,159"
                    id="lineTwo"
                    stroke="#ff4e4e"
                  />
                </g>
              </g>
            </svg>
          </Box>
        ))}
      </Slider> */}
      <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent bgColor={"transparent"}>
          <ModalCloseButton color={"gray.200"} />
          <ModalBody
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <iframe
              width="1000"
              style={{ borderRadius: "1rem", boxShadow: "0 0 20px #FF4E4E" }}
              height="500"
              autoPlay={true}
              allowFullScreen={true}
              src={`https://www.youtube.com/embed/${videoKey}`}
              title={videoKey}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
