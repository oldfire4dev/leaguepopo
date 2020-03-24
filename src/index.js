const express = require('express');

const app = express();
const port = process.env.PORT || 8000;

const { getChampionFreeWeek } = require('./api/champion_v3/index')

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/champion/freeweek', getChampionFreeWeek)

app.get('/', function(req, res) {

    const dd = req.body.summonerName

    res.send(dd)

})

app.listen(port, () => console.log(`Server running at 'http://localhost:${port}/'`));
