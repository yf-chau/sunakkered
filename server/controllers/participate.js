const Participate = require('../models/Participate')

async function index(req, res) {
    try {
        const participants = await Participate.getAll();
        res.status(200).json(participants);
    } catch(error) {
        res.status(500).json({"error": error.message})
    }
}

async function show(req,res){
    try{
        const id = parseInt(req.params.id);
        const participant = await Participate.getOneByParticipantId(id);
        res.status(200).json(participant)
    } catch (error) {
        res.status(404).json({"error": error.message})
    } 
}

async function create (req, res) {
    try {
        const data = req.body;
        const newParticipant = await Participate.create(data);
        res.status(201).json(newParticipant);
    } catch(error) {
        res.status(400).json({"error": error.message});
    }
}

async function update (req, res) {
    try {
        const data = req.body;
        const Id = req.params.id
        const participant = await Participate.getOneByParticipantId(Id);
        const result = await participant.update(data);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({"error": error.message})
    }
}

async function destroy (req, res) {
    try {
        const Id = req.params.id
        const participant = await Participate.getOneByParticipantId(Id);
        const result = await participant.destroy()
        res.status(204).json(result)
    } catch (error) {
        res.status(404).json({"error": error.message})
    }
};


module.exports = {
  index, show, create, update, destroy
}