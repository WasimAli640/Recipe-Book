import React from 'react';
import bannerImage from "../images/food-pattern-bg.png"
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Profile({setShowRecipe}) {
    const state = useSelector(state => state.authReducer);
    const currentUser = state.currentUser;
  return (
    <section className='profile-section min-vh-100 w-100 d-flex align-items-center' style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,1)), url(${bannerImage})`}}>
        <Container>
            <Row className='align-items-center'>
                <Col lg={6}>
                <h2 className='display-4 fw-bold font-heading'>Your Profile</h2>
                    <p className='display-6 font-heading' key={currentUser && currentUser.email}>Hi {currentUser && currentUser.name && currentUser.name.split(' ')[0]}</p>
                    <p className='fs-5'>Welcome to over recipe book</p>
                    <p className='fs-6 text-white font-heading'>{currentUser && currentUser.email}</p>
                </Col>  
                <Col lg={5} className='offset-lg-1'>
                    <div className="profile-right-content">
                        <Link to="/favorite" className='btn btn-outline-light fav-btn btn-big' onClick={() => setShowRecipe(false)}>Favourite Recipes</Link>
                    </div>
                </Col>
        </Row>
        </Container>
    </section>
  )
}
