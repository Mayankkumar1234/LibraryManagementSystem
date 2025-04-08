
const reducerAction = (state,action) => {
 
  switch(action.type){
    case "Login" :
    return  {
     ...state, 
     user: action.payload.user, 
        token: action.payload.token, 
        authorized: true,
    }
    case "Logout" :
      return  {
        ...state, 
           user: null, 
           token: null, 
           authorized: false,
  }
  default : return state
}
}

export default reducerAction
