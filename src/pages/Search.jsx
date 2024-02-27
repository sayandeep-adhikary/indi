import { HStack, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import MovieList from "../components/MovieList";

export default function Search() {
  const [query, setQuery] = useState("");
  const API_KEY = process.env.REACT_APP_API_KEY;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  
  return (
    <>
      <HStack
        py={40}
        justifyContent={"center"}
        background={
          "url('../assets/posterBg.jpg'), radial-gradient( circle 311px at 8.6% 27.9%,  rgba(62,147,252,0.57) 12.9%, rgba(239,183,192,0.44) 91.2% )"
        }
        backdropFilter={"brightness(85%)"}
      >
        <form onSubmit={(e)=>e.preventDefault()}>
          <InputGroup
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            size={"lg"}
          >
            <InputLeftElement pointerEvents="none" color={"gray.600"}>
              <IoIosSearch size={"1.5rem"} />
            </InputLeftElement>
            <Input
              type="text"
              minW={["90vw", "60vw"]}
              rounded="full"
              placeholder="Search for Movies..."
              fontSize={"1.2rem"}
              border={"1px solid #101010"}
              _focusVisible={{ border: "none", boxShadow: "0 0 7px red" }}
              transition={"all 0.2s"}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </InputGroup>
        </form>
      </HStack>
      {
        query ? 
        <MovieList
          title={`Search results for "${query}"`}
          url={`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}`}
          query={query}
        /> : ''
      }
    </>
  );
}
