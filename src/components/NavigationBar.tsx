import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavigationBar() {
  return (
    <Navbar expand="lg" className="navbar">
      <Container>
        <Navbar.Brand href="#home">Portfolio</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className="navbar-option">Projects</Nav.Link>
            <Nav.Link href="https://github.com/m-riley04" target="_blank" className="navbar-option">GitHub</Nav.Link>
            <Nav.Link href="https://www.linkedin.com/in/riley-meyerkorth/" target="_blank" className="navbar-option">LinkedIn</Nav.Link>
            <NavDropdown title="Debug" id="basic-nav-dropdown" className="navbar-option navbar-dropdown">
              <NavDropdown.Item href="#action/add">Add New Project</NavDropdown.Item>
              <NavDropdown.Item href="#action/remove">Remove Project</NavDropdown.Item>
              <NavDropdown.Item href="#action/clear">Clear Projects</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/refresh">Refresh Projects</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;