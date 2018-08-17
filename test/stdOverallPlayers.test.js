'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const { TEST_MONGODB_URI,MONGODB_URI } = require('../config');

const app = require('../server');
const StdOverall = require('../models/std-overall');

const seedStdOverall = require('../db/seed/fantasy-football-adp-rankings-std');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Player List - Std Overall', function() {

  before(function () {
    return mongoose.connect(TEST_MONGODB_URI)
      .then(() => mongoose.connection.db.dropDatabase());
  });

  beforeEach(function (){
    return Promise.all([
      StdOverall.insertMany(seedStdOverall)
    ]);
  });

  afterEach(function () {
    return mongoose.connection.db.dropDatabase();
  });

  after(function () {
    return mongoose.disconnect();
  });

  describe('GET /api/std/overall', function() {
    it ('should return the correct number of Players', function (){

      return Promise.all([
        StdOverall.find(),
        chai.request(app)
          .get('/api/std/overall')
      ])
        .then (([data, res]) =>{
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(data.length);
        });
    });
    it('should return a list with the correct right fields', function () {
      return Promise.all([
        StdOverall.find().sort({ Rank: 'asc' }),
        chai.request(app)
          .get('/api/std/overall')
      ])
        .then(([data, res]) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(data.length);
          res.body.forEach(function (item, i) {
            expect(item).to.be.a('object');
            expect(item).to.include.all.keys('id', 'Name', 'Position', 'Team', 'Rank', 'FantasyPoints');
            expect(item.id).to.equal(data[i].id);
            expect(item.Name).to.equal(data[i].Name);
            expect(item.Position).to.equal(data[i].Position);
            expect(item.Team).to.equal(data[i].Team);
          });
        });
    });
  });
});