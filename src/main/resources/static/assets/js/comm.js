//
function doJump(url) {
    window.open(url, "_self");
}
//日期格式化
Date.prototype.Format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
//用于form表单提交转成map对象
function turnArrayToJson(data) {

    var json = {};
    for (var item in data) {
        var map = data[item];
        if (map.value) {
            var val = map.value;
            var key = map.name;
            json[key] = val;
        }

    }
    return json;
}
function getDataJson(url, param) {
    var json;
    if (param == undefined)
        param = {};
        $.ajax({
            type: "POST",// 可选
            async: false,
            url: url,
            data: param,
            dataType: "json",
            success: function (result) {
                json= result;
            },
            error: function (msg) {
                console.info(msg);
            }
        });
    return json;
}
function comm_initInspresult(){
    var data = [{value: 1, text: "待检"}, {value: 2, text: "接收"}, {value: 3, text: "不接收"}];
    $("#inspresult").bootstrapSelect({
        data: data,
        valueField: 'value',
        textField: 'text',
        defaultValue: 1
    });
}
function comm_initGrain() {
    $("#grainid").bootstrapSelect({
        url: '/graindepot-base/selector/grainList',
        type: 'GET',
        valueField: 'grainid',
        textField: 'grainname'
    });
}
function comm_initGrainattr() {
    $("#grainattrid").bootstrapSelect({
        url:  '/graindepot-base/selector/grainattrList',
        type: 'GET',
        valueField: 'grainattrid',
        textField: 'grainattrname'
    });
}
function comm_initGrade(){
    var data = [{value: 1, text: "一等"}, {value: 2, text: "二等"}, {value: 3, text: "三等"}
        , {value: 4, text: "四等"}, {value: 5, text: "五等"}, {value: 6, text: "等外"}];
    $("#grade").bootstrapSelect({
        data: data,
        valueField: 'value',
        textField: 'text',
        defaultValue: 3
    });
}
function comm_initSettlemothod() {
    var data = [{value: 1, text: "现金结算"}, {value: 2, text: "银行卡结算"}, {value: 3, text: "微信结算"}, {value: 4, text: "支付宝结算"}];
    $("#settlemothod").bootstrapSelect({
        data: data,
        valueField: 'value',
        textField: 'text',
        defaultValue: 1
    });
}
function comm_initTrucktype() {
    var data = [{value: 1, text: "车辆"}, {value: 2, text: "船舶"}, {value: 3, text: "火车"}, {value: 99, text: "其他"}];
    $("#trucktype").bootstrapSelect({
        data: data,
        valueField: 'value',
        textField: 'text',
        defaultValue: 1
    });
}
function comm_initGroup(param) {
    $("#groupid").bootstrapSelect({
        url: '/graindepot-base/selector/groupList',
        type: 'GET',
        valueField: 'groupid',
        textField: 'groupname',
        param:param
    });
}
function comm_initCompany(param) {
    $("#companyid").bootstrapSelect({
        url: '/graindepot-base/selector/companyList',
        type: 'GET',
        valueField: 'companyid',
        textField: 'companyname',
        param:param
    });
}
function comm_initGraindepot(param) {
    $("#graindepotid").bootstrapSelect({
        url: '/graindepot-base/selector/graindepotList',
        type: 'GET',
        valueField: 'graindepotid',
        textField: 'graindepotname',
        param:param
    });
}
function comm_initTrader() {
    $("#traderid").bootstrapSelect({
        url: '/graindepot-base/selector/traderList',
        type: 'GET',
        valueField: 'traderid',
        textField: 'tradername'
    })
}
function comm_initStorage(param) {
    $("#storageid").bootstrapSelect({
        url: '/graindepot-base/selector/storageList',
        type: 'GET',
        valueField: 'storageid',
        textField: 'storagename',
        param:param
    });
}
function comm_initSettle() {
    $("#settleid").bootstrapSelect({
        url: '/graindepot-base/selector/settleList',
        type: 'GET',
        valueField: 'settleid',
        textField: 'settlename'
    });
}
function comm_initContract(param) {
    $("#contractid").bootstrapSelect({
        url: '/graindepot-inout/selectorInout/contractByMap',
        type: 'GET',
        valueField: 'contractid',
        textField: 'contractno',
        param: param
    });
}function comm_initAccount(param) {
    $("#accid").bootstrapSelect({
        url: '/graindepot-base/selector/accountList',
        type: 'GET',
        valueField: 'accid',
        textField: 'accname',
        param: param
    });
}