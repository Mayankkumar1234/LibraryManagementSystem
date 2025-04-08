import React, { useContext, useRef, useState } from 'react'
import img1 from '../Images/img1.jpeg'
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { globalContext } from './Context/Context';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Register = () => {
 const name  = useRef(null);
 const email = useRef(null);
 const password = useRef(null); 
const [isRegistered, setIsRegistered] =useState(false)
const Navigate = useNavigate()
     const {authorized, dispatch} = useContext(globalContext)
     
  const registerHandler=async (e)=>{
   e.preventDefault(); 
    if(  !name.current.value || !email.current.value || !password.current.value){
     toast.warn("All fields are required")
      return;
    }
   try {
    // Send POST request with Axios
    const response = await axios.post(
      "http://localhost:9000/users/register",
      {
        name:name.current.value,
        email:email.current.value,
        password:password.current.value,
        role:"student",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  
   
     setIsRegistered(!isRegistered);
    toast.success("User registered successfully!");
     
  } catch (error) {
    toast.error("Failed to post data.");
  }

  }
  const loginHandler=async (e)=>{
    e.preventDefault();
    try {
     const response = await axios.post(
       "http://localhost:9000/users/login",
       {
       email:email.current.value,
       password:password.current.value,
       
       }); 
       localStorage.setItem("token", response.data.token);
       localStorage.setItem("user",JSON.stringify( response.data.user));

     toast.success("Logged in sucessfully");
     
      let user = JSON.parse(localStorage.getItem("user"));
     if(user && user.role=='student'){
      Navigate('/home')
      dispatch({type:"Login",payload:{
        token:response.data.token,
         user:response.data.user
      }})
     }else{
      Navigate('/dashboard')
      dispatch({type:"Login",payload:{
        token:response.data.token,
         user:response.data.user
      }})
     }
      
   } catch (error) { 
     toast.error("Failed to login");
   }


}
  return (
  <div>
    <h1 className={`pt-6 font-bold text-4xl text-center`}> Welcome to My Library  {isRegistered ?  "SignUp": "Login" } <span className='text-[#7303A7]'>Now</span></h1>
<div className=' flex pt-6 mt-6 mx-auto items-center justify-between w-[80%] h-[70%] rounded-lg bg-white shadow-2xl mb-12'>
  <img className='ml-[-5vw] hidden sm:hidden md:block' style={{width:"55%", height:"40%"}} src={`${img1}`} alt="" />
  <div className='md:ml-24 mx-auto'>
    <form className='w-full flex flex-col gap-3 mr-[20vw] pb-4' onSubmit={isRegistered ?  registerHandler :loginHandler }>
        {
          isRegistered ? <div className='flex py-2 px-3  w-[90%] items-center border-[1px] rounded border-black'> <FaUser /> <input ref={name} placeholder='Name' className='outline-none w-[90%] px-3' type="text" /></div> : ""
     
        }
      <div className='flex py-2 px-3 w-[90%] items-center border-[1px] rounded border-black'> <MdEmail/> <input ref ={email} placeholder='Email' className='outline-none w-[90%] px-3' type="text" /></div>
      <div className='flex py-2 px-3 w-[90%] items-center border-[1px] rounded border-black'><IoCall /> <input ref={password} placeholder='password' className='outline-none w-[90%] px-3' type="password" /></div>
           {
            !isRegistered &&   
                 <div>
                  <h1>  Admin : mk123@gmail.com :  pass :12345</h1>
                 </div>
           }
         <div className=''> 
           {
            isRegistered ? <p>Already registered ? <span className='cursor-pointer' onClick={()=> setIsRegistered(!isRegistered)}>LogIn</span> </p>: <p>Don't have account ? <span className='cursor-pointer' onClick={()=> setIsRegistered(!isRegistered)} >SignIn</span> </p>
           }
            {
              isRegistered ? <input className='bg-[#7303A7] w-[30%] text-white font-semibold text-lg rounded  py-1 ml-[60%]' value="Register" type="submit" />
         : <input  className='bg-[#7303A7] w-[30%] text-white font-semibold text-lg rounded  py-1 ml-[60%]' value="login" type="submit" />
  
            }
         </div>
         </form>
  </div>
</div>
  </div>
  )
}

export default Register
 