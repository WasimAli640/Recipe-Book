import React from 'react'
import {Container, Card, Button } from 'react-bootstrap'
// import RecipeCard from './recipeCard'
import RecipeItem from './recipeItem';
import Slider from 'react-slick';
import { useSelector } from 'react-redux';

export default function Favourite({handleRecipeItem, showRecipe, recipeItem, setShowRecipe, recipeData}) {
  const state = useSelector(state => state.authReducer)
  const favoriteId = state.currentUser.favRecipe.map((recipe) => recipe)
  const favorite = recipeData.filter((recipe) => favoriteId.includes(recipe.id))
  const settings = {
    dots: false,
    infinite: false,
    centerPadding: 60,
    speed: 500,
    slidesToScroll: 1, 
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <section className="favourite-section min-vh-100 d-flex align-items-center w-100">
      <Container>
   
          {!showRecipe ? state.currentUser && state.currentUser.favRecipe.length > 0 
          ? 
          <>
          <h2 className='display-5 font-heading fav-title'>Your Favorite</h2>
          <Slider {...settings}>
          { favorite.map((recipe) =>
             <Card className="fav-recipe-card rounded-pill font-heading h-100 cursor-pointer text-dark position-relative overflow-hidden" key={recipe.id}>
              <Card.Img
                variant="top"
                src={recipe.image}
                className="food-card-image rounded-0"
              />
              <Card.Body className="recipe-card-body position-absolute h-100 w-100 start-0 top-0">
                <Card.Title className="recipe-title fav-recipe-title fs-4 w-100 fw-normal position-absolute bottom-0 mb-3 text-center">
                  {recipe.name.length > 25 ? `${recipe.name.substring(0,25)}...` : recipe.name }
                </Card.Title>
                <div className="recipe-card-button mt-auto d-flex justify-content-between align-items-center position-absolute top-50 start-50 translate-middle">
                  <Button variant="warning" className='fw-semibold fav-recipe-card-btn rounded-pill' onClick={() => handleRecipeItem(recipe)}>
                    Show Recipe
                  </Button>
                </div>
              </Card.Body>
            </Card>)} 
            </Slider>
            </>
          : <div className='display-2 font-heading'><div>OOPS !</div> You Dont Have Any Favorite Recipe Yet </div> : <RecipeItem recipeItem={recipeItem} setShowRecipe={setShowRecipe} />}
      </Container>
    </section>
  )
}
