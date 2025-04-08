import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const BorrowedBook = () => {

 const [borrowBooks, setBorrowBooks]  = useState(null)
   const borrowedBookDetails =async ()=>{
    try {
    const books = await axios.get('http://localhost:9000/borrowBooks/allBorrowInfo',{
      headers: {
        authorization:  `Bearer ${localStorage.getItem('token')}`,
      },
    })
      
    setBorrowBooks(books.data.allBorrowerAndBook); 
    } catch (error) {
        toast.error(error.message);
    }
   }

   useEffect(()=>{
    borrowedBookDetails()
   },[])

  return (
    <div>
      <h1 className='text-4xl text-blue-500 font-semibold text-center pt-6'>BorrowedBook</h1>
      <div className='flex justify-center mt-6'>
          <table border='1' className='w-[50%] bg-slate-200 mt-6 '>
          <thead className='border-[2px] border-blue-200'>
           <div>
           <tr className='flex px-8 justify-between gap-12'>
              <th>Name</th>
              <th>Email</th>
              <th>BookTitle</th>

              <th>Author </th>
            </tr>
           </div>
          </thead>
          <tbody  >
           
                <div className=''>
                {
               borrowBooks && borrowBooks?.map((item,idx)=>(
                    <tr className=' pr-6 flex justify-between pb-6'>
               
               <td className='pl-6 pt-6'>{item.users?.name}</td>
                 <td className='pt-6'>{item.users?.email }</td>
                 <td className='pt-6'>{item.books?.title}</td>
                 <td className='pt-6'>{item.books?.author}</td>
                  </tr>
                  ))
                }
                </div>
                 </tbody>
        </table>
          </div>
    </div>
  )
}

export default BorrowedBook

