const db = require('../database/connect')

class Participate {

    constructor ({ participate_id, first_name, last_name, phone_number }) {
        this.id = participate_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone_number = phone_number;
    }


    static async getAll() {
        const response = await db.query("SELECT * FROM participate ORDER BY participate_id")
        if (response.rows.length === 0) {
            throw new Error("participant not found")
        }
        return response.rows.map(p => new Participate(p));
    }

    static async getOneByParticipantId(id) {
        const response = await db.query("SELECT * FROM participate WHERE participate_id = $1;", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate participant.")
        }
        return new Participate(response.rows[0]);
    }

    static async create(data) {
        const { first_name, last_name, phone_number } = data;
        const response = await db.query('INSERT INTO participate (first_name, last_name, phone_number) VALUES ($1, $2, $3 ) RETURNING *;', [first_name, last_name, phone_number])
        const participateID = response.rows[0].participate_id;
        const newParticipant = await Participate.getOneByParticipantId(participateID)
        return newParticipant
    }

    async update(data) {
        const { first_name, last_name, phone_number } = data;
        const response = await db.query("UPDATE participate SET first_name = $1, last_name = $2, phone_number = $3  WHERE participate_id = $4 RETURNING *;", [ first_name, last_name, phone_number, this.id]);
        const participateId = response.rows[0].participate_id
        const newParticipant = await Participate.getOneByParticipantId(participateId)
        return newParticipant
    }

    async destroy() {
        const response = await db.query('DELETE FROM participate WHERE participate_id = $1 RETURNING *;', [this.id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to delete participant.")
        }
        return new Participate(response.rows[0]);
    }

}

module.exports = Participate;