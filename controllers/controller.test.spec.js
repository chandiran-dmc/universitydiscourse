const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe("User controller functions", function () {

    const host = "http://localhost:3000";

    const dummy_user = {
        email: "dummy@dummy.dummy",
        username: "mrdummy",
        password: "dumdum1234",
        tags: "CS307",
    };

    it("Should register a new user", function (done) {
        var path = "/api-user/register";
        chai
        .request(host)
        .post(path)
        .send(dummy_user)
        .end(function (error, response, body) {
            if (error) {
                done(error);
            } else {
                expect(response.body.success).to.be.true;
                done();
            }
        });
    });

    it("Should authenticate already existing user", function (done) {
        var path = "/api-user/authenticate";
        chai
        .request(host)
        .post(path)
        .send(dummy_user)
        .end(function (error, response, body) {
            if (error) {
                done(error);
            } else {
                expect(response.body.success).to.be.true;
                done();
            }
        });
    });

    it("Should authenticate non-existing user", function (done) {
        var path = "/api-user/authenticate";
        chai
        .request(host)
        .post(path)
        .send({ email: "notexist@gmail.com", password: "checking" })
        .end(function (error, response, body) {
            if (error) {
                done(error);
            } else {
                expect(response.body.success).to.be.false;
                done();
            }
        });
    });

    it("Should fail with wrong password for existing user", function (done) {
        var path = "/api-user/authenticate";
        chai
        .request(host)
        .post(path)
        .send({ email: dummy_user.email, password: "-" })
        .end(function (error, response, body) {
            if (error) {
                done(error);
            } else {
                expect(response.body.success).to.be.false;
                done();
            }
        });
    });

    it("Should update user tags", function (done) {
        var path = "/api-user/updateusertags";
        chai
        .request(host)
        .post(path)
        .send({email: dummy_user.email, newtags: "CS252"})
        .end(function (error, response, body) {
            if (error) {
                done(error);
            } else {
                expect(response.body.success).to.be.true;
                done();
            }
        });
    });

    it("Should delete non existing user", function (done) {
        var path = "/api-user/deleteuser";
        chai
        .request(host)
        .post(path)
        .send({ email: "notexist@gmail.com", password: "-" })
        .end(function (error, response, body) {
            if (error) {
                done(error);
            } else {
                expect(response.body.success).to.be.false;
                done();
            }
        });
    });

    it("Should delete existing user", function (done) {
        var path = "/api-user/deleteuser";
        chai
        .request(host)
        .post(path)
        .send(dummy_user)
        .end(function (error, response, body) {
            if (error) {
                done(error);
            } else {
                expect(response.body.success).to.be.true;
                done();
            }
        });
    });
});

// describe("Post controller functions", function()  {
//   it('Check if post exists using post id', function() {
//       var host = "http://localhost:3000";
//       var path = "/api/getPostById";
//       chai
//       .request(host)
//       .post(path)
//       .send({id: "abcdefhigklmn"})
//       .end(function(error, response, body) {
//           if (error) {
//               expect(response.body.success).to.be.false;
//           }
//       });
//   })
//   it('Post should not be created if all tags are not followed by the user', function() {
//       var host = "http://localhost:3000";
//       var path1 = "/api/createpost";
//       var path2 = "/api/getcourses"
//       chai
//       .request(host)
//       .post(path1)
//       .send({title:})
//       .end(function(error, response, body) {
//           if (error) {
//               expect(response.body.success).to.be.false;
//           }
//       });
//   });
// });
