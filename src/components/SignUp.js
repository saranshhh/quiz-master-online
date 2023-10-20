/* eslint-disable no-undef */
import { React, useRef, useState } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
//import { updateCurrentUser } from "firebase/auth";

function SignUp() {
  const emailref = useRef();
  const passwordref = useRef();
  const passwordConfirmref = useRef();
  const usernameref = useRef();
  const { signup } = useAuth();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordref.current.value !== passwordConfirmref.current.value) {
      return setError("Password do not match.");
    }

    try {
      setError("");
      setLoading(true);
      console.log(
        emailref.current.value,
        passwordref.current.value,
        usernameref.current.value
      );
      await signup(
        emailref.current.value,
        passwordref.current.value,
        usernameref.current.value
      );
      //await updateCurrentUser(usernameref.current.value);
      setMessage("Signup successful.");
      navigate("/");
    } catch {
      setError("Failed to create an account.");
    }
    setLoading(false);
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "79vh" }}
    >
      <Card style={{ borderRadius: "2rem" }}>
        <Card.Body style={{ minWidth: "65.4rem", padding: "3.5rem" }}>
          <h1 className="text-center mb-auto pd-auto fs-1 fw-bold">Sign Up</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit} className="fs-4">
            <Form.Group id="username">
              <Form.Label>Enter Your Name</Form.Label>
              <Form.Control
                type="input"
                ref={usernameref}
                style={{ marginBottom: "1rem", fontSize: "1.2rem" }}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailref}
                style={{ marginBottom: "1rem", fontSize: "1.2rem" }}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordref}
                required
                style={{ marginBottom: "1rem", fontSize: "1.2rem" }}
              ></Form.Control>
            </Form.Group>

            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                style={{ marginBottom: "1rem", fontSize: "1.2rem" }}
                type="password"
                ref={passwordConfirmref}
                required
              ></Form.Control>
            </Form.Group>
            <Button
              type="submit"
              disabled={loading}
              className="login-bh"
              style={{
                fontSize: "2rem",
                padding: "0.7rem 1rem",
                minWidth: "65.4rem",
                marginBottom: "1rem",
              }}
            >
              Sign Up
            </Button>
          </Form>
          <div className="w-100 text-center mt-3 fs-5 log-text">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SignUp;
