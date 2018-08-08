'use strict';

const mongoose = require('mongoose');

const { MONGODB_URI } = require('../config');

const PprOvr = require('../models/ppr-overall');
const StdOvr = require('../models/std-overall');
const StdQb = require('../models/std-qb');
const PprRb = require('../models/ppr-rb');
const StdRb = require('../models/std-rb');
const PprWr = require('../models/ppr-wr');
const StdWr = require('../models/std-wr');
const PprTe = require('../models/ppr-te');
const StdTe = require('../models/std-te');
const StdK = require('../models/std-k');
const StdDst = require('../models/std-dst');




const seedStdOvr = require('../db/seed/fantasy-football-adp-rankings-std');
const seedPprOvr = require('../db/seed/fantasy-football-adp-rankings-ppr');
const seedStdQb = require('../db/seed/fantasy-football-adp-rankings-qb');
const seedStdRb = require('../db/seed/fantasy-football-adp-rankings-rb-std');
const seedPprRb = require('../db/seed/fantasy-football-adp-rankings-rb-ppr');
const seedStdWr = require('../db/seed/fantasy-football-adp-rankings-wr-std');
const seedPprWr = require('../db/seed/fantasy-football-adp-rankings-wr-ppr');
const seedStdTe = require('../db/seed/fantasy-football-adp-rankings-te-std');
const seedPprTe = require('../db/seed/fantasy-football-adp-rankings-te-ppr');
const seedStdK = require('../db/seed/fantasy-football-adp-rankings-k');
const seedStdDst = require('../db/seed/fantasy-football-adp-rankings-dst');




console.log(`Connecting to mongodb at ${MONGODB_URI}`);
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.info('Dropping Database');
    return mongoose.connection.db.dropDatabase();
  })
  .then(() => {
    console.info('Seeding Database');
    return Promise.all([

      StdOvr.insertMany(seedStdOvr),
      PprOvr.insertMany(seedPprOvr),
      StdQb.insertMany(seedStdQb),
      StdRb.insertMany(seedStdRb),
      PprRb.insertMany(seedPprRb),
      StdWr.insertMany(seedStdWr),
      PprWr.insertMany(seedPprWr),
      StdTe.insertMany(seedStdTe),
      PprTe.insertMany(seedPprTe),
      StdK.insertMany(seedStdK),
      StdDst.insertMany(seedStdDst),


    ]);
  })
  .then(() => {
    console.info('Disconnecting');
    return mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    return mongoose.disconnect();
  });
