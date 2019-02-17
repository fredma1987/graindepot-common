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
        if (options.defaultValue != null) {
            target.selectpicker('val', options.defaultValue);
        }
        target.selectpicker('refresh');
        options.onLoadSuccess(target, data);

    }

};

$.fn.bootstrapSelect.methods = {
    getValue: function (jq) {
        var val = jq.val();
        val = val ? val : undefined;
        return val;
    },
    setValue: function (jq, param) {
        jq.selectpicker('val', param);
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
        jq.bootstrapSelect(JSON.parse(jq.attr("settings")))
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
                    '<input type="checkbox" class="ace"/>' +
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

        });

        this.on('page.dt', function () {
            /*$(target.selector + '_wrapper th input:checkbox').removeAttr('checked');*/
            $(target.selector + ' th input:checkbox').removeAttr('checked');
        });

    }

};

$.fn.bootstrapTable.methods = {
    //获取被选中数据
    getChecked: function (jq) {
        var result = [];
        var table = jq.DataTable();
        table.rows()[0].forEach(function (curr, index) {
            if ($($(table.row(index).node()).find('input:checkbox:first').get(0)).prop('checked')) {
                result.push(table.row(index).data())
            }
        });
        return result;
    },
    //刷新数据
    reload: function (jq) {
        var table = jq.DataTable();
        table.draw()
    }
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
                dialog.find('.bootbox-body').html("<iframe width=100% height=100% frameborder='no'  noresize border=0 marginWidth=10 marginHeight=10 " +
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


//=============================uploadify=========================================
$.fn.bootstrapUploadify = function (options, param) {
    var target = this;
    //初始化
    if (options.buttonText) {
        options.buttonText = "<div>" + options.buttonText + "</div>"
    }
    if (options.fileType) {
        var _doc = ["*.doc", "*.docx", "*.xls", "*.xlsx", "*.ppt", "*.pptx", "*.txt", "*.pdf"],
            _video = ["*.mp4", "*.flv", "*.wmv", "*.rmvb", '*.avi'],
            _scorm = ["*.zip"],
            _img = ["*.png", "*.bmp", "*.jpeg", "*.jpg", "*.gif", "*.psd", "*.tiff", "*.tga", "*.eps"];
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
    options.onUploadSuccess = function (file, data, response) {
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
            var src = "/upload/cloudgrain/upload/" + item;
            var style = "width:80px;height:80px;";
            if (options.fileType == "img") {
                if (options.uploadLimit == 1) {
                    $("#" + options.showId).html(
                        '<img class=\"showImg ' + file.id + ' ' + options.showId + "_show" + '\" src=\"' + src + '\"  filename=\"' + item + '\" style=\"' + style + '\">')
                } else {
                    $("#" + options.showId).append('<img class=\"showImg ' + file.id + ' ' + options.showId + "_show" + '\" src=\"' + src + '\"  filename=\"' + item + '\" style=\"' + style + '\">')
                }
            } else {
                if (options.uploadLimit == 1) {
                    $("." + options.showId).html(
                        '<a target="_blank" class=\"showDoc ' + file.id + ' ' + options.showId + "_show" + '\" href=\"' + src + '\"  filename=\"' + item + '\" style=\"' + style + '\">'
                        + item + '</a>'
                    )
                } else {
                    $("." + options.showId).append(
                        '<a target="_blank" class=\"showDoc ' + file.id + ' ' + options.showId + "_show" + '\" href=\"' + src + '\"  filename=\"' + item + '\" style=\"' + style + '\">'
                        + item + '</a>'
                    )
                }
            }


        });
    };
    //上传控件加载完成之后触发
    options.onInit = function () {

    };
    //将调用时候传过来的参数和default参数合并
    options = $.extend({}, $.fn.bootstrapUploadify.defaults, options || {});
    if (typeof options == 'string') {
        return $.fn.bootstrapUploadify.methods[options](this, options);
    }
    target.uploadify(options);


};

$.fn.bootstrapUploadify.methods = {
    getValue: function (jq, options) {
        var filenames = [];
        $("." + options.showId + "_show").each(function (index, element) {
            var filename = $(this).attr("filename");
            if (filename) {
                filenames.push(filename)
            }
        });
        if (options.uploadLimit != 1) {
            return filenames;
        } else {
            if (filenames.length > 0) {
                return filenames[0];
            } else {
                return null;
            }

        }

    }
};
$.fn.bootstrapUploadify.defaults = {
    'swf': '/flash/uploadify.swf',//在gateway服务中获取
    'uploader': '/zuul/upload/fileUpload',
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
                msgText += "每次最多上传 " + this.settings.uploadLimit + "个文件";
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
        alert(msgText);
    }

};







