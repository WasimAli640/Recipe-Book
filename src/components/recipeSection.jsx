import React, { useRef, useState } from 'react';
import { Col, Container, Row, Button, Form } from 'react-bootstrap';
import RecipeItem from './recipeItem';
import RecipeCard from './recipeCard';
import { useDispatch, useSelector } from 'react-redux';
import { favourite } from '../actions/type';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";



export default function RecipeSection({setSearchRecipe, searchRecipe, recipeData, handleRecipeItem , showRecipe, setShowRecipe, recipeItem, currentUser, searchRecipePopup, setSearchRecipePopup, onSearch}) {
  const searchRef = useRef();
  const dispatch = useDispatch();
  const state = useSelector(state => state.authReducer);
  const [activeTab, setActiveTab] = useState("All");
  const [filterData, setFilterData] = useState(recipeData);
  const navigate = useNavigate();
  const handleTabs = (category) => {
    setSearchRecipe(null)
    if(category === 'All'){
      setActiveTab(category);
      setFilterData(recipeData);
      setSearchRecipePopup(null)
    } else {
      setActiveTab(category);
      setFilterData(recipeData.filter((rec) => rec.category === category))
      setSearchRecipePopup(null)
    }
   }

  const handleFavItem = (favId) => {
    dispatch(favourite(favId));
 }
 const handleCheckUser = () => {
  if(state.currentUser){
    navigate("/create-recipe")
  }
  else {
    Swal.fire({
      title: 'Oops!',
      text: 'Please login first to create recipe',
      // icon: 'error',
      confirmButtonText: 'Ok'
    })
  }
 }

//  console.log(activeTab)
const uniqueCategories = [...new Set(recipeData.map((recipe) => recipe.category))];
  return (
    <section className="section recipes-section min-vh-100 d-flex align-items-center justify-content-center w-100">
        <Container>
        {!showRecipe ? 
        <>
        <div className="search-container recipe-search-container">
        <Form className="d-flex" onSubmit={(e) => onSearch(e, searchRef)}>
          <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              ref={searchRef}
              onChange={(e) => onSearch(e, searchRef)}
              />
          <Button type='submit' variant="dark">Search</Button>
        </Form>
        </div>
        <div className="tabs-container d-flex justify-content-between gap-2 mb-5">
          <div className="create-recipe-button">
            <Button variant='outline-light' onClick={() => handleCheckUser()}>Create Recipe</Button>
          </div>
          <div className="tab-container d-flex justify-content-end gap-2 flex-wrap">
              <Button className={`${activeTab === "All" ? `tab-button active` : `tab-button`}`} onClick={() => handleTabs('All')}>All</Button>
              {
                uniqueCategories.map((category) => 
                  <Button key={category} className={`${activeTab === category ? `tab-button active` : `tab-button`}`} onClick={() => handleTabs(category)}>{category}</Button>
                )
              }
          </div>
          </div>
            <Row>
            {!searchRecipe ? searchRecipePopup ? 
            <div className='display-5'>{searchRecipePopup}</div> :
            filterData && filterData.map((recipe) => 
            <Col lg={4} key={recipe.id} className='mb-4'>
                <RecipeCard recipe={recipe} handleFavItem={() => handleFavItem(recipe.id)} handleRecipeItem={handleRecipeItem} currentUser={currentUser}/>
            </Col>)
            : searchRecipe.map((recipe) => 
              <Col lg={4} key={recipe.id} className='mb-4'>
              <RecipeCard recipe={recipe} handleFavItem={() => handleFavItem(recipe.id)} handleRecipeItem={handleRecipeItem} currentUser={currentUser}/>
            </Col>
            )
          }
            </Row></> : 
            <RecipeItem recipeItem={recipeItem} setShowRecipe={setShowRecipe}/>
            }
        </Container>
    </section>
  )
}
