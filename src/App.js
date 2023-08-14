import './App.css';
import { useEffect, useState } from 'react';
import Header from './components/header';
import Login from './components/login';
import Dashboard from './components/dashboard';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Signup from './components/signup';
import bannerImage from "./images/pizza-pattern.jpg";
import Profile from './components/Profile';
import { Recipes } from './recipeData/data';
import RecipeSection from './components/recipeSection';
import Favourite from './components/Favourite';
import { useSelector } from 'react-redux';
import CreateRecipe from './components/CreateRecipe';


function App() {
  // Get Recipe Data from localstorage
  let Recipies = localStorage.getItem("Recipies");
  // All Recipe is in Recipe Data , and Also update from localstorage
  const [recipeData, setRecipeData] = useState(JSON.parse(Recipies) || Recipes);
  // Search Recipe Filtered is here
  const [searchRecipe, setSearchRecipe] = useState(null);
  // Give message for if search recipe is not found
  const [searchRecipePopup, setSearchRecipePopup] = useState(null);
  // Show Item
  const [recipeItem, setRecipeItem] = useState();
  const [showRecipe, setShowRecipe] = useState(false);
  // For Goto other page
  const navigate = useNavigate();
  // Get state value from authReducer
  const state = useSelector(state => state.authReducer);
  // On render Parse recipe data from localstorage
  useEffect(() => {
    if(Recipies){
      setRecipeData(JSON.parse(Recipies));
    }
  }, [])
  // Set authentication data to local storage
  useEffect(() => {
    localStorage.setItem("authData", JSON.stringify(state.loginData));
  }, [state.loginData])
  // Set Current User data to local storage with favorite recipe id's
  useEffect(() => {
      localStorage.setItem("currentUserData", JSON.stringify(state.currentUser));
      localStorage.setItem("currentUserFavItem", JSON.stringify(state.favorite));
  }, [state.currentUser, state.favorite])
  // Set recipe data to local storage
  useEffect(() => {
    localStorage.setItem("Recipies", JSON.stringify(recipeData))
  }, [state.currentUser])
  // Creating new recipe
  const createRecipe = (newRecipe) => {

    setRecipeData([...recipeData, newRecipe]);
    localStorage.setItem("Recipies", JSON.stringify([...recipeData, newRecipe]))

    navigate('/recipes')
  }
  // Show Recipe Item
  const handleRecipeItem = (item) => {
    setRecipeItem(item)
    setShowRecipe(true)
  }
  // Search Recipe by its name and category
  const handleSearch = (e, searchText) => { 
    e.preventDefault();
    const searchValue = searchText.current.value;
    
    const updatedSearchByName = recipeData.filter((recipe) => 
        recipe.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    const updatedSearchByCat = recipeData.filter((recipe) => 
    recipe.category.toLowerCase().includes(searchValue.toLowerCase())
  );
    
    if (updatedSearchByName.length > 0) {
        setSearchRecipe(updatedSearchByName);
        setSearchRecipePopup(null);
    }
    else if(updatedSearchByCat.length > 0){
      setSearchRecipe(updatedSearchByCat);
        setSearchRecipePopup(null);
    }
    else {
        setSearchRecipe(null);
        setSearchRecipePopup(`${searchValue}: No Result found`);
    }
}
  return (
    <>
    <div className="recipe-app min-vh-100 d-flex align-items-center position-relative" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bannerImage})`}}>
      {/* Header Component */}
    <Header setShowRecipe={setShowRecipe} onSearch={handleSearch}/>
    <Routes>
      {/* Home Component */}
      <Route path='/' element={<Dashboard/>} />
      {/* Login Component */}
      <Route path='/login' element={<Login/>}/>
      {/* Signup Component */}
      <Route path='/signup' element={<Signup/>}/>
      {/* Profile Component */}
      <Route path='/profile' element={<Profile setShowRecipe={setShowRecipe}/>}></Route>
      {/* Recipe Section Component */}
      <Route path="/recipes" element={<RecipeSection recipeData={recipeData} handleRecipeItem={handleRecipeItem} showRecipe={showRecipe} setShowRecipe={setShowRecipe} recipeItem={recipeItem} searchRecipe={searchRecipe} setSearchRecipe={setSearchRecipe} searchRecipePopup={searchRecipePopup} setSearchRecipePopup={setSearchRecipePopup} onSearch={handleSearch}/>}></Route>
      {/* Favourite Component */}
      <Route path='/favorite' element={<Favourite handleRecipeItem={handleRecipeItem} showRecipe={showRecipe} setShowRecipe={setShowRecipe} recipeItem={recipeItem} recipeData={recipeData}/>}></Route>
      {/* CreateRecipe Component */}
      <Route path='/create-recipe' element={<CreateRecipe createRecipe={createRecipe} recipeData={recipeData}/>}></Route>
    </Routes>
    </div>
    </>
  );
}

export default App;
