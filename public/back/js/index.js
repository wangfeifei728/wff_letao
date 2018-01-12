/**
 * Created by Administrator on 2018/1/11.
 */
// 使用 百度图表的方法
//$(function () {
//    var myChart = echarts.init(document.querySelector('.content-left'));
//    var option = {
//        title: {
//            text: 'ECharts 入门示例'
//        },
//        tooltip: {},
//        legend: {
//            data:['销量']
//        },
//        xAxis: {
//            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
//        },
//        yAxis: {},
//        series: [{
//            name: '销量',
//            type: 'bar',
//            data: [5, 20, 36, 10, 10, 20]
//        }]
//    };
//    // 使用刚指定的配置项和数据显示图表。
//    myChart.setOption(option);
//});
//
//$(function () {
//
//    var myChart = echarts.init(document.querySelector('.content-right'));
//
//    var option = {
//        title : {
//            text: '某站点用户访问来源',
//            subtext: '纯属虚构',
//            x:'center'
//        },
//        tooltip : {
//            trigger: 'item',
//            formatter: "{a} <br/>{b} : {c} ({d}%)"
//        },
//        legend: {
//            orient: 'vertical',
//            left: 'left',
//            data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
//        },
//        series : [
//            {
//                name: '访问来源',
//                type: 'pie',
//                radius : '55%',
//                center: ['50%', '60%'],
//                data:[
//                    {value:335, name:'直接访问'},
//                    {value:310, name:'邮件营销'},
//                    {value:234, name:'联盟广告'},
//                    {value:135, name:'视频广告'},
//                    {value:1548, name:'搜索引擎'}
//                ],
//                itemStyle: {
//                    emphasis: {
//                        shadowBlur: 10,
//                        shadowOffsetX: 0,
//                        shadowColor: 'rgba(0, 0, 0, 0.5)'
//                    }
//                }
//            }
//        ]
//    };
//    // 使用刚指定的配置项和数据显示图表。
//    myChart.setOption(option);
//});

// 使用Highcharts 方法

// 柱状图
$(function () {
    var options = {
        chart: {
            type: 'bar'                          //指定图表的类型，默认是折线图（line）
        },
        title: {
            text: '好莱坞电影排行榜'                 // 标题
        },
        xAxis: {
            categories: ['指环王', '速度与激情', '星球大战']   // x 轴分类
        },
        yAxis: {
            title: {
                text: '电影排行榜'                // y 轴标题
            }
        },
        series: [{                              // 数据列
            name: '斯大林',                        // 数据列名
            data: [1, 0, 4]                     // 数据
        }, {
            name: '华盛顿',
            data: [5, 7, 3]
        },
            {
            name: '希特勒',
            data: [6, 10, 5]
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    var chart = Highcharts.chart('container1', options);
});
// 饼形图
$(function () {
    var options = {
        chart: {
            type: 'pie'
        },
        title: {
            text: '名牌鞋鞋'
        },
        subtitle: {
            text: '扇区长度（圆周方法）表示此牌子的销售量，宽度（纵向）表示使用人口密度'
        },
        tooltip: {
            headerFormat: '',
            pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
            '此牌子的销售量 (平方千米): <b>{point.y}</b><br/>' +
            '使用人口密度 (每平方千米人数): <b>{point.z}</b><br/>'
        },
        series: [{
            minPointSize: 10,
            innerSize: '20%',
            zMin: 0,
            name: 'countries',
            data: [{
                name: '耐克',
                y: 505370,
                z: 92.9
            }, {
                name: '阿迪达斯',
                y: 551500,
                z: 118.7
            }, {
                name: '李宁',
                y: 312685,
                z: 124.6
            }, {
                name: '乔丹',
                y: 78867,
                z: 137.5
            }, {
                name: '新百伦',
                y: 301340,
                z: 201.8
            }, {
                name: '361°',
                y: 41277,
                z: 214.5
            }, {
                name: '鸿星尔克',
                y: 357022,
                z: 235.6
            }]
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    var chart = Highcharts.chart('container2', options);
});