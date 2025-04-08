import React, { createContext, useReducer, useState } from 'react'
import reducerAction from './reducerAction'


const initState = {
  user:JSON.parse(localStorage.getItem('user')) || null,
  token:localStorage.getItem('token')|| null,
  authorized:false,
  profileClick:false
}

export const globalContext = createContext(initState)

const Context = ({children}) => {
     const [state,dispatch]  = useReducer(reducerAction, initState)
     const [isClick,setIsClick] = useState(false)
  return (
    <globalContext.Provider value={{
      user: state.user,
      authorized: state.authorized,
      token: state.token,
      profileClick:state.profileClick,
      isClick, setIsClick,
      dispatch,
    }} >
      {
      children
      }
    </globalContext.Provider>
  )
}

export default Context
