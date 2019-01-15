//
function doJump(url) {
    window.open(url, "_self");
}

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