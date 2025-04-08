import React from 'react'
import  bookImages from '../Images/bookImages.png'
import {Navigate} from 'react-router-dom'

const Home = () => {
  
  return (
    <div className='z-10 w-full absolute top-[10%] text-center'>
            <h1 className= 'font-bold w-full mx-auto text-6xl bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent flex items-center justify-center w-full pt-8'>Welcome to My Library</h1>
    
          <div className='flex pt-12'>
          <div className='w-[50%] px-24 flex flex-col flex-start'>
            <h1 className='font-bold text-4xl text-white px-12'>Library Management System</h1>
              <p className='font-semibold text-blue-300'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error quis dolorum, quo ullam similique cum iure velit libero nulla accusantium? Officia eligendi officiis non excepturi temporibus tenetur architecto nihil perspiciatis?</p>
              <button className='bg-blue-600 text-white font-semibold rounded-md w-36 px-2 py-1 mt-2'>See All Books</button>
          </div>
        <div className='w-[50%]'>
          <img onClick={()=>{
            <Navigate to='/allbooks' />
          }} className='w-full' src={bookImages} alt="" />
        </div>
          </div>
    </div>
  )
}

export default Home
