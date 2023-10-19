/* eslint-disable no-undef */
import { React, useRef, useState } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Forgot() {
  const emailref = useRef();

  const { reset } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setMessage("");
      setLoading(true);
      await reset(emailref.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password.");
    }
    setLoading(false);
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "78vh", paddingTop: "1.9rem" }}
    >
      <Card style={{ borderRadius: "2rem" }}>
        <Card.Body style={{ minWidth: "65.4rem", padding: "3.5rem" }}>
          <h1 className="text-center mb-auto pd-auto fs-1 fw-bold">
            Password Reset
          </h1>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit} className="fs-4">
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailref}
                style={{ marginBottom: "1rem", fontSize: "1.2rem" }}
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
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3 fs-5 log-text">
            <Link to="/login">Log In</Link>
          </div>
          <div className="w-100 text-center mt-3 fs-5 log-text">
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Forgot;
