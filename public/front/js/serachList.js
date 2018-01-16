/**
 * Created by Administrator on 2018/1/15.
 */
$(function () {

    // 根据接口文档 render 必须传三个值 page pageSize proName
    // 可选的参数 price 与 num

    function render() {

        var pagText = {};
        pagText.page = 1;
        pagText.pageSize = 100;
        pagText.proName = $(".sl_text").val();


        // 判断是否传递需要排序的字段，也就是判断a标签是否有.now这个类
        var now = $(".searchList_nav a.now");
        // 说明必然有 a 被点击
        if (now.length > 0) {
            // 需要给 pagText 添加一个 参数 price 或者是 num
            var name = now.data("name");
            var value = now.find("span").hasClass("fa-angle-down") ? 2 : 1;
            pagText[name] = value;
        }

        $(".lt_product").html('<div class="loading"></div>');
        $.ajax({
            type: "get",
            url: "/product/queryProduct",
            data: pagText,
            success: function (info) {
                console.log(info);
                // 渲染页面上
                // 模拟加载出现页面
                setTimeout(function() {
                    $(".lt_product").html(template("sl_tpl", info));
                }, 1000);
            }
        })
    }


    // 页面记载 获取数据
    // 获取地址栏参数
    var key = getSearch("key");
    // 把key值设置给搜索框
    $(".sl_text").val(key);
    // 渲染
    render();



    // 点击搜索按钮 获取搜索内容
    $(".sl_btn").on("click", function () {
        // a 标签
        $(".searchList_nav a").removeClass("now");
        // span 标签
        $(".searchList_nav span").removeClass("fa-angle-up").addClass("fa-angle-down");
        render();
    });


    //3. 排序功能
    //3.1 给价格和库存注册点击事件,给有data-type的a标签注册事件
    $(".searchList_nav > a[data-name]").on("click", function () {

        //如果当前a标签没有now这个类，需要给当前a标签添加now这个类，让所有的箭头都向下
        //如果当前a标签有now这个类，需要让箭头方向改变
        var $this = $(this);
        if ($this.hasClass("now")) {
            //有now这个类，修改a标签下面的span标签的 fa-angle-down
            // toggleClass() 对设置或移除被选元素的一个或多个类进行切换。
            $this.find("span").toggleClass("fa-angle-down").toggleClass('fa-angle-up');
        } else {
            //没有now这类，添加这个类
            $this.addClass("now").siblings().removeClass("now");
            //让所有的箭头都向下
            $(".searchList_nav span").removeClass("fa-angle-up").addClass("fa-angle-down");
        }
        render();
    });

});