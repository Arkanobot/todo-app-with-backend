import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import todo from "../assets/todo.png";

function Header() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">
          <Container>
            <img
              alt="Todo App Logo from Freepik.com"
              src={todo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Todo-App
          </Container>
        </Navbar.Brand>
      </Navbar>
    </div>
  );
}

export default Header;
