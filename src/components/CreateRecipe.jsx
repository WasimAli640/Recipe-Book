import React, { useRef, useState } from 'react';
import { Form, Container, Button } from 'react-bootstrap';

export default function CreateRecipe({createRecipe, recipeData}) {
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
    <section className="section create-recipe-section w-100 font-heading" >
        <Container>
        <div className="col-lg-6 mx-auto">
        <Form onSubmit={(e) => handleCreateRecipe(e)} className='create-recipe-form'>
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
            <Form.Control as="textarea" rows={5} required ref={recipeDescriptionRef} placeholder="Write your recipe description here"/>
        </Form.Group>
        <div className="form-button">
            <Button type='submit' variant='warning' className='fw-bold' size='md'>Create Recipe</Button>
        </div>
        </Form>
        </div>
        </Container>
    </section>
  )
}
