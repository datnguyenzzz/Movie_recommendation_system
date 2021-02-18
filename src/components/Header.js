import React , { useState,useEffect } from 'react';
import { Navbar, NavbarBrand, Modal, ModalBody, 
         Nav, NavItem, NavLink, FormGroup, Form,
         Label, Input, Button } from 'reactstrap';

const networkRequest = () => {
    return new Promise((resolve) => setTimeout(resolve,2000));
}

const Header = () => {

    const [signinPopup,setSigninPopup] = useState(false);
    const popupSigninModal = () => setSigninPopup(!signinPopup);

    const [signinLoading,setSigninLoading] = useState(false);
    const signinClicked = () => setSigninLoading(true);
    useEffect(() => {
        if (signinLoading) {
            networkRequest().then(() => {
                setSigninLoading(false);
            })
        }
    },[signinLoading])


    return (
        <>  
            <Navbar className="navbar-color bg-transparent" expand="md">
                <Modal isOpen={signinPopup} toggle={popupSigninModal}>
                    <ModalBody> 
                        <Form>
                            <FormGroup>
                                <Label>Sign-In</Label>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='username'>Username</Label>
                                <Input type="text" />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='password'>Password</Label>
                                <Input type="password" />
                            </FormGroup>
                            <FormGroup>
                                <Button className="signin-button" disabled={signinLoading} 
                                        onClick={!signinLoading ? signinClicked : null} block>
                                            {signinLoading ? 'Loading...' : 'Sign-in'}
                                </Button>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox"></Input>
                                    Keep me signed in
                                </Label>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>

                <NavbarBrand>
                    <img src = 'images/transparent_logo.png' height="50" width='50'></img>
                </NavbarBrand>

                <Nav navbar className="w-100">
                    <NavItem className="rounded"> 
                        <NavLink className='px-3 py-1 thick'> Movies  </NavLink> 
                    </NavItem>
                    <NavItem className="rounded"> 
                        <NavLink className='px-3 py-1 thick'> TV Shows </NavLink>
                    </NavItem>
                    <NavItem className="rounded"> 
                        <NavLink className='px-3 py-1 thick'> New & Popular </NavLink> 
                    </NavItem>
                    <NavItem className="rounded"> 
                        <NavLink className='px-3 py-1 thick'> Celebs </NavLink> 
                    </NavItem>
                </Nav>

                <Nav navbar className="w-100 justify-content-end">
                    {/*<NavItem className='px-3 py-1 rounded navItem-color thick'> Watchlist </NavItem>*/}
                    <NavItem className="rounded" onClick = {popupSigninModal}> 
                        <NavLink href="#" className='px-3 py-1 thick'> Sign in </NavLink>
                    </NavItem>
                </Nav>

            </Navbar>

        </>
    )
}

export default Header;