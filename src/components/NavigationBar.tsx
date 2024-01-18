import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

function NavigationBar() {
  return (
    <Navbar expand="lg" className="navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">Riley Meyerkorth</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/repositories" className="navbar-option clickable">Repositories</Nav.Link>
            <Nav.Link as={Link} to="/projects" className="navbar-option clickable">Projects</Nav.Link>
            <Nav.Link as={Link} to="/tools" className="navbar-option clickable">Tools</Nav.Link>
            <NavDropdown title="Links" id="basic-nav-dropdown" className="navbar-option navbar-dropdown clickable">
              <NavDropdown.Item href="https://github.com/m-riley04" target="_blank" className="clickable">GitHub</NavDropdown.Item>
              <NavDropdown.Item href="https://www.linkedin.com/in/riley-meyerkorth" target="_blank" className="clickable">LinkedIn</NavDropdown.Item>
              <NavDropdown.Item href="https://restlessmedicine.com" target="_blank" className="clickable">Company</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Debug" id="basic-nav-dropdown" className="navbar-option navbar-dropdown">
              <NavDropdown.Item href="#action/test">Test</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/refresh-repositories">Refresh Repositories</NavDropdown.Item>
              <NavDropdown.Item href="#action/refresh-projects">Refresh Projects</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;