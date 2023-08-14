import React, { useRef, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../actions/type';
import { useDispatch, useSelector } from 'react-redux';



export default function Signup() {
    const state = useSelector(state => state.authReducer)
    const emailRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();
    const [error, setError] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleSubmit = (e, emailRef, passwordRef, nameRef) => {
        e.preventDefault();
        const newUserEmail = emailRef.current.value;
        const newUserPass = passwordRef.current.value;
        const newUserName = nameRef.current.value;
        let emailExist = state.loginData.find((user) => user.email === emailRef.current.value)
        if(emailExist) {
            setError("Already you have an account")
        } else {
            dispatch(signup(newUserEmail && newUserEmail, newUserPass && newUserPass, newUserName && newUserName))
            setError("")
            navigate("/profile")
        }
    }

  return (
    <Container className='d-flex justify-content-center'>
    <div className='login-form-container form-container border border-1 py-5 px-3 bg-dark'>
       <Form onSubmit={(e) => handleSubmit(e, emailRef, passwordRef, nameRef)}>
       <Form.Group className="mb-3" controlId="name">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="name" placeholder="Enter your name"  name='name' required ref={nameRef}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email"  name='email' ref={emailRef} required/>
            <Form.Text className="text-light">
            We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"  name='password' ref={passwordRef} required />
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
        <div className='form-text text-light' style={error ? {opacity: "1"} : {opacity: "0"}}>{error ? error : "No error"}</div>
        </Form>
        <Link className='btn btn-sm btn-link mt-3 p-0' to="/login">If you already have an account ? Login</Link>
    </div>
    </Container>
  )
}
