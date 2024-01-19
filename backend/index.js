const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { data } = require('./db');

const port = process.env.PORT;

const app = express();

app.use(
    cors({
      origin: "https://vercel-deploy-app-frontend.vercel.app",
      exposedHeaders: ["Authorization"],
      credentials: true,
      optionSuccessStatus:200
    })
  );

app.get("/", async (req, res) => {
    
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
        res.status(404).json({ "message": "Keyword not found" });
    }
})

app.get("/data", async (req, res) => {
    const response = await data.find({});
    res.send(response);
})

app.listen(port);
