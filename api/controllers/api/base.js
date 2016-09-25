'use strict';

const BaseController = require('../base');
const ApiError       = require('../../error/api-error');

class BaseApiController extends BaseController {

    /**
     * Constructor controller
     *
     * @param request
     * @param response
     */
    constructor(request, response) {

        super(request, response);

        this.userModel = require('../../models/user');
    }

    preInit(callback) {
        
        if (!this.request.headers.authentication) {

            return callback(new ApiError(`Unauthorized`, 401));
        }

        this.userModel.model.findOne({token: this.request.headers.authentication}, (err, user) => {
            if (err) return callback(err);

            if (!user) return callback(new ApiError(`Unauthenticated`, 403));

            this.user = user;
            
            callback();
        });
    }

    errHandler(err) {

        this.response.status(err.code || 500);

        this.response.json({message: err.apiMessage});
    }
}

module.exports = BaseApiController;