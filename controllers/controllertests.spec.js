const assert = require("assert");
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const indexPage = require("./user-ctrl.js");
const nock = require('nock');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe("User controller functions", function()  {
    it('Authenticate already existing user', function() {
        var host = "http://localhost:3001";
        var path = "/api/authenticate";
        chai
        .request(host)
        .post(path)
        .send({email: "mdhukkar@purdue.edu", password: "checking"})
        .end(function(error, response, body) {
            if (error) {
                expect(response.body.success).to.be.true;
            }
        });
    })  
    it('Authenticate non-existing user', function() {
        var host = "http://localhost:3001";
        var path = "/api/authenticate";
        chai
        .request(host)
        .post(path)
        .send({email: "notexist@gmail.com", password: "checking"})
        .end(function(error, response, body) {
            if (error) {
                expect(response.body.success).to.be.false;
            }
        });
    })   
    it('Wrong password for existing user', function() {
        var host = "http://localhost:3001";
        var path = "/api/authenticate";
        chai
        .request(host)
        .post(path)
        .send({email: "notexist@gmail.com", password: "-"})
        .end(function(error, response, body) {
            if (error) {
                expect(response.body.success).to.be.false;
            }
        });
    })       
    
  });