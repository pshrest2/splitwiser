import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

const SplitwiserNav = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Splitwiser</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            {isAuthenticated ? (
              <>
                <Nav.Link
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  Logout
                </Nav.Link>
              </>
            ) : (
              <Nav.Link onClick={loginWithRedirect}>Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default SplitwiserNav;
