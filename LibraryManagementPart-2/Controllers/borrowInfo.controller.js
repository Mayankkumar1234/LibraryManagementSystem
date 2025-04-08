const Book = require("../models/book.model");
const User = require("../models/user.model");
const BorrowBook = require("../models/borrowBook.model");
const borrowBookController = {
  borrowBook: async (req, res) => {
    try {
      const { bookId, userId } = req.params;
      const user = await User.findById(userId);
      const books = await Book.findById(bookId);
      let respond = await BorrowBook.find({ users: userId, books: bookId });
      if (respond.length !== 0) {
        return res.status(200).send({
          msg: "Book has already borrowed can't borrow more than one",
        });
      }
      if (user.borrowLimit >= 5) {
        return res
          .status(403)
          .send({ msg: "Borrow limit exceeds please return some books" });
      }
      if (books.availableCopies == 0) {
        return res.status(200).status({ msg: "All copies has borrowed" });
      } 
      if (!books) {
        return res.status(404).send({ msg: "Book not found" });
      }
      user.borrowLimit += 1;
      books.availableCopies -= 1;
      await books.save();
      await user.save();
      const borrowInfo = new BorrowBook({
        users: userId,
        books: bookId,
        borrowDate: new Date(),
      });
      await borrowInfo.save();
      await User.findByIdAndUpdate(userId, {
        $push: { borrowedBooks: books._id },
      });
      res.status(200).send({ msg: "Book borrowed successfully" });
    } catch (error) {
      res.status(400).send({ Error: error.message });
    }
  },
  returnBook: async (req, res) => {
    try {
      const { userId, bookId } = req.params;
      const borrowBook = await BorrowBook.findOneAndDelete({ users: userId });
      const updatedUser = await User.findByIdAndUpdate(userId, {
        $pull: { borrowedBooks: bookId },
        $inc: { borrowLimit: -1 },
      });
      const books = await Book.findById(bookId);
      books.availableCopies += 1;
      await books.save();
      res.status(200).send({ msg: "Book has removed successfully" });
    } catch (error) {
      res.send({ Error: error.message });
    }
  },
  allBorrowers: async (req, res) => {
    try {
      const allBorrowerAndBook = await BorrowBook.find()
        .populate("users", "name email")
        .populate("books", "title author"); 
      if (!allBorrowerAndBook) {
        return res.status(404).send({ msg: "No borrowed books found" });
      }
      return res.status(200).send({ allBorrowerAndBook }); 
    } catch (error) {
      res.status(400).send({ Error: error.message });
    }
  },
  findBorrowedBookById: async (req, res) => {
    try {
      const { bookId } = req.params;
      const singleBorrowedBook = await BorrowBook.findById(bookId);
      if (!singleBorrowedBook) {
        return res.send(404).send({ msg: "Book not found" });
      }
      let populateBook = singleBorrowedBook
        .populate("users", "name email")
        .populate("books", "title author");
      res.send(populateBook);
    } catch (error) {
      res.send({ error: error.message });
    }
  },
  userBorrowBooks: async (req, res) => {
    try {
      let { userId } = req.params;
      let borrowedBooks = await User.findOne({ _id: userId })
        .select("borrowedBooks")
        .populate("borrowedBooks");
      console.log(borrowedBooks);
      res.status(200).send(borrowedBooks);
    } catch (error) {
      return res.status(400).send({ Error: error.message });
    }
    //675c3032bcdb3aa634304213
  },
};
module.exports = borrowBookController;
