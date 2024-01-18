const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { data } = require('./db');

const port = process.env.PORT;

const app = express();
app.use(cors());

app.get("/data", async (req, res) => {
    res.send("At data endpoint")
})

app.get("/", async (req, res) => {
    const response = await data.find({});
    res.send(response);
})

app.listen(port);