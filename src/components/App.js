import React from "react";
import SignUp from "./SignUp";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "./Home";
import LogIn from "./Login";
import Forgot from "./Forgot";
import WebDev from "../quiz/webdev";
import Java from "../quiz/java";
import AppNavBar from "./AppNavBar";
import Python from "../quiz/python";

function App() {
  //let cUser = User();
  return (
    <>
      <AppNavBar />

      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "50rem" }}>
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
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/forgot-password" element={<Forgot />} />
                {/* <Route path="/web-dev-quiz" element={<WebDev />} />
                <Route path="/java-quiz" element={<Java />} />
                <Route path="/python-quiz" element={<Python />} /> */}
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </div>
      </Container>
    </>
  );
}

export default App;
