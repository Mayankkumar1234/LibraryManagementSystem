import React, { useEffect, useState } from 'react'
import axios from 'axios'
import bookImg from  '../Images/book.jpg'  
import { toast } from 'react-toastify';

const AllBooks = () => {

 const [Data, setData] = useState(null)
  const [role,setRole] =useState()
 const [bookData, setBookData] = useState(null)
 const [edit , setEdit] = useState(false)
   const [ title, setTitle]  = useState(null);
   const [ author, setAuthor] = useState(null)
   const [ acopies, setACopies ] = useState(null)

  const getAllBooks=async ()=>{
     try {
      const allBook = await axios.get('https://librarymanagementsystem-backend-71te.onrender.com/books/getBooks',{
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      setData(allBook.data)
     let user = JSON.parse(localStorage.getItem('user'));
     setRole(user.role)
     } catch (error) {
      toast.error(error.message);
     }
  }
   const borrowABook=async (bookId)=>{
    let user= JSON.parse(localStorage.getItem('user'))

      try {
       const response= await axios.get(`https://librarymanagementsystem-backend-71te.onrender.com/borrowBooks/${user._id}/${bookId}`,{
         headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
         },
       }) 
        toast.success(response.data.msg)
        getAllBooks()
     } catch (error) { 
        toast.error("Error while borrowing book")
     }
   }
   const editHandler =async (e)=>{
   e.preventDefault();
   let bookId = bookData._id;
       try{
        const response = await axios.put(`https://librarymanagementsystem-backend-71te.onrender.com/books/${bookId}`,{
          title:title,
          author:author,
          availableCopies:acopies
         },{
          headers: {
               authorization: `Bearer ${localStorage.getItem('token')}`
              }
         })
         toast.success(response.data)
         getAllBooks()
         setEdit(!edit)
        }catch(error){
       toast.error(error.message)
       }
    
   }
   const filterHandler=(value)=>{
  
    if(value=='lth'){
      console.log(value)
      setData([...Data]?.sort((a, b)=>a.title.localeCompare(b.title)));
      }else{
      console.log(value)
      setData([...Data]?.sort((a, b)=>b.title.localeCompare(a.title)));
      }
   }
  const removeBook =async (bookId)=>{ 
   try{
  const response = await axios.delete(`http://localhost:4000/books/deleteBook/${bookId}`,{
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
     },
   })
   toast.success("Delete book response")
   getAllBooks()
   }catch(error){
       toast.error(error.message)
   }
  }
   
   useEffect(()=>{
      getAllBooks()
  }, [])
  // console.log(Data && Data)
  return (
    <div className='z-10  absolute top-[10%] bg-white w-full pb-4 '>
      <div className='flex px-24 justify-between pt-4  relative z-0'>
        <h2 className='mt-4 font-bold text-2xl text-orange-900 pb-4'>Available Books</h2>
         <select className='border-[2px] outline-none border-black rounded-md font-semibold' onChange={(e)=> filterHandler(e.target.value)}>
          <option className='font-semibold px-2 py-1'  >Fliter By Alphabet</option>
          <option className='font-semibold px-2 py-1' value="lth"  >Increasing</option>
          <option className='font-semibold px-2 py-1'  value="htl" >Decreasing</option>
         </select>
      </div>
      <div className='flex md:grid md:grid-cols-4 md:grid-rows-3 gap-3 ml-4 px-4 pt-4'>
        {
         Data &&  Data?.map((book, idx)=>(
            <div key ={idx}
             className='w-[85%] bg-blue-400 flex gap-1  items-center flex-col relative py-3 rounded-lg px-4 '>
            <img className='w-[100vw] h-32 text-center' src={book.url} alt="" />
              <h3 className='font-semibold text-white'>Title : {book.title}</h3>
              <p className='font-semibold text-white'>Author : {book.author}</p>
              <p className='font-semibold text-white'>ISBN No : VEFER231D </p>
              <p className='font-semibold text-white'>Available : {book.availableCopies}</p>
              {
                role=='admin' ?<div className='flex gap-6 items-center justify-center'>
                    <button className='bg-blue-600 px-2 py-1 w-[60%] rounded-lg text-white font-semibold flex gap-2' onClick={()=> {
                     
                      setEdit(!edit)
                      setBookData(book)}}>Edit <p>book</p></button>
                    <button className='bg-blue-600 px-2 py-1 w-[60%] rounded-lg text-white font-semibold flex gap-2' onClick={()=> removeBook(book._id)}>Remove <p>Book</p> </button>
       
                </div> : <button onClick={()=>borrowABook(book._id)} className='bg-blue-600 px-2 py-1 w-[60%] rounded-lg text-white font-semibold'>Add Book</button>
        
              }
               </div>
          ))
        }
      </div>
      {
        edit && <div className={`w-[30%] h-[45vh] left-[25%] fixed bg-blue-200/60 z-30 top-[25%] shadow-md rounded-md`}>
        <div className='flex items-center justify-between px-12' > 
        <h1 className='text-center font-semibold text-xl pt-3 text-zinc-700 '>Edit Book Details</h1>
        <p onClick={()=> setEdit(!edit)} className='bg-black text-white px-2 cursor-pointer py-1 rounded-[50%] mt-1'  >X</p>
        </div>
        <form   className='flex flex-col gap-3 w-[75%] mx-auto pt-6' onSubmit={(e)=>editHandler(e)}>
          <input  className='border-[2px] px-2 py-1 border-black px-2 py-1 rounded-md' onChange={(e)=> setTitle(e.target.value)}  type="text" placeholder='Book Title' />
          <input  className='border-[2px]  border-black px-2 py-1 rounded-md' onChange={(e)=> setAuthor(e.target.value)}  type="text" placeholder='Author' />
          <input    className='border-[2px] px-2 py-1 border-black px-2 py-1 rounded-md' type="number"  onChange={(e)=> setACopies(e.target.value)}    placeholder='Available copies' />
     
          <input className='bg-blue-400 w-[40%] px-2 py-1 rounded-md font-semibold text-md text-white' type="submit" value='Save' />
        </form>
     </div>
      }
    </div>
   
  )
}

export default AllBooks
