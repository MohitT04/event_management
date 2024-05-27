import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

function FrmSidebar() {
  const [activeLink, setActiveLink] = useState(useLocation().pathname);

  const handleSetActive = (path) => {
    setActiveLink(path);
  };
  return (
    <Navbar
      style={{
        height: 80,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        backgroundColor: "#f7dd7c",
        boxShadow: "0 4px 4px rgba(0, 0, 0, 0.2)", // your custom color here
      }}
    >
      <Container>
        <Navbar.Brand
          href="/Admin/dashboard"
          style={{ color: "#420a06", fontSize: 29, fontWeight: "bold" }}
        >
          Cinethic
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/Admin/dashboard/Venue"
              style={{
                color:
                  activeLink === "/Admin/dashboard/Venue"
                    ? "#ff0000"
                    : "#000000",
              }}
              onClick={() => handleSetActive("/Admin/dashboard/Venue")}
            >
              Venue
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/Admin/dashboard/Equipment"
              style={{
                color:
                  activeLink === "/Admin/dashboard/Equipment"
                    ? "#ff0000"
                    : "#000000",
              }}
              onClick={() => handleSetActive("/Admin/dashboard/Equipment")}
            >
              Equipment
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/Admin/dashboard/Food"
              style={{
                color:
                  activeLink === "/Admin/dashboard/Food"
                    ? "#ff0000"
                    : "#000000",
              }}
              onClick={() => handleSetActive("/Admin/dashboard/Food")}
            >
              Food
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/Admin/dashboard/Light"
              style={{
                color:
                  activeLink === "/Admin/dashboard/Light"
                    ? "#ff0000"
                    : "#000000",
              }}
              onClick={() => handleSetActive("/Admin/dashboard/Light")}
            >
              Light
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default FrmSidebar;
