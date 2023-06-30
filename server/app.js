const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

app.get("/", (req, res) => {
    res.status(200).json({
        name: "Florin County Council Online portal",
        description: "Get involved in your community!"
    })
})

module.exports = app;
