'use strict';

const BaseController = require('./base');

const async = require('async');

class SignUpController extends BaseController {

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

        async.waterfall([callback => {

            if (!this.request.body.login || !this.request.body.password) {

                this.response.status(400).send('You must send the username and the password');
                return callback(new Error('This user has not sent a user name and password'));
            }

            callback()

        }, callback => {

            this.userModel.model.findOne({login: this.request.body.login}, (err, user) => {
                if (err) return callback(err);

                if (user) {

                    this.response.status(400).send('User login already in use');
                    return callback(new Error('User login already in use'));
                }

                callback()
            });

        }, callback => {

            this.userModel.model.create({
                login: this.request.body.login,
                password: this.request.body.password

            }, (err, user) => {
                if (err) return callback(err);

                callback(null, user)
            });
        }], (err) => {
            if (err) return callback(err);

            this.response.status(201).send({
                token: 'token'
            });

            callback()
        });

    }
}

/**
 * Exporting Controller
 *
 * @type {Function}
 */
module.exports = function (request, response) {
    let signUpController = new SignUpController(request, response);
    signUpController.run();
};