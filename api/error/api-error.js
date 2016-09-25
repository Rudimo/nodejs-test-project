'use strict';

class ApiError extends Error {

    constructor(message, code) {

        super(message);

        this.code = code;
    }

    get apiMessage() {

        return `${this.code} - ${this.message}`;
    }
}

/**
 * Export class
 *
 * @type {ApiError}
 */
module.exports = ApiError;