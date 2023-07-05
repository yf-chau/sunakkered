const { Router } = require('express');

const complaintsController = require('../controllers/complaints.js');

const complaintsRouter = Router();

//show all complaints
complaintsRouter.get("/", complaintsController.index);

//show all complaints which isfixed = false, and their votes
complaintsRouter.get("/isfalse", complaintsController.isFalse);

//show all complaints which isfixed = true, and their votes
complaintsRouter.get("/istrue", complaintsController.isTrue);

//show an complaint by id
complaintsRouter.get("/:id", complaintsController.show);

//create a complaint
complaintsRouter.post("/create", complaintsController.create)

//update a complaint by id
complaintsRouter.patch("/:id", complaintsController.update)

//delete a complaint by id
complaintsRouter.delete("/:id", complaintsController.destroy)

//show the number of `upvotes` of a complaint
complaintsRouter.get("/showvotes/:id", complaintsController.showVotes)

//show a list of complaint_id which the user upvoted
//complaintsRouter.get("/showvotedcomplaints", complaintsController.showVotedComplaints)

//Upvote a complaint

module.exports = complaintsRouter;
