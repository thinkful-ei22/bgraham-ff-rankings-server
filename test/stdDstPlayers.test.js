'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const { TEST_MONGODB_URI,MONGODB_URI } = require('../config');

const app = require('../server');
const StdDst = require('../models/std-dst');

const seedStdDst = require('../db/seed/fantasy-football-adp-rankings-dst');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Player List - Defense/Special Teams', function() {

  before(function () {
    return mongoose.connect(TEST_MONGODB_URI)
      .then(() => mongoose.connection.db.dropDatabase());
  });

  beforeEach(function (){
    return Promise.all([
      StdDst.insertMany(seedStdDst)
    ]);
  });

  afterEach(function () {
    return mongoose.connection.db.dropDatabase();
  });

  after(function () {
    return mongoose.disconnect();
  });

  describe('GET /api/std/dst', function() {
    it ('should return the correct number of Players', function (){

      return Promise.all([
        StdDst.find(),
        chai.request(app)
          .get('/api/std/dst')
      ])
        .then (([data, res]) =>{
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(data.length);
        });
    });
    it('should return a list with the correct right fields', function () {
      return Promise.all([
        StdDst.find().sort({ Rank: 'asc' }),
        chai.request(app)
          .get('/api/std/dst')
      ])
        .then(([data, res]) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(data.length);
          res.body.forEach(function (item, i) {
            expect(item).to.be.a('object');
            expect(item).to.include.all.keys('id', 'Name', 'Position', 'Team', 'TacklesForLoss', 'Sacks', 'QuarterbackHits', 'Interceptions', 'FumblesRecovered', 'Safeties', 'DefensiveTouchdowns', 'SpecialTeamsTouchdowns', 'Rank', 'FantasyPoints');
            expect(item.id).to.equal(data[i].id);
            expect(item.Name).to.equal(data[i].Name);
            expect(item.Position).to.equal(data[i].Position);
            expect(item.Team).to.equal(data[i].Team);
          });
        });
    });
  });
});