/*
 Created with Sublime Text 2.
 User: MengPeng
 Date: 21/5/15
 Time: 09:18 PM
 Desc: 日志处理类
 */

"use strict";
var log4js = require('log4js');
var logger = log4js.getLogger('Logger');
log4js.configure({
    appenders: [
        { type: 'console' },
        {   type: 'file',
            filename: 'logs/access.log',
            maxLogSize: 1024,
            alwaysIncludePattern: false,
            backups: 7,
            category: 'log4jslog'
        }
    ],
    replaceConsole: true
});

function info(msg)
{
    logger.info(msg);
}
function error(err)
{
    logger.error(err);
}

//单独定义以引用(Ziming)
exports.logger=function(name){
  var logger = log4js.getLogger(name);
  logger.setLevel('INFO');
  return logger;
}



exports.info = info;
exports.error = error;




