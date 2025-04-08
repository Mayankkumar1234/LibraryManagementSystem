const express = require("express");
const borrowController = require("../Controllers/borrowInfo.controller");
const { authR, authT } = require("../middlewares/Auth");
const borrowRouter = express.Router();

borrowRouter.get("/getUserBooks/:userId", borrowController.userBorrowBooks);
borrowRouter.get(
  "/:userId/:bookId",
  authT,
  authR(["admin", "student"]),
  borrowController.borrowBook
);
borrowRouter.get("/returnBook/:userId/:bookId",   authT,
  authR(["admin", "student"]), borrowController.returnBook);
borrowRouter.get(
  "/allBorrowInfo",
  authT,
  authR(["admin"]),
  borrowController.allBorrowers
);
// borrowRouter.get(
//   "/:bookId",
//   authT,
//   authR(["admin", "student"]),
//   borrowController.findBorrowedBookById
// );
module.exports = borrowRouter;
 
