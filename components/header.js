import Head from 'next/head';

import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

const Header = () => (
    <div style={{
        marginBottom: '5%'
    }}>
      <Head>
        <title>Web shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">Webshop</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                {/* <Nav>
                    <NavDropdown title="News" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/business">Business</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/technology">Technology</NavDropdown.Item>
                    </NavDropdown>
                </Nav> */}
                <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
            </Navbar.Collapse>
        </Navbar>  
    </div>
  );
  
  export default Header;
  