const { Router } = require('express')

const volunteerController = require('../controllers/volunteer')

const volunteerRouter = Router();

volunteerRouter.get("/", volunteerController.index);

volunteerRouter.get("/:id", volunteerController.show);

volunteerRouter.post("/create", volunteerController.create);

volunteerRouter.patch("/:id", volunteerController.update);

volunteerRouter.delete("/:id", volunteerController.destroy);

module.exports = volunteerRouter
