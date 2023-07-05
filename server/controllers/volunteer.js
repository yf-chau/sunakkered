const Volunteer = require('../models/Volunteer')

async function index(req, res) {
    try {
        const volunteer = await Volunteer.getAll();
        res.status(200).json(volunteer);
    } catch(error) {
        res.status(500).json({"error": error.message})
    }
}

async function show(req,res){
    try{
        const id = parseInt(req.params.id);
        const volunteer = await Volunteer.getOneByVolunteerId(id);
        res.status(200).json(volunteer)
    } catch (error) {
        res.status(404).json({"error": error.message})
    } 
}

async function create (req, res) {
    try {
        const data = req.body;
        const newVolunteer = await Volunteer.create(data);
        res.status(201).json(newVolunteer);
    } catch(error) {
        res.status(400).json({"error": error.message});
    }
}

async function update (req, res) {
    try {
        const data = req.body;
        const Id = req.params.id
        const volunteer = await Volunteer.getOneByVolunteerId(Id);
        const result = await volunteer.update(data);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({"error": error.message})
    }
}

async function destroy (req, res) {
    try {
        const Id = req.params.id
        const volunteer = await Volunteer.getOneByVolunteerId(Id);
        const result = await volunteer.destroy()
        res.status(204).json(result)
    } catch (error) {
        res.status(404).json({"error": error.message})
    }
};


module.exports = {
  index, show, create, update, destroy
}