'use strict';

const BaseModel = require('./base');
const mongoose  = require('mongoose');

class TimeRecordModel extends BaseModel {

    /**
     * Model constructor
     * 
     * @param collectionName
     */
    constructor(collectionName) {
        super(collectionName);
    }

    /**
     * Defined schema
     */
    defineSchema() {

        var TimeRecordSchema = {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            date: {
                type: Date
            },
            totalTime: {
                type: Number
            },
            notes: {
                type: String
            },
            createdAt: {
                type: Date,
                'default': Date.now
            }
        };

        let TimeRecordDBOSchema = this.createSchema(TimeRecordSchema);

        this.registerSchema(TimeRecordDBOSchema);
    }
}

let modelInstance = new TimeRecordModel('time-record');

/**
 * Export model instance
 *
 * @type {TimeRecordModel}
 */
module.exports = modelInstance;