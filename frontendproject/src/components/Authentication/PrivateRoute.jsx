import React, { useContext } from 'react'
import { globalContext } from '../Context/Context'
import { Navigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

// Private route -> To allow only the authorized person to access
const PrivateRoute = ({children}) => {
 const {authorized}  = useContext(globalContext) 
 
if(!authorized){
  return <Navigate to='/register' />
}
   return (
    children
   )
  }

export default PrivateRoute
