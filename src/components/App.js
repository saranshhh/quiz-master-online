import React from "react";
import SignUp from "./SignUp";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "./Home";
import LogIn from "./Login";
import Forgot from "./Forgot";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              ></Route>
              <Route path="/signup" Component={SignUp} />
              <Route path="/login" Component={LogIn} />
              <Route path="forgot-password" Component={Forgot} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
        {/* <SignUp /> */}
      </div>
    </Container>
  );
}

export default App;
