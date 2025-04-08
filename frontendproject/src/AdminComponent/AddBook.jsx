import React, { useRef } from 'react'
import booklogo from '../Images/bookLogo.jpg'
import axios from 'axios';
import { toast } from 'react-toastify';
const AddBook = () => {
  const image = useRef(null)
  const title = useRef(null);
  const author = useRef(null);
  const quantity = useRef(null);

  // To add the book
 const addBook =async (e)=>{
    e.preventDefault()
    try {
      const response = await axios.post('https://librarymanagementsystem-backend-71te.onrender.com/books/addbook',{
        url:image.current.value,
        title:title.current.value,
        author:author.current.value,
        availableCopies:quantity.current.value,
       },{
         headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
         }
       })
    console.log("Response ", response.data);
    toast.success("Book has added successfully");
    } catch (error) { 
       toast.error(error.message);
    }
 }

  return (
    <div className='w-full bg-slate-200 h-screen'>
      <div className='w-[100%] h-full pt-12  gap-6   items-center  flex flex-col '>
          <div className='flex items-center'>
            <img className='w-24' src={booklogo} alt="" />
          <h1 className='font-semibold text-3xl text-blue-600'>Add New Book</h1>
     
          </div>
          <form className='flex gap-3 flex-col w-[35%] px-8 mt-4 shadow-lg pt-8 pb-4' onSubmit={addBook}>
            <input ref={image} className='px-3 py-1 border-[2px] border-black outline-none rounded text-black' type="text" placeholder='Image URL' />
       <input ref={title} className='px-3 py-1 border-[2px] border-black outline-none rounded text-black' type="text" placeholder='Title' />
       <input ref={author} className='px-3 py-1 border-[2px] border-black outline-none rounded text-black' type="text" placeholder='Author' />
       <input ref={quantity} className='px-3 py-1 border-[2px] border-black outline-none rounded text-black' type="number" placeholder='Quantity' />
       <input className='px-3 py-1 border-[2px]  outline-none rounded-md text-white bg-blue-600  w-[40%] font-semibold' type="submit" value="Add Book" />
        </form>
      </div>
    </div>
  )
}

export default AddBook
