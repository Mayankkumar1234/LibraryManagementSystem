const express = require("express");
const bookController = require("../Controllers/bookInfo.controller");
const Auth = require("../middlewares/Auth");
const { authR, authT } = Auth;

const bookRouter = express.Router();

bookRouter.post("/addbook", authT, authR(["admin"]), bookController.addBook);
bookRouter.get(
  "/getBooks",
  authT,
  authR(["admin", "student"]),
  bookController.getAllBooks
);
//  authT,
authR(["admin", "student"]),
  bookRouter.get(
    "/:bookId",
    authT,
    authR(["admin", "student"]),
    bookController.getBookById
  );
bookRouter.put("/:bookId", authT, authR(["admin"]), bookController.updateBook);
bookRouter.delete(
  "/deleteBook/:bookId",
  authT,
  authR(["admin"]),
  bookController.deleteBook
);

module.exports = bookRouter;
