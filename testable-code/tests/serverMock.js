"use strict";
exports.__esModule = true;
exports.options = exports.httpGet = void 0;
var http = require("http");
var protractor_1 = require("protractor");
var defer = protractor_1.protractor.promise.defer();
function httpGet(url) {
    http.get(url, function (response) {
        var bodyString = '';
        response.setEncoding('utf8');
        response.on("data", function (chunk) {
            bodyString += chunk;
        });
        response.on('end', function () {
            var responseStatus = bodyString.indexOf('alright') <= -1;
            defer.fulfill({
                statusCode: response.statusCode,
                responseStatus: responseStatus
            });
        });
    }).on('error', function (err) {
        defer.reject("Got http.get error: " + err.message);
    });
    return defer.promise;
}
exports.httpGet = httpGet;
exports.options = {
    url: 'http://localhost:3000/createAccount',
    headers: { 'Accept': 'application/json' },
    data: '{ "data": {"login": "user", "password1": "test", "password2": "test"} }'
};
