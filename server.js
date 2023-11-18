// DEPENDENCIES
const express = require('express');
const { Sequelize } = require('sequelize');
const app = express();



// CONFIGURATION / MIDDLEWARE
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROOT
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Tour API',
  });
});

const bandsController = require('./controllers/bands_controller');
app.use('/bands', bandsController);

const eventConstroller = require('./controllers/event_controllers');
app.use('/events', eventConstroller)

const stageConstroller = require('./controllers/stage_controller');
app.use('/stages', stageConstroller)

// LISTEN
app.listen(process.env.PORT, () => {
  console.log(`🎸 Rockin' on port: ${process.env.PORT}`);
});
