const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const host = "http://localhost:3000";
const dummy_user = {
    email: "dummy@dummy.dummy",
    username: "mrdummy",
    password: "dumdum1234",
    tags: "CS30700",
};

let dummy_post = {
    title: "dummy",
    user: dummy_user.username,
    type: "",
    tag: [dummy_user.tags],
    count: 0,
    comments: [""],
    content: "placeholder content",
    time: 0,
    reportArray: [""],
    likeArray: [""],
    upvoteArray: [""],
    downvoteArray: [""],
    reportCount: 0,
    likeCount: 0,
    upvoteCount: 0,
    downvoteCount: 0,
}

describe("User controller functions", function () {

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

describe("Post controller functions", function()  {

    it('Should not create the post with missing information', function(done) {
        var path1 = "/api/createpost";
        var empty_post = {title: "only title is given"}
        chai
        .request(host)
        .post(path1)
        .send(empty_post)
        .end(function(error, response, body) {
            if (error) {
                done(error);
            } else {
                expect(response.body.success).to.be.false;
                done();
            }
        });
    });

    it('Should create the post of type text', function(done) {
        var path1 = "/api/createpost";
        dummy_post.type = "text";
        chai
        .request(host)
        .post(path1)
        .send(dummy_post)
        .end(function(error, response, body) {
            if (error) {
                done(error);
            } else {
                expect(response.body.success).to.be.true;
                done();
            }
        });
    });

    it('Should create the post of type image', function(done) {
        var path1 = "/api/createpost";
        dummy_post.type = "image";
        chai
        .request(host)
        .post(path1)
        .send(dummy_post)
        .end(function(error, response, body) {
            if (error) {
                done(error);
            } else {
                expect(response.body.success).to.be.true;
                done();
            }
        });
    });

    it('Should create the post of type link', function(done) {
        var path1 = "/api/createpost";
        dummy_post.type = "link";
        chai
        .request(host)
        .post(path1)
        .send(dummy_post)
        .end(function(error, response, body) {
            if (error) {
                done(error);
            } else {
                expect(response.body.success).to.be.true;
                done();
            }
        });
    });

    it('Should create the post of type calendar', function(done) {
        var path1 = "/api/createpost";
        dummy_post.type = "calendar";
        chai
        .request(host)
        .post(path1)
        .send(dummy_post)
        .end(function(error, response, body) {
            if (error) {
                done(error);
            } else {
                expect(response.body.success).to.be.true;
                done();
            }
        });
    });

    it('Should create the post of type grade', function(done) {
        var path1 = "/api/creategrade";
        const dummy_grade = {
            title: "CS29100",
            user: dummy_user.username,
            content: "90",
            tag: ["A"],
            time: 0
        };
        chai
        .request(host)
        .post(path1)
        .send(dummy_grade)
        .end(function(error, response, body) {
            if (error) {
                done(error);
            } else {
                expect(response.body.success).to.be.true;
                done();
            }
        });
    });

    it('Should create the post of type curve', function(done) {
        var path1 = "/api/createcurve";
        const dummy_curve = {
            title: "CS29100",
            user: dummy_user.username,
            tag: ["90", "80", "70", "60"],
            time: 0
        };
        
        chai
        .request(host)
        .post(path1)
        .send(dummy_curve)
        .end(function(error, response, body) {
            if (error) {
                done(error);
            } else {
                expect(response.body.success).to.be.true;
                done();
            }
        });
    });

    it('Should check if post exists using post id', function(done) {
        var path = "/api/getPostById";
        chai
        .request(host)
        .get(path)
        .send({id: "abcdefhigklmn"})
        .end(function(error, response, body) {
            if (error) {
                done(error);
            } else {
                expect(response.body.success).to.be.false;
                done();
            }
        });
    })

    it('Should retrieve all the posts in the database', function(done) {
        var path1 = "/api/getposts";
        chai
        .request(host)
        .get(path1)
        .end(function(error, response, body) {
            if (error) {
                done(error);
            } else {
                expect(response.body.success).to.be.true;
                done();
            }
        });
    });

    it('Should get courses from the database', function(done) {
        var path1 = "/api/getcourses";
        chai
        .request(host)
        .get(path1)
        .end(function(error, response, body) {
            if (error) {
                done(error);
            } else {
                expect(response.body.success).to.be.true;
                done();
            }
        });
    });

    it('Should get grades from the database', function(done) {
        var path1 = "/api/getgrades";
        chai
        .request(host)
        .get(path1)
        .end(function(error, response, body) {
            if (error) {
                done(error);
            } else {
                expect(response.body.success).to.be.true;
                done();
            }
        });
    });

    it('Should get curves from the database', function(done) {
        var path1 = "/api/getcurves";
        chai
        .request(host)
        .get(path1)
        .end(function(error, response, body) {
            if (error) {
                done(error);
            } else {
                expect(response.body.success).to.be.true;
                done();
            }
        });
    });

    it('Should get ratings from the database', function(done) {
        var path1 = "/api/getratings";
        chai
        .request(host)
        .get(path1)
        .end(function(error, response, body) {
            if (error) {
                done(error);
            } else {
                expect(response.body.success).to.be.true;
                done();
            }
        });
    });

    it('Should report the appropriate post', function(done) {
        var path = "/api/report";
        chai
        .request(host)
        .post(path)
        .send(dummy_post)
        .end(function(error, response, body) {
            if (error) {
                done(error);
            } else {
                expect(response.body.success).to.be.true;
                done();
            }
        });
    })

    it('Should like the appropriate post', function(done) {
        var path = "/api/like";
        chai
        .request(host)
        .post(path)
        .send(dummy_post)
        .end(function(error, response, body) {
            if (error) {
                done(error);
            } else {
                expect(response.body.success).to.be.true;
                done();
            }
        });
    })

    it('Should upvote the appropriate post', function(done) {
        var path = "/api/upvote";
        chai
        .request(host)
        .post(path)
        .send(dummy_post)
        .end(function(error, response, body) {
            if (error) {
                done(error);
            } else {
                expect(response.body.success).to.be.true;
                done();
            }
        });
    })

    it('Should downvote the appropriate post', function(done) {
        var path = "/api/downvote";
        chai
        .request(host)
        .post(path)
        .send(dummy_post)
        .end(function(error, response, body) {
            if (error) {
                done(error);
            } else {
                expect(response.body.success).to.be.true;
                done();
            }
        });
    })

    it('Should remove all the posts made by the test case', function(done) {
        var path1 = "/api/removeallposts";
        chai
        .request(host)
        .delete(path1)
        .send(dummy_post)
        .end(function(error, response, body) {
            if (error) {
                done(error);
            } else {
                expect(response.body.success).to.be.true;
                done();
            }
        });
    });
});

