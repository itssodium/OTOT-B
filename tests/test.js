const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);
chai.should();

describe('API testing', () => {
    describe("GET", () => {
        it("should return users", (done) => {
            chai.request(app)
            .get('/get')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            })
        })
    })
})
