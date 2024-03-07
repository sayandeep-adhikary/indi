import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInAnonymously,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getDatabase, ref, set, remove } from "firebase/database";
import { useToast } from "@chakra-ui/react";
const firebaseConfig = {
  apiKey: "AIzaSyDxILbSWuofcF8cZroHpKhuVt4xTrKYtNw",
  authDomain: "indi-81cd4.firebaseapp.com",
  projectId: "indi-81cd4",
  storageBucket: "indi-81cd4.appspot.com",
  messagingSenderId: "576050860088",
  appId: "1:576050860088:web:277b8e82c2a618052116cd",
  databaseURL: "https://indi-81cd4-default-rtdb.firebaseio.com",
};

const FirebaseContext = createContext(null);
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const faceboookProvider = new FacebookAuthProvider();
export const db = getDatabase(firebaseApp);

export const useFirebase = () => {
  return useContext(FirebaseContext);
};

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toast = useToast();
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const createUserWithPassword = (email, password) => {
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then(() => {
        toast({
          title: "Account Created Successfully.",
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
  };

  const signinWithEmailAndPassword = (email, password) => {
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(() => {
        toast({
          title: "Signed In Successfully.",
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
  };

  const signInAnonymousUser = () => {
    signInAnonymously(firebaseAuth)
      .then(() => {
        toast({
          title: "Signed In Successfully.",
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
  };

  const signupWithGoogle = () => {
    signInWithPopup(firebaseAuth, googleProvider)
      .then(() => {
        toast({
          title: "Signed In Successfully.",
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
  };

  const signupWithFacebook = () => {
    signInWithPopup(firebaseAuth, faceboookProvider)
      .then(() => {
        toast({
          title: "Signed In Successfully.",
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
  };

  const signOutUser = () => {
    signOut(firebaseAuth).then(() => {
        toast({
          title: "Signed Out Successfully.",
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
  };

  const addToFavourites = (userId, movieId, movieData) => {
    const dbRef = ref(db, `users/${userId}/favourites/${movieId}`);
    set(dbRef, movieData)
      .then(() => {
        toast({
          title: "Added to Favourites.",
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
  };

  const removeFromFavourites = (userId, movieId) => {
    const dbRef = ref(db, `users/${userId}/favourites/${movieId}`);
    remove(dbRef)
      .then(() => {
        toast({
          title: "Removed from Favourites.",
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
  };

  const value = {
    createUserWithPassword,
    signinWithEmailAndPassword,
    signOutUser,
    isLoggedIn,
    signInAnonymousUser,
    signupWithGoogle,
    signupWithFacebook,
    user,
    addToFavourites,
    removeFromFavourites,
  };
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    });
  }, [user]);

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};
