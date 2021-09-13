import {
  Button,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Modal,
  Container,
  Alert,
} from "react-bootstrap";
import { useState} from "react";
import { Link, useLocation} from "react-router-dom";
import Axios from "axios";
import { HashLink } from "react-router-hash-link";


function Header() {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);
  const handleShow = () => setShow(true);
  const handleShow2 = () => setShow2(true);
  const location =useLocation()



  const [loginsito, setLoginsito] = useState(false);
  const [inputEmail, setinputEmail] = useState("");
  const [inputPassword, setinputPassword] = useState("");
  const [InputUrl, setinputUrl] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [feedback, setFeedback] = useState({ empty: true });
  const [feedback2, setFeedback2] = useState({ empty: true });
  const [mensaje,setMensaje]=useState("")
  const [user, setUser]=useState({})
 /*  const [img, setImg]=useState("")
  const [imgUsuario, setImgUsuario]=useState("") */

  const registrar = () => {
    Axios({
      method: "POST",
      data: {
        email: inputEmail,
        password: inputPassword,
        img_url: InputUrl,
      },
      withCredentials: true,
      url: "http://localhost:3001/signup",
    }).then((res) => {
      return (
        console.log(res),
        setFeedback(res),
        setMensaje(res.data.mensaje),
        setTimeout(() => {
          setFeedback({ empty: true });
        }, 2000)
      );
    });
    setTimeout(() => {
      handleClose();
    }, 2000);
  };
  
  const login = () => {
    if(loginEmail)
    Axios({
      method: "POST",
      data: {
        email: loginEmail,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:3001/login",
    }).then((res) => {
      if (res.data.logged) {
       setLoginsito(true)
        setUser(res.data.user)
        /* setImgUsuario(res.data.user.img_url) */
      /*  setImg(res.data) */
        setLoginEmail("")
        setLoginPassword("")
        setTimeout(()=>{
          setFeedback2({empty:true})
        })
      }
      return (
        console.log(res),
        setFeedback2(res),
        setMensaje(res.data.mensaje),
        setTimeout(()=>{
          setFeedback2({empty:true})
        }, 3000)
      );
    });
    setTimeout(() => {
      handleClose2();
    }, 3000);
  };

  /*  const getUser = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3001/perfil",
    }).then((res) => {
      setData3(res.data);
      console.log(res.data);
    });
  }; */
  const logout = () => {
    Axios({
      method: "POST",
      withCredentials: true,
      url: "http://localhost:3001/logout",
    }).then((res) => console.log(res));
    setLoginsito(null);
  };

  if (location.pathname === "/AcercaDe") {
    if (loginsito) {
      return (
        <div>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <Navbar.Brand as={Link} to="/">Movifid</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <NavDropdown title="Intereses" id="collasible-nav-dropdown">
                    <NavDropdown.Item as={HashLink} to={location.pathname ==="/AcercaDe#Contacto" ? "/AcercaDe#Contacto" : "#Contacto"}>
                      Contacto
                    </NavDropdown.Item>
      
                  </NavDropdown>
                </Nav>
                <Nav className="dividirContenido">
                  <Container className="boton-centrar">
                    <Button onClick={logout}>Log out</Button>
                   {/*  <Image
                      className="img"
                      src= {imgUsuario} 
                      roundedCircle
                      alt="imagen de la persona"
                    /> */}
                  </Container>
                 
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      );
    } else {
      return (
        <div>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <Navbar.Brand as={Link} to="/">
                Movifid
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <NavDropdown title="Intereses" id="collasible-nav-dropdown">
                    <NavDropdown.Item as={HashLink} to={location.pathname ==="/AcercaDe#Contacto" ? "/AcercaDe#Contacto" : "#Contacto"}>
                      Contacto
                    </NavDropdown.Item>

                  </NavDropdown>
                </Nav>
                <Nav>
                  <Container className="colapsar">
                    <Button variant="success" onClick={handleShow}  >
                      Registro
                    </Button>
                  </Container>
                  <Container className="colapsar">
                    <Button onClick={handleShow2}>
                      Login
                    </Button>
                  </Container>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
  
          {/*                                                              registro                                               */}
  
          <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>Registro</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setinputEmail(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    No compartiremos tu información con nadie.
                  </Form.Text>
                </Form.Group>
  
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setinputPassword(e.target.value)}
                  />
                </Form.Group>
  
                <Form.Group>
                  <Form.Label>Url</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="Enter your profile img"
                    onChange={(e) => setinputUrl(e.target.value)}
                  />
                </Form.Group>
              </Form>
              {feedback.empty ? (
                <h1> </h1>
              ) : (
                <>
                  <h1> </h1>
                  <Alert variant={feedback.data.err ? "danger" : "success"}>
                    {mensaje}
                  </Alert>
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={registrar}>
                Registrar
              </Button>
            </Modal.Footer>
          </Modal>
  
          {/*                                                                         Login                                                      */}
  
          <Modal show={show2} onHide={handleClose2}>
            <Modal.Header>
              <Modal.Title>Inicio de sesión</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    No compartiremos tu información con nadie.
                  </Form.Text>
                </Form.Group>
  
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </Form.Group>
              </Form>
              {feedback2.empty ? (
                <h1> </h1>
              ) : (
                <>
                  <h1> </h1>
                  <Alert variant={feedback2.data.err ? "danger" : "success"}>
                    {feedback2.data.mensaje}
                  </Alert>
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={login}>
                Iniciar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }

  }else{
    if (loginsito) {
      return (
        <div>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <Navbar.Brand as={Link} to="/">Movifid</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <NavDropdown title="Intereses" id="collasible-nav-dropdown">
                    <NavDropdown.Item as={HashLink} to={location.pathname ==="/AcercaDe#Contacto" ? "/AcercaDe#Contacto" : "#Contacto"}>
                      Contacto
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/AcercaDe">
                      Acerca de
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Nav className="dividirContenido">
                  <Container className="boton-centrar">
                    <Button onClick={logout}>Log out</Button>
                    {/* <Image
                      className="img"
                      src= {imgUsuario} 
                      roundedCircle
                      alt="imagen de la persona"
                    /> */}
                  </Container>
                 
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      );
    } else {
      return (
        <div>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <Navbar.Brand as={Link} to="/">
                Movifid
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <NavDropdown title="Intereses" id="collasible-nav-dropdown">
                    <NavDropdown.Item as={HashLink} to={location.pathname ==="/AcercaDe#Contacto" ? "/AcercaDe#Contacto" : "#Contacto"}>
                      Contacto
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/AcercaDe">
                      Acerca de
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Nav>
                  <Container className="colapsar">
                    <Button variant="success" onClick={handleShow}  >
                      Registro
                    </Button>
                  </Container>
                  <Container className="colapsar">
                    <Button onClick={handleShow2}>
                      Login
                    </Button>
                  </Container>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
  
          {/*                                                              registro                                               */}
  
          <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>Registro</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setinputEmail(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    No compartiremos tu información con nadie.
                  </Form.Text>
                </Form.Group>
  
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setinputPassword(e.target.value)}
                  />
                </Form.Group>
  
                {/* <Form.Group>
                  <Form.Label>Url</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="Enter your profile img"
                    onChange={(e) => setinputUrl(e.target.value)}
                  />
                </Form.Group> */}
              </Form>
              {feedback.empty ? (
                <h1> </h1>
              ) : (
                <>
                  <h1> </h1>
                  <Alert variant={feedback.data.err ? "danger" : "success"}>
                    {mensaje}
                  </Alert>
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={registrar}>
                Registrar
              </Button>
            </Modal.Footer>
          </Modal>
  
          {/*                                                                         Login                                                      */}
  
          <Modal show={show2} onHide={handleClose2}>
            <Modal.Header>
              <Modal.Title>Inicio de sesión</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    No compartiremos tu información con nadie.
                  </Form.Text>
                </Form.Group>
  
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </Form.Group>
              </Form>
              {feedback2.empty ? (
                <h1> </h1>
              ) : (
                <>
                  <h1> </h1>
                  <Alert variant={feedback2.data.err ? "danger" : "success"}>
                    {feedback2.data.mensaje}
                  </Alert>
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={login}>
                Iniciar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }
  
}

export default Header;
