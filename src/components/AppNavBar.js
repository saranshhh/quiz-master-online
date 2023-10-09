import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

function AppNavbar() {
  return (
    <Navbar variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img
            src="Q.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Q logo"
          />{" "}
          Quiz Master Online
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/browse">About</Nav.Link>
            <Nav.Link href="/my-quizzes">Contact Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
