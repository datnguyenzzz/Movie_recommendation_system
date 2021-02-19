import React , { useState,useEffect } from 'react';
import { Navbar, NavbarBrand, Modal, ModalBody, 
         Nav, NavItem, NavLink, FormGroup, Form,
         Label, Input, Button, ModalFooter } from 'reactstrap';

const networkRequest = () => {
    return new Promise((resolve) => setTimeout(resolve,2000));
}

const Header = () => {

    //sign in modal pop up 
    const [signinPopup,setSigninPopup] = useState(false);
    const [signupPop, setSignuPop] = useState(false);
    const popupSigninModal = () => {
        setSigninPopup(!signinPopup);
        setSignuPop(false);
    }

    //sign in loading effect
    const [signinLoading,setSigninLoading] = useState(false);
    const signinClicked = () => setSigninLoading(true);
    useEffect(() => {
        if (signinLoading) {
            networkRequest().then(() => {
                setSigninLoading(false);
            })
        }
    },[signinLoading])

    //sign up modal pop up
    const popupSignupModal = () => {
        setSigninPopup(false);
        setSignuPop(!signupPop);
    }

    //icon.magnifier
    const [iconClicked,setIconClicked] = useState(false);
    const clickSearchIcon = () => setIconClicked(!iconClicked);

    console.log(iconClicked);

    return (
        <>  
            <Navbar className="navbar-color bg-transparent" expand="md">
                {/* sign in modal */}
                <Modal isOpen={signinPopup} size="sm" toggle={popupSigninModal} 
                       className="rounded modal-custom">
                    <ModalBody> 
                        <Form>
                            <FormGroup className='mb-2'>
                                <Label className="thick-label-text">Sign-In</Label>
                            </FormGroup>
                            <FormGroup className='my-2'>
                                <Label className="label-text" htmlFor='username'>Username</Label>
                                <Input className="signing-input" type="text" />
                            </FormGroup>
                            <FormGroup className='my-2'>
                                <Label className="label-text" htmlFor='password'>Password</Label>
                                <Input className="signing-input" type="password" />
                            </FormGroup>
                            <FormGroup className='mt-3 mb-2'>
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
                            <FormGroup className="mt-1 mb-1" >
                                <span className="line-custom">
                                    <h2><span>New to server?</span></h2>
                                </span>
                                <Button className="mt-2 signup-button" onClick={popupSignupModal} block>
                                        Create your new account
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>

                {/* sign up modal */}
                <Modal isOpen={signupPop} size="sm" toggle={popupSignupModal}
                   className="rounded modal-custom" >
                    <ModalBody> 
                        <Form>
                            <FormGroup className='mb-2'>
                                <Label className="thick-label-text">Create account</Label>
                            </FormGroup>
                            <FormGroup className='mb-2'>
                                <Label className="label-text" htmlFor='username'>Your name</Label>
                                <Input className="signing-input" type="text" />
                            </FormGroup>
                            <FormGroup className='my-2'>
                                <Label className="label-text" htmlFor='email'>Email</Label>
                                <Input className="signing-input" type="text" />
                            </FormGroup>
                            <FormGroup className='my-2'>
                                <Label className="label-text" htmlFor='password'>Password</Label>
                                <Input className="signing-input" type="password" />
                            </FormGroup>
                            <FormGroup className='my-2'>
                                <Label className="label-text" >Re-enter Password</Label>
                                <Input className="signing-input" type="password" />
                            </FormGroup>
                            <FormGroup className='mt-3 mb-2'>
                                <Button className="signin-button" block>
                                    Create your account
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>

                    <ModalFooter className="modal-footer-custom">
                        <Form className="form-footer">
                            <FormGroup>
                                <Label>Already has an account? </Label>
                                <a href="#" onClick={popupSigninModal} className="normal-link-text">  Sign-in</a>
                            </FormGroup>
                        </Form>
                    </ModalFooter>
                </Modal> 

                {/* Brand */}
                <NavbarBrand>
                    <img src = 'images/transparent_logo.png' height="50" width='50'></img>
                </NavbarBrand>

                {/* Nav content */}
                <Nav navbar className="w-100">
                    <NavItem className="navigator rounded"> 
                        <NavLink href="#" className='px-3 py-1 thick'> Movies  </NavLink> 
                    </NavItem>
                    <NavItem className="navigator rounded"> 
                        <NavLink href="#" className='px-3 py-1 thick'> TV Shows </NavLink>
                    </NavItem>
                    <NavItem className="navigator rounded"> 
                        <NavLink href="#" className='px-3 py-1 thick'> New & Popular </NavLink> 
                    </NavItem>
                    <NavItem className="navigator rounded"> 
                        <NavLink href="#" className='px-3 py-1 thick'> Celebs </NavLink> 
                    </NavItem>
                </Nav>

                <Nav navbar className="w-100 justify-content-end">
                    {/*<NavItem>
                        <Input type="text" className="search-bar" placeholder="&#xf002; Title, celeb, genre"
                                style={{height:"45px", width:"300px"}}/>
                    </NavItem>*/}

                    <NavItem className="mx-3 my-2">
                        <Form>
                            {(iconClicked) ? (
                                <>
                                    <a href="#">
                                        <i onClick={clickSearchIcon} className="fa fa-search icon-search icon-search-open"></i>
                                    </a>
                                    <Input type="text" className="search-bar search-bar-open" placeholder="Title, Genre, Celeb"/>
                                </>
                            ) : (
                                <>
                                    <a href="#">
                                        <i onClick={clickSearchIcon} className="fa fa-search icon-search"></i>
                                    </a>
                                    <Input type="text" className="search-bar" placeholder="Title, Genre, Celeb"/>
                                </>
                            )}
                        </Form>
                    </NavItem>
                    
                    <NavItem className="navigator rounded" onClick = {popupSigninModal}> 
                        <NavLink href="#" className='px-3 py-1 thick'> Sign in </NavLink>
                    </NavItem>
                </Nav>

            </Navbar>

        </>
    )
}

export default Header;