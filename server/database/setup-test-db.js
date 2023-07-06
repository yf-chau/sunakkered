const fs = require('fs');
const db = require('./connect');

async function setupTables() {

    try {
        
        const sql_users = fs.readFileSync("./server/database/users.sql").toString();
        const sql_admin = fs.readFileSync("./server/database/admin.sql").toString();
        const sql_participate = fs.readFileSync("./server/database/participate.sql").toString();
        const sql_volunteer = fs.readFileSync("./server/database/volunteer.sql").toString();
        const sql_events = fs.readFileSync("./server/database/events.sql").toString();
        const sql_complaints = fs.readFileSync("./server/database/complaints.sql").toString();

        /// **** User table MUST go first ****
        await db.query(sql_users)
        /// **** User table MUST go first ****

        await db.query(sql_admin)
        await db.query(sql_participate)
        await db.query(sql_volunteer)
        await db.query(sql_events)
        await db.query(sql_complaints)

        //console.log("All tables created.")
    } catch (error) {
        console.log(error);
    }
}

//run the async function

const destroyDbEnv = async () => {
    // await db.query("DROP TABLE IF EXISTS *;")
}

module.exports = { setupTables, destroyDbEnv };
