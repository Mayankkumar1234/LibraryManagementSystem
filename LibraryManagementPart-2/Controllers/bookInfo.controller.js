const Book = require("../models/book.model");
const User = require("../models/user.model");
const mongoose = require("mongoose");
const borrowBooks = require("../models/borrowBook.model");

const bookController = {
  addBook: async (req, res) => {
    const { url ,title, author, availableCopies } = req.body;
     if(!url || !title || !author || !availableCopies){
      return res.status(400).send({
        msg:"All fields are required"
      })
     }
    try {
      const checkIsAval = await Book.findOne({ title: title }); 
      if (checkIsAval && checkIsAval.availableCopies > 0) {
        await Book.updateOne(
          { _id: checkIsAval._id },
          { $inc: { availableCopies: availableCopies } }
        );
        return res.status(200).send({ msg: "Books data has updated" });
      }
      const newBook = new Book({
        url,
        title,
        author,
        availableCopies,
      });
      await newBook.save();
      res.send({ msg: "Book added successfully" });
    } catch (error) {
      res.status(403).send({ err: error.message });
    }
  },
  getBookById: async (req, res) => {
    const { bookId } = req.params;
    try {
      const singleBook = await Book.findById({ _id: bookId });
      if (!singleBook) {
        return res.status(404).send({ msg: "Please enter a valid Id" });
      }
      res.status(200).json(singleBook);
    } catch (error) {
      res.status(400).send({ err: error.message });
    }
  },
  getAllBooks: async (req, res) => {
    try {
      const allBooks = await Book.find();
      if (!allBooks) {
        return res.status(200).send({ msg: "Empty" });
      }
      return res.status(200).json(allBooks);
    } catch (error) {
      res.status(400).send({ err: error.message });
    }
  },
  updateBook: async (req, res) => { 
    try {
      const bookId = req.params.bookId;
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).send({ msg: "Book not found" });
      }
      if (book.availableCopies <= 0) {
        return res.status(400).send({ msg: "No available copies" });
      }
     
      await Book.findByIdAndUpdate(bookId, { $set: req.body });
      res.send("Data updated successfully");
    } catch (error) {
      res.status(404).send({ Error: error.message });
    }
  },
  deleteBook: async (req, res) => {
    try {
    let { bookId } = req.params; 
    let book = await Book.findById({ _id: bookId });
    if (!book) {
      return res.status(404).send({ msg: "Book not found" });
    }
    let allBorrowBooks = await borrowBooks.find({ books: bookId });
     for(let ele of allBorrowBooks){
      let userId = ele.users;
      let borrowId = ele._id;
      await User.findByIdAndUpdate(
         userId,
         {
           $pull: { borrowedBooks: bookId }
         },
         { new: true }
       );
       await borrowBooks.findByIdAndDelete(borrowId)
     }

    

      await Book.findByIdAndDelete({ _id: bookId });
      res.status(200).send({ msg: "Book deleted successfully" });
    } catch (error) {
      res.send({ err: error.message });
    }
  },
};
module.exports = bookController;
