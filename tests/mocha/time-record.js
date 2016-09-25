/**
 *
 * Created by Yuriy Bushev <bushevuv@gmail.com> on 24/09/2016.
 */

'use strict';

/**
 * Should library
 *
 * @type {should|exports|module.exports}
 */
const should = require('should');

/**
 * Request helper
 *
 * @type {Request|exports|module.exports}
 */
const request = require('../common/_request');

const USER_LOGIN    = 'test-user';
const USER_PASSWORD = '12345';

let token;
let recordId;

it('Register user', done => {
    request.post(`/register`, {login: USER_LOGIN, password: USER_PASSWORD}, {}, (err, res, body) => {
        should.not.exists(err);
        res.statusCode.should.equal(201);

        console.log(body);

        done();
    });
});

it('Login user', done => {
    request.post(`/login`, {login: USER_LOGIN, password: USER_PASSWORD}, {}, (err, res, body) => {
        should.not.exists(err);
        res.statusCode.should.equal(200);

        body.token.should.be.ok();

        token = body.token;

        done();
    });
});

it('Get records (should not be records)', done => {
    request.get(`/user/time-records`, {authentication: token}, (err, res, body) => {
        should.not.exists(err);
        res.statusCode.should.equal(200);

        body.should.be.lengthOf(0);

        done();
    });
});

it('Add a records', done => {
    request.post(`/user/time-records/create`, {
        date: '2016-09-03',
        totalTime: '25',
        notes: 'Test note'
    }, {authentication: token}, (err, res, body) => {
        should.not.exists(err);
        res.statusCode.should.equal(201);

        done();
    });
});

it('Get records', done => {
    request.get(`/user/time-records`, {authentication: token}, (err, res, body) => {
        should.not.exists(err);
        res.statusCode.should.equal(200);

        body.should.be.lengthOf(1);

        body[0].totalTime.should.equal(25);
        body[0].notes.should.equal('Test note');

        recordId = body[0]._id;

        done();
    });
});

it('Remove record', done => {
    request.delete(`/user/time-records/remove/${recordId}`, {authentication: token}, (err, res, body) => {
        should.not.exists(err);
        res.statusCode.should.equal(200);

        done();
    });
});

it('Get records (should not be records)', done => {
    request.get(`/user/time-records`, {authentication: token}, (err, res, body) => {
        should.not.exists(err);
        res.statusCode.should.equal(200);

        body.should.be.lengthOf(0);

        done();
    });
});