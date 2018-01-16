/**
 * Created by wff on 2017/11/24.
 */

// 轮播图
mui('.mui-scroll-wrapper').scroll({
    indicators: false
});

mui(".mui-slider").slider({
    interval: 1000
});

// 获取地址栏所有的参数，返回一个对象
function getSearchObj() {
    // 1. 获取地址栏的参数
    var search = location.search;
    console.log(search);
    // 2. 对地址进行解码
    search = decodeURI(search);
    console.log(search);
    // 3. 截取 ？扔掉不需要 数组截取 slice
    search = search.slice(1);
    console.log(search);
    // 4. 字符串切割 split
    var arr = search.split("-");
    console.log(arr);
    // 5. 把数据变成对象
    // 遍历数组 变成对象
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        // 截取并获取属性名
        var key = arr[i].split("=")[0];
        console.log(key);
        // 截取并获取属性值
        var value = arr[i].split("=")[1];
        console.log(value);
        // 值相等
        obj[key] = value;
    }
    return obj;
}

// 根据地址栏返回的值获得相应的参数
function getSearch (key) {
    return getSearchObj()[key];
}

