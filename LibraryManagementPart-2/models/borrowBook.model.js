const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema({
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  books: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  borrowDate: {
    type: String,
    required: true,
    default:Date.now()
  },
  returnDate: {
    type: String,
  },
});

const BorrowBook = mongoose.model("BorrowBook", borrowSchema);

module.exports = BorrowBook;
