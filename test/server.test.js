'use strict';

// Clear the console before each run
// process.stdout.write("\x1Bc\n");

const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../server');
const { PORT, MONGODB_URI,CLIENT_ORIGIN } = require('../config');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Reality Check', () => {

  it('true should be true', () => {
    expect(true).to.be.true;
  });

  it('2 + 2 should equal 4', () => {
    expect(2 + 2).to.equal(4);
  });

});

describe('Environment', () => {

  it('NODE_ENV should be "test"', () => {
    expect(process.env.NODE_ENV).to.equal('test');
  });

});

describe('Basic Express setup', () => {

  describe('Express static', () => {

    // it('GET request "/api/std/rb" should return the standard overall players\' list', (done) => {
    //   return chai.request(app)
    //     .get('/api/std/rb')
    //     .then((res) => {
    //     })
    //     .catch(() => done());

    //   // .then(() => {
    //   //   done();

    //   // });
    // });

    // it ('done', (done) => {
    //   setImmediate(done);
    // }); 
  });

  describe('404 handler', () => {

    it('should respond with 404 when given a bad path', () => {
      return chai.request(app)
        .get('/bad/path')
        .then(res => {
          expect(res).to.have.status(404);
        });
    });

  });
});