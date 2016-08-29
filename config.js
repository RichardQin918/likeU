/*
 Created with Sublime Text 2.
 User: MengPeng
 Date: 01/11/16
 Time: 10:00 PM
 Desc: 定义数据库配置文件
 */
'use strict';
/**
 * init config info  初始化配置文件信息
 * @return {object} config-info object
 */
function initConfig() {
    var configInfo = {
        // 定义mysql最大数据库连接数
        default_max_conns : 200,
        default_page_size : 10,
        // 数据库配置信息
        mysqlConfig     : {
            "host"      : "120.25.126.93",
            "user"      : "root",
            "port"      :  3306,
            "password"  : "Flzx3qC",
            "database"  : "Weixiangji",
            "dialect"   : "mysql"
        },
        // 定义状态码
        statusCode        : {
            STATUS_OK                 : 0,
            STATUS_NOTFOUND           : 1,     //means data not found not url request
            STATUS_SERVER_ERROR       : 2,
            STATUS_INVAILD_PARAMS     : 3,     //无效请求参数
            STATUS_DBERROR            : 4      //数据库操作出错

            //....
        },
        // 定义错误信息
        messageInfo :{
            ERRO_MESSAGE : "失败",
            SUCCESS_MESSAGE : "成功"
        },
        // 定义投票状态吗
        ticketStatus    :{
            STATUS_NOTPUBLISH         : 0,   //未发布
            STATUS_TIMEOUT_PUBLISH    : 1,   //已发布，但超时
            STATUS_PUBLISH            : 2,   //已发布，待支付
            STATUS_PAY                : 3,   //已支付
            STATUS_CHECK              : 4,   //已审核
            STATUS_BACK               : 5,   //已退回
            STATUS_REFUND             : 6,   //已退款
            STATUS_FILSH              : 7,   //已完成
            STATUS_OVER               : 8    //已结算
        }
    };
    return configInfo;
}
//exports
exports.initConfig = initConfig;

