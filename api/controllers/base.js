'use strict';

const async = require('async');

class BaseController {

    /**
     * Constructor
     *
     * @param request
     * @param response
     */
    constructor(request, response) {

        this.request  = request;
        this.response = response;

        this.actions = {};

        this.terminated = false;

    }

    /**
     * Get current action
     *
     * @returns {*|any|string|Function|Action<CreationState<T>>}
     */
    get action() {

        return this.request.params.action;
    }

    /**
     * Get current item
     *
     * @returns {string}
     */
    get itemId() {

        return this.request.params.id;
    }

    /**
     * Pre Init controller
     *
     * @param callback
     */
    preInit(callback) {

        callback();
    }

    /**
     * Init controller
     *
     * @param callback
     */
    init(callback) {

        callback();
    }

    /**
     * Load controller
     *
     * @param callback
     */
    load(callback) {

        callback();
    }

    /**
     * Main execution flow
     */
    run() {

        async.series([callback => {

            this.preInit(callback);

        }, callback => {

            if (this.terminated) return callback();

            this.init(callback);

        }, callback => {

            if (this.terminated) return callback();

            this.applyAction(callback);

        }], err => {
            if (err) {

                if (this.terminated) return;

                this.errHandler(err);
            }
        });
    }

    /**
     * Register new action
     *
     * @param actionName
     * @param [methodName]
     */
    registerAction(actionName, methodName) {

        methodName = methodName || actionName;

        //console.log(`Register action: ${actionName}`);

        this.actions[actionName] = this[methodName];
    }

    /**
     * Try load action
     *
     * @param callback
     * @returns {*}
     */
    applyAction(callback) {

        if (typeof this.actions[this.action] !== 'function') { // :action не определен

            if (this.action) {

                return callback(Error('Action not found'));
            }

            return this.load(callback);
        }

        //console.log(`Try load action: ${this.action}`);

        this.actions[this.action].call(this, callback);
    }

    /**
     * Terminate execution - прерываем выполнение run() метода
     */
    terminate() {

        this.terminated = true;
    }

    /**
     * Handle controller error
     *
     * @param err
     */
    errHandler(err) {

        console.log(err.stack);

        this.response.status(err.status || 500);
        this.response.send({message: err.message});
    }

}

/**
 * Export BaseController class
 *
 * @type {BaseController}
 */
module.exports = BaseController;