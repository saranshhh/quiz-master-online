import React, { useReducer } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import WebDev from "../quiz/webdev";
import Java from "../quiz/java";
import Python from "../quiz/python";

const initialState = {
  error: "",
  status: "welcome", //welcome, java, python, webdev
};

function reducer(state, action) {
  switch (action.type) {
    case "setUser":
      return { ...state, currUser: action.payload };
    case "LogOutError":
      return { ...state, error: action.payload };
    case "setWeb":
      return { ...state, status: "webdev" };
    case "setPython":
      return { ...state, status: "python" };
    case "setJava":
      return { ...state, status: "java" };
    default:
      return { ...state, error: "" };
  }
}

export default function Home() {
  const [{ error, status }, dispatch] = useReducer(reducer, initialState);

  const { currentUser, logout } = useAuth();
  let currUser;
  if (currentUser && currentUser.email) {
    currUser = currentUser.email;
  }

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
      {status === "webdev" && <WebDev cUser={currUser} quizStatus={status} />}
      {status === "java" && <Java cUser={currUser} quizStatus={status} />}
      {status === "python" && <Python cUser={currUser} quizStatus={status} />}
      {status === "welcome" && (
        <>
          {" "}
          <Card style={{ height: "29vh", maxWidth: "500px", margin: "0 auto" }}>
            <Card.Body className="text-center">
              <h1 className="text-center mb-auto">Profile</h1>
              <h3>
                <i>Welcome back!</i>{" "}
              </h3>
              {error && <Alert variant="danger">{error}</Alert>}
              <strong>Email: </strong>
              {currentUser && currentUser.email}

              <div
                className="w-100 text-center mt-2"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button variant="link" onClick={handleLogOut}>
                  Log Out
                </Button>
              </div>
            </Card.Body>

            {/* <div className="w-10  text-center mb-3">
            <Button variant="link" href="/guidelines">
              Guidelines
            </Button>
          </div> */}
          </Card>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="w-30 text-center mt-3 mr-2 ">
              <Button
                onClick={() => {
                  dispatch({ type: "setWeb" });
                }}
              >
                Quiz On Web Development
              </Button>
            </div>
            <div className="w-30 text-center mt-3 mx-2">
              <Button
                onClick={() => {
                  dispatch({ type: "setJava" });
                }}
              >
                JAVA QUIZ
              </Button>
            </div>
            <div className="w-30 text-center mt-3 ml-2">
              <Button
                onClick={() => {
                  dispatch({ type: "setPython" });
                }}
              >
                Python QUIZ
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
