import React, { useEffect } from "react";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const isLoggedIn = useFirebase().isLoggedIn;
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "INDI - Profile";
    window.scrollTo(0, 0);
    if (!isLoggedIn) {
      navigate("/login", { state: { prevUrl: "/profile" } });
    }
  }, [isLoggedIn, navigate]);
  return <div></div>;
}
