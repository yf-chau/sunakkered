const db = require('../database/connect')

class Complaint {
    constructor({
        id, complainant_id, title, description, location, category, isfixed, image_url, votes
    }) {
        this.id = id;
        this.complainant_id = complainant_id;
        this.title = title;
        this.description = description;
        this.location = location;
        this.category = category;
        this.isfixed = isfixed;
        this.image_url = image_url;
        this.votes = votes;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM complaints");
        if (response.rows.length === 0) {
            throw new Error("No complaint available.")
        }
        return response.rows.map(e => new Complaint(e))
    }

    static async getAllIsFalse() {
        const response = await db.query("SELECT complaints.*, COUNT(complaint_votes.user_id) AS votes FROM complaints JOIN complaint_votes ON complaints.id = complaint_votes.complaint_id WHERE isfixed = false GROUP BY complaints.id ORDER BY COUNT(complaint_votes.user_id) DESC;");
        if (response.rows.length === 0) {
            throw new Error("No unfixed complaint available.")
        }
        return response.rows.map(e => new Complaint(e))
    }

    static async getAllIsTrue() {
        const response = await db.query("SELECT complaints.*, COUNT(complaint_votes.user_id) AS votes FROM complaints JOIN complaint_votes ON complaints.id = complaint_votes.complaint_id WHERE isfixed = true GROUP BY complaints.id ORDER BY COUNT(complaint_votes.user_id) DESC;");
        if (response.rows.length === 0) {
            throw new Error("No fixed complaint available.")
        }
        return response.rows.map(e => new Complaint(e))
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM complaints WHERE id = $1;", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to find complaint.")
        }
        return new Complaint(response.rows[0]);
    }

    static async create(data) {
        const { complainant_id = null, title, description = null, location = null, category = null, isFixed = false, image_url = null } = data;
        const response = await db.query("INSERT INTO complaints (complainant_id, title, description, location, category,isFixed, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *; ", [complainant_id, title, description, location, category, isFixed, image_url])
        const complaint_id = response.rows[0].id;
        const newComplaint = await Complaint.getOneById(complaint_id)
        return newComplaint;
    }

    async update(data) {
        const { isfixed } = data;
        const response = await db.query(
            "UPDATE complaints SET isfixed = $1 WHERE id = $2 RETURNING *;", [isfixed, this.id]
        );
        const complaint_id = response.rows[0].id;
        const newComplaint = await Complaint.getOneById(complaint_id)
        return newComplaint;
    }

    async destroy() {
        const response = await db.query('DELETE FROM complaints WHERE id = $1 RETURNING *;', [this.id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to delete complaint.")
        }
        return new Complaint(response.rows[0]);
    }

    static async getVotes(id) {
        const response = await db.query('SELECT COUNT(user_id) AS votes FROM complaint_votes WHERE complaint_id = $1;', [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to retrieve votes.")
        }
        return response.rows[0];
    }
}

module.exports = Complaint;
