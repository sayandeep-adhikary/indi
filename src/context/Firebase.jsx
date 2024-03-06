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
import { getDatabase, ref, set, onValue } from "firebase/database";
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
  const [favorites, setFavorites] = useState([]);
  const createUserWithPassword = (email, password) => {
    createUserWithEmailAndPassword(firebaseAuth, email, password)
    .catch(
      (error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    );
  };

  const signinWithEmailAndPassword = (email, password) => {
    signInWithEmailAndPassword(firebaseAuth, email, password).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  };

  const signInAnonymousUser = () => {
    signInAnonymously(firebaseAuth).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  };

  const signupWithGoogle = () => {
    signInWithPopup(firebaseAuth, googleProvider).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  };
  const signupWithFacebook = () => {
    signInWithPopup(firebaseAuth, faceboookProvider).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  };

  const signOutUser = () => {
    signOut(firebaseAuth).catch((error) => {
      console.log(error);
    });
  };

  const addToFavourites = (userId, movieId, movieData) => {
    const dbRef = ref(db, `users/${userId}/favourites/${movieId}`);
    set(dbRef, movieData);
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
