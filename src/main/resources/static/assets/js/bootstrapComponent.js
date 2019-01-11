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
    if (!target.hasClass("selectpicker")) target.addClass("selectpicker");
    target.attr('valuefield', options.valueField);
    target.attr('textfield', options.textField);
    if (options.multiple) {
        target.attr('multiple', '');
    }
    if (options.search) {
        target.attr('data-live-search', "true");
    }
    //加入点击事件
    if (options.onSelect) {
        //target.unbind("change");
        target.change(function () {
            options.onSelect(target.val(), target)
        });
    }
    //清空下拉框
    target.empty();
    //加入请选择选项
    if (options.all) {
        var option = $('<option>'+options.placeholder+'</option>');
        option.attr('value', "");
        option.text(options.placeholder);
        target.append(option);
    }
    //4.判断用户传过来的参数列表里面是否包含数据data数据集，如果包含，不用发ajax从后台取，否则否送ajax从后台取数据
    if (options.data) {
        init(target, options.data);
    }else{
        if (!options.url) return;
        if ("post" == options.type.toLowerCase()) {
            $.post(options.url, options.param, function (data) {
                init(target, data, options);
            });
        } else {
            $.getJSON(options.url, options.param, function (data) {
                init(target, data, options);
            });
        }
    }



    function init(target, data,options) {
        if (data.length > 0) {
            $.each(data, function (i, item) {
                var option = $('<option></option>');
                option.attr('value', item[options.valueField]);
                option.text(item[options.textField]);
                target.append(option);
            });

            target.selectpicker('refresh');
        }
        options.onLoadSuccess(target,data);

    }

};

$.fn.bootstrapSelect.methods = {
    getValue: function (jq) {
        var val = jq.val();
        val = val ? val : undefined;
        return val;
    },
    setValue: function (jq, param) {
        jq.val(param);
    }
};

$.fn.bootstrapSelect.defaults = {
    url: 'GET',
    multiple: false,
    search: true,
    all: true,
    placeholder: '请选择',
    onLoadSuccess: function (item,data) {
        
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
           /* $(target.selector + ' th input:checkbox').on('click', function () {
                debugger
                var that = this;
                $(this).closest('table').find('input:checkbox')
                    .each(function () {
                        this.checked = that.checked;
                        $(this).closest('input:checkbox').toggleClass('checked');
                    });

            });*/
            $(target.selector + '_wrapper th input:checkbox').on('click', function () {
                var that = this;
                $(this).closest('.dataTables_scrollHead').next().find('input:checkbox')
                    .each(function () {
                        this.checked = that.checked;
                        $(this).closest('input:checkbox').toggleClass('checked');
                    });

            });
            var rowWidth=$("#"+this.id+"_wrapper .dataTables_scrollHeadInner").width();
            $("#"+this.id+"_wrapper .row").css("width",(rowWidth-1)+"px")

        });

        this.on('page.dt', function () {
            $(target.selector + '_wrapper th input:checkbox').removeAttr('checked');
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
    scrollX:true,
    scrollY:true,
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
            if (typeof obj == 'string') {
                return $.fn.bootstrapDialog.methods[obj](this);
            }
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
        },
        close: function () {
            $(".my-modal").modal("hide")
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
