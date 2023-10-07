import React from "react";
import SignUp from "./SignUp";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "./Home";
import LogIn from "./Login";
import Forgot from "./Forgot";
import Cquiz from "../quiz/cquiz";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "10vh" }}
    >
      <div className="w-50" style={{ maxWidth: "900px" }}>
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
              <Route path="/forgot-password" Component={Forgot} />
              <Route path="/c-quiz" Component={Cquiz} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </Container>
  );
}

export default App;
