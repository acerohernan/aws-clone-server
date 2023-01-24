const express = require("express");
const UserController = require("../controllers/user");
const checkAuth = require("../middlewares/checkAuth");
const userRouter = express.Router();

userRouter.post("/register", UserController.register);

userRouter.post("/login", UserController.login);

userRouter.get("/home/widget", checkAuth, UserController.getHomeWidgets);

userRouter.put("/home/widget", checkAuth, UserController.putHomeWidgets);

module.exports = userRouter;
