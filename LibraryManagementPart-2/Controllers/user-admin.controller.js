const User = require("../models/user.model");
const BlackList = require("../models/blackListedToken");
const BorrowBook = require("../models/borrowBook.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const userController = {
  registerUser: async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
      let checkIsAval = await User.findOne({ email: email });
      if (checkIsAval) {
        return res
          .status(201)
          .send({ msg: "user already exists , Please login" });
      }
      bcrypt.hash(password, 7, async (err, hash) => {
        if (err) {
          return res.status(200).send({ err: "Unable to hash password", err });
        } else {
          let newUser = new User({
            name,
            email,
            password: hash,
            role,
          });
          await newUser.save();
          res.status(201).send({ msg: "user registered successfully" });
        }
      });
    } catch (error) {
      res.status(400).send({ err: error });
    }
  },
  loginUser: async (req, res) => {
    const { email, password } = req.body;
    try {
      let checkUser = await User.findOne({ email: email }).select("+password");
      if (!checkUser) {
        return res
          .status(200)
          .send({ msg: "User not found, Please register first" });
      }
      bcrypt.compare(password, checkUser.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { id: checkUser._id, role: checkUser.role },
            process.env.SECRET_KEY,
            {
              expiresIn: "1h", 
            }
          );
          return res.status(200).send({
            msg: "Logged In Successfully",
            token: token,
            user: checkUser,
          });
        } else {
          return res.status(404).send({ err: err });
        }
      });
    } catch (err) {
      return res.status(400).send({ err: err });
    }
  },
  logoutUser: async (req, res) => {
    const token = req.headers.authorization; 
    let blackList = await BlackList.findOne({ token: token }); 
    if (blackList) {
      return res
        .status(401)
        .send({ msg: "User has already logged out, please login" });
    } else {
      res.status(200).send({ msg: "User has logged out successfully" });
      let blackListedToken = new BlackList({
        token: token,
      });
      await blackListedToken.save();
    }
  },
  getAllUsers: async (req, res) => {
    const allUsers = await User.find({});
    res.send(allUsers);
  },
  getUserById: async (req, res) => {
    const { userId } = req.params;
    let singleUser = await User.findById({ _id: userId });
    if (!singleUser) {
      return res.status(404).send({ msg: "user not found" });
    }
    return res.status(200).send({ user: singleUser });
  },
  deleteUserById: async (req, res) => {
    try {
      const { userId } = req.params;
      let findUser = await User.findById({ _id: userId });
      let findBorrowUser = await BorrowBook.findOne({ users: userId });
      if (!findUser) {
        return res.status(404).send({ msg: "user not found" });
      }
      if (findBorrowUser) {
        await BorrowBook.deleteMany({ users: userId });
      }

      await User.findByIdAndDelete({ _id: userId });
      res.status(200).send({ msg: "User deleted successfully" });
    } catch (error) {
      res.status(403).json({
        status: false,
        message: error.message,
      });
    }
  },
};
module.exports = userController;
