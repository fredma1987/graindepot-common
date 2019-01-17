/**
 * 画柱状图或线图
 * @param ec
 * @param div 
 * @param legend
 * @param category
 * @param series
 */
function drawChartBar(ec,div,legend,category,series,unitname){
	if(unitname==null){
		unitname="";
	}
	var myChart = ec.init(document.getElementById(div));
    myChart.setOption({
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
   				 type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'               	
            }
        },
        legend: {
            data:legend
        },
        toolbox: {
            show : true,
            orient : 'vertical',
			x: 'right',
			y: 'center',
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar','stack','tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data : category
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel : {
                	formatter: function(value)
                	{
                		return value+unitname;
                	}
                },
                splitArea : {show : true}
            }
        ],
        series : series
    });
}

/**
 * 画柱状图或线图for map
 * @param ec
 * @param div 
 * @param legend
 * @param category
 * @param series
 */
function drawChartBarForMap(ec,div,title,legend,category,series){
	debugger;
	var myChart = ec.init(document.getElementById(div));
    myChart.setOption({
		title : {
	        text: title
	    },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
   				 type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data:legend
        },
        toolbox: {
            show : true,
            orient : 'vertical',
			x: 'right',
			y: 'center',
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar','stack','tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data : category
            }
        ],
        yAxis : [
            {
                type : 'value',
                splitArea : {show : true}
            }
        ],
        series : series
    });
}

/**
 * 画柱状图或线图for LW
 * @param ec
 * @param div 
 * @param legend
 * @param category
 * @param series
 */
function drawChartBarForLW(ec,div,title,legend,category,series){
	var myChart = ec.init(document.getElementById(div));
    myChart.setOption({
		title : {
	        text: title
	    },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
   				 type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
			x : 'right',
            data:legend
        },
        toolbox: {
            show : true,
            orient : 'vertical',
			x: 'right',
			y: 'center',
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar','stack','tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data : category
            }
        ],
        yAxis : [
            {
                type : 'value',
                splitArea : {show : true}
            }
        ],
        series : series
    });
}

/**
 * 画柱状图或线图for LW
 * @param ec
 * @param div 
 * @param legend
 * @param category
 * @param series
 */
function drawChartBarForSG(ec,div,legend,category,series){
	var myChart = ec.init(document.getElementById(div));
    myChart.setOption({
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
   				 type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'               	
            }
        },
        legend: {
            data:legend
        },
        toolbox: {
            show : true,
            orient : 'vertical',
			x: 'right',
			y: 'center',
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar','stack','tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data : category
            }
        ],
        yAxis : [
            {
                name : legend[0],
            	type : 'value',
                splitArea : {show : true}
            },
            {
            	name : legend[1],
                type : 'value',
                splitArea : {show : true}
            }
        ],
        series : series
    });
    myChart.on(ecConfig.EVENT.MAP_SELECTED, function (param){
    	var selected = param.selected;
    	var mapSeries = option.series[0];
    	for (var p = 0, len = mapSeries.data.length; p < len; p++) {
    		if(mapSeries.data[p].value!=0){
	        	name = mapSeries.data[p].name;
	        	alert(name);
    		}
    	}
    });
}
/**
 * 画仪表盘
 * @param ec
 * @param div
 * @param name
 * @param min
 * @param max
 * @param data
 */
function drawGauge(ec,div,name,min,max,data){
	var myChart = ec.init(document.getElementById(div));
	myChart.setOption({
		tooltip : {
			formatter : "{b} : {c}%"
		},
		series : [ {
			name : name,
			type : 'gauge',
			center : [ '50%', '50%' ], // 默认全局居中
			radius : [ 0, '68%' ],
			startAngle : 140,
			endAngle : -140,
			min : min, // 最小值
			max : max, // 最大值
			precision : 0, // 小数精度，默认为0，无小数点
			splitNumber : 5, // 分割段数，默认为5
			axisLine : { // 坐标轴线
				show : true, // 默认显示，属性show控制显示与否
				lineStyle : { // 属性lineStyle控制线条样式
					color : [ [ 0.2, 'lightgreen' ],
							[ 0.4, 'orange' ], [ 0.8, 'skyblue' ],
							[ 1, '#ff4500' ] ],
					width : 20
				}
			},
			axisTick : { // 坐标轴小标记
				show : true, // 属性show控制显示与否，默认不显示
				splitNumber : 5, // 每份split细分多少段
				length : 8, // 属性length控制线长
				lineStyle : { // 属性lineStyle控制线条样式
					color : '#eee',
					width : 1,
					type : 'solid'
				}
			},
			axisLabel : { // 坐标轴文本标签，详见axis.axisLabel
				show : true,/*
				formatter : function(v) {
					switch (v + '') {
					case '20':
						return '超低储备';
					case '40':
						return '低储备';
					case '80':
						return '正常储备';
					case '100':
						return '过量储备';
					default:
						return '';
					}
				},*/
				textStyle : { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
					color : '#888'
				}
			},
			splitLine : { // 分隔线
				show : true, // 默认显示，属性show控制显示与否
				length : 20, // 属性length控制线长
				lineStyle : { // 属性lineStyle（详见lineStyle）控制线条样式
					color : '#eee',
					width : 2,
					type : 'solid'
				}
			},
			pointer : {
				length : '80%',
				width : 8,
				color : 'auto'
			},
			title : {
				show : true,
				offsetCenter : [ '-65%', -10 ], // x, y，单位px
				textStyle : { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
					color : '#333',
					fontSize : 15
				}
			},
			detail : {
				show : true,
				backgroundColor : 'rgba(0,0,0,0)',
				borderWidth : 0,
				borderColor : '#ccc',
				width : 100,
				height : 40,
				offsetCenter : [ '-60%', -10 ], // x, y，单位px
				formatter : '{value}%',
				textStyle : { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
					color : 'auto',
					fontSize : 24
				}
			},
			data:[{value:data,name:name}]
		} ]
	});
}
/**
 * 画饼图
 * @param ec
 * @param div
 * @param name
 * @param legend
 * @param data
 * @param radius
 * @param showlabel
 */
function drawPie(ec,div,name,legend,data,radius,showlabel,showlegend,unitname){
	if(unitname==null){
		unitname="";
	}
	if(radius==null){
		radius=55;
	}
	if(showlabel==null){
		showlabel=true;
	}
	if(showlegend==null){
		showlegend=true;
	}
	var myChart = ec.init(document.getElementById(div));
	myChart.setOption({
			tooltip : {
				trigger : 'item',
				formatter : "{b} :<br/> {c}"+unitname+"({d}%)"
			},
		legend : {
			show:showlegend,
			orient : 'horizontal',
			y : 'bottom',
			x : 'left',
			data : legend
		},
		calculable : true,
		color : [ '#D87A80', '#5AB1EF', '#FFB980', '#57D2D3', '#B6A2DE', '#93B2C7', '#A3B2C7', '#9312C7' ],
		series : [ {
			name : name,
			type : 'pie',
			radius : radius,
			center : [ '50%', '50%' ],
			itemStyle : {
				normal : {
					label : {
						//position : 'inner',
                		formatter: "{b}\n{c}"+unitname,
                		show:showlabel
					},
					labelLine : {
						show : showlabel
					}
				}
			},
			data : data
		} ]
	});
}