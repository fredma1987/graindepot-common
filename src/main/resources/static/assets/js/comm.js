//
function doJump(url) {
    window.open(url, "_self");
}
document.onkeydown=function mykeydown()
{
    var tagName = event.srcElement.tagName.toUpperCase();
    var isInput=('INPUT'==tagName||'TEXTAREA'==tagName||'TEXT'==tagName);
    if(isInput){
        if (document.activeElement.readOnly == false)
            return true;
        else
            return false;
    }
    if (event.keyCode == 8)
    {
        if (document.activeElement.type == "text")
        {
            if (document.activeElement.readOnly == false)
                return true;
        }
        return false;
    }
};
//日期格式化
Date.prototype.Format = function (fmt) {
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
            json = result;
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

//读Cookie
function getCookie(objName) {//获取指定名称的cookie的值
    var arrStr = document.cookie.split(";");
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0] == objName){
            return unescape(temp[1]);
        }
    }
    return "";
}
//设置cookie的值
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + escape(cvalue) + ";" + expires;
}

function comm_initInspresult() {
    var data = [{value: 1, text: "待检"}, {value: 2, text: "接收"}, {value: 3, text: "不接收"}];
    $("#inspresult").bootstrapSelect({
        data: data,
        valueField: 'value',
        textField: 'text',
        defaultValue: 1
    });
    try {
        if (g_item.inspresult) {
            $("#inspresult").bootstrapSelect("setValue", g_item.inspresult);
        }
    } catch (e) {

    }
}

function comm_initGrain() {
    $("#grainid").bootstrapSelect({
        url: '/graindepot-base/selector/grainList',
        type: 'GET',
        valueField: 'grainid',
        textField: 'grainname'
    });
    try {
        if (g_item.grainid) {
            $("#grainid").bootstrapSelect("setValue", g_item.grainid);
        }
    } catch (e) {

    }
}

function comm_initGrainattr() {
    $("#grainattrid").bootstrapSelect({
        url: '/graindepot-base/selector/grainattrList',
        type: 'GET',
        valueField: 'grainattrid',
        textField: 'grainattrname'
    });
    try {
        if (g_item.grainattrid) {
            $("#grainattrid").bootstrapSelect("setValue", g_item.grainattrid);
        }
    } catch (e) {

    }
}

function comm_initDefGrain() {
    $("#defgrainid").bootstrapSelect({
        url: '/graindepot-base/selector/grainList',
        type: 'GET',
        valueField: 'grainid',
        textField: 'grainname'
    });
    try {
        if (g_item.defgrainid) {
            $("#defgrainid").bootstrapSelect("setValue", g_item.defgrainid);
        }
    } catch (e) {

    }
}

function comm_initDefGrainattr() {
    $("#defgrainattrid").bootstrapSelect({
        url: '/graindepot-base/selector/grainattrList',
        type: 'GET',
        valueField: 'grainattrid',
        textField: 'grainattrname'
    });
    try {
        if (g_item.defgrainattrid) {
            $("#defgrainattrid").bootstrapSelect("setValue", g_item.defgrainattrid);
        }
    } catch (e) {

    }
}

function comm_initGrade() {
    var data = [{value: 1, text: "一等"}, {value: 2, text: "二等"}, {value: 3, text: "三等"}
        , {value: 4, text: "四等"}, {value: 5, text: "五等"}, {value: 6, text: "等外"}];
    $("#grade").bootstrapSelect({
        data: data,
        valueField: 'value',
        textField: 'text',
        defaultValue: 3
    });
    try {
        if (g_item.grade) {
            $("#grade").bootstrapSelect("setValue", g_item.grade);
        }
    } catch (e) {

    }
}

function comm_initSettlemothod() {
    var data = [{value: 1, text: "现金结算"}, {value: 2, text: "银行卡结算"}, {value: 3, text: "微信结算"}, {
        value: 4,
        text: "支付宝结算"
    }];
    $("#settlemothod").bootstrapSelect({
        data: data,
        valueField: 'value',
        textField: 'text',
        defaultValue: 1
    });
    try {
        if (g_item.settlemothod) {
            $("#settlemothod").bootstrapSelect("setValue", g_item.settlemothod);
        }
    } catch (e) {

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
    try {
        if (g_item.trucktype) {
            $("#trucktype").bootstrapSelect("setValue", g_item.trucktype);
        }
    } catch (e) {

    }
}

function comm_initTaxnature() {
    var data = [{value: 1, text: "小规模纳税人"}, {value: 2, text: "一般纳税人"}];
    $("#taxnature").bootstrapSelect({
        data: data,
        valueField: 'value',
        textField: 'text'
    });
    try {
        if (g_item.taxnature) {
            $("#taxnature").bootstrapSelect("setValue", g_item.taxnature);
        }
    } catch (e) {

    }
}

function comm_initProvince(param) {
    $("#provinceid").bootstrapSelect({
        url: '/graindepot-base/selector/provinceList',
        type: 'GET',
        valueField: 'provinceid',
        textField: 'provincename',
        param: param,
        onSelect: function (value) {
            var myparam;
            if (value != "") {
                myparam = {"provinceid": value};
                comm_initCity(myparam);
                comm_initGroup(myparam);
                comm_initCompany(myparam);
            }
        }
    });
    try {
        if (g_item.provinceid) {
            $("#provinceid").bootstrapSelect("setValue", g_item.provinceid);
        }
    } catch (e) {

    }
}

function comm_initCity(param) {
    $("#cityid").bootstrapSelect({
        url: '/graindepot-base/selector/cityList',
        type: 'GET',
        valueField: 'cityid',
        textField: 'cityname',
        param: param,
        onSelect: function (value) {
            if (value != "") {
                var myparam = {"cityid": value};
                comm_initCounty(myparam);
                comm_initGroup(myparam);
                comm_initCompany(myparam);
            }
        }
    });
    try {
        if (g_item.cityid) {
            $("#cityid").bootstrapSelect("setValue", g_item.cityid);
        }
    } catch (e) {

    }
}

function comm_initCounty(param) {
    $("#countyid").bootstrapSelect({
        url: '/graindepot-base/selector/countyList',
        type: 'GET',
        valueField: 'countyid',
        textField: 'countyname',
        param: param,
        onSelect: function (value) {
            var myparam;
            if (value != "") {
                myparam = {"countyid": value};
                comm_initGroup(myparam);
                comm_initCompany(myparam);
            }
        }
    });
    try {
        if (g_item.countyid) {
            $("#countyid").bootstrapSelect("setValue", g_item.countyid);
        }
    } catch (e) {

    }
}

function comm_initGroup(param) {
    $("#groupid").bootstrapSelect({
        url: '/graindepot-base/selector/groupList',
        type: 'GET',
        valueField: 'groupid',
        textField: 'groupname',
        param: param,
        onSelect: function (value) {
            if (value != "") {
                var myparam = {"groupid": value};
                comm_initCompany(myparam);
            }
        }
    });
    try {
        if (g_item.groupid) {
            $("#groupid").bootstrapSelect("setValue", g_item.groupid);
        }
    } catch (e) {

    }
}

function comm_initCompany(param) {
    $("#companyid").bootstrapSelect({
        url: '/graindepot-base/selector/companyList',
        type: 'GET',
        valueField: 'companyid',
        textField: 'companyname',
        param: param,
        onSelect: function (value) {
            var myparam;
            if (value != "") {
                myparam = {"companyid": value};
                comm_initGraindepot(myparam);
            }
        }
    });
    try {
        if (g_item.companyid) {
            $("#companyid").bootstrapSelect("setValue", g_item.companyid);
        }
    } catch (e) {

    }
}

function comm_initGraindepot(param) {
    $("#graindepotid").bootstrapSelect({
        url: '/graindepot-base/selector/graindepotList',
        type: 'GET',
        valueField: 'graindepotid',
        textField: 'graindepotname',
        param: param
    });
    try {
        if (g_item.graindepotid) {
            $("#graindepotid").bootstrapSelect("setValue", g_item.graindepotid);
        }
    } catch (e) {

    }
}

function comm_initTrader() {
    $("#traderid").bootstrapSelect({
        url: '/graindepot-base/selector/traderList',
        type: 'GET',
        valueField: 'traderid',
        textField: 'tradername'
    });
    try {
        if (g_item.traderid) {
            $("#traderid").bootstrapSelect("setValue", g_item.traderid);
        }
    } catch (e) {

    }
}

function comm_initStorage(param) {
    $("#storageid").bootstrapSelect({
        url: '/graindepot-base/selector/storageList',
        type: 'GET',
        valueField: 'storageid',
        textField: 'storagename',
        param: param
    });
    try {
        if (g_item.storageid) {
            $("#storageid").bootstrapSelect("setValue", g_item.storageid);
        }
    } catch (e) {

    }
}

function comm_initStorageType(param) {
    $("#storagetypeid").bootstrapSelect({
        url: '/graindepot-base/selector/storagetypeList',
        type: 'GET',
        valueField: 'storagetypeid',
        textField: 'storagetypename',
        param: param
    });
    try {
        if (g_item.storagetypeid) {
            $("#storagetypeid").bootstrapSelect("setValue", g_item.storagetypeid);
        }
    } catch (e) {

    }
}

function comm_initStorageStructure(param) {
    $("#storagestructureid").bootstrapSelect({
        url: '/graindepot-base/selector/storagestructureList',
        type: 'GET',
        valueField: 'storagestructureid',
        textField: 'storagestructurename',
        param: param
    });
    try {
        if (g_item.storagestructureid) {
            $("#storagestructureid").bootstrapSelect("setValue", g_item.storagestructureid);
        }
    } catch (e) {

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
    try {
        if (g_item.storagestatus) {
            $("#storagestatus").bootstrapSelect("setValue", g_item.storagestatus);
        }
    } catch (e) {

    }
}

function comm_initSettle() {
    $("#settleid").bootstrapSelect({
        url: '/graindepot-base/selector/settleList',
        type: 'GET',
        valueField: 'settleid',
        textField: 'settlename'
    });
    try {
        if (g_item.settleid) {
            $("#settleid").bootstrapSelect("setValue", g_item.settleid);
        }
    } catch (e) {

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
    try {
        if (g_item.contractid) {
            $("#contractid").bootstrapSelect("setValue", g_item.contractid);
        }
    } catch (e) {

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
    try {
        if (g_item.accid) {
            $("#accid").bootstrapSelect("setValue", g_item.accid);
        }
    } catch (e) {

    }
}

function comm_initCompanynature() {
    var data = [{value: 1, text: "国有企业"}, {value: 2, text: "民营企业"}, {value: 3, text: "其他内资企业"},
        {value: 4, text: "港澳台商投资企业"}, {value: 5, text: "外商投资企业"},
        {value: 6, text: "事业单位"}, {value: 99, text: "其他"}];
    $("#companynatureid").bootstrapSelect({
        data: data,
        valueField: 'value',
        textField: 'text'
    });
    try {
        if (g_item.companynatureid) {
            $("#companynatureid").bootstrapSelect("setValue", g_item.companynatureid);
        }
    } catch (e) {

    }
}

function comm_initCompanytype() {
    var data = [{value: 1, text: "仓储企业"}, {value: 2, text: "加工企业"}, {value: 3, text: "批发企业"},
        {value: 4, text: "物流公司"}, {value: 5, text: "零售企业"},
        {value: 6, text: "军供站"}, {value: 7, text: "事业单位"}, {value: 99, text: "其他"}];
    $("#companytypeid").bootstrapSelect({
        data: data,
        valueField: 'value',
        textField: 'text'
    });
    try {
        if (g_item.companytypeid) {
            $("#companytypeid").bootstrapSelect("setValue", g_item.companytypeid);
        }
    } catch (e) {

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

//16进制和中文互转
function writeUTF(str, isGetBytes) {
    var back = [];
    var byteSize = 0;
    for (var i = 0; i < str.length; i++) {
        var code = str.charCodeAt(i);
        if (0x00 <= code && code <= 0x7f) {
            byteSize += 1;
            back.push(code);
        } else if (0x80 <= code && code <= 0x7ff) {
            byteSize += 2;
            back.push((192 | (31 & (code >> 6))));
            back.push((128 | (63 & code)))
        } else if ((0x800 <= code && code <= 0xd7ff)
            || (0xe000 <= code && code <= 0xffff)) {
            byteSize += 3;
            back.push((224 | (15 & (code >> 12))));
            back.push((128 | (63 & (code >> 6))));
            back.push((128 | (63 & code)))
        }
    }
    for (i = 0; i < back.length; i++) {
        back[i] &= 0xff;
    }
    if (isGetBytes) {
        return back
    }
    if (byteSize <= 0xff) {
        return [0, byteSize].concat(back);
    } else {
        return [byteSize >> 8, byteSize & 0xff].concat(back);
    }
}


function readUTF(arr) {
    if (typeof arr === 'string') {
        return arr;
    }
    var UTF = '', _arr = arr;
    for (var i = 0; i < _arr.length; i++) {
        var one = _arr[i].toString(2),
            v = one.match(/^1+?(?=0)/);
        if (v && one.length == 8) {
            var bytesLength = v[0].length;
            var store = _arr[i].toString(2).slice(7 - bytesLength);
            for (var st = 1; st < bytesLength; st++) {
                store += _arr[st + i].toString(2).slice(2)
            }
            UTF += String.fromCharCode(parseInt(store, 2));
            i += bytesLength - 1
        } else {
            UTF += String.fromCharCode(_arr[i])
        }
    }
    return UTF
}


function toUTF8Hex(str) {
    var charBuf = writeUTF(str, true);
    var re = '';
    for (var i = 0; i < charBuf.length; i++) {
        var x = (charBuf[i] & 0xFF).toString(16);
        if (x.length === 1) {
            x = '0' + x;
        }
        re += x;
    }
    return re;
}


function utf8HexToStr(str) {
    var buf = [];
    for (var i = 0; i < str.length; i += 2) {
        buf.push(parseInt(str.substring(i, i + 2), 16));
    }
    return readUTF(buf);
}

//将16进制补全成32位,不足的则补0
function to32(hex) {
    if (hex.length < 32) {
      var a=32-hex.length;
      for (var i=0;i<a;i++){
          hex+=0;
      }
    }
    return hex;
}

String.prototype.replaceAll=function(f,e){//吧f替换成e
    var reg=new RegExp(f,"g"); //创建正则RegExp对象
    return this.replace(reg,e);
}

//自动转换数字金额为大小写中文字符,返回大小写中文字符串，最大处理到999兆
function changeNumberToChinese (money) {
    var cnNums = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"]; //汉字的数字
    var cnIntRadice = ["", "拾", "佰", "仟"]; //基本单位
    var cnIntUnits = ["", "万", "亿", "兆"]; //对应整数部分扩展单位
    var cnDecUnits = ["角", "分", "毫", "厘"]; //对应小数部分单位
    var cnInteger = "整"; //整数金额时后面跟的字符
    var cnIntLast = "元"; //整型完以后的单位
    var maxNum = 999999999999999.9999; //最大处理的数字

    var IntegerNum; //金额整数部分
    var DecimalNum; //金额小数部分
    var ChineseStr = ""; //输出的中文金额字符串
    var parts; //分离金额后用的数组，预定义

    if (money == "") {
        return "";
    }

    money = parseFloat(money);
    //alert(money);
    if (money >= maxNum) {
        $.alert('超出最大处理数字');
        return "";
    }
    if (money == 0) {
        ChineseStr = cnNums[0] + cnIntLast + cnInteger;
        //document.getElementById("show").value=ChineseStr;
        return ChineseStr;
    }
    money = money.toString(); //转换为字符串
    if (money.indexOf(".") == -1) {
        IntegerNum = money;
        DecimalNum = '';
    } else {
        parts = money.split(".");
        IntegerNum = parts[0];
        DecimalNum = parts[1].substr(0, 4);
    }
    if (IntegerNum.length < 5) {
        var o = '';
        for (var i = 0; i < 5 - IntegerNum.length; i++) {
            o = '0'.concat(o)
        }
        IntegerNum = o.concat(IntegerNum)
    }
    if (DecimalNum.length < 2) {
        var o = '';
        for (var i = 0; i < 2 - DecimalNum.length; i++) {
            o = o.concat('0');
        }
        DecimalNum = DecimalNum.concat(o)
    }


    //if (parseInt(IntegerNum, 10) > 0) {//获取整型部分转换
    zeroCount = 0;
    IntLen = IntegerNum.length;
    for (i = 0; i < IntLen; i++) {
        n = IntegerNum.substr(i, 1);
        p = IntLen - i - 1;
        q = p / 4;
        m = p % 4;

        ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];

        /*if (n == "0") {
         zeroCount++;
         } else {
         if (zeroCount > 0) {
         ChineseStr += cnNums[0];
         }
         zeroCount = 0; //归零
         ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
         }*/
        if (m == 0 && zeroCount < 4) {
            ChineseStr += cnIntUnits[q];
        }
    }
    ChineseStr += cnIntLast;
    //整型部分处理完毕
    //}
    if (DecimalNum != '') {//小数部分
        decLen = DecimalNum.length;
        for (i = 0; i < decLen; i++) {
            n = DecimalNum.substr(i, 1);
            ChineseStr += cnNums[Number(n)] + cnDecUnits[i];
            /*if (n != '0') {
             ChineseStr += cnNums[Number(n)] + cnDecUnits[i];
             }*/
        }
    }
    if (ChineseStr == '') {
        ChineseStr += cnNums[0] + cnIntLast + cnInteger;
    }
    else if (DecimalNum == '') {
        ChineseStr += cnInteger;
    }
    return ChineseStr;

}

function changeNumberToChineseMap (money) {
    var c_paymoney=changeNumberToChinese (money);
    var new_arr;
    var wan_arr = c_paymoney.split("万");
    var wan;
    if (wan_arr.length > 1) {
        wan = wan_arr[0];
        new_arr = wan_arr[1];
    } else {
        wan = "";
        new_arr = wan_arr[0];
    }

    var qian_arr = new_arr.split("仟");
    var qian;
    if (qian_arr.length > 1) {
        qian = qian_arr[0];
        new_arr = qian_arr[1];
    } else {
        qian = "";
        new_arr = qian_arr[0];
    }

    var bai_arr = new_arr.split("佰");
    var bai;
    if (bai_arr.length > 1) {
        bai = bai_arr[0];
        new_arr = bai_arr[1];
    } else {
        bai = "";
        new_arr = bai_arr[0];
    }

    var shi_arr = new_arr.split("拾");
    var shi;
    if (shi_arr.length > 1) {
        shi = shi_arr[0];
        new_arr = shi_arr[1];
    } else {
        shi = "";
        new_arr = shi_arr[0];
    }

    var yuan_arr = new_arr.split("元");
    var yuan;
    if (yuan_arr.length > 1) {
        yuan = yuan_arr[0];
        new_arr = yuan_arr[1];
    } else {
        yuan = "";
        new_arr = yuan_arr[0];
    }

    var jiao_arr = new_arr.split("角");
    var jiao;
    if (jiao_arr.length > 1) {
        jiao = jiao_arr[0];
        new_arr = jiao_arr[1];
    } else {
        jiao = "";
        new_arr = jiao_arr[0];
    }

    var fen_arr = new_arr.split("分");
    var fen;
    if (fen_arr.length > 1) {
        fen = fen_arr[0];
        new_arr = fen_arr[1];
    } else {
        fen = "";
        new_arr = fen_arr[0];
    }

    return {
        wan:wan,
        qian:qian,
        bai:bai,
        shi:shi,
        ge:yuan,
        xiao1:jiao,
        xiao2:fen
    }




}