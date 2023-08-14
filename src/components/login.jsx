import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Profile from './Profile';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/type';


export default function Login() {
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState();
    const [showProfile, setShowProfile] = useState(false);
    const dispatch = useDispatch();
    const state = useSelector((state) => state.authReducer);

    // console.log(state)
    
    const handleLogin = (e, emailRef, passwordRef) => {
        e.preventDefault();
        let email = emailRef.current.value; 
        let password = passwordRef.current.value; 
        const emailNotExist = state.loginData.find((user) => user.email === email )
        const passwordNotExist = state.loginData.find((user) => user.password === password )
        if(!emailNotExist && !passwordNotExist) {
            setError("Incorrect Email and Password")
        }
        else if(!emailNotExist) {
            setError("Incorrect Email")
        }
        else if(!passwordNotExist) {
            setError("Incorrect Password")
        }
        else {
            dispatch(login(email))
            setShowProfile(true)
            setError("");
            navigate("/profile")
        }

    }
  return (
    <Container className='d-flex justify-content-center'  >
    {showProfile ? 
        <Profile/>
     :<div className='login-form-container form-container border border-1 border-secondary py-5 px-3 bg-dark'>
       <Form onSubmit={(e) => handleLogin(e, emailRef, passwordRef)}> 
        <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name='email' ref={emailRef} required/>
            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"  name='password' ref={passwordRef} required/>
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
        <div className='form-text text-white'>{error && error}</div>
        </Form>
        <Link className='btn btn-sm btn-link mt-3 p-0' to="/signup">If you dont have any account ? Register</Link>
    </div>}
    </Container>
  )
}
