import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { globalContext } from '../components/Context/Context'
import axios from 'axios'
import { toast } from 'react-toastify'

const AdminHeader = () => {
    const {isClick, dispatch} = useContext(globalContext)
    const navigate = useNavigate()
      
  const logoutHandler=async ()=>{
    // let data = JSON.parse(localStorage.getItem("user")) || null
    let token = localStorage.getItem('token') || null

    try {
        await axios.get('https://librarymanagementsystem-backend-71te.onrender.com/users/logout',{
        headers:{
          authorization:`Bearer ${token}`
        }
       })
       dispatch({type:"Logout"})
       localStorage.removeItem('token')
       localStorage.removeItem('user')
       toast.success("User logout successfully")
       navigate('/login')
        
     } catch (error) {
      toast.error("This is the error",error.message);
     }
  
  }
  return (
    <div>
       <div  className='flex justify-between px-24  bg-slate-100 shadow-md' >
    <img  className='w-[6vw] '  src="https://t3.ftcdn.net/jpg/01/00/57/26/360_F_100572672_6eerkmT3J2ekUtGCFP54FiGRAT9VhYsd.jpg" alt="logo" />
      <div className='flex gap-6 pt-0 text-[#37AFE1] text-lg items-center  font-semibold'  >
      <Link className="hover:bg-blue-600 hover:text-white hover:px-2 hover:py-1 hover:rounded-md" to='/dashboard'>Dashboard</Link>
       <Link className="hover:bg-blue-600 hover:text-white hover:px-2 hover:py-1 hover:rounded-md" to='/addBook' >AddBook</Link>
       <Link className="hover:bg-blue-600 hover:text-white hover:px-2 hover:py-1 hover:rounded-md" to='/allBook' >AllBooks</Link>
        <Link className="hover:bg-blue-600 hover:text-white hover:px-2 hover:py-1 hover:rounded-md" to='borrowBook' >BorrowedBook</Link>
         <button onClick={logoutHandler} className="hover:bg-blue-600 hover:text-white hover:px-2 hover:py-1 hover:rounded-md" >Logout</button>
      </div>
    </div>
    </div>
  )
}

export default AdminHeader
