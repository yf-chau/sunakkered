const { Router } = require('express');

const eventController = require('../controllers/events.js');

const eventRouter = Router();

eventRouter.get("/", eventController.index);
eventRouter.get("/date", eventController.showByDate);
eventRouter.get("/search/:keyword", eventController.search);
eventRouter.get("/:id", eventController.show);
eventRouter.post("/", eventController.create)
eventRouter.patch("/:id", eventController.update)
eventRouter.delete("/:id", eventController.destroy)

module.exports = eventRouter;
