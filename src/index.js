const express = require('express');

const app = express();
const router = express.Router();
const port = process.env.PORT || 8000;

const { getChampionFreeWeek } = require('./api/champion_v3');
const { getSummonerInfo } = require('./api/summoner_v4');


app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/champion/freeweek', getChampionFreeWeek)
app.get('/dashboard/:server/:summonerName', getSummonerInfo);

app.listen(port, () => console.log(`Server running at 'http://localhost:${port}/'`));
