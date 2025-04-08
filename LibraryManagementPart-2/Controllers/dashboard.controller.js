const User = require('../models/user.model');
const Book = require('../models/book.model');
const BorrowBook = require('../models/borrowBook.model');
const allInfo = {
  getAllInfo:async (req,res)=>{
      try {
        const books = await Book.find({});
        const users = await User.find({});
        const borrowedBooks = await BorrowBook.find({});
        const bookLength = books.length;
        let userLength = users.length
        const borrowedBooksLength = borrowedBooks.length;
        res.status(200).json({"NumersOfBook":bookLength,"Users":userLength, "borrowed":borrowedBooksLength});
      } catch (error) {
        res.status(404).send({error:error.message});
      }
  }
}
module.exports = allInfo;