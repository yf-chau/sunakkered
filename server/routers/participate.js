const { Router } = require('express')

const particpateController = require('../controllers/participate.js')
const authenticator = require("../middleware/authenticator");
const particpateRouter = Router();

particpateRouter.get("/",authenticator,  particpateController.index);

particpateRouter.get("/:id", particpateController.show);

particpateRouter.post("/", particpateController.create);

particpateRouter.patch("/:id", particpateController.update);

particpateRouter.delete("/:id", particpateController.destroy);

module.exports = particpateRouter
