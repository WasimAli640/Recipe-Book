import React from 'react';
import heart from "../images/heart.png";
import fillHeart from "../images/fill-heart.png";
import { Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

export default function RecipeCard({recipe, handleFavItem, handleRecipeItem}) {
  const state = useSelector(state => state.authReducer);
  const fav = state.favorite;
  const handleNoUserClick = () => {
    Swal.fire({
      title: 'Oops!',
      text: 'Please login first to make favorite recipe',
      confirmButtonText: 'Ok'
    })
  }

  return (
    <Card className="rounded-0 font-heading h-100 cursor-pointer">
      <Card.Img
        variant="top"
        src={recipe.image}
        className="food-card-image rounded-0"
      />
      <Card.Body className="recipe-card-body">
        <Card.Title className="recipe-title display-6">
          {recipe.name}
        </Card.Title>
        <Card.Text>{recipe.ingredients.length > 200 ? `${recipe.ingredients.substring(0, 200)}...` : recipe.ingredients}..</Card.Text>
        <div className="recipe-card-button mt-auto d-flex justify-content-between align-items-center">
          <Button variant="primary" onClick={() => handleRecipeItem(recipe)}>
            Show Recipe
          </Button>
          <Button
          variant="link"
          onClick={() => handleFavItem(recipe.id)}
        >
          {state.currentUser ? fav && fav.includes(recipe.id) ? (
            <img src={fillHeart} alt="" width={25} />
          ) : (
            <img src={heart} alt="" width={25} />
          ) : <img src={heart} alt="" width={25} onClick={() => handleNoUserClick()}/>}
        </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
