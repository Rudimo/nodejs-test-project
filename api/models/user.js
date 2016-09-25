'use strict';

const bcrypt = require('bcrypt');

const randomString = require('random-string');

const BaseModel = require('./base');

class UserModel extends BaseModel {

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

        var UserSchema = {

            login: {type: String, unique: true},

            password: {type: String},

            token: {type: String}
        };

        let UserDBOSchema = this.createSchema(UserSchema);

        UserDBOSchema.pre('save', function (next) {

            if (this.isNew) {

                this.token = randomString({
                    length: 30,
                    numeric: true,
                    letters: true,
                    special: true
                });
            }

            next();
        });

        UserDBOSchema.pre('save', function (next) {
            let user = this;

            // only hash the password if it has been modified (or is new)
            if (!user.isModified('password')) return next();

            // generate a salt
            bcrypt.genSalt((err, salt) => {
                if (err) return next(new Error('UserDBOSchema.pre.save: ' + err));

                // hash the password using our new salt
                bcrypt.hash(user.password, salt, function (err, hash) {
                    if (err) return next(new Error('UserDBOSchema.pre.save: ' + err));

                    // override the cleartext password with the hashed one
                    user.password = hash;
                    next();
                });
            });
        });

        UserDBOSchema.methods.comparePassword = function (candidatePassword, callback) {
            bcrypt.compare(candidatePassword, this.password, callback);
        };

        this.registerSchema(UserDBOSchema);
    }
}

let modelInstance = new UserModel('user');

/**
 * Export model instance
 *
 * @type {UserModel}
 */
module.exports = modelInstance;