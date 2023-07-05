
const { Router } = require('express')

const userController = require('../controllers/users.js')
const authenticator = require("../middleware/authenticator");
const userRouter = Router();

userRouter.get("/",  userController.index);

userRouter.get("/:id", userController.show);

userRouter.post("/", userController.create);

userRouter.patch("/:id", userController.update);

userRouter.delete("/:id", userController.destroy);

userRouter.post("/register", userController.register);

userRouter.post("/login", userController.login);


module.exports = userRouter

