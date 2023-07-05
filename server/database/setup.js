require("dotenv").config();
const fs = require('fs');
const db = require('./connect');

const sql_admin = fs.readFileSync("./server/database/admin.sql").toString();

db.query(sql_admin)
    .then(data => console.log("Admin table Set up complete"))
    .catch(error => console.log(error))

db.query(sql_admin)
    .then(data => console.log("Admin table Set up complete"))
    .catch(error => console.log(error))


const sql_participate = fs.readFileSync("./server/database/participate.sql").toString();

db.query(sql_participate)
    .then(data => console.log("participate table Set up complete"))
    .catch(error => console.log(error))

const sql_volunteer = fs.readFileSync("./server/database/volunteer.sql").toString();

db.query(sql_volunteer)
    .then(data => console.log("volunteer table Set up complete"))
    .catch(error => console.log(error))

const sql_users = fs.readFileSync("./server/database/users.sql").toString();

db.query(sql_users)
    .then(data => console.log("Users table Set up complete"))
    .catch(error => console.log(error))

    
const sql_events = fs.readFileSync("./server/database/events.sql").toString();

db.query(sql_events)
    .then(data => console.log("events table Set up complete"))
    .catch(error => console.log(error))

const sql_complaints = fs.readFileSync("./server/database/complaints.sql").toString();

db.query(sql_complaints)
    .then(data => console.log("complaints table Set up complete"))
    .catch(error => console.log(error))
