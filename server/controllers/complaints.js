const Complaint = require("../models/Complaint.js")

async function index(req, res) {
    try {
        const complaints = await Complaint.getAll();
        res.status(200).json(complaints)
    } catch (error) {
        res.status(500).json({ "error": error.message })
    }
}

async function show(req, res) {
    try {
        const id = parseInt(req.params.id);
        const complaint = await Complaint.getOneById(id);
        res.status(200).json(complaint);
    } catch (error) {
        res.status(404).json({ "error": error.message })
    }
}

async function create(req, res) {
    try {
        const data = req.body;
        const complaint = await Complaint.create(data)
        res.status(201).json(complaint)
    } catch (error) {
        res.status(404).json({ "error": error.message })
    }
}

async function update(req, res) {
    try {
        const data = req.body;
        const complaint = await Complaint.getOneById(req.params.id)
        const result = await complaint.update(data)
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({ "error": error.message })
    }
}

async function destroy(req, res) {
    try {
        const complaint = await Complaint.getOneById(req.params.id)
        const result = await complaint.destroy()
        res.status(204).json(result)
    } catch (error) {
        res.status(404).json({ "error": error.message })
    }
}

module.exports = { index, show, create, update, destroy }
