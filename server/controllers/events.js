const Event = require("../models/Event")
const Admin = require('../models/Admin');

class FullCalendarEvent {
    constructor({
        id, title, start, end, startTime, endTime }) {
        this.id = id
        this.title = title
        this.start = start
        this.startTime = startTime
        this.end = end
        this.endTime = endTime
    }
}

function mapEventsToFullCalendar(events) {
    return events.map(event => {
        const id = event.event_id;
        const title = event.event_name;
        const start = `${event.event_start_date}T${event.event_start_time}`;
        const end = `${event.event_end_date}T${event.event_end_time}`;
        return new FullCalendarEvent({ id, title, start, end});
    });
}

async function index(req, res) {
    try {
        const events = await Event.getAll();
        res.status(200).json(events)
    } catch (error) {
        res.status(500).json({ "error": error.message })
    }
}

async function fullcalendar(req, res) {
    try {
        const events = await Event.getAllApprove();
        const fullCalendarEvents = mapEventsToFullCalendar(events);
        res.status(200).json(fullCalendarEvents)
    } catch (error) {
        res.status(500).json({ "error": error.message })
    }
}

async function needsVolunteers(req, res) {
    try {
        const events = await Event.getAllNeedVolunteer();
        res.status(200).json(events)
    } catch (error) {
        res.status(500).json({ "error": error.message })
    }
}

async function show(req, res) {
    try {
        const id = parseInt(req.params.id);
        const event = await Event.getOneByEventId(id);
        res.status(200).json(event);
    } catch (error) {
        res.status(404).json({ "error": error.message })
    }
}

async function showByDate(req, res) {
    try {
        const { start_date, end_date } = req.body;
        const events = await Event.getEventsByDate(start_date, end_date);
        res.status(200).json(events)
    } catch (error) {
        res.status(404).json({ "error": error.message })
    }
}

async function search(req, res) {
    try {
        const keyword = req.body.keyword;
        const events = await Event.getEventsByKeyword(keyword)
        res.status(200).json(events)
    } catch (error) {
        res.status(404).json({ "error": error.message })
    }
}

async function create(req, res) {
    
    try {
        const data = req.body;
        const eventData = {
            status: 'pending'
        };
        
        const event = await Event.create(data)
        res.status(201).json(event)
    } catch (error) {
        res.status(404).json({ "error": error.message })
    }
}

async function update(req, res) {
    try {
        const data = req.body;
        const event = await Event.getOneByEventId(req.params.id)
        const result = await event.update(data)
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({ "error": error.message })
    }
}

async function destroy(req, res) {
    try {
        const event = await Event.getOneByEventId(req.params.id)
        const result = await event.destroy()
        res.status(204).json(result)
    } catch (error) {
        res.status(404).json({ "error": error.message })
    }
}

async function upcoming(req, res) {
    try {
        //show 3 upcoming events
        const numberOfEvents = 3
        const events = await Event.getUpcomingEvents(numberOfEvents)
        res.status(200).json(events);
    } catch (error) {
        res.status(404).json({ "error": error.message })
    }
}

async function approveEvent(req, res) {
    try {
        const eventId = req.params.id;
        const adminId = req.user.id; // Assuming you have the admin ID available in the request
      
          // Check if the user is an admin
        const admin = await Admin.getOneByAdminId(adminId);
          if (!admin) {
            throw new Error('Admin not found.');
          }
      
          // Update the post status to 'approved'
        const updatedEvent = await Event.updateStatus(eventId, 'approved');
      
          res.status(200).json(updatedEvent);
        } catch (err) {
          res.status(400).json({ error: err.message });
        }
      }

module.exports = { index, show, showByDate, search, create, update, destroy, upcoming, approveEvent , fullcalendar, needsVolunteers }
