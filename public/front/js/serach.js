/**
 * Created by Administrator on 2018/1/15.
 */
$(function () {

    // 获取历史记录，返回一个数组
    function getHistory() {
        // 获取数据
        var history = localStorage.getItem("lt_search_history") || '[]';
        //JSON.parse();解析字符串
        var arr = JSON.parse(history);
        console.log(arr);
        return arr;
    }

    // 1.搜索历史记录渲染
    function render() {
        // 1.1 获取localStorage中lt_history对应的值
        var arr = getHistory();
        //渲染数据到页面
        $(".search_history").html(template("search_tpl", {arr: arr}));
    }

    // 渲染
    render();


    // 2.清空历史记录
    // 点击垃圾桶 删除记录
    $(".search_history").on("click", ".search_trash", function () {
        console.log(1);
        mui.confirm("你确定要清空所有的搜索记录嘛？", "温馨提示", ['是', '否'], function (e) {
            // e.index 是记录点击的哪行
            if (e.index == 0) {
                // 直接删掉
                localStorage.removeItem("lt_search_history");
                // 重新渲染
                render();
            }
        })
    });


    // 3.添加数据
    // 点击搜索按钮 添加数据
    $(".btn_search").on("click", function () {
        // 将数据渲染到下面的列表中
        // 获取输入的关键字【key】
        var key = $(".text_search").val().trim();
        console.log(key);
        // 清空input值
        $(".text_search").val('');

        // 获取历史记录
        var arr = getHistory();

        // 把key存到数组最前面 每次加，总是在最前一个
        // 判断数组中是否存在key值，有就删除就可以了
        var index = arr.indexOf(key); // 获取key第一次出现的下标
        // 说明不存在
        if (index != -1) {
            arr.splice(index, 1);
        }

        // 历史记录不能超过10
        if (arr.length >= 10) {
            // pop()方法从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。
            arr.pop();
        }

        //unshift() 方法将一个或多个元素添加到数组的开头，并返回新数组的长度。
        arr.unshift(key);
        // 重新设置localStorage
        // JSON.stringify 字符串化
        localStorage.setItem("lt_search_history", JSON.stringify(arr));
        // 重新渲染
        render();
        // 页面跳转到 商品列表页 上
        location.href = "searchList.html?key=" + key;
    });

    // 4. 点击 × 删除一行数据
    $(".search_history").on("click", ".search_out", function () {
        console.log(3);
        // 获取要删除所对应的位置index
        // data-index 给 span 设置 因为点击的是span
        var index = $(this).data("index");
        console.log(index);
        // 获取历史记录
        var arr = getHistory();
        // 删除arr中对应的index的那项值 splice 删除
        arr.splice(index, 1);
        // 重新设置
        localStorage.setItem("lt_search_history", JSON.stringify(arr));
        // 重新渲染
        render();
    });



});