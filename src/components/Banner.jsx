import React from 'react';
import bannerImage from "../images/banner-pizza.jpg"
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Banner() {
  return (
    <section className="section banner min-vh-100 w-100 d-flex align-items-center" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bannerImage})` }}>
        <Container>
            <div className="col-lg-8">
                <div className="section-title text-light">
                    <h1 className='fs-6 fw-bold text-uppercase'>Recipe Book</h1>
                    <h1 className="display-1 font-heading fw-bold banner-title">Home Cooking: A Writer in the Kitchen</h1>
                    <Link size='lg' className='btn btn-lg btn-warning fw-semibold' to="/recipes">Show Recipe</Link>
                </div>
            </div>
        </Container>
    </section>
  )
}
