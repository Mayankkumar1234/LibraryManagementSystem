const userController = require("../Controllers/user-admin.controller");
const express = require("express");
const userAuth = require("../middlewares/Auth");
const { authT, authR } = userAuth;
let userRouter = express.Router();

userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.get("/logout", userController.logoutUser);
userRouter.get(
  "/getAllUsers",
  authT,
  authR(["admin"]),
  userController.getAllUsers
);
userRouter.get(
  "/:userId",
  authT,
  authR(["admin", "student"]),
  userController.getUserById
);
userRouter.delete(
  "/:userId",
  authT,
  authR(["admin"]),
  userController.deleteUserById
);
module.exports = userRouter;
