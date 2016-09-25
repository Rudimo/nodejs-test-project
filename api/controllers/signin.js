'use strict';

const BaseController = require('./base');

const async = require('async');

class SignInController extends BaseController {

    /**
     * Constructor controller
     *
     * @param request
     * @param response
     */
    constructor(request, response) {

        super(request, response);

        this.userModel = require('../models/user');
    }

    /**
     * Apply load action
     * 
     * @param callback
     */
    load(callback) {

        let login    = this.request.body.login;
        let password = this.request.body.password;

        async.waterfall([callback => {

            if (!login || !password) {

                this.terminate();
                this.response.status(400).send('You must send the username and the password');

                return callback(new Error('This user has not sent a user name and password'));
            }

            callback()

        }, callback => {

            this.userModel.model.findOne({login: login}, (err, user) => {
                if (err) return callback(err);

                if (user) {

                    user.comparePassword(password, (err, isMatch) => {
                        if (err) return callback(err);

                        if (!isMatch) {

                            this.terminate();
                            this.response.status(400).send('Incorrect password');

                            return callback(new Error(`Wrong password for: ${login}`));
                        }

                        callback(null, user);
                    });

                } else {

                    this.terminate();
                    this.response.status(400).send('User not found');

                    return callback(new Error(`User not found: ${login}`));
                }
            });

        }], (err, user) => {
            if (err) {
                return callback(err);
            }

            this.terminate();
            this.response.status(200).json({
                token: user.token
            });

            callback();
        });

    }
}

/**
 * Exporting Controller
 *
 * @type {Function}
 */
module.exports = function (request, response) {
    let signInController = new SignInController(request, response);
    signInController.run();
};