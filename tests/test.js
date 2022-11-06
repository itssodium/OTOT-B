const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);
chai.should();

describe('API testing', () => {
    describe("DELETE before starting", () => { //just to delete existing users not used for testing
        it("does not do anything", (done) => {
            chai.request(app)
            .delete('/delete')
            .end((err, res) => {
                done();
            })
        })
    })

    describe("GET before POST", () => {
        it("should return no users", (done) => {
            chai.request(app)
            .get('/get')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            })
        })
    })

    describe("POST", () => {
        it("should add user", (done) => {
            chai.request(app)
            .post('/post')
            .send({name: 'user1', role: 'viewer'})
            .end((err, res) => {
                res.should.have.status(201);
                done();
            })
        })
        it("should not add user", (done) => {
            chai.request(app)
            .post('/post')
            .send({name: 'user1', role: 'viewer'})
            .end((err, res) => {
                res.should.have.status(208);
                done();
            })
        })
        it("empty name and role should give error", (done) => {
            chai.request(app)
            .post('/post')
            .end((err, res) => {
                res.should.have.status(400);
                done();
            })
        })
        it("empty name gives error", (done) => {
            chai.request(app)
            .post('/post')
            .send({role: 'viewer'})
            .end((err, res) => {
                res.should.have.status(400);
                done();
            })
        })
        it("empty role gives error", (done) => {
            chai.request(app)
            .post('/post')
            .send({name: 'user3'})
            .end((err, res) => {
                res.should.have.status(400);
                done();
            })
        })
    })

    describe("GET after POST", () => {
        it("should return no users", (done) => {
            chai.request(app)
            .get('/get')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
        })
    })

    describe("PUT", () => {
        it("should update user", (done) => {
            chai.request(app)
            .put('/put')
            .send({name: 'user1', role: 'viewer'})
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
        })
        it("should not dot do anything", (done) => {
            chai.request(app)
            .put('/put')
            .send({name: 'user3', role: 'viewer'})
            .end((err, res) => {
                res.should.have.status(404);
                done();
            })
        })
        it("empty name and role should give error", (done) => {
            chai.request(app)
            .put('/put')
            .end((err, res) => {
                res.should.have.status(400);
                done();
            })
        })
        it("empty name gives error", (done) => {
            chai.request(app)
            .put('/put')
            .send({role: 'viewer'})
            .end((err, res) => {
                res.should.have.status(400);
                done();
            })
        })
        it("empty role gives error", (done) => {
            chai.request(app)
            .put('/put')
            .send({name: 'user1'})
            .end((err, res) => {
                res.should.have.status(400);
                done();
            })
        })
    })

    describe("DELETE", () => {
        it("should delete user", (done) => {
            chai.request(app)
            .delete('/delete')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
        })
        it("empty users should give error", (done) => {
            chai.request(app)
            .delete('/delete')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            })
        })
    })
})
