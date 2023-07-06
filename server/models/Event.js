const db = require('../database/connect')

class Event {
    constructor({
        event_id, event_name, event_start_date, event_start_time, event_end_time,
        event_description, location, category, organiser_id, participant_id, approval, needvolunteer, volunteer_num
    }) {
        this.event_id = event_id
        this.event_name = event_name

        this.event_start_date = event_start_date.toISOString().split('T')[0];

        this.event_start_time = event_start_time
        this.event_end_time = event_end_time
        this.event_description = event_description
        this.location = location
        this.category = category
        this.organiser_id = organiser_id
        this.participant_id = participant_id
        this.approval = approval
        this.needvolunteer = needvolunteer
        this.volunteer_num = volunteer_num
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM events");
        if (response.rows.length === 0) {
            throw new Error("No event available.")
        }
        return response.rows.map(e => new Event(e))
    }

    static async getAllApprove() {
        const response = await db.query("SELECT * FROM events WHERE approval = true;");
        if (response.rows.length === 0) {
            throw new Error("No event available.")
        }
        return response.rows.map(e => new Event(e))
    }

    static async getAllNeedVolunteer() {
        const response = await db.query("SELECT * FROM events WHERE needvolunteer = true;");
        if (response.rows.length === 0) {
            throw new Error("No event available.")
        }
        return response.rows.map(e => new Event(e))
    }

    static async getOneByEventId(id) {
        const response = await db.query("SELECT * FROM events WHERE event_id = $1;", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to find event.")
        }
        return new Event(response.rows[0]);
    }

    // static async getEventsByKeyword(keyword) {
    //     const response = await db.query("SELECT * FROM events WHERE event_name ILIKE $1 OR event_description ILIKE $1;", [`%${keyword}%`]);
    //     if (response.rows.length < 1) {
    //         throw new Error("No event found.")
    //     }
    //     return response.rows.map(e => new Event(e))
    // }

    // static async getEventsByDate(startDate, endDate) {
    //     const response = await db.query("SELECT * FROM events WHERE event_start_date BETWEEN $1 AND $2", [startDate, endDate]);
    //     if (response.rows.length < 1) {
    //         throw new Error("No event found.")
    //     }
    //     return response.rows.map(e => new Event(e))
    // }

    static async getUpcomingEvents(numberOfEvents) {
        const response = await db.query("SELECT * FROM events ORDER BY event_start_date LIMIT $1", [numberOfEvents])
        if (response.rows.length === 0) {
            throw new Error("No event available.")
        }
        return response.rows.map(e => new Event(e))
    }

    static async create(data) {
        const { event_name, event_start_date, event_start_time, event_end_date, event_end_time, event_description, location = null, category = null, organiser_id = null, participant_id = null } = data;
        const response = await db.query("INSERT INTO events (event_name, event_start_date, event_start_time, event_end_date, event_end_time, event_description, location, category, organiser_id, participant_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;", [event_name, event_start_date, event_start_time, event_end_date, event_end_time, event_description, location, category, organiser_id, participant_id])
        const eventID = response.rows[0].event_id;
        const newEvent = await Event.getOneByEventId(eventID)
        return newEvent;
    }

    async update(data) {

        const { event_name = this.event_name, event_start_date = this.event_start_date, event_start_time = this.event_start_time, event_end_date = this.event_end_date, event_end_time = this.event_end_time, event_description = this.event_description, location = this.location, category = this.category, organiser_id = this.organiser_id, participant_id = this.participant_id } = data;

        const response = await db.query(
            "UPDATE events SET event_name = $1, event_start_date = $2, event_start_time = $3, event_end_date = $4, event_end_time = $5, event_description = $6, location = $7, category = $8, organiser_id = $9, participant_id = $10 WHERE event_id = $11 RETURNING *;",
            [event_name, event_start_date, event_start_time, event_end_date, event_end_time, event_description, location, category, organiser_id, participant_id, this.event_id]
        );
        const eventID = response.rows[0].event_id;
        const newEvent = await Event.getOneByEventId(eventID)
        return newEvent;
    }

    async destroy() {
        const response = await db.query('DELETE FROM events WHERE event_id = $1 RETURNING *;', [this.event_id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to delete event.")
        }
        return new Event(response.rows[0]);
    }

}


module.exports = Event;
