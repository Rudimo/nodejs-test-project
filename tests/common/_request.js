'use strict';

/**
 * Request library
 *
 * @type {request|exports|module.exports}
 */
let request = require('request').defaults({jar: true});

class Request {

    /**
     * Send GET request
     *
     * @param url
     * @param headers
     * @param callback
     */
    static get(url, headers, callback) {
        request.get({
            url: 'http://localhost:' + process.env.SERVER_PORT + url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.71 Safari/537.36',
                'authentication': headers.authentication
            },
            followAllRedirects: true,
            json: true
        }, callback);
    }

    /**
     * Send POST request
     *
     * @param url
     * @param data
     * @param headers
     * @param callback
     */
    static post(url, data, headers, callback) {
        request.post({
            url: 'http://localhost:' + process.env.SERVER_PORT + url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.71 Safari/537.36',
                'authentication': headers.authentication
            },
            form: data,
            followAllRedirects: true,
            json: true
        }, callback);
    }

    /**
     * Send DELETE request
     *
     * @param url
     * @param headers
     * @param callback
     */
    static delete(url, headers, callback) {
        request.delete({
            url: 'http://localhost:' + process.env.SERVER_PORT + url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.71 Safari/537.36',
                'authentication': headers.authentication
            },
            followAllRedirects: true,
            json: true
        }, callback);
    }

}

module.exports = Request;