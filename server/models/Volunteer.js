const db = require('../database/connect')

class Volunteer {

    constructor ({ volunteer_id, candrive, description, DBS, interests, skills, users_id }) {
        this.id = volunteer_id;
        this.candrive = candrive;
        this.description = description;
        this.DBS = DBS;
        this.interests = interests;
        this.skills = skills;
        this.users_id = users_id;
    }


    static async getAll() {
        const response = await db.query("SELECT * FROM volunteer ORDER BY volunteer_id")
        if (response.rows.length === 0) {
            throw new Error("volunteer not found")
        }
        return response.rows.map(v => new Volunteer(v));
    }

    static async getOneByVolunteerId(id) {
        const response = await db.query("SELECT * FROM volunteer WHERE volunteer_id = $1;", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate volunteer.")
        }
        return new Volunteer(response.rows[0]);
    }

    static async create(data) {
        const { candrive, description, DBS, interests, skills, users_id } = data;
        const response = await db.query('INSERT INTO volunteer (candrive, description, DBS, interests, skills, users_id) VALUES ($1, $2, $3, $4, $5, $6 ) RETURNING *;', [candrive, description, DBS, interests, skills, users_id])
        const volunteerID = response.rows[0].volunteer_id;
        const newVolunteer = await Volunteer.getOneByVolunteerId(volunteerID)
        return newVolunteer
    }

    async update(data) {
        const { candrive, description, DBS, interests, skills, users_id } = data;
        const response = await db.query("UPDATE volunteer SET candrive = $1, description = $2, DBS = $3, interests = $4, skills = $5, users_id = $6  WHERE volunteer_id = $7 RETURNING *;", [ candrive, description, DBS, interests, skills, users_id, this.id]);
        const volunteerId = response.rows[0].volunteer_id
        const newVolunteer = await Volunteer.getOneByVolunteerId(volunteerId)
        return newVolunteer
    }

    async destroy() {
        const response = await db.query('DELETE FROM volunteer WHERE volunteer_id = $1 RETURNING *;', [this.id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to delete volunteer.")
        }
        return new Volunteer(response.rows[0]);
    }

}

module.exports = Volunteer;