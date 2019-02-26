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
function dataJson(method, url, param) {
    var json;
    if (param == undefined)
        param = {};
    $.ajax({
        type: method,// 可选
        async: false,
        url: url,
        data: param,
        dataType: "json",
        success: function (result) {
            json = result;
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
    if(g_item.inspresult){
        $("#inspresult").bootstrapSelect("setValue",g_item.inspresult);
    }
}
function comm_initGrain() {
    $("#grainid").bootstrapSelect({
        url: '/graindepot-base/selector/grainList',
        type: 'GET',
        valueField: 'grainid',
        textField: 'grainname'
    });
    if(g_item.grainid){
        $("#grainid").bootstrapSelect("setValue",g_item.grainid);
    }
}
function comm_initGrainattr() {
    $("#grainattrid").bootstrapSelect({
        url:  '/graindepot-base/selector/grainattrList',
        type: 'GET',
        valueField: 'grainattrid',
        textField: 'grainattrname'
    });
    if(g_item.grainattrid){
        $("#grainattrid").bootstrapSelect("setValue",g_item.grainattrid);
    }
}
function comm_initDefGrain() {
    $("#defgrainid").bootstrapSelect({
        url: '/graindepot-base/selector/grainList',
        type: 'GET',
        valueField: 'grainid',
        textField: 'grainname'
    });
    if(g_item.defgrainid){
        $("#defgrainid").bootstrapSelect("setValue",g_item.defgrainid);
    }
}
function comm_initDefGrainattr() {
    $("#defgrainattrid").bootstrapSelect({
        url:  '/graindepot-base/selector/grainattrList',
        type: 'GET',
        valueField: 'grainattrid',
        textField: 'grainattrname'
    });
    if(g_item.defgrainattrid){
        $("#defgrainattrid").bootstrapSelect("setValue",g_item.defgrainattrid);
    }
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
    if(g_item.grade){
        $("#grade").bootstrapSelect("setValue",g_item.grade);
    }
}
function comm_initSettlemothod() {
    var data = [{value: 1, text: "现金结算"}, {value: 2, text: "银行卡结算"}, {value: 3, text: "微信结算"}, {value: 4, text: "支付宝结算"}];
    $("#settlemothod").bootstrapSelect({
        data: data,
        valueField: 'value',
        textField: 'text',
        defaultValue: 1
    });
    if(g_item.settlemothod){
        $("#settlemothod").bootstrapSelect("setValue",g_item.settlemothod);
    }
}
function comm_initTrucktype() {
    var data = [{value: 1, text: "车辆"}, {value: 2, text: "船舶"}, {value: 3, text: "火车"}, {value: 99, text: "其他"}];
    $("#trucktype").bootstrapSelect({
        data: data,
        valueField: 'value',
        textField: 'text',
        defaultValue: 1
    });
    if(g_item.trucktype){
        $("#trucktype").bootstrapSelect("setValue",g_item.trucktype);
    }
}
function comm_initTaxnature() {
    var data = [{value: 1, text: "小规模纳税人"}, {value: 2, text: "一般纳税人"}];
    $("#taxnature").bootstrapSelect({
        data: data,
        valueField: 'value',
        textField: 'text'
    });
    if(g_item.taxnature){
        $("#taxnature").bootstrapSelect("setValue",g_item.taxnature);
    }
}
function comm_initProvince(param) {
    $("#provinceid").bootstrapSelect({
        url: '/graindepot-base/selector/provinceList',
        type: 'GET',
        valueField: 'provinceid',
        textField: 'provincename',
        param:param,
        onSelect: function (value) {
            var myparam;
            if(value!=""){
                myparam={"provinceid":value};
                comm_initCity(myparam);
                comm_initGroup(myparam);
                comm_initCompany(myparam);
            }
        }
    });
    if(g_item.provinceid){
        $("#provinceid").bootstrapSelect("setValue",g_item.provinceid);
    }
}
function comm_initCity(param) {
    $("#cityid").bootstrapSelect({
        url: '/graindepot-base/selector/cityList',
        type: 'GET',
        valueField: 'cityid',
        textField: 'cityname',
        param:param,
        onSelect: function (value) {
            if(value!=""){
                var myparam = {"cityid": value};
                comm_initCounty(myparam);
                comm_initGroup(myparam);
                comm_initCompany(myparam);
            }
        }
    });
    if(g_item.cityid){
        $("#cityid").bootstrapSelect("setValue",g_item.cityid);
    }
}
function comm_initCounty(param) {
    $("#countyid").bootstrapSelect({
        url: '/graindepot-base/selector/countyList',
        type: 'GET',
        valueField: 'countyid',
        textField: 'countyname',
        param:param,
        onSelect: function (value) {
            var myparam;
            if(value!=""){
                myparam = {"countyid": value};
                comm_initGroup(myparam);
                comm_initCompany(myparam);
            }
        }
    });
    if(g_item.countyid){
        $("#countyid").bootstrapSelect("setValue",g_item.countyid);
    }
}
function comm_initGroup(param) {
    $("#groupid").bootstrapSelect({
        url: '/graindepot-base/selector/groupList',
        type: 'GET',
        valueField: 'groupid',
        textField: 'groupname',
        param:param,
        onSelect: function (value) {
            if(value!=""){
                var myparam = {"groupid": value};
                comm_initCompany(myparam);
            }
        }
    });
    if(g_item.groupid){
        $("#groupid").bootstrapSelect("setValue",g_item.groupid);
    }
}
function comm_initCompany(param) {
    $("#companyid").bootstrapSelect({
        url: '/graindepot-base/selector/companyList',
        type: 'GET',
        valueField: 'companyid',
        textField: 'companyname',
        param:param,
        onSelect: function (value) {
            var myparam;
            if(value!=""){
                myparam = {"companyid": value};
                comm_initGraindepot(myparam);
            }
        }
    });
    if(g_item.companyid){
        $("#companyid").bootstrapSelect("setValue",g_item.companyid);
    }
}
function comm_initGraindepot(param) {
    $("#graindepotid").bootstrapSelect({
        url: '/graindepot-base/selector/graindepotList',
        type: 'GET',
        valueField: 'graindepotid',
        textField: 'graindepotname',
        param:param
    });
    if(g_item.graindepotid){
        $("#graindepotid").bootstrapSelect("setValue",g_item.graindepotid);
    }
}
function comm_initTrader() {
    $("#traderid").bootstrapSelect({
        url: '/graindepot-base/selector/traderList',
        type: 'GET',
        valueField: 'traderid',
        textField: 'tradername'
    });
    if(g_item.traderid){
        $("#traderid").bootstrapSelect("setValue",g_item.traderid);
    }
}
function comm_initStorage(param) {
    $("#storageid").bootstrapSelect({
        url: '/graindepot-base/selector/storageList',
        type: 'GET',
        valueField: 'storageid',
        textField: 'storagename',
        param:param
    });
    if(g_item.storageid){
        $("#storageid").bootstrapSelect("setValue",g_item.storageid);
    }
}
function comm_initStorageType(param) {
    $("#storagetypeid").bootstrapSelect({
        url: '/graindepot-base/selector/storagetypeList',
        type: 'GET',
        valueField: 'storagetypeid',
        textField: 'storagetypename',
        param:param
    });
    if(g_item.storagetypeid){
        $("#storagetypeid").bootstrapSelect("setValue",g_item.storagetypeid);
    }
}
function comm_initStorageStructure(param) {
    $("#storagestructureid").bootstrapSelect({
        url: '/graindepot-base/selector/storagestructureList',
        type: 'GET',
        valueField: 'storagestructureid',
        textField: 'storagestructurename',
        param:param
    });
    if(g_item.storagestructureid){
        $("#storagestructureid").bootstrapSelect("setValue",g_item.storagestructureid);
    }
}
function comm_initStoragestatus(param) {
    var data = [{'value': 1, 'text': '完全可用 '}, {'value': 2, 'text': '需大修'},
        {'value': 3, 'text': '待报废'}, {'value': 4, 'text': '待拆除'},
        {'value': 5, 'text': '死角仓'}, {'value': 6, 'text': '其他'}];
    $("#storagestatus").bootstrapSelect({
        data: data,
        valueField: 'value',
        textField: 'text'
    });
    if(g_item.storagestatus){
        $("#storagestatus").bootstrapSelect("setValue",g_item.storagestatus);
    }
}
function comm_initSettle() {
    $("#settleid").bootstrapSelect({
        url: '/graindepot-base/selector/settleList',
        type: 'GET',
        valueField: 'settleid',
        textField: 'settlename'
    });
    if(g_item.settleid){
        $("#settleid").bootstrapSelect("setValue",g_item.settleid);
    }
}
function comm_initContract(param) {
    $("#contractid").bootstrapSelect({
        url: '/graindepot-inout/selectorInout/contractByMap',
        type: 'GET',
        valueField: 'contractid',
        textField: 'contractno',
        param: param
    });
    if(g_item.contractid){
        $("#contractid").bootstrapSelect("setValue",g_item.contractid);
    }
}
function comm_initAccount(param) {
    $("#accid").bootstrapSelect({
        url: '/graindepot-base/selector/accountList',
        type: 'GET',
        valueField: 'accid',
        textField: 'accname',
        param: param
    });
    if(g_item.accid){
        $("#accid").bootstrapSelect("setValue",g_item.accid);
    }
}
function comm_initCompanynature(){
    var data = [{value: 1, text: "国有企业"}, {value: 2, text: "民营企业"}, {value: 3, text: "其他内资企业"},
        {value: 4, text: "港澳台商投资企业"}, {value: 5, text: "外商投资企业"},
        {value: 6, text: "事业单位"},{value: 99, text: "其他"}];
    $("#companynatureid").bootstrapSelect({
        data: data,
        valueField: 'value',
        textField: 'text'
    });
    if(g_item.companynatureid){
        $("#companynatureid").bootstrapSelect("setValue",g_item.companynatureid);
    }
}
function comm_initCompanytype(){
    var data = [{value: 1, text: "仓储企业"}, {value: 2, text: "加工企业"}, {value: 3, text: "批发企业"},
        {value: 4, text: "物流公司"}, {value: 5, text: "零售企业"},
        {value: 6, text: "军供站"},{value: 7, text: "事业单位"},{value: 99, text: "其他"}];
    $("#companytypeid").bootstrapSelect({
        data: data,
        valueField: 'value',
        textField: 'text'
    });
    if(g_item.companytypeid){
        $("#companytypeid").bootstrapSelect("setValue",g_item.companytypeid);
    }
}
//判断是否为数字
function isNumber(val) {
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if (regPos.test(val) || regNeg.test(val)) {
        return true;
    } else {
        return false;
    }
}