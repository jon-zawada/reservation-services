/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const Controller = require('./Controller.js');

const app = express();
const port = 3000;

app.use(cors());
app.use('/', express.static(path.join(__dirname, '/../client/dist')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// reservations
app.get('/reservation/api/reservations', (req, res) => {
  Controller.getFirstReservations(req, res);
});

app.post('/reservation/api/reservations', Controller.postReservation);

// locations
app.get('/reservation/api/location/', (req, res) => {
  Controller.getLocation(req, res);
});

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(path.join(__dirname, '/../client/dist/index.html')));
});

app.listen(port, () => console.log(`Calendar app listening on port ${port}!`));
