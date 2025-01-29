//src/components/NavigationBar.js
//Import React
import React from 'react';
//Import necessary React Bootstrap components
import { Navbar, Container, Nav } from 'react-bootstrap';

//Navigation bar function component
function NavigationBar() {
    return (
        //Use a Navbar from React Bootstrap
        //"bg-dark" and "navbar-dark" for a dark background with white text
        <Navbar expand="lg" style={{ backgroundColor: '#1a001a' }}>
            {/* Wrap content in a container to align properly */}
            <Container>
                {/* The Brand(left side) of the Navbar */}
                <Navbar.Brand style={{ color: '#00ff00', fontFamily: 'monospace' }}>Made by John Drake</Navbar.Brand>

                {/* The "hamburger" dropdown button for phones and other small screens */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                {/* Collapsible section that contains the Nav Links */}
                <Navbar.Collapse id="basic-navbar-nav">
                    {/* Right aligned navigation links */}
                    <Nav className="ms-auto">
                        {/* Link to About page, doesn't link to anything yet */}
                        <Nav.Link href="#about" style={{ color: '#ff0', fontWeight: 'bold' }}>About</Nav.Link>

                        {/* Link to Donate, doesn't link to anything yet */}
                        <Nav.Link href="#donate" style={{ color: '#ff0', fontWeight: 'bold' }}>Donate</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

//Export NavigationBar component
export default NavigationBar;