const Complaint = require("../models/Complaint.js")

async function isFalse(req, res) {
    try {
        const complaints = await Complaint.getAllIsFalse();
        res.status(200).json(complaints)
    } catch (error) {
        res.status(500).json({ "error": error.message })
    }
}

async function isTrue(req, res) {
    try {
        const complaints = await Complaint.getAllIsTrue();
        res.status(200).json(complaints)
    } catch (error) {
        res.status(500).json({ "error": error.message })
    }
}

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

async function showVotes(req, res) {
    try {
        const id = parseInt(req.params.id);
        const complaint_votes = await Complaint.getVotes(id)
        res.status(200).json(complaint_votes)
    } catch (error) {
        res.status(404).json({ "error": error.message })
    }
}

async function showVotedComplaints(req, res) {
    try {
        const user_id = parseInt(req.params.user_id);
        const voted_complaints = await Complaint.getUserComplaint(user_id)
        res.status(200).json(voted_complaints)
    } catch (error) {
        res.status(404).json({ "error": error.message })
    }
}

async function voteComplaint(req, res) {
    try {
        const user_id = parseInt(req.params.user_id);
        const complaint_id = req.body.complaint_id
        const response = await Complaint.voteComplaint(user_id, complaint_id)
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ "error": error.message })
    }
}

async function unvoteComplaint(req, res) {
    try {
        const user_id = parseInt(req.params.user_id);
        const complaint_id = req.body.complaint_id
        const response = await Complaint.unvoteComplaint(user_id, complaint_id)
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ "error": error.message })
    }
}


module.exports = { index, show, create, update, destroy, isFalse, isTrue, showVotes, showVotedComplaints, voteComplaint, unvoteComplaint }
