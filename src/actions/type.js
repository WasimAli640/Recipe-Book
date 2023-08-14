export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";
export const SET_FAVORITE = "SET_FAVORITE";
export const SIGNUP = "SIGNUP";



export const login = (email) => {
    return {
        type: LOGIN_SUCCESS,
        payload: email
    }
}

export const signup = (email, password, name) => {
    return {
        type: SIGNUP,
        payload: {
            email, password, name
        }
    }
}


export const logout = () => {
  return {
      type: LOGOUT
  }
  
}

export const favourite = (favId) => {
    return {
        type: SET_FAVORITE,
        payload: favId,
    }
    
  }

