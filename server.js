'use strict';

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');


const { PORT, MONGODB_URI,CLIENT_ORIGIN } = require('./config');

const stdOvrPlayersRouter = require('./routes/stdOvrPlayers');
const pprOvrPlayersRouter = require('./routes/pprOvrPlayers');

const stdQbPlayersRouter = require('./routes/stdQbPlayers');

const stdRbPlayersRouter = require('./routes/stdRbPlayers');
const pprRbPlayersRouter = require('./routes/pprRbPlayers');

const stdWrPlayersRouter = require('./routes/stdWrPlayers');
const pprWrPlayersRouter = require('./routes/pprWrPlayers');

const stdTePlayersRouter = require('./routes/stdTePlayers');
const pprTePlayersRouter = require('./routes/pprTePlayers');

const stdKPlayersRouter = require('./routes/stdKPlayers');

const stdDstPlayersRouter = require('./routes/stdDstPlayers');


// Create an Express application
const app = express();

// Log all requests. Skip logging during
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'common', {
  skip: () => process.env.NODE_ENV === 'test'
}));
  
app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);
  
// Create a static webserver
app.use(express.static('public'));
  
// Parse request body
app.use(express.json());
  

// Mount routers
app.use('/api/about', function (req, res, next) {

  res.send('About Me');
});


app.use('/api/:category/:position', function (req, res, next) {

  if (req.params.category === 'std'){
    if (req.params.position === 'overall'){
      stdOvrPlayersRouter(req, res, next);
    }
    else if (req.params.position === 'rb'){
      stdRbPlayersRouter(req, res, next);
    }
    else if (req.params.position === 'wr'){
      stdWrPlayersRouter(req, res, next);
    }
    else if (req.params.position === 'te'){
      stdTePlayersRouter(req, res, next);
    }

  } 
  else if (req.params.category === 'ppr'){
    if (req.params.position === 'overall'){
      pprOvrPlayersRouter(req, res, next);
    }
    else if (req.params.position === 'rb'){
      pprRbPlayersRouter(req, res, next);
    }
    else if (req.params.position === 'wr'){
      pprWrPlayersRouter(req, res, next);
    }
    else if (req.params.position === 'te'){
      pprTePlayersRouter(req, res, next);
    }

  } 

  else {
    res.send('No data found');
  }
});


app.use('/api/:position', function (req, res, next) {

  if (req.params.position === 'qb'){
    stdQbPlayersRouter(req, res, next);
  }
  else if (req.params.position === 'k'){
    stdKPlayersRouter(req, res, next);
  }
  else if (req.params.position === 'dst'){
    stdDstPlayersRouter(req, res, next);
  }

  else {
    res.send('No data found');
  }
});


// Custom 404 Not Found route handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// Custom Error Handler
app.use((err, req, res, next) => {
  if (err.status) {
    const errBody = Object.assign({}, err, { message: err.message });
    res.status(err.status).json(errBody);
  } else {
    res.status(500).json({ message: 'Internal Server Error' });
    if (process.env.NODE_ENV !== 'test') {
      console.error(err);
    }
  }
});
  
// Listen for incoming connections
if (process.env.NODE_ENV !== 'test') {
  // Connect to DB and Listen for incoming connections
  mongoose.connect(MONGODB_URI)
    .then(instance => {
      const conn = instance.connections[0];
      console.info(`Connected to: mongodb://${conn.host}:${conn.port}/${conn.name}`);
    })
    .catch(err => {
      console.error(err);
    });
  
  app.listen(PORT, function () {
    console.info(`Server listening on ${this.address().port}`);
  }).on('error', err => {
    console.error(err);
  });
}
  
module.exports = app; // Export for testing
  