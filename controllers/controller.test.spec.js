const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe("User controller functions", function()  {
    it('Authenticate already existing user', function() {
        var host = "http://localhost:3000";
        var path = "/api/authenticate";
        chai
        .request(host)
        .post(path)
        .send({email: "rshitole@gmail.com", password: "checking"})
        .end(function(error, response, body) {
            if (error) {
                expect(response.body.success).to.be.true;
            }
        });
    })  
    it('Authenticate non-existing user', function() {
        var host = "http://localhost:3000";
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
        var host = "http://localhost:3000";
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
    it('Trying to delete non existing user', function() {
        var host = "http://localhost:3000";
        var path = "/api/deleteuser";
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
    it('Trying to delete existing user but wrong password', function() {
        var host = "http://localhost:3000";
        var path = "/api/deleteuser";
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


  describe("Post controller functions", function()  {
    it('Check if post exists using post id', function() {
        var host = "http://localhost:3000";
        var path = "/api/getPostById";
        chai
        .request(host)
        .post(path)
        .send({id: "abcdefhigklmn"})
        .end(function(error, response, body) {
            if (error) {
                expect(response.body.success).to.be.false;
            }
        });
    })  
    // it('Post should not be created if all tags are not followed by the user', function() {
    //     var host = "http://localhost:3000";
    //     var path1 = "/api/createpost";
    //     var path2 = "/api/getcourses"
    //     chai
    //     .request(host)
    //     .post(path1)
    //     .send({title:})
    //     .end(function(error, response, body) {
    //         if (error) {
    //             expect(response.body.success).to.be.false;
    //         }
    //     });
    // })   
    // it('Wrong password for existing user', function() {
    //     var host = "http://localhost:3000";
    //     var path = "/api/authenticate";
    //     chai
    //     .request(host)
    //     .post(path)
    //     .send({email: "notexist@gmail.com", password: "-"})
    //     .end(function(error, response, body) {
    //         if (error) {
    //             expect(response.body.success).to.be.false;
    //         }
    //     });
    // })  
    // it('Trying to delete non existing user', function() {
    //     var host = "http://localhost:3000";
    //     var path = "/api/deleteuser";
    //     chai
    //     .request(host)
    //     .post(path)
    //     .send({email: "notexist@gmail.com", password: "-"})
    //     .end(function(error, response, body) {
    //         if (error) {
    //             expect(response.body.success).to.be.false;
    //         }
    //     });
    // })   
    // it('Trying to delete existing user but wrong password', function() {
    //     var host = "http://localhost:3000";
    //     var path = "/api/deleteuser";
    //     chai
    //     .request(host)
    //     .post(path)
    //     .send({email: "notexist@gmail.com", password: "-"})
    //     .end(function(error, response, body) {
    //         if (error) {
    //             expect(response.body.success).to.be.false;
    //         }
    //     });
    // })             
    
  });