import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { FirebaseProvider } from "./context/Firebase";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <FirebaseProvider>
        <App />
      </FirebaseProvider>
    </ChakraProvider>
  </React.StrictMode>
);
