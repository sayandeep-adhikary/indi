import React, { useEffect } from "react";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

export default function Favorites() {
  const isLoggedIn = useFirebase().isLoggedIn;
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { state: { prevUrl: "/favorites" } });
    }
  }, [isLoggedIn, navigate]);
  return <div></div>;
}
