import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

/**
 * @returns the main navigation bar at the top of the site
 */
function NavigationBar() {
  return (
    <Navbar expand="lg" className="navbar">
      <Container>
        <Navbar.Brand as={Link} to="">Riley Meyerkorth</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="repositories" className="navbar-option clickable">Repositories and Projects</Nav.Link>
            <Nav.Link as={Link} to="tools" className="navbar-option clickable">Tools</Nav.Link>
            <Nav.Link as={Link} to="research" className="navbar-option clickable">Research</Nav.Link>
            <NavDropdown title="Links" id="basic-nav-dropdown" className="navbar-option navbar-dropdown clickable">
              <NavDropdown.Item href="https://github.com/m-riley04" target="_blank" className="clickable">GitHub</NavDropdown.Item>
              <NavDropdown.Item href="https://www.linkedin.com/in/riley-meyerkorth" target="_blank" className="clickable">LinkedIn</NavDropdown.Item>
              <NavDropdown.Item href="https://restlessmedicine.com" target="_blank" className="clickable">Company</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;