'use strict';

/**
 * Requiring Async operations helper
 *
 * @type {async|exports|module.exports}
 */
const async = require('async');

/**
 * core path module
 *
 * @type {exports|module.exports}
 */
const path = require('path');

function startApiServer(callback) {
    if (global.apiServerInitializationRequested == null) {

        require('dotenv').config({
            path: './.env-test'
        });

        require('dotenv').config({
            path: './config/env/test'
        });

        global.apiServerInitializationRequested = true;

        console.log('Initializing API server..');

        let appPath = path.resolve(__dirname, '..', '..', 'api', 'boot');
        
        require(appPath);

        setTimeout(() => {
            callback();
        }, 2000);

    } else {
        callback();
    }
}

function clearDatabase(callback) {

    let userModel       = require('../../api/models/user').model;
    let timeRecordModel = require('../../api/models/time-record').model;

    async.parallel([callback => {

        userModel.remove({}, callback);

    }, callback => {

        timeRecordModel.remove({}, callback);

    }], callback);
}

module.exports = {
    startApiServer: startApiServer,
    clearDatabase: clearDatabase
};
