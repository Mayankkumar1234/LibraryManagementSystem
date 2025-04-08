import axios from 'axios'
import {React,useEffect, useState} from 'react'
import { FaUser } from "react-icons/fa";
import { IoBookSharp } from "react-icons/io5";
import { SiBookstack } from "react-icons/si";
import { toast } from 'react-toastify';
 

const Dashboard = () => {
     const [users,setUsers] = useState(null);
         const [skipId, setSkipId] = useState(null);
         const [dashboardData , setDashboardData] = useState(null);

         const getDashboardData =async ()=>{
           try {
            const data = await axios.get('https://librarymanagementsystem-backend-71te.onrender.com/dashboard/allInfo',{
              headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            })
            setDashboardData(data.data);
           } catch (error) {
            toast.error(error.message)
           }
         }
   const getAllUsers =async () =>{
   try {
    const users =  await axios.get('https://librarymanagementsystem-backend-71te.onrender.com/users/getAllUsers',{
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,   
      },
    })
    let user = JSON.parse(localStorage.getItem('user'));
    setSkipId(user._id);
    setUsers(users.data);
   } catch (error) {
    toast.error(error.message);
   }

   }
     
   const deleteHandler =async (userId)=>{ 
      try {
        await axios.delete(`https://librarymanagementsystem-backend-71te.onrender.com/users/${userId}`,{
          headers:{
          authorization:`Bearer ${localStorage.getItem('token')}`
          }
         })
         toast.success("User deleted successfully")
         getDashboardData()
      } catch (error) {
         console.log(error.message);
         toast.error("Unable to delete the user")
      }
   }
      useEffect(()=>{
        getAllUsers()
        getDashboardData()
      }, [])
  return (
     <div className='w-full'>

  <h1 className='text-center text-4xl pt-8 font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent'>Welcome to Admin Panel</h1>
    <div className='flex  gap-12 items-center justify-center pt-8'>
      <div className='bg-[#9694FF] w-[15%] h-[22vh] rounded text-white'>
        <h1 className='text-white text-center font-semibold text-lg pt-2'>Total User's</h1>
         <div className="w-full md:flex md:items-center md:flex-col md:pt-2 md:gap-2">
         <span> <FaUser className='md:text-4xl md:font-bold'/> </span>
         <p className="md:font-semibold md:text-2xl md:pt-2">{dashboardData?.Users}</p>
         </div>
      </div>
      <div className='bg-[#9694FF] w-[15%] h-[22vh] rounded text-white'>
     <h1 className='text-white text-center font-semibold text-lg pt-2'>Books</h1>
    <div className="w-full md:flex md:items-center md:flex-col md:pt-2 md:gap-2">
       <span> <IoBookSharp className='text-4xl font-bold' /> </span>
    <p className="md:font-semibold md:text-2xl md:pt-2">{dashboardData?.NumersOfBook}</p>
    </div>
</div>
<div className='bg-[#9694FF] w-[15%] h-[22vh] rounded text-white'>
   <h1 className='text-white text-center font-semibold text-lg pt-2'>Borrowed Books</h1>
     <div className="w-full md:flex md:items-center md:flex-col md:pt-2 md:gap-2 text-white" >
     <span> <SiBookstack className='text-4xl font-bold' />  </span>
     <p className="md:font-semibold md:text-2xl md:pt-2" >{dashboardData?.borrowed}</p>
     </div>
</div>

    </div>
    <div>
      <h1 className='ml-24 mt-8 font-semibold text-[#FFC145] text-2xl'>Total User's Available</h1>

      <div className='flex justify-center mt-6'>
          <table border='1' className='w-[50%] bg-slate-200 mt-6 '>
          <thead className='border-[2px] border-blue-200'>
           <div>
           <tr className='flex px-8 justify-between gap-12'>
              <th>Name</th>
              <th>Email</th>
              <th>BorrowedBook</th>
              <th></th>
            </tr>
           </div>
          </thead>
          <tbody  >
             {
           users?.map((user,idx)=>(
              user._id==skipId ? "":<div className=''>
              <tr className=' pr-6 flex justify-between pb-6'>
             
             <td className='pl-6 pt-6'>{user.name}</td>
               <td className='pt-6'>{user.email}</td>
               <td className='pt-6'>{user.borrowLimit}</td>
               <td className='mt-4 mb-2 px-2 rounded py-1 font-semibold text-white bg-red-500 text-center'><button onClick={()=> deleteHandler(user._id) } >Delete User</button></td>
             </tr>
            
              </div>
          ))
             } 
          </tbody>
        </table>
          </div>
    </div>
     </div>
  )
}

export default Dashboard

