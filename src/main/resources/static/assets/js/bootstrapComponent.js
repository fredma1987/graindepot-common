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
    debugger;
    var lastTr =$(target.selector+" tr:last");
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
    getChecked: function (jq) {
        var result = [];
        var table = jq.DataTable();
        table.rows()[0].forEach(function (curr, index) {
            if ($($(table.row(index).node()).find('input:checkbox:first').get(0)).prop('checked')) {
                result.push(table.row(index).data())
            }
        });
        return result;

    }
};

$.fn.bootstrapTable.defaults = {
    dom: 'rt<"row"<"col-sm-5"i><"col-sm-7"p>>',
    url: 'GET',
    processing: true,
    iDisplayLength: 15,
    showCheckbox: true
};