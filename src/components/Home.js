import React, { useReducer } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import WebDev from "../quiz/webdev";
import Java from "../quiz/java";
import Python from "../quiz/python";
import Leadorboard from "./Leadorboard";
const initialState = {
  error: "",
  status: "welcome", //welcome, java, python, webdev
};

function reducer(state, action) {
  switch (action.type) {
    case "setUser":
      return { ...state, currUser: action.payload };
    case "leadorboard":
      return { ...state, status: "leaderboard" };
    case "LogOutError":
      return { ...state, error: action.payload };
    case "setWeb":
      return { ...state, status: "webdev" };
    case "setPython":
      return { ...state, status: "python" };
    case "setJava":
      return { ...state, status: "java" };
    case "setOOP":
      return { ...state, status: "OOP" };
    case "setDBMS":
      return { ...state, status: "DBMS" };
    case "goBack":
      return { ...state, status: "welcome" };
    default:
      return { ...state, error: "" };
  }
}

export default function Home() {
  const [{ error, status }, dispatch] = useReducer(reducer, initialState);

  const { currentUser, logout } = useAuth();
  let currUsername;
  //let currEmail
  if (currentUser && currentUser.email) {
    //!currEmail = currentUser.email;
    currUsername = currentUser.displayName;
  }

  let nav = document.getElementById("nav");
  if (nav) nav.classList.remove("hide-nav");

  const navigate = useNavigate();

  async function handleLogOut() {
    try {
      await logout();
      navigate("/login");
      dispatch({ type: "setUser", payload: "" });
    } catch {
      dispatch({ type: "LogOutError", payload: "Failed to log out" });
    }
  }
  return (
    <>
      {status === "webdev" && (
        <WebDev dis={dispatch} cUser={currUsername} quizStatus={status} />
      )}
      {status === "leaderboard" && (
        <Leadorboard dis={dispatch} cUser={currUsername} quizStatus={status} />
      )}
      {status === "OOP" && (
        <Java dis={dispatch} cUser={currUsername} quizStatus={status} />
      )}
      {status === "DBMS" && (
        <Java dis={dispatch} cUser={currUsername} quizStatus={status} />
      )}
      {status === "java" && (
        <Java dis={dispatch} cUser={currUsername} quizStatus={status} />
      )}
      {status === "python" && (
        <Python dis={dispatch} cUser={currUsername} quizStatus={status} />
      )}
      {status === "welcome" && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "grid" }}>
              <div className="text">
                <h2 className="w-30  mt-3 mx-2">Computer Subjects</h2>
              </div>
              <div className="d-flex flex-wrap">
                {" "}
                <div className="w-30 text-center  mx-2 ">
                  <Button
                    className="home-bh"
                    onClick={() => {
                      dispatch({ type: "setDBMS" });
                    }}
                  >
                    DBMS
                  </Button>
                </div>
                <div className="w-30 text-center  mx-2 ">
                  <Button
                    className="home-bh"
                    onClick={() => {
                      dispatch({ type: "setDBMS" });
                    }}
                  >
                    Networking Systems
                  </Button>
                </div>
              </div>

              <div className="text">
                <h2 className="w-30  mt-2 mx-2">Developmet</h2>
              </div>
              <div className="d-flex flex-wrap">
                <div className="w-30 text-center mx-2 ">
                  <Button
                    className="home-bh"
                    onClick={() => {
                      dispatch({ type: "setWeb" });
                    }}
                  >
                    Web
                  </Button>
                </div>
                <div className="w-30 text-center mx-2 ">
                  <Button
                    className="home-bh"
                    onClick={() => {
                      dispatch({ type: "setWeb" });
                    }}
                  >
                    App
                  </Button>
                </div>
              </div>
              <div className="text">
                <h2 className="w-30  mt-2 mx-2">Programming Languages</h2>
              </div>
              <div className="d-flex flex-wrap">
                <div className="w-30 text-center mt-2">
                  <Button
                    className="home-bh"
                    onClick={() => {
                      dispatch({ type: "setJava" });
                    }}
                  >
                    Java
                  </Button>
                </div>
                <div className="w-30 text-center mt-2 ">
                  <Button
                    className="home-bh"
                    onClick={() => {
                      dispatch({ type: "setPython" });
                    }}
                  >
                    Python
                  </Button>
                </div>
                <div className="w-30 text-center mt-2 ">
                  <Button
                    className="home-bh"
                    onClick={() => {
                      dispatch({ type: "setPython" });
                    }}
                  >
                    C++
                  </Button>
                </div>
                <div className="w-30 text-center mt-2 ">
                  <Button
                    className="home-bh"
                    onClick={() => {
                      dispatch({ type: "setPython" });
                    }}
                  >
                    C
                  </Button>
                </div>
              </div>

              <div>
                <div className="text">
                  <h2 className="w-30  mt-3 mx-2">Data Strcutures</h2>
                </div>
                <div className="d-flex flex-wrap">
                  <div className={`w-30 text-center mt-3 mx-2  `}>
                    <Button
                      className="home-bh"
                      onClick={() => {
                        dispatch({ type: "setOOP" });
                      }}
                    >
                      BST
                    </Button>
                  </div>
                  <div className={`w-30 text-center mt-3 mx-2  `}>
                    <Button
                      className="home-bh"
                      onClick={() => {
                        dispatch({ type: "setOOP" });
                      }}
                    >
                      Graphs
                    </Button>
                  </div>
                </div>
              </div>
              <div>
                <div className="text">
                  <h2 className="w-30  mt-3 mx-2">Programming Concepts</h2>
                </div>
                <div className="d-flex flex-wrap">
                  <div className={`w-30 text-center mt-3 mx-2  `}>
                    <Button
                      className="home-bh"
                      onClick={() => {
                        dispatch({ type: "setOOP" });
                      }}
                    >
                      OOP
                    </Button>
                  </div>
                  <div className={`w-30 text-center mt-3 mx-2  `}>
                    <Button
                      className="home-bh"
                      onClick={() => {
                        dispatch({ type: "setOOP" });
                      }}
                    >
                      Recursion
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            {/* //style={{ height: "29vh", maxWidth: "500px", margin: "0 auto" }} */}

            <Card className="home-prof text-white text-right d-flex flex-row">
              <Button
                className="home-bh-logout float-right mx-2"
                onClick={() => {
                  dispatch({ type: "leadorboard" });
                }}
                style={{ maxHeight: "6rem" }}
              >
                Leadorboard
              </Button>
              <Card.Body className="text-left ">
                <h3
                  className="text-center mb-auto "
                  style={{ marginTop: "1.3rem" }}
                >
                  Logged in as: {currentUser && currentUser.displayName}
                </h3>
                {/* <h3>
                <i>Welcome back!</i>{" "}
              </h3> */}
                {error && <Alert variant="danger">{error}</Alert>}
                <strong></strong>
                <br></br>
                {/* <strong>Email: </strong>
              {currentUser && currentUser.email} */}
              </Card.Body>
              <Button
                className="home-bh-logout float-right mx-2"
                onClick={handleLogOut}
                style={{ maxHeight: "5rem" }}
              >
                LogOut
              </Button>
              {/* <div className="w-10  text-center mb-3">
            <Button variant="link" href="/guidelines">
              Guidelines
            </Button>
          </div> */}
            </Card>
          </div>
        </>
      )}
    </>
  );
}
