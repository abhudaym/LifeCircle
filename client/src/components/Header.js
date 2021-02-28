import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Container,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
// import { logout } from "../actions/userActions";

const Header = () => {
  // const dispatch = useDispatch();
  // // const userLogin = useSelector((state) => state.userLogin);
  // // const { userInfo } = userLogin;
  // // const logoutHandler = () => {
  // //   dispatch(logout());
  // // };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>LifeCircle</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/login">
                <Nav.Link href="/login">
                  <i className="fas fa-shopping-cart"></i> Login
                </Nav.Link>
              </LinkContainer>
              {/* {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link href="/login">
                    <i className="fas fa-user"></i> Sign in
                  </Nav.Link>
                </LinkContainer>
              )} */}
              <LinkContainer to="/register">
                <Nav.Link href="/register">
                  <i className="fas fa-user"></i> Sign Up
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
