"use strict"

let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = process.env.URL || "http://localhost:4000";

describe('get datas: ', () => {
    it('It should return a Json', (done) => {
        chai.request(url)
            .get('/getAllPersons')
            .end(function (err, res) {
                console.log(res.body)
                expect(res).to.have.status(200);
                done();
            });
    });
});

describe('get datas: ', () => {
    it('It should return a Json', (done) => {
        chai.request(url)
            .get('/getAllAcaachi')
            .end(function (err, res) {
                console.log(res.body)
                expect(res).to.have.status(200);
                done();
            });
    });
});

describe('get datas: ', () => {
    it('It should return a Json', (done) => {
        chai.request(url)
            .get('/getAllArea')
            .end(function (err, res) {
                console.log(res.body)
                expect(res).to.have.status(200);
                done();
            });
    });
});

describe('get report1: ', () => {
    it('It should return a Json', (done) => {
        chai.request(url)
            .get('/report1')
            .end(function (err, res) {
                console.log(res.body)
                expect(res).to.have.status(200);
                done();
            });
    });
});

describe('get report2: ', () => {
    it('It should return a Json', (done) => {
        chai.request(url)
            .get('/report2')
            .end(function (err, res) {
                console.log(res.body)
                expect(res).to.have.status(200);
                done();
            });
    });
});