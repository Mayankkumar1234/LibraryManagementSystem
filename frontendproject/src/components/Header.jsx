import React, { useContext } from 'react'
import {NavLink} from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import logo from '../Images/logo3.jpg'
import { globalContext } from './Context/Context';

const Header = () => {
  const { isClick,setIsClick } =useContext(globalContext) 
  const displayProfileHandler =()=>{
     setIsClick(!isClick)
  }
  return (
    <div className='w-full h-screen bg-no-repeat bg-cover' style={{backgroundImage:`url(https://media.istockphoto.com/id/949118068/photo/books.jpg?s=612x612&w=0&k=20&c=1vbRHaA_aOl9tLIy6P2UANqQ27KQ_gSF-BH0sUjQ730=)`}}>
      <div className='flex justify-between px-24 bg-[#4C754B]  relative z-20'>
       <img className='w-16' src={logo} alt="" />
       <div className='flex items-center justify-center gap-8 pb-2 font-semibold text-white text-lg'>
          <NavLink to='/home'>Home</NavLink>
          <NavLink to='/allbooks' >AllBooks</NavLink>
          <NavLink to='mysection' >MyPurchase</NavLink>
           <span onClick={displayProfileHandler}  className="font-bold text-xl cursor-pointer"> <CgProfile  /> </span>
       </div>
    </div>
    </div>
  )
}

export default Header
