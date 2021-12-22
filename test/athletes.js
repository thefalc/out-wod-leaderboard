'use strict';
 
const chai = require('chai');  
const expect = require('chai').expect;
 
chai.use(require('chai-http'));
 
 // the server app
const app = require('../app/server/index.js'); 
 
describe('API endpoint /athletes', function() {  
  this.timeout(5000); // How long to wait for a response (ms)
 
  before(function() {
 
  });
 
  after(function() {
 
  });
 
  // GET - List all athletes
  it('should return all athletes', function() {
    return chai.request(app)
      .get('/athletes')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body.response.athletes).to.be.an('array');
      });
  });
 
  // GET - Invalid path
  it('should return Not Found', function() {
    return chai.request(app)
      .get('/INVALID_PATH')
      .then(function(res) {
        throw new Error('Path exists!');
      })
      .catch(function(err) {
        expect(err).to.have.status(404);
      });
  });
});