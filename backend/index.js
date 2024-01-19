const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { data } = require('./db');

const port = process.env.PORT;

const app = express();

app.use(cors());

app.get("/", async (req, res) => {
    try {
        let vol, competition;
        const keyword = req.query.keyword;
        const response = await data.find({});
        for (const item of response) {
            if (item.keyword == keyword) {
                vol = item.searchVolume;
                competition = item.competition;
                break;
            }
        }

        if (vol !== undefined && competition !== undefined) {
            res.send({ searchVolume: vol, competition });
        } else {
            res.json({ "message": "Keyword not found" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ "message": "Exception has occured" });
    }
})

app.use((err, req, res, next) => {
    res.status(500).json({ "message": "Internal error" });
})

app.listen(port);
