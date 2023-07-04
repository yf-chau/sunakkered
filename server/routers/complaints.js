const { Router } = require('express');

const complaintsController = require('../controllers/complaints.js');

const complaintsRouter = Router();

//show all complaints
complaintsRouter.get("/", complaintsController.index);

//show an complaint by id
complaintsRouter.get("/:id", complaintsController.show);

//create a complaint
complaintsRouter.post("/", complaintsController.create)

//update a complaint by id
complaintsRouter.patch("/:id", complaintsController.update)

//delete a complaint by id
complaintsRouter.delete("/:id", complaintsController.destroy)

module.exports = complaintsRouter;
