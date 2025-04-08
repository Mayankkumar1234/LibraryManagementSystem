import React, { useEffect, useState } from 'react'
import axios from 'axios' 
import { toast } from 'react-toastify'

const MyBooks = () => {
 const [userPurchase, setUserPurchase]  = useState(null)
const getUserAllBooks=async ()=>{

  let user = JSON.parse(localStorage.getItem('user')) 
try {
    const userBooks = await axios.get(`http://localhost:9000/borrowBooks/getUserBooks/${user?._id}`)
    setUserPurchase(userBooks.data.borrowedBooks)
} catch (error) {
  toast.error(error.message);
}
}
 const returnBook = async (bookId)=>{

 try {
  let user= JSON.parse(localStorage.getItem('user'));
  const response = await axios.get(`http://localhost:9000/borrowBooks/returnBook/${user._id}/${bookId}`,{
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    toast.success("Book returned successfully") 
     getUserAllBooks();
 } catch (error) {
    
   toast.error("Unable to return the book")
 }
 }
  useEffect(()=>{
     getUserAllBooks();
  },[])
  return (
    <div className='z-10 absolute top-[10%] bg-slate-100 w-full' >
      <h1 className='font-semibold text-4xl pl-12 pt-8 text-orange-600'>My Books Section</h1>
      <div className='flex items-center w-full justify-center '>
        <table border='1' className='w-[50%] bg-slate-200 mt-6'>
          <thead className='border-[2px] border-blue-200'>
           <div>
           <tr className='flex px-8 justify-between gap-12'>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN Number</th>
              <th></th>
            </tr>
           </div>
          </thead>
          <tbody  >
            {
        
                userPurchase?.map((item,idx)=>(
                  <>
                  
                  <div className=''>
                <tr className=' pr-8 flex justify-between pb-6'>
               
               <td className='pl-6 pt-6'>{item.title}</td>
                 <td className='pt-6'>{item.author}</td>
                 <td className='pt-6'>ISBN 12345</td>
                 <td className='mt-4 mb-2 px-2 rounded py-1 font-semibold text-white bg-blue-500 text-center'><button onClick={()=> returnBook(item._id)} >Return Book</button></td>
               </tr>
              
                </div>
               </>
                ))
            }
          </tbody>
        </table>
       
      </div>
    </div>
  )
}

export default MyBooks


// /z-10 absolute top-[10%] bg-white w-full'>
      // <div className='flex px-24 justify-between pt-4