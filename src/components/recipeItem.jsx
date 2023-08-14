import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'

export default function RecipeItem({recipeItem, setShowRecipe}) {
    const handleBack = () => {
        setShowRecipe(false)
    }
  return (
            <Row className='justify-content-center'>
                <Col lg={8}>
                    <div className="recipe-item bg-dark px-3 py-4 position-relative">
                        <div className="recipe-item-top d-flex align-items-center mb-4">
                        <img src={recipeItem.image} alt="" width={200} className='rounded-pill me-3' />
                        <h2 className='display-2 font-heading'>{recipeItem.name}</h2>
                        </div>
                        <p className='fs-5 font-heading fw-semibold'><span className='fw-bold fs-3'>Ingredients </span>: {recipeItem.ingredients}</p>
                        <p className='fs-6'><span className='fw-bold'>Description :</span> {recipeItem.description}</p>
                        <Button variant='outline-light' className='back-btn' onClick={() => handleBack()}>Go to recipes</Button>
                    </div>
                </Col>
            </Row>
  )
}
