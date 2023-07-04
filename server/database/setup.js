require("dotenv").config();
const fs = require('fs');
const db = require('./connect');



const sql_users = fs.readFileSync("./server/database/users.sql").toString();

db.query(sql_users)
    .then(data => console.log("Users table Set up complete"))
    .catch(error => console.log(error))

const sql_participate = fs.readFileSync("./server/database/participate.sql").toString();

db.query(sql_participate)
    .then(data => console.log("participate table Set up complete"))
    .catch(error => console.log(error))
    

const sql_events = fs.readFileSync("./server/database/events.sql").toString();

db.query(sql_events)
    .then(data => console.log("events table Set up complete"))
    .catch(error => console.log(error))
