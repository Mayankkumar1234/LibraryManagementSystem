const dashboard = require("../Controllers/dashboard.controller");
const express = require("express");
const dashboardRouter = express.Router();
const AuthT = require('../middlewares/Auth')
const {authR, authT} = AuthT;
dashboardRouter.get("/allInfo", authT, authR(["admin"]), dashboard.getAllInfo);


module.exports = dashboardRouter;