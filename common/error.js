/*
 Created with Sublime Text 2.
 User: mengpeng
 Date: 01/11/16
 Time: 9:50 PM
 Desc: 错误定义与继承
 */
'use strict';
var config = require("../config").initConfig();
var util   = require("util");

function DataNotFoundError(message) {
    Error.call(this);
    this.message    = message || "数据未找到";
    this.statusCode = config.statusCode.STATUS_NOTFOUND;
}

util.inherits(DataNotFoundError, Error);

function ServerError(message) {
    Error.call(this);
    this.message    = message || "服务器出错";
    this.statusCode = config.statusCode.STATUS_SERVER_ERROR;
}

util.inherits(ServerError, Error);

function InvalidParamError(message) {
    Error.call(this);
    this.message    = message || "请求参数格式错误";
    this.statusCode = config.statusCode.STATUS_INVAILD_PARAMS;
}

util.inherits(InvalidParamError, Error);

function PageNotFoundError (message) {
    Error.call(this);
    this.message    = message || "未找到相关页面";
    this.statusCode = 404;
}

util.inherits(PageNotFoundError, Error);

function DBError (message) {
    Error.call(this);
    this.message    = message || "数据库出错";
    this.statusCode = config.statusCode.STATUS_DBERROR;
}

util.inherits(DBError, Error);

global.ServerError       = ServerError;
global.InvalidParamError = InvalidParamError;
global.DataNotFoundError = DataNotFoundError;
global.PageNotFoundError = PageNotFoundError;
global.DBError           = DBError;
