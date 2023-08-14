import { LOGIN_SUCCESS, LOGOUT, SET_FAVORITE, SIGNUP } from '../actions/type';

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
                if(currentUserObject){
                    return {
                        ...state,
                        currentUser : currentUserObject,
                        favorite : currentUserObject.favRecipe.map((recipe) => recipe),
                    }
                }
                return state;
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
            // First Check Current User
            if(state.currentUser){
                    // First Create variable Then Match id authentication data with currentUser
                    const updatedLoginData = state.loginData.map((user) => 
                    user.id === state.currentUser.id 
                    ? {
                        ...user,
                        // Then Match the authentication fav recipe id with action.payload(id of recipe when user click on heart button)
                      favRecipe: user.favRecipe.includes(action.payload)
                      // If its match then delete that fav recipe id
                          ? user.favRecipe.filter((recipeId) => recipeId !== action.payload)
                          // If its not match then add that fav recipe id
                          : [...user.favRecipe, action.payload],
                    }
                    // If current User is not match with authentication data then dont do anything
                    : user

                );
                // Create variable for currentUser Update 
                const updatedCurrentUser = updatedLoginData.find((user) => user.id === state.currentUser.id);
                // Create variable for update favorite recipe id
                const updatedFavorite = updatedCurrentUser ? updatedCurrentUser.favRecipe : [];
                    return {
                        // Then All update all the variable as per their variables
                        ...state,
                        loginData : updatedLoginData,
                        currentUser: updatedCurrentUser,
                        favorite: updatedFavorite
                    };
            }  else {
                return state;
            }
              
        default:
            return state;    

    }
}

export default authReducer;
