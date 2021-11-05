"use strict"

let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = process.env.URL || "http://localhost:4000";

describe('get msg: ', () => {
    it('It should return msg: I connect', (done) => {
        chai.request(url)
            .get('/')
            .end(function (err, res) {
                console.log(res.body)
                expect(res).to.have.status(200);
                done();
            });
    });
});
