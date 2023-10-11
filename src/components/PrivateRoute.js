import React from "react";
import { useAuth } from "../context/AuthContext";
import LogIn from "./Login";

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();

  return currentUser ? children : <LogIn />;
}
