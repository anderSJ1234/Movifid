import React from "react";
import {Col, Navbar} from "react-bootstrap";

import { Link, useLocation} from "react-router-dom";

const Footer = () => {
  const location =useLocation()
  if (location.pathname === "/AcercaDe") {
    return (
      <Navbar /* fixed="bottom" */  bg="info" expand="lg"  id="Contacto">
        <Col className="centrar">
          <Navbar.Brand className="centro">
            Contacto
            <Col>
              <Navbar.Text>Numero de tlf: 663 201 304</Navbar.Text>
            </Col>
            <Col>
              <Navbar.Text>mail: andersanjoseminas@gmail.com</Navbar.Text>
            </Col>
            <Col>
              <Navbar.Text>fax: xxx-xxxx-xxxx</Navbar.Text>
            </Col>
          </Navbar.Brand>
        </Col>
      </Navbar>
    );
  } else {
    return (
      <Navbar /* fixed="bottom" */ bg="info" expand="lg" className="Contacto" id="Contacto">
        <Col className="centrar">
          <Navbar.Brand className="centro">
            Contacto
            <Col>
              <Navbar.Text>Numero de tlf: 663 201 304</Navbar.Text>
            </Col>
            <Col>
              <Navbar.Text>mail: andersanjoseminas@gmail.com</Navbar.Text>
            </Col>
            <Col>
              <Navbar.Text>fax: xxx-xxxx-xxxx</Navbar.Text>
            </Col>
          </Navbar.Brand>
        </Col>
        <Col className="centrar">
          <Navbar.Brand className="centro">
            Acerca de
            <Col>
              <Link to="/AcercaDe" className="Link-acercaDe">Sobre nosotros</Link>
            </Col>
          </Navbar.Brand>
        </Col>
      </Navbar>
    );
  }
};
export default Footer;
