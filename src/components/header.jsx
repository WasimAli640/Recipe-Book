import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from "../images/logo.png"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/type';


export default function Header({setShowRecipe}) {
  const state = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <header className="fixed-top">
       <Navbar expand="lg">
      <Container fluid className='px-md-5'>
        <Link to="/" className='navbar-brand d-inline-flex align-items-center position-relative py-4 fw-normal font-body'><img className='position-absolute start-0 header-logo' src={logo} alt="" width="80" /> Recipe Book</Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 my-lg-0"
            navbarScroll
          >
            <Link className='nav-link' to="/">Home</Link>
            {state.currentUser && <Link className='nav-link' to="/favorite" onClick={() => setShowRecipe(false)}>Favourite</Link>}
            <Link className='nav-link' to="/recipes" onClick={() => setShowRecipe(false)}>Recipes</Link>
            {state.currentUser && <Link className='nav-link' to="/profile">Profile</Link>}
            {state.currentUser ? <Link className='nav-link' to="/login" onClick={() => handleLogout()}>Logout</Link>: <Link className='nav-link' to="/login">Login</Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}
