import React, { useContext, useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  function reset(email) {
    sendPasswordResetEmail(auth, email)
      .then((userCredential) => {
        //const user = userCredential.user;
        setCurrentUser();
        // ...
      })
      .catch((err) => {
        console.log(err.code);
        console.log(err.message);
      });
  }

  function logout() {
    signOut(auth)
      .then((userCredential) => {
        //const user = userCredential.user;
        setCurrentUser();
        // ...
      })
      .catch((err) => {
        console.log(err.code);
        console.log(err.message);
      });
  }

  function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setCurrentUser(user);
        console.log(user);
        // ...
      })
      .catch((err) => {
        console.log(err.code);
        console.log(err.message);
      });
  }

  function signup(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        setCurrentUser(user);
        // ...
      })
      .catch((err) => {
        console.log(err.code);
        console.log(err.message);
      });
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
    reset,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
