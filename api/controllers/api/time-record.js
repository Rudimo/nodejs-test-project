'use strict';

const BaseApiController = require('./base');
const async             = require('async');

class TimeRecordController extends BaseApiController {

    /**
     * Constructor controller
     *
     * @param request
     * @param response
     */
    constructor(request, response) {

        super(request, response);

        this.timeRecordModel = require('../../models/time-record');
    }

    /**
     * Init controller, register action
     *
     * @param callback
     */
    init(callback) {
        super.init(err => {
            if (err) return callback(err);

            this.registerAction('create', 'create');
            this.registerAction('filter', 'filter');
            this.registerAction('remove', 'remove');

            callback();
        });
    }

    /**
     * Load action
     *
     * @param callback
     */
    load(callback) {

        this.timeRecordModel.model.find({user: this.user.id}, (err, items) => {
            if (err) return callback(err);

            this.terminate();
            this.response.json(items);

            callback()

        }).sort({date: 1});
    }

    /**
     * Filter action
     *
     * @param callback
     */
    filter(callback) {

        let query = {
            user: this.user.id
        };

        if (this.request.query.dateFrom) {

            query.date = {
                $gte: this.request.query.dateFrom
            };
        }

        if (this.request.query.dateTo) {

            if (!query.date) {
                query.date = {};
            }

            query.date.$lte = this.request.query.dateTo;
        }

        this.timeRecordModel.model.find(query, (err, items) => {
            if (err) return callback(err);

            this.terminate();
            this.response.json(items);

            callback()

        }).sort({date: 1});

    }

    /**
     * Create action
     *
     * @param callback
     */
    create(callback) {

        async.waterfall([callback => {

            if (!this.request.body.date || !this.request.body.totalTime || !this.request.body.notes) {

                this.terminate();
                this.response.status(400).send('Invalid data');
                return callback(new Error('Invalid data'));
            }

            callback()

        }, callback => {

            this.timeRecordModel.model.create({
                user: this.user.id,
                date: this.request.body.date,
                totalTime: this.request.body.totalTime,
                notes: this.request.body.notes
            }, (err, item) => {

                if (err) return callback(err);

                callback(null, item);
            });

        }], (err, item) => {
            if (err) return callback(err);

            this.terminate();
            this.response.status(201).send(item);

            callback();
        });
    }

    /**
     * Remove action
     *
     * @param callback
     */
    remove(callback) {

        this.timeRecordModel.model.findById(this.itemId, (err, item) => {
            if (err) return callback(err);

            item.remove((err) => {
                if (err) return callback(err);

                this.terminate();
                this.response.status(200).send({success: true});

                callback();
            });
        });
    }
}

/**
 * Exporting Controller
 *
 * @type {Function}
 */
module.exports = function (request, response) {
    let timeRecordController = new TimeRecordController(request, response);
    timeRecordController.run();
};