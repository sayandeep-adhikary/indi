import { HStack, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import MovieList from "../components/MovieList";
import { useFirebase } from "../context/Firebase";

export default function Search() {
  const query = useFirebase().query;
  const setQuery = useFirebase().setQuery;
  const inputRef = React.useRef();
  const API_KEY = process.env.REACT_APP_API_KEY;
  useEffect(() => {
    document.title = "INDI - Search";
    window.scrollTo(0, 0);
    inputRef.current.focus();
  }, []);

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
        <form onSubmit={(e) => e.preventDefault()}>
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
              ref={inputRef}
              type="text"
              minW={["90vw", "60vw"]}
              rounded="full"
              placeholder="Search for Movies..."
              fontSize={"1.2rem"}
              border={"1px solid #101010"}
              _focusVisible={{ border: "none", boxShadow: "0 0 7px red" }}
              textTransform={"capitalize"}
              transition={"all 0.2s"}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </InputGroup>
        </form>
      </HStack>
      {query ? (
        <MovieList
          title={`Search results for "${query}"`}
          url={`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}`}
          query={query}
          showSortBy={false}
        />
      ) : (
        ""
      )}
    </>
  );
}
