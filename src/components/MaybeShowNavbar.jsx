import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function MaybeShowNavbar({ children }) {
  const location = useLocation();
  const [showNav, setShowNav] = useState(true);
  useEffect(() => {
    if (location.pathname === "/login") {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  }, [location]);

  return <>{showNav && children}</>;
}
