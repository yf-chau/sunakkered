const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const app = express();

const userRouter = require('./routers/users');
const participateRouter = require('./routers/participate');
const eventRouter = require('./routers/events');
const complaintRouter = require('./routers/complaints');

app.use(cors());
app.use(express.json());
app.use(logger('dev'));


app.get("/", (req, res) => {
    res.status(200).json({
        name: "Florin County Council Online portal",
        description: "Get involved in your community!"
    })
})


app.use("/users", userRouter)
app.use("/participate", participateRouter)
app.use("/events", eventRouter);
app.use("/complaints", complaintRouter);


module.exports = app;
