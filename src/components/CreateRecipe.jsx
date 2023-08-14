import React, { useRef, useState } from 'react';
import { Form, Container, Row, Button } from 'react-bootstrap';
import bannerImage from "../images/food-pattern-bg.png";
import { useSelector } from 'react-redux';
// import{ resizeImageFile } from "react-image-file-resizer";
import Resizer from "react-image-file-resizer"

export default function CreateRecipe({createRecipe, recipeData}) {
    const state = useSelector(state => state.authReducer)
    const recipeNameRef = useRef();
    const ingredientsRef = useRef();
    const recipeDescriptionRef = useRef();
    const recipeImageRef = useRef();
    const recipeCategoryRef = useRef();
    const [ error, setError] = useState(null)


    const handleCreateRecipe = (e) => {
        e.preventDefault();
        const recipeImage = recipeImageRef.current.files[0];
        if(recipeImage){
            const maxImageSizeInBytes = 2 * 1024 * 1024; // 5MB
            if (recipeImage.size > maxImageSizeInBytes) {
                console.error("Image size exceeds the maximum allowed size.");
                setError("Image size exceeds the maximum allowed size.")
                return;
            }
            try {
                // const resizedImage = Resizer.imageFileResizer(recipeImage, 300, 300, 'JPEG'); 
                const reader = new FileReader();
                reader.readAsDataURL(recipeImage);
                reader.onload = () => {
                    const imageDataURL = reader.result;
                    const recipeName = recipeNameRef.current.value;
                    const recipeIngredients = ingredientsRef.current.value;
                    const recipeDescription = recipeDescriptionRef.current.value;
                    const recipeCategory = recipeCategoryRef.current.value;

                    const newRecipe = {
                        id: recipeData.length + 1,
                        name: recipeName && recipeName,
                        image: imageDataURL,
                        category: recipeCategory,
                        ingredients: recipeIngredients && recipeIngredients,
                        description: recipeDescription && recipeDescription,
                    }
                    createRecipe(newRecipe)
                };

            } catch(error) {
                console.error("Error reading image file:", error);
            }
        } else {
            console.error("No image selected.");
        }
        
    }
  return (
    <section className="section create-recipe-section w-100" >
        <Container>
        <Form onSubmit={(e) => handleCreateRecipe(e)}>
        <Form.Group className="mb-3" controlId="recipeCategory">
            <Form.Label>Category of recipe :</Form.Label>
            <Form.Control type="text" placeholder="Enter Recipe Category Name - Like Chicken, Mutton, Pizza, Veg etc" required ref={recipeCategoryRef}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="recipeImage">
            <Form.Label>Image of recipe : max - 2MB</Form.Label>
            <Form.Control type="file" placeholder="Take your recipe image" ref={recipeImageRef} name="img" accept="image/*"/>
            <span className='text-danger bg-light'><small>{error && error}</small></span>
        </Form.Group>
        <Form.Group className="mb-3" controlId="recipeName">
            <Form.Label>Name of recipe :</Form.Label>
            <Form.Control type="text" placeholder="Enter Recipe Name" required ref={recipeNameRef}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="recipeIngrediants">
            <Form.Label>Ingredients :</Form.Label>
            <Form.Control as="textarea" rows={3} required ref={ingredientsRef} placeholder="Write your recipe ingrediants here"/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="recipeDescription">
            <Form.Label>Description :</Form.Label>
            <Form.Control as="textarea" rows={3} required ref={recipeDescriptionRef} placeholder="Write your recipe description here"/>
        </Form.Group>
        <div className="form-button">
            <Button type='submit' variant='outline-warning' className='fw-bold' size='lg' style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,.5)), url(${bannerImage})` , backgroundSize: "contain"}}>Create Recipe</Button>
        </div>
        </Form>
        </Container>
    </section>
  )
}
