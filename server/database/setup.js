require("dotenv").config();
const fs = require('fs');
const db = require('./connect');

async function setupTables() {

    try {
        /// **** User table MUST go first ****
        const sql_users = fs.readFileSync("./server/database/users.sql").toString();
        /// **** User table MUST go first ****

        const sql_admin = fs.readFileSync("./server/database/admin.sql").toString();
        const sql_participate = fs.readFileSync("./server/database/participate.sql").toString();
        const sql_volunteer = fs.readFileSync("./server/database/volunteer.sql").toString();
        const sql_events = fs.readFileSync("./server/database/events.sql").toString();
        const sql_complaints = fs.readFileSync("./server/database/complaints.sql").toString();

        await db.query(sql_users)
        await db.query(sql_admin)
        await db.query(sql_participate)
        await db.query(sql_volunteer)
        await db.query(sql_events)
        await db.query(sql_complaints)

        console.log("All tables created.")
    } catch (error) {
        console.log(error);
    }
}

//run the async function
setupTables()
