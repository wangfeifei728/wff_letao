/**
 * Created by Administrator on 2018/1/11.
 */
$(function () {
    var myChart = echarts.init(document.querySelector('.content-left'));
    var option = {
        //title: {
        //    text: 'ECharts 入门示例'
        //},
        //tooltip: {},
        //legend: {
        //    data:['销量']
        //},
        //xAxis: {
        //    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        //},
        //yAxis: {},
        //series: [{
        //    name: '销量',
        //    type: 'bar',
        //    data: [5, 20, 36, 10, 10, 20]
        //}]
        title : {
            text: '某地区蒸发量和降水量',
            subtext: '纯属虚构'
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['蒸发量','降水量']
        },
        toolbox: {
            show : true,
            feature : {
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'蒸发量',
                type:'bar',
                data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                }
            },
            {
                name:'降水量',
                type:'bar',
                data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                markPoint : {
                    data : [
                        {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
                        {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name : '平均值'}
                    ]
                }
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
});

$(function () {

    var myChart = echarts.init(document.querySelector('.content-right'));
    var weatherIcons = {
        'Sunny': './data/asset/img/weather/sunny_128.png',
        'Cloudy': './data/asset/img/weather/cloudy_128.png',
        'Showers': './data/asset/img/weather/showers_128.png'
    };
    var option = {

        title: {
            text: '天气情况统计',
            subtext: '虚构数据',
            left: 'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['西凉', '益州','兖州','荆州','幽州']
        },
        series : [
            {
                type: 'pie',
                radius : '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                data:[
                    {
                        value:1548,
                        name: '幽州',
                        label: {
                            normal: {
                                formatter: [
                                    '{title|{b}}{abg|}',
                                    '  {weatherHead|天气}{valueHead|天数}{rateHead|占比}',
                                    '{hr|}',
                                    '  {Sunny|}{value|202}{rate|55.3%}',
                                    '  {Cloudy|}{value|142}{rate|38.9%}',
                                    '  {Showers|}{value|21}{rate|5.8%}'
                                ].join('\n'),
                                backgroundColor: '#eee',
                                borderColor: '#777',
                                borderWidth: 1,
                                borderRadius: 4,
                                rich: {
                                    title: {
                                        color: '#eee',
                                        align: 'center'
                                    },
                                    abg: {
                                        backgroundColor: '#333',
                                        width: '100%',
                                        align: 'right',
                                        height: 25,
                                        borderRadius: [4, 4, 0, 0]
                                    },
                                    Sunny: {
                                        height: 30,
                                        align: 'left',
                                        backgroundColor: {
                                            image: weatherIcons.Sunny
                                        }
                                    },
                                    Cloudy: {
                                        height: 30,
                                        align: 'left',
                                        backgroundColor: {
                                            image: weatherIcons.Cloudy
                                        }
                                    },
                                    Showers: {
                                        height: 30,
                                        align: 'left',
                                        backgroundColor: {
                                            image: weatherIcons.Showers
                                        }
                                    },
                                    weatherHead: {
                                        color: '#333',
                                        height: 24,
                                        align: 'left'
                                    },
                                    hr: {
                                        borderColor: '#777',
                                        width: '100%',
                                        borderWidth: 0.5,
                                        height: 0
                                    },
                                    value: {
                                        width: 20,
                                        padding: [0, 20, 0, 30],
                                        align: 'left'
                                    },
                                    valueHead: {
                                        color: '#333',
                                        width: 20,
                                        padding: [0, 20, 0, 30],
                                        align: 'center'
                                    },
                                    rate: {
                                        width: 40,
                                        align: 'right',
                                        padding: [0, 10, 0, 0]
                                    },
                                    rateHead: {
                                        color: '#333',
                                        width: 40,
                                        align: 'center',
                                        padding: [0, 10, 0, 0]
                                    }
                                }
                            }
                        }
                    },
                    {value:535, name: '荆州'},
                    {value:510, name: '兖州'},
                    {value:634, name: '益州'},
                    {value:735, name: '西凉'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
});