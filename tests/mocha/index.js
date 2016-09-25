'use strict';

/**
 * Core assert library
 */
const assert = require('assert');

/**
 * Should test library
 *
 * @type {*|any}
 */
const should = require('should');

/**
 * Requiring init script for main nodejs-lib
 *
 * @type {exports|module.exports}
 * @private
 */
const _init = require('../common/_init.js');

/**
 * Async library
 *
 * @type {async|exports|module.exports}
 */
const async = require('async');

function importTest(name, path) {
    describe(name, function () {
        require(path);
    });
}

describe('Tests', function () {

    before(function (done) {

        async.series([callback => {

            callback();

        }], err => {
            if (err) throw err;

            async.parallel([callback => {
                _init.startApiServer(callback);
            }], err => {
                if (err) throw err;

                _init.clearDatabase(done);
            });
        });
    });

    importTest('Time record', './time-record');
});