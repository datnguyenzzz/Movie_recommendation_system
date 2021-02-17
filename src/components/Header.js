import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

const Header = () => {
    return (
        <>
            <Navbar className='navbar-color' dark expand="sm">
                <NavbarBrand>
                    <img src = 'images/logo.png' height="50" width='50'></img>
                </NavbarBrand>
            </Navbar>
        </>
    )
}

export default Header;