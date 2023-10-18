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
      navigate("/");
    } catch {
      setError("Failed to create an account.");
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h1 className="text-center mb-auto">Sign Up</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="input"
                ref={usernameref}
                style={{ marginBottom: "1rem" }}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailref}
                style={{ marginBottom: "1rem" }}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordref}
                required
                style={{ marginBottom: "1rem" }}
              ></Form.Control>
            </Form.Group>

            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                style={{ marginBottom: "1rem" }}
                type="password"
                ref={passwordConfirmref}
                required
              ></Form.Control>
            </Form.Group>
            <Button
              type="submit"
              disabled={loading}
              style={{ fontSize: "1.2rem", padding: "0.7rem 1.5rem" }}
            >
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}

export default SignUp;
