const { Router } = require('express');

const eventController = require('../controllers/events.js');
const authenticator = require("../middleware/authenticator");
const eventRouter = Router();

//show all events
eventRouter.get("/", eventController.index);

//show all events for fullCalendar plugin
eventRouter.get("/fullcalendar", eventController.fullcalendar);

//show upcoming three events
eventRouter.get("/upcoming", eventController.upcoming);

//show events by date range
eventRouter.get("/date", eventController.showByDate);

//search for event by keyword
eventRouter.get("/search", eventController.search);

//show an event by id
eventRouter.get("/:id", eventController.show);

//create an event
eventRouter.post("/create", eventController.create)

//update an event by id
eventRouter.patch("/:id", eventController.update)

//delete an event by id
eventRouter.delete("/:id", eventController.destroy)

eventRouter.get("/:id/approve", eventController.approveEvent)

module.exports = eventRouter;
