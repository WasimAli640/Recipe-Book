
import { LOGIN_SUCCESS, LOGOUT, SET_FAVORITE, SIGNUP } from '../actions/type';
// import { Recipes } from '../recipeData/data';

const storedUser = JSON.parse(localStorage.getItem('currentUserData'));
const storedFavorites = JSON.parse(localStorage.getItem('currentUserFavItem'));
const authData = JSON.parse(localStorage.getItem('authData'))
const Recipies = JSON.parse(localStorage.getItem('Recipies'));
console.log("storedFavorites", storedFavorites)
const intialState = {
    currentUser: storedUser || null,
    loginData: authData ||
     [{
        id: 1412,
        name: "Wasim Ali Sayyed",
        email: "vsmali.6640@gmail.com",
        password: "Ali@06640",
        favRecipe: []
    }],
    favorite: storedFavorites || []
};

const authReducer = (state = intialState, action) =>{
    switch(action.type){
        case LOGIN_SUCCESS :

                const currentUserObject = state.loginData.find((user) => user.email === action.payload)
                // console.log(currentUserObject)
                if(currentUserObject){
                    return {
                        ...state,
                        currentUser : currentUserObject,
                        favorite : currentUserObject.favRecipe.map((recipe) => recipe),
                    }
                }
                return state;
                // const favorite = currentUserObject && currentUserObject.favRecipe.map((recipe) => recipe.id);
                // state.favorite = [...state.favorite, favorite];
        case SIGNUP : 
            const newUser = {name: action.payload.name, email: action.payload.email, password: action.payload.password, id: state.loginData.length + 1, favRecipe: [] };
            return {
                ...state,
                currentUser : newUser,
                loginData : [...state.loginData, newUser],
            }
        case LOGOUT :
            return {
                ...state,
                currentUser : null,
                favorite: null,
            } 
        case SET_FAVORITE :
            if(state.currentUser){
                // const currentUserExist = state.loginData.find((user) => user.id === state.currentUser.id);

                // if(currentUserExist){
                    // const favouriteRecipe = Recipies && Recipies.find((recipe) => recipe.id === action.payload)
                    const updatedLoginData = state.loginData.map((user) => 
                    user.id === state.currentUser.id 
                    ? {
                        ...user,
                      favRecipe: user.favRecipe.includes(action.payload)
                          ? user.favRecipe.filter((recipeId) => recipeId !== action.payload)
                          : [...user.favRecipe, action.payload],
                    }
                    : user

                );
                const updatedCurrentUser = updatedLoginData.find((user) => user.id === state.currentUser.id);
                const updatedFavorite = updatedCurrentUser ? updatedCurrentUser.favRecipe : [];
                // updatedCurrentUser?.favRecipe?.map(recipe => recipe.id) || [];
                    return {
                        ...state,
                        loginData : updatedLoginData,
                        currentUser: updatedCurrentUser,
                        favorite: updatedFavorite
                    };

                // }
            }  else {
                return state;
            }
              
        default:
            return state;    

    }
}

export default authReducer;
