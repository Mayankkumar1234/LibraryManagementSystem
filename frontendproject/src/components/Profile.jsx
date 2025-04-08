import React, { useContext } from 'react'
import { globalContext } from './Context/Context'
import axios from 'axios'
import {Navigate} from 'react-router-dom'
import { toast } from 'react-toastify'

const Profile = () => {
  const {isClick, dispatch} = useContext(globalContext)

  let data = JSON.parse(localStorage.getItem("user")) || null
  let token = localStorage.getItem('token') || null
  // console.log(data);
  const logoutHandler =async () =>{
   try {
    const response =await axios.get('https://librarymanagementsystem-backend-71te.onrender.com/users/logout',{
      headers:{
        authorization:`Bearer ${token}`
      }
     })
     dispatch({type:"Logout"})
     localStorage.removeItem('token')
     localStorage.removeItem('user')
     alert("User logout successfully")
     Navigate('/')
      
   } catch (error) {
      toast.error(error.message);
   }

  }
   
  return (
    <div className={`${isClick?"block":"hidden"} w-[30vh] px-2 pt-3 pb-3  right-[2%] top-[10%] z-30 absolute bg-blue-100  rounded-md`}>
        <div className='px-2 py-2'>
          <img src="" alt="" />
         <p className='font-semibold text-blue-900 pb-2'>Name :{data?.name}</p>
         <hr className='border-[1px] border-black ' />
          <p className='font-semibold text-blue-900 pb-2'>Email : {data?.email}</p>
          <hr className='border-[1px] border-black' />
           <p className='font-semibold text-blue-900 pb-2'>Role : {data?.role}</p>
           <hr className='border-[1px] border-black' />
           
        </div>
         <div className='flex gap-4'>
         <button className='bg-blue-400 rounded-md px-1 text-white font-semibold'>Edit Profile</button>
          <button onClick={logoutHandler} className='bg-blue-400 px-2 py-1 rounded-md text-white font-semibold'>Logout</button>
  
         </div>
         </div>
  )
}

export default Profile
