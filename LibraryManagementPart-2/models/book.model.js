const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  availableCopies: {
    type: Number,
    required: true,
  },
  borrowedCount: {
    type: Number,
    required: true,
    default: 0,
  },
});
let Book = mongoose.model("Book", bookSchema);

module.exports = Book;
