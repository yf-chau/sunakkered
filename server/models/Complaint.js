const db = require('../database/connect')

class Complaint {
    constructor({
        id, complainant_id, title, description, location, category,
        isfixed, image_url
    }) {
        this.id = id;
        this.complainant_id = complainant_id;
        this.title = title;
        this.description = description;
        this.location = location;
        this.category = category;
        this.isfixed = isfixed;
        this.image_url = image_url;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM complaints");
        if (response.rows.length === 0) {
            throw new Error("No complaint available.")
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
        const { complainant_id, title, description = NULL, location = NULL, category = NULL, isFixed = false, image_url = NULL } = data;
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
}

module.exports = Complaint;
