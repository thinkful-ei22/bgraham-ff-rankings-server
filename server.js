'use strict';

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const { PORT, MONGODB_URI } = require('./config');

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
  
// Create a static webserver
app.use(express.static('public'));
  
// Parse request body
app.use(express.json());
  

// Mount routers
app.use('/api/std/overall',stdOvrPlayersRouter);
app.use('/api/ppr/overall',pprOvrPlayersRouter);

app.use('/api/qb', stdQbPlayersRouter);

app.use('/api/std/rb', stdRbPlayersRouter);
app.use('/api/ppr/rb', pprRbPlayersRouter);

app.use('/api/std/wr', stdWrPlayersRouter);
app.use('/api/ppr/wr', pprWrPlayersRouter);

app.use('/api/std/te', stdTePlayersRouter);
app.use('/api/ppr/te', pprTePlayersRouter);

app.use('/api/k', stdKPlayersRouter);

app.use('/api/dst', stdDstPlayersRouter);


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
  