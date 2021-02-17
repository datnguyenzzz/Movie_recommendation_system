import React, { useState }  from 'react';
import { Navbar, NavbarBrand, NavbarToggler,Collapse,Nav,NavItem } from 'reactstrap';

const Header = () => {

    const [isNavToggle,setisNavToggle] = useState(false);
    const NavToggle = () => setisNavToggle(!isNavToggle);

    return (
        <>  
            <Navbar className="navbar-color" expand="md">

                <NavbarBrand>
                    <img src = 'images/logo.png' height="45" width='45'></img>
                </NavbarBrand>

                <Nav className="mr-auto" navbar>
                    <NavItem className='navItem-color thick'> Movies </NavItem>
                    <NavItem className='navItem-color thick'> TV Shows </NavItem>
                    <NavItem className='navItem-color thick'> New & Popular </NavItem>
                    <NavItem className='navItem-color thick'> Watchlist </NavItem>
                </Nav>

            </Navbar>

        </>
    )
}

export default Header;