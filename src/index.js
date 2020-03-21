const express = require('express');

const app = express();
const port = process.env.PORT || 8000;

const { getChampionFreeWeek, listChampions } = require('./api/champion_v3/index')

app.get('/champion/freeweek', getChampionFreeWeek)
app.get('/champion/championsData', listChampions)


app.listen(port, () => console.log(`Server running at 'http://localhost:${port}/'`));