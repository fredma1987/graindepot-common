/*$("#city").bootstrapSelect({
 url:'/tableListPost',  //数据请求
 type:'POST',      //获取方式 默认GET
 valueField: 'id',  //获取值时的取值key
 textField: 'username',  //页面展示时的key
 onSelect: function (value, item) {    //监听选择下拉框数据事件
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
    target.attr('valuefield', options.valueField);
    target.attr('textfield', options.textField);
    //加入点击事件
    if (options.onSelect) {
        target.change(function () {
            options.onSelect(target.val(), target)
        });
    }
    //清空下拉框
    target.empty();
    if ("post" == options.type.toLowerCase()) {
        $.post(options.url, options.param, function (data) {
            init(target, data);
        });
    } else {
        $.getJSON(options.url, options.param, function (data) {
            init(target, data);
        });
    }

    function init(target, data) {
        if (data.length > 0) {
            //加入全部选项
            var option = $('<option>全部</option>');
            option.attr('value', "");
            option.text(options.placeholder);
            target.append(option);

            $.each(data, function (i, item) {
                var option = $('<option></option>');
                option.attr('value', item[options.valueField]);
                option.text(item[options.textField]);
                target.append(option);
            });
        }

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
    },
    load: function (jq, url) {
        $.getJSON(url, function (data) {
            jq.empty();
            var option = $('<option></option>');
            option.attr('value', '');
            option.text('全部');
            jq.append(option);
            $.each(data, function (i, item) {
                var option = $('<option></option>');
                option.attr('value', item[jq.attr('valuefield')]);
                option.text(item[jq.attr('textfield')]);
                jq.append(option);
            });
        });
    }
};

$.fn.bootstrapSelect.defaults = {
    url: 'GET'
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
    var lastTr = $(target.selector + " tr:last");
    var lastTrHtml = lastTr.html();
    lastTrHtml = '<th class="center"></th>' +
        '<th class="center">' +
        '<label>' +
        '<input type="checkbox" class="ace"/>' +
        '<span class="lbl"></span>' +
        '</label>' +
        '</th>' + lastTrHtml;
    lastTr.html(lastTrHtml);


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
    options.columns.unshift({
        data: null,
        className: 'text-center whiteSpace',
        render: function (data, type, row, meta) {
            return meta.row + 1 + meta.settings._iDisplayStart;
        }
    });


    var item = this.DataTable({
        //这样配置后，即可用DT的API来访问表格数据
        dom: options.dom,
        //数据来源（包括处理分页，排序，过滤） ，即url，action，接口，等等
        ajax: options.ajax,
        processing: options.processing,
        columns: options.columns,
        /* fnServerParams: function (aoData) {

         },*/
        iDisplayLength: options.iDisplayLength, //默认每页显示的记录数
        language: {
            url: '/assets/json/Chinese.json'
        },
        //开启服务器模式
        serverSide: true,
        ordering: false// 禁止排序
    });
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
        });

        this.on('page.dt', function () {
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
    //获取所有数据
    //getAllData:
};

$.fn.bootstrapTable.defaults = {
    dom: 'rt<"row"<"col-sm-5"i><"col-sm-7"p>>',
    url: 'GET',
    processing: false,
    iDisplayLength: 15,
    showCheckbox: true
};

//封装bootbox.js
var bootstrapBootbox = {};
//obj={title:"标题",message:"提示语",callback:function}
bootstrapBootbox.confirm = function (obj) {
    bootbox.confirm({
        title: obj.title ? obj.title : "提示",
        message: obj.message,
        buttons: {
            cancel: {
                label: '<i class="icon-ban-circle align-top bigger-125"></i> 取消'
            },
            confirm: {
                label: '<i class="icon-check align-top bigger-125"></i> 确认'
            }
        },
        callback: function (result) {
            obj.callback(result)
        }
    });

};
//obj={title:"标题",url:"/..",width:'400px',height:'100px'}
bootstrapBootbox.dialog = function (obj) {
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
    return dialog

};

//=============================bootbox=========================================
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


/*
 $.bootstrapDialog = function (obj) {

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

 $.bootstrapDialog.dialogObj = dialog;
 };

 $.bootstrapDialog.dialogObj = undefined;

 $.bootstrapDialog.methods = {
 close: function (jq) {
 $.bootstrapDialog.dialogObj.modal("hide")
 }
 };*/
