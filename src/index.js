const express = require('express');

const app = express();
const port = process.env.PORT || 8000;

app.get('/champion/freeweek', (req, res) => {
  res.send({ zed: 'Hello, Zed here. Im on free week. Have a nice day!' });
});

app.listen(port, () => console.log(`Server running at 'http://localhost:${port}/'`));