import React, { useContext, useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateCurrentUser,
  updateProfile,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState("");

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
        alert("Something went wrong!");
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
        alert("Something went wrong!");
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
        alert("Invalid User Credentials!");
      });
  }

  function signup(email, password, username) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        //setCurrentUser(user);

        if (user) {
          updateProfile(user, {
            displayName: username,
          })
            .then(() => {
              console.log("User profile updated successfully!");
            })
            .catch((err) => {
              console.log(err.code);
              console.log(err.message);
              alert("Failed to update user profile!");
            });
        }

        // ...
      })
      .catch((err) => {
        console.log(err.code);
        console.log(err.message);
        alert("Something Went Wrong!");
      });
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
    reset,
    updateCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
