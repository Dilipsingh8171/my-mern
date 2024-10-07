import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/Auth";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';




const Header = () => {
  const [auth, setAuth] = useAuth();


  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    alert("Logout Successfully");
  };
  return (
    <div>


      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link to="/">Home</Nav.Link>
              <Nav.Link href="/login">Link</Nav.Link>
              {!auth?.user ? (
                <div>
                  <Nav.Link to="/login">Login</Nav.Link>
                  <Nav.Link to="/register">Register</Nav.Link>
                </div>
              ) : (
                <div>

                  <Nav.Link
                    onClick={handleLogout}
                    to="/login"
                    className="dropdown-item"
                  >
                    Logout
                  </Nav.Link>




                </div>
              )
              }


              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">{auth.user.name}</NavDropdown.Item>
                <NavDropdown.Item href="/dashboard">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#" disabled>
                Link
              </Nav.Link>
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>

    </div>
  );
};

export default Header;





