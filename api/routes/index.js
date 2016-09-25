'use strict';

let express = require('express');
let router  = express.Router();

const SignUpController     = require('../controllers/signup');
const SignInController     = require('../controllers/signin');
const TimeRecordController = require('../controllers/api/time-record');

/**
 * User related routes
 */
router.post('/login', SignInController);
router.post('/register', SignUpController);

/**
 * API routes
 */
router.get('/user/time-records', TimeRecordController);
router.get('/user/time-records/:action', TimeRecordController);
router.post('/user/time-records/:action', TimeRecordController);
router.delete('/user/time-records/:action/:id', TimeRecordController);

/**
 * Export routes
 */
module.exports = router;
