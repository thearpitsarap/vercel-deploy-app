const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { data } = require('./db');

const port = process.env.PORT;

const app = express();
app.use(cors());

app.get("/data", async (req, res) => {
    const keyword = req.query.keyword;

    if (!keyword) {
        return res.status(400).json({ message: "Missing 'keyword' parameter" });
    }

    const response = await data.find({ keyword });

    if (response.length > 0) {
        const { searchVolume, competition } = response[0];
        res.json({ searchVolume, competition });
    } else {
        res.status(404).json({ message: "Keyword not found" });
    }
});


app.get("/", async (req, res) => {
    const response = await data.find({});
    res.send(response);
})

app.listen(port);