import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

interface HeaderProps {
  path: string;
}

class Header extends Component<HeaderProps> {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand href="/">Web Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" >
          <Nav activeKey={this.props.path} className="mr-auto">
            <Nav.Link href="/products">Products</Nav.Link>
            <Nav.Link href="/search">Search</Nav.Link>
            <Nav.Link href="/admin">Admin</Nav.Link>
          </Nav>
          <Form style={{ display: "flex", flexDirection: "row", gap: 5 }}>
            <FormControl type="text" placeholder="Search" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>

      </Navbar>
    )
  }
}

export default Header;
