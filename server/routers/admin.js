const { Router } = require('express');

const adminController = require('../controllers/admin.js');
const authenticator = require("../middleware/authenticator");
const adminRouter = Router();


adminRouter.get("/", authenticator, adminController.index)

adminRouter.get("/:id", adminController.show);

adminRouter.post("/", adminController.create);

adminRouter.patch("/:id", adminController.update);

adminRouter.delete("/:id", adminController.destroy);

adminRouter.post("/register", adminController.register);

adminRouter.post("/login", adminController.login)

module.exports = adminRouter
