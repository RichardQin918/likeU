/*
 Created with Sublime Text 2.
 User: mengpeng
 Date: 01/11/16
 Time: 9:50 PM
 Desc: error defying and inherit
 */
'use strict';
var config = require("../config").initConfig();
var util   = require("util");

function DataNotFoundError(message) {
    Error.call(this);
    this.message    = message || "data not found";
    this.statusCode = config.statusCode.STATUS_NOTFOUND;
}

util.inherits(DataNotFoundError, Error);

function ServerError(message) {
    Error.call(this);
    this.message    = message || "server error";
    this.statusCode = config.statusCode.STATUS_SERVER_ERROR;
}

util.inherits(ServerError, Error);

function InvalidParamError(message) {
    Error.call(this);
    this.message    = message || "invalid parameter";
    this.statusCode = config.statusCode.STATUS_INVAILD_PARAMS;
}

util.inherits(InvalidParamError, Error);

function PageNotFoundError (message) {
    Error.call(this);
    this.message    = message || "page not found";
    this.statusCode = 404;
}

util.inherits(PageNotFoundError, Error);

function DBError (message) {
    Error.call(this);
    this.message    = message || "database error";
    this.statusCode = config.statusCode.STATUS_DBERROR;
}

util.inherits(DBError, Error);

global.ServerError       = ServerError;
global.InvalidParamError = InvalidParamError;
global.DataNotFoundError = DataNotFoundError;
global.PageNotFoundError = PageNotFoundError;
global.DBError           = DBError;
