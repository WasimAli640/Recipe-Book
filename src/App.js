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
  let Recipies = localStorage.getItem("Recipies");
  const [recipeData, setRecipeData] = useState(JSON.parse(Recipies) || Recipes);
  const [searchRecipe, setSearchRecipe] = useState(null);
  const [searchRecipePopup, setSearchRecipePopup] = useState(null);
  const [fav, setFav] = useState([])
  const [currentUser, setCurrentUser] = useState(null);
  const [loginData, setLoginData] = useState([{
    id: 1412,
    name: "Wasim Ali Sayyed",
    email: "vsmali.6640@gmail.com",
    password: "Ali@06640",
    favRecipe: []
  }]);
  const [recipeItem, setRecipeItem] = useState();
  const [showRecipe, setShowRecipe] = useState(false);
  const navigate = useNavigate();
  const state = useSelector(state => state.authReducer);

  let data = localStorage.getItem("authData");
  let currentUserData = localStorage.getItem("currentUserData");
  let currentUserFavItem = localStorage.getItem("currentUserFavItem");

  useEffect(() => {
    
    if(Recipies){
      setRecipeData(JSON.parse(Recipies));
    }
      setLoginData(JSON.parse(data))
      setCurrentUser(JSON.parse(currentUserData))
      setFav(JSON.parse(currentUserFavItem))
  }, [])
  useEffect(() => {
    localStorage.setItem("authData", JSON.stringify(state.loginData));
  }, [state.loginData])
  useEffect(() => {
      localStorage.setItem("currentUserData", JSON.stringify(state.currentUser));
      localStorage.setItem("currentUserFavItem", JSON.stringify(state.favorite));
  }, [state.currentUser, state.favorite])

  useEffect(() => {
    localStorage.setItem("Recipies", JSON.stringify(recipeData))
  }, [state.currentUser])

  const createRecipe = (newRecipe) => {

    setRecipeData([...recipeData, newRecipe]);
    localStorage.setItem("Recipies", JSON.stringify([...recipeData, newRecipe]))

    navigate('/recipes')
  }

  const handleRecipeItem = (item) => {
    setRecipeItem(item)
    setShowRecipe(true)
  }

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
    <div className="recipe-app min-vh-100 d-flex align-items-center" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bannerImage})`}}>
    <Header currentUser={currentUser} setShowRecipe={setShowRecipe} onSearch={handleSearch}/>
    <Routes>
      <Route path='/' element={<Dashboard/>} />
      <Route path='/login' element={<Login  loginData={loginData} currentUser={currentUser}/>}/>
      <Route path='/signup' element={<Signup loginData={loginData} currentUser={currentUser}/>}/>
      <Route path='/profile' element={<Profile currentUser={currentUser} setShowRecipe={setShowRecipe}/>}></Route>
      <Route path="/recipes" element={<RecipeSection fav={fav} setFav={setFav} recipeData={recipeData} handleRecipeItem={handleRecipeItem} showRecipe={showRecipe} setShowRecipe={setShowRecipe} recipeItem={recipeItem} currentUser={currentUser} searchRecipe={searchRecipe} setSearchRecipe={setSearchRecipe} searchRecipePopup={searchRecipePopup} setSearchRecipePopup={setSearchRecipePopup} onSearch={handleSearch}/>}></Route>
      <Route path='/favorite' element={<Favourite currentUser={currentUser} fav={fav} handleRecipeItem={handleRecipeItem} showRecipe={showRecipe} setShowRecipe={setShowRecipe} recipeItem={recipeItem} recipeData={recipeData}/>}></Route>
      <Route path='/create-recipe' element={<CreateRecipe createRecipe={createRecipe} recipeData={recipeData}/>}></Route>
    </Routes>
    </div>
    </>
  );
}

export default App;
