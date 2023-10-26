import React from "react";
import SignUp from "./SignUp";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "./Home";
import LogIn from "./Login";
import Forgot from "./Forgot";
import AdminLog from "./AdminLog";
// import WebDev from "../quiz/webdev";
// import Java from "../quiz/java";
// import Python from "../quiz/python";
import AppNavBar from "./AppNavBar";

function App() {
  //let cUser = User();
  return (
    <>
      <AppNavBar />

      <Container style={{ minHeight: "75vh" }}>
        <div>
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
                <Route path="/admin" element={<AdminLog />} />

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
