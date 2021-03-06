/*$("#city").bootstrapSelect({
 url:'/tableListPost',  //数据请求
 type:'POST',      //获取方式 默认GET
 valueField: 'id',  //获取值时的取值key
 textField: 'username',  //页面展示时的key
 multiple:true //多选  默认关闭
 all:true //展示全部选项 默认打开
 search:true  //带上搜索功能 默认打开
 onSelect: function (value, item) {    //监听选择下拉框数据事件
 console.log(value)
 console.log(item)
 }
 onLoadSuccess: function (item, data) {    //加载完成
 console.log(value)
 console.log(item)
 }
 });*/

$.fn.bootstrapSelect = function (options, param) {
    if (typeof options == 'string') {
        return $.fn.bootstrapSelect.methods[options](this, param);
    }
    //将调用时候传过来的参数和default参数合并
    options = $.extend({}, $.fn.bootstrapSelect.defaults, options || {});
    var target = $(this);
    target.attr("settings", JSON.stringify(options));
    if (!target.hasClass("selectpicker")) target.addClass("selectpicker");
    target.attr('valuefield', options.valueField);
    target.attr('textfield', options.textField);
    if (options.multiple) {
        target.attr('multiple', '');
    }
    if (options.search) {
        target.attr('data-live-search', "true");
    }
    //清空下拉框
    target.empty();
    //加入请选择选项
    if (options.all) {
        var option = $('<option>' + options.placeholder + '</option>');
        option.attr('value', "");
        option.text(options.placeholder);
        target.append(option);
    }
    //4.判断用户传过来的参数列表里面是否包含数据data数据集，如果包含，不用发ajax从后台取，否则否送ajax从后台取数据
    if (options.data) {
        init(target, options.data, options);
    } else {
        if (!options.url) return;
        $.ajax({
            url: options.url,
            type: options.type,
            data: options.param,
            async: false,
            success: function (data) {
                init(target, data, options);
            }
        })
    }


    function init(target, data, options) {
        if (data.length > 0) {
            $.each(data, function (i, item) {
                var option = $('<option></option>');
                option.attr('value', item[options.valueField]);
                option.text(item[options.textField]);
                if (options.attr) {
                    for (var a in options.attr) {
                        option.attr(a, item[options.attr[a]]);
                    }
                }

                target.append(option);
            });
        }
        //加入点击事件
        if (options.onSelect) {
            // target.unbind("change");
            target.change(function () {
                if (data.length > 0) {
                    var currSelected = data.filter(function (curr) {
                        return curr[options.valueField] == target.val()
                    });
                    options.onSelect(target.val(), currSelected[0], target)
                } else {
                    options.onSelect(target.val(), null, target)
                }

            });
        }
        if (options.defaultValue != null && options.defaultValue != "") {
            if (options.multiple) {
                var arr = options.defaultValue.split(',');
                target.selectpicker('val', arr);
            } else {
                target.selectpicker('val', options.defaultValue);
            }

        }
        target.selectpicker('refresh');
        var val = target.attr("value");
        if (val != "") {
            if (options.multiple) {
                var arr = val.split(',');
                target.selectpicker('val', arr);
            } else {
                target.selectpicker('val', val);
            }
        }
        options.onLoadSuccess(target, data);

    }

};

$.fn.bootstrapSelect.methods = {
    getValue: function (jq) {
        var val = jq.val();
        val = val ? val : undefined;
        return val;
    },
    getText: function (jq) {
        var text = $(jq.selector + "  option:selected").text();
        text = text ? text : undefined;
        return text;
    },
    setValue: function (jq, param) {
        var settingStr = jq.attr("settings");
        var settings = JSON.parse(settingStr ? settingStr : "{}");
        if (settings.multiple) {
            var arr = param.split(',');
            jq.selectpicker('val', arr);
        } else {
            jq.selectpicker('val', param);
        }
        //      jq.trigger("change");
        //jq.selectpicker('refresh');
    },
    empty: function (jq, param) {
        jq.bootstrapSelect({
            data: []
        });
        jq.selectpicker('refresh');
    },
    reload: function (jq) {
        var settings = jq.attr("settings");
        if (settings) {
            jq.bootstrapSelect(JSON.parse(settings))
        }

    },
    getData: function (jg) {
        var settings = jq.attr("settings");
        var options = JSON.parse(settings);
        if (options.data) {
            return options.data;
        } else {
            var result;
            $.ajax({
                url: options.url,
                type: options.type,
                data: options.param,
                async: false,
                success: function (data) {
                    result = data
                }
            });
            return result;
        }
    }
};

$.fn.bootstrapSelect.defaults = {
    type: 'GET',
    multiple: false,
    search: true,
    all: true,
    placeholder: '请选择',
    defaultValue: '',//默认值
    onLoadSuccess: function (item, data) {

    }
};

//=============================dataTables=========================================
$.fn.bootstrapTable = function (options, param) {
    var target = this;
    if (typeof options == 'string') {
        return $.fn.bootstrapTable.methods[options](this, param);
    }
    //将调用时候传过来的参数和default参数合并
    options = $.extend({}, $.fn.bootstrapTable.defaults, options || {});
    if (options.showLengthMenu) {
        options.dom = 'rt<"row"<"col-sm-2"i><"col-sm-3 myTableLength"l><"col-sm-7 myPaging"p>>'
    }
    //加入序号列和选择框
    /*var lastTr = $(target.selector + " tr:last");
     var lastTrHtml = lastTr.html();
     if (options.showCheckbox) {
     lastTrHtml = '<th class="center"></th>' +
     '<th class="center">' +
     '<label>' +
     '<input type="checkbox" class="ace"/>' +
     '<span class="lbl"></span>' +
     '</label>' +
     '</th>' + lastTrHtml;

     } else {
     lastTrHtml = '<th class="center"></th>' + lastTrHtml;
     }

     lastTr.html(lastTrHtml);*/


    if (options.showCheckbox) {
        options.columns.unshift({
            data: null,
            className: 'center',
            render: function (data) {
                return '<label>' +
                    '<input type="checkbox" class="ace fixed"/>' +
                    '<span class="lbl"></span>' +
                    '</label>';
            }
        });
    }

    options.columns.unshift({
        data: null,
        className: 'text-center whiteSpace',
        render: function (data, type, row, meta) {
            return meta.row + 1 + meta.settings._iDisplayStart;
        }
    });


    var item = target.DataTable(options);
    try {
        return item;
    } finally {
        //加载完成后绑定checkbox
        this.on('init.dt', function () {
            $(target.selector + ' th input:checkbox').on('click', function () {
                var that = this;
                $(this).closest('table').find('input:checkbox')
                    .each(function () {
                        this.checked = that.checked;
                        $(this).closest('input:checkbox').toggleClass('checked');
                    });

            });
            /*$(target.selector + '_wrapper th input:checkbox').on('click', function () {
             var that = this;
             $(this).closest('.dataTables_scrollHead').next().find('input:checkbox')
             .each(function () {
             this.checked = that.checked;
             $(this).closest('input:checkbox').toggleClass('checked');
             });

             });*/
            // var rowWidth = $("#" + this.id + "_wrapper .dataTables_scrollHeadInner").width();
            var rowWidth = $("#" + this.id).width();
            $("#" + this.id + "_wrapper .row").css("width", (rowWidth - 1) + "px")
            $(target.selector + ' th input:checkbox').removeAttr('checked');
        });

        this.on('page.dt', function () {
            /*$(target.selector + '_wrapper th input:checkbox').removeAttr('checked');*/
            $(target.selector + ' th input:checkbox').removeAttr('checked');
        });

    }

};

$.fn.bootstrapTable.methods = {
    //获取所有数据
    getAll: function (jq) {
        var result = [];
        var table = jq.DataTable();
        if (table.rows(0)[0] != "") {
            table.rows()[0].forEach(function (curr, index) {
                result.push(table.row(index).data());
            });
        }
        return result;
    },
    //获取被选中数据
    getChecked: function (jq) {
        var result = [];
        var table = jq.DataTable();
        if (table.rows(0)[0] != "") {
            table.rows()[0].forEach(function (curr, index) {
                if ($($(table.row(index).node()).find('input:checkbox:first').get(0)).prop('checked')) {
                    result.push(table.row(index).data())
                }
            });
        }
        return result;
    },
    //刷新数据
    reload: function (jq, flag) {
        var table = jq.DataTable();
        if (flag) {
            table.draw('page');
        } else {
            table.draw();
        }

    },
    //页面删除，非数据库真删除
    remove: function (jq) {
        var table = jq.DataTable();
        if (table.rows(0)[0] != "") {
            table.rows()[0].forEach(function (curr, index) {
                if ($($(table.row(index).node()).find('input:checkbox:first').get(0)).prop('checked')) {
                    $($(table.row(index).node()).find('input:checkbox:first').get(0)).removeProp('checked');//去除原来选中的属性
                    $(table.row(index).node()).remove();
                }
            });
        }

    },
    //更新指定行
    updateRow: function (jq, param) {
        var index = param.index;
        var data = param.data;
        var table = jq.DataTable();
        var columnSettings = table.settings()[0].aoColumns;
        $(table.row(index).node()).find("td").each(function (idx, curr) {
            var target = $(this);
            var cb = target.find('input:checkbox:first');
            if (cb && $(cb.get(0)).hasClass("fixed")) {
            } else {
                var columnSetting = columnSettings[idx];
                var render = columnSetting.render;
                if (render) {
                    target.html(render(data[columnSetting.data], "display"
                        , data, {col: idx, row: index, settings: table.settings()[0]}))
                } else {
                    target.html(data[columnSetting.data])
                }
            }

        });
        var obj = table.row(index).data();
        for (var i in obj) {
            if (data[i] != null) {
                obj[i] = data[i]
            }
        }
    },
    //获取被选中数据和索引
    getCheckedWithIndex: function (jq) {
        var result = [];
        var table = jq.DataTable();
        if (table.rows(0)[0] != "") {
            table.rows()[0].forEach(function (curr, index) {
                if ($($(table.row(index).node()).find('input:checkbox:first').get(0)).prop('checked')) {
                    result.push({
                        index: index,
                        data: table.row(index).data()
                    })
                }
            });
        }
        return result;
    },
    //修改页面数据
    /*editRow: function (jq, param) {
        debugger;
        var index = param;//修改哪一行
        var table = jq.DataTable();
        var columnSettings = table.settings()[0].aoColumns;
        $(table.row(index).node()).find("td").each(function (idx, curr) {
            var target = $(this);
            var cb = target.find('input:checkbox:first');
            if (cb && $(cb.get(0)).hasClass("fixed")) {
            } else {
                var columnSetting = columnSettings[idx];
                var editOption=columnSetting.edit;
                if (editOption){
                    if (editOption.type=="bootstrapSelect") {
                        var html='<select id="authority" name="authority" class="form-control">\n' +
                            '                        </select>'
                        target.html(target.bootstrapSelect(editOption.options))
                    }


                }
            }

        });
    }*/
};

$.fn.bootstrapTable.defaults = {
    //这样配置后，即可用DT的API来访问表格数据
    dom: 'rt<"row"<"col-sm-5"i><"col-sm-7 myPaging"p>>',
    url: 'GET',
    processing: false,
    iDisplayLength: 15,
    showCheckbox: true,
    serverSide: true,//开启服务器模式
    ordering: false,// 禁止排序
    //scrollX: true,
    // scrollY: true,
    showLengthMenu: false,//关闭显示每页显示几行操作
    lengthMenu: [15, 30, 45, 60, 75],
    language: {
        url: '/assets/json/Chinese.json'
    }
};

//封装bootbox.js
//=============================bootbox.js=========================================
$.bootstrapBox = {
    confirm: {
        init: function (obj) {
            bootbox.confirm({
                title: obj.title ? obj.title : "提示",
                message: obj.message,
                buttons: {
                    confirm: {
                        label: '<i class="icon-check align-top bigger-125"></i> 确认'
                    },
                    cancel: {
                        label: '<i class="icon-ban-circle align-top bigger-125"></i> 取消'
                    }
                },
                callback: function (result) {
                    obj.callback(result)
                }
            });
        }
    },
    dialog: {
        init: function (obj) {
            var dialog = bootbox.dialog({
                title: obj.title,
                className: "my-modal",
                message: '<i class="icon-spinner icon-spin black bigger-125"></i>' + '  加载中',
                width: obj.width,
                height: obj.height
                //show:false
            });

            dialog.init(function () {
                dialog.find('.bootbox-body').html("<iframe name='" + obj.iframeName + "' width=100% height=100% frameborder='no'  noresize border=0 marginWidth=10 marginHeight=10 " +
                    "src='" + obj.url + "'></iframe>");
            });
            return dialog;
        },
        close: function () {
            $(".my-modal:last").modal("hide")

        }
    },
    alert: {
        init: function (obj) {
            bootbox.alert({
                message: obj.message,
                size: 'small'
            });
        }
    },
    prompt: {
        init: function (obj) {
            bootbox.prompt({
                title: obj.title,
                inputType: obj.inputType,
                inputOptions:obj.inputOptions,
                buttons: {
                    confirm: {
                        label: '<i class="icon-check align-top bigger-125"></i> 确认'
                    },
                    cancel: {
                        label: '<i class="icon-ban-circle align-top bigger-125"></i> 取消'
                    }
                },
                callback: function (result) {
                    obj.callback(result)
                }
            });
        }
    }
};


//日期选择框 选择日期时间
$.fn.bootstrapYear = function (options, param) {
    if (typeof options == 'string') {
        return $.fn.bootstrapYear.methods[options](this, param);
    }
    //将调用时候传过来的参数和default参数合并
    options = $.extend({}, $.fn.bootstrapYear.defaults, options || {});

    this.each(function (index, curr) {
        $(curr).datetimepicker(options);
    })


};

$.fn.bootstrapYear.methods = {
    //获取被选中数据
    getValue: function (jq) {
        return jq.val();
    },
    setValue: function (jq, date) {
        jq.datetimepicker('setDate', date);
    }
};
$.fn.bootstrapYear.defaults = {
    format: 'yyyy',
    weekStart: 1,
    todayBtn: 1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 4, //这里就设置了默认视图为年视图
    minView: 4, //设置最小视图为年视图
    forceParse: 0
};


//日期选择框 选择日期时间
$.fn.bootstrapDatetime = function (options, param) {
    if (typeof options == 'string') {
        return $.fn.bootstrapDatetime.methods[options](this, param);
    }
    //将调用时候传过来的参数和default参数合并
    options = $.extend({}, $.fn.bootstrapDatetime.defaults, options || {});

    this.each(function (index, curr) {
        $(curr).datetimepicker(options);
    })


};

$.fn.bootstrapDatetime.methods = {
    //获取被选中数据
    getValue: function (jq) {
        return jq.val();
    },
    setValue: function (jq, date) {
        jq.datetimepicker('setDate', date);
    }
};
$.fn.bootstrapDatetime.defaults = {
    format: 'yyyy-mm-dd hh:ii',
    weekStart: 1,
    todayBtn: 1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    forceParse: 0,
    showMeridian: 1
};

//日期选择框 选择日期
$.fn.bootstrapDate = function (options, param) {
    if (typeof options == 'string') {
        return $.fn.bootstrapDate.methods[options](this, param);
    }
    //将调用时候传过来的参数和default参数合并
    options = $.extend({}, $.fn.bootstrapDate.defaults, options || {});

    this.each(function (index, curr) {
        $(curr).datetimepicker(options);
    })

};

$.fn.bootstrapDate.methods = {
    //获取被选中数据
    getValue: function (jq) {
        return jq.val();
    },
    setValue: function (jq, date) {
        jq.datetimepicker('setDate', date);
    }
};
$.fn.bootstrapDate.defaults = {
    format: 'yyyy-mm-dd',
    weekStart: 1,
    todayBtn: 1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    minView: 2,
    forceParse: 0
};

//日期选择框 选择时间
$.fn.bootstrapTime = function (options, param) {
    if (typeof options == 'string') {
        return $.fn.bootstrapTime.methods[options](this, param);
    }
    //将调用时候传过来的参数和default参数合并
    options = $.extend({}, $.fn.bootstrapTime.defaults, options || {});

    this.each(function (index, curr) {
        $(curr).datetimepicker(options);
    })

};

$.fn.bootstrapDate.methods = {
    //bootstrapTime
    getValue: function (jq) {
        return jq.val();
    },
    setValue: function (jq, date) {
        jq.datetimepicker('setDate', date);
    }
};
$.fn.bootstrapTime.defaults = {
    format: 'hh:ii',
    weekStart: 1,
    todayBtn: 1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 1,
    minView: 0,
    maxView: 1,
    forceParse: 0
};

$.fn.bootstrapYear = function (options, param) {
    if (typeof options == 'string') {
        return $.fn.bootstrapYear.methods[options](this, param);
    }
    //将调用时候传过来的参数和default参数合并
    options = $.extend({}, $.fn.bootstrapYear.defaults, options || {});

    this.each(function (index, curr) {
        $(curr).datetimepicker(options);
    })


};

$.fn.bootstrapYear.methods = {
    //获取被选中数据
    getValue: function (jq) {
        return jq.val();
    },
    setValue: function (jq, date) {
        jq.datetimepicker('setDate', date);
    }
};
$.fn.bootstrapYear.defaults = {
    format: 'yyyy',
    weekStart: 1,
    todayBtn: 1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 4, //这里就设置了默认视图为年视图
    minView: 4, //设置最小视图为年视图
    forceParse: 0
};

//日期选择框 选择日期
$.fn.bootstrapNumber = function (options, param) {
    if (typeof options == 'string') {
        return $.fn.bootstrapNumber.methods[options](this, param);
    }
    //将调用时候传过来的参数和default参数合并
    options = $.extend({}, $.fn.bootstrapNumber.defaults, options || {});

    this.each(function (index, curr) {
        $(curr).ace_spinner(options);
        var value = $(curr).attr("value");
        $(curr).bootstrapNumber("setValue", value)
    })

};

$.fn.bootstrapNumber.methods = {
    //获取被选中数据
    getValue: function (jq) {
        return jq.val();
    },
    setValue: function (jq, date) {
        jq.val(date);
        jq.change();
    }
};
$.fn.bootstrapNumber.defaults = {
    value: 0,
    min: 0,
    max: 9999999999999999999999,
    step: 1,
    precision: 0,//保留几位小数
    on_sides: true,
    icon_up: 'icon-plus smaller-75',
    icon_down: 'icon-minus smaller-75',
    btn_up_class: 'btn-success',
    btn_down_class: 'btn-danger'
};


//=============================uploadify=========================================
$.fn.bootstrapUploadify = function (options, param) {
    //将调用时候传过来的参数和default参数合并
    if (typeof options == 'string') {
        return $.fn.bootstrapUploadify.methods[options](this, param);
    }
    options = $.extend({}, $.fn.bootstrapUploadify.defaults, options || {});
    options.trueUploadLimit = options.uploadLimit;
    var target = this;
    //记下当前input的value
    var fileStr = target.attr("value");

    //初始化
    if (options.buttonText) {
        options.buttonText = "<div>" + options.buttonText + "</div>"
    }
    var _doc = ["*.doc", "*.docx", "*.xls", "*.xlsx", "*.ppt", "*.pptx", "*.txt", "*.pdf"],
        _video = ["*.mp4", "*.flv", "*.wmv", "*.rmvb", '*.avi'],
        _scorm = ["*.zip"],
        _img = ["*.png", "*.bmp", "*.jpeg", "*.jpg", "*.gif", "*.psd", "*.tiff", "*.tga", "*.eps"];

    if (options.fileType) {
        switch (options.fileType) {
            case "img":
                options.fileTypeExts = _img.join(";");
                break;
            case "doc":
                options.fileTypeExts = _doc.join(";");
                break;
            case "video":
                options.fileTypeExts = _video.join(";");
                break;
            case "scorm":
                options.fileTypeExts = _scorm.join(";");
                break;
            default :
                options.fileTypeExts = "*.*";
                break;
        }
    }

    function isImage(type) {
        var _imgType = [".png", ".bmp", ".jpeg", ".jpg", ".gif", ".psd", ".tiff", ".tga", ".eps"]
        if ($.inArray(type, _imgType) > -1) {
            return true;
        } else {
            return false;
        }

    }

    function getIcon(type) {
        var _wordType = [".doc", ".docx"];
        var _excelType = [".xls", ".xlsx"];
        var _pptType = [".ppt", ".pptx"];
        var _txtType = [".txt"];
        var _pdfType = [".pdf"];
        var _videoType = [".mp4", ".flv", ".wmv", ".rmvb", '.avi'];
        var _zipType = ["*.zip"];
        if ($.inArray(type, _wordType) > -1) {
            return "/assets/images/uploadify/word.png";
        } else if ($.inArray(type, _excelType) > -1) {
            return "/assets/images/uploadify/excel.png";
        } else if ($.inArray(type, _pptType) > -1) {
            return "/assets/images/uploadify/ppt.png";
        } else if ($.inArray(type, _txtType) > -1) {
            return "/assets/images/uploadify/txt.png";
        } else if ($.inArray(type, _pdfType) > -1) {
            return "/assets/images/uploadify/pdf.png";
        } else if ($.inArray(type, _videoType) > -1) {
            return "/assets/images/uploadify/video.png";
        } else if ($.inArray(type, _zipType) > -1) {
            return "/assets/images/uploadify/zip.png";
        } else {
            return "/assets/images/uploadify/default.png";
        }


    }


    options.onUploadSuccess = function (file, data, response) {
        var that = this;
        console.log(file);
        console.log(data);
        console.log(response);
        var cancel = $("#" + file.id + " .cancel a");
        cancel.attr("href", "javaSrcipt:void()");
        cancel.click(function () {
            target.uploadify('cancel', file.id);
            target.removeClass(file.id);
        });
        var dataList = [];
        dataList.push(data);
        $.each(dataList, function (i, item) {
            var src = options.showUrlPrefix + item;
            var style = "width:80px;height:80px;";
            if (isImage(file.type)) {
                if (options.uploadLimit == 1) {
                    $("#" + options.showId).html(
                        '<div style="width: 33%;float: left" id="uploadify' + file.id + '">' +
                        '<img class=\"showImg ' + file.id + ' ' + "uploadify_show" + '\" src=\"' + src + '\"  filename=\"' + item + '\" style=\"' + style + '\">' +
                        '<a class="red" id="' + file.id + '"><i class="icon-trash bigger-130"></i></a>' +
                        '<a class="afileUpload">' + file.name + '</a>' +
                        '</div>'
                    )
                } else {
                    $("#" + options.showId).append(
                        '<div style="width: 33%;float: left" id="uploadify' + file.id + '">' +
                        '<img class=\"showImg ' + file.id + ' ' + "uploadify_show" + '\" src=\"' + src + '\"  filename=\"' + item + '\" style=\"' + style + '\">' +
                        '<a class="red" id="' + file.id + '"><i class="icon-trash bigger-130"></i></a>' +
                        '<a class="afileUpload">' + file.name + '</a>' +
                        '</div>'
                    )
                }
            } else {
                var icon = getIcon(file.type);

                if (options.uploadLimit == 1) {
                    $("#" + options.showId).html(
                        '<div style="width: 33%;float: left" id="uploadify' + file.id + '">' +
                        '<img style="width:80px;height:80px;" src="' + icon + '">' +
                        '<a class="red" id="' + file.id + '"><i class="icon-trash bigger-130"></i></a>' +
                        '<a target="_blank" class=\"afileUpload showDoc ' + file.id + ' ' + "uploadify_show" + '\" href=\"' + src + '\"  filename=\"' + item + '\">' +
                        file.name + '</a>' +
                        '</div>'
                    )
                } else {
                    $("#" + options.showId).append(
                        $("#" + options.showId).append(
                            '<div style="width: 33%;float: left" id="uploadify' + file.id + '">' +
                            '<img style="width:80px;height:80px;" src="' + icon + '">' +
                            '<a class="red" id="' + file.id + '"><i class="icon-trash bigger-130"></i></a>' +
                            '<a target="_blank" class=\"afileUpload showDoc ' + file.id + ' ' + "uploadify_show" + '\" href=\"' + src + '\"  filename=\"' + item  + '\">' +
                            file.name + '</a>' +
                            '</div>'
                        )
                    )
                }
            }
            $(document).on('click', "#" + file.id, function () {
                //在这此处处理...
                $("#uploadify" + file.id).remove()
                //通过uploadify的settings方式重置上传限制数量
                target.uploadify('settings', 'uploadLimit', ++that.settings.uploadLimit);
                //防止手快多点几次x，把x隐藏掉
                //$(this).hide();
            });


        });
    };
    var settings;
    options.onInit=function(e){
        settings=e.settings;
        var that = settings;
        $(target.selector).attr("showId", options.showId);
        $(target.selector).attr("trueUploadLimit", options.uploadLimit);
        //画出默认列表
        if (fileStr) {
            var fileArray = fileStr.split(",")
            fileArray.forEach(function (curr, index) {
                var src = options.showUrlPrefix + curr;
                var style = "width:80px;height:80px;";
                var file = {id: index,name:curr,showname:curr.split("|")[0],type:"." + curr.split(".")[1]}
                var item=curr;
                if (isImage(file.type) ){
                    $("#" + options.showId).append(
                        '<div style="width: 33%;float: left" id="uploadify' + file.id + '">' +
                        '<img class=\"showImg ' + file.id + ' ' + "uploadify_show" + '\" src=\"' + src + '\"  filename=\"' + item + '\" style=\"' + style + '\">' +
                        '<a class="red" id="' + file.id + '"><i class="icon-trash bigger-130"></i></a>' +
                        '<a class="afileUpload">' + file.showname+file.type + '</a>' +
                        '</div>'
                    )
                }else {
                    var icon = getIcon(file.type);
                    $("#" + options.showId).append(
                        '<div style="width: 33%;float: left" id="uploadify' + file.id + '">' +
                        '<img style="width:80px;height:80px;" src="' + icon + '">' +
                        '<a class="red" id="' + file.id + '"><i class="icon-trash bigger-130"></i></a>' +
                        '<a target="_blank" class=\"afileUpload showDoc ' + file.id + ' ' + "uploadify_show" + '\" href=\"' + src + '\"  filename=\"' + item + '\">' +
                        file.showname+file.type + '</a>' +
                        '</div>'
                    )
                }
                $(document).on('click', "#" + file.id, function () {
                    //在这此处处理...
                    $("#uploadify" + file.id).remove()
                });
            })
    }
    //上传控件加载完成之后触发
    options.onSWFReady = function (e) {

        }

    };
    target.uploadify(options);

};

$.fn.bootstrapUploadify.methods = {
    getValue: function (jq, options) {
        var filenames = [];
        var showId = jq.attr("showid")
        $("#" + showId + " .uploadify_show").each(function () {
            var filename = $(this).attr("filename");
            if (filename) {
                filenames.push(filename)
            }
        })
        return filenames;
    }
};
$.fn.bootstrapUploadify.defaults = {
    'swf': '/assets/js/uploadify/uploadify.swf',//在gateway服务中获取
    'uploader': '/zuul/upload/fileUpload',
    'showUrlPrefix':"/upload/graindepot/upload/",
    buttonText: '<div>选择文件</div>',//
    fileTypeExts: '*.*',
    multi: false,
    removeCompleted: true,//
    //queueSizeLimit: 6,
    uploadLimit: 1,
    fileSizeLimit: '20MB',
    onSelect: function (file) {
    },
    onCancel: function (file, data, response) {
    },
    onUploadProgress: function (file, bytesUploaded, bytesTotal, totalBytesUploaded, totalBytesTotal) {
        //console.log('总共需要上传'+bytesTotal+'字节，'+'已上传'+totalBytesUploaded+'字节')
    },
    onUploadSuccess: function (file, data, response) {  //每个文件上传成功后触发\

    },
    'overrideEvents': ['onDialogClose', 'onUploadError', 'onSelectError'],
    //上传失败  //附件格式不正确，请上传JPG、BMP、PNG格式文件，大小不超过3MB
    'onSelectError': function (file, errorCode, errorMsg) {
        var msgText = "上传失败\n";
        switch (errorCode) {
            case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
                //this.queueData.errorMsg = "每次最多上传 " + this.settings.queueSizeLimit + "个文件";
                msgText += "最多上传" + this.settings.trueUploadLimit + "个文件";
                break;
            case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                msgText += "文件大小超过限制( " + this.settings.fileSizeLimit + " )";
                break;
            case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
                msgText += "文件大小为0";
                break;
            case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
                msgText += "文件格式不正确，仅限 " + this.settings.fileTypeExts;
                break;
            default:
                msgText += "错误代码：" + errorCode + "\n" + errorMsg;
        }
        parent.$.bootstrapBox.alert.init({message: msgText});
    }

};







