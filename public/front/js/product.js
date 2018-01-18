/**
 * Created by Administrator on 2018/1/15.
 */
$(function() {

    // 1.获取地址栏中的productId
    var productId = getSearch("productId");

    // 2.渲染数据 发送ajax请求后台
    $.ajax ({
        type : "get",
        url : "/product/queryProductDetail",
        data : {id : productId},
        success : function (info) {
            console.log(info);
            // 渲染到页面上
            $(".mui-scroll").html(template("pro_tpl" , info));

            // 重新渲染轮播图
            mui(".mui-slider").slider({
                interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
            });

            // 重新渲染数字框
            mui(".mui-numbox").numbox();


            // 点击尺码 选中颜色
            $(".lt_proSize span").on("click" , function () {
                $(this).addClass("now").siblings().removeClass("now");
            });
        }
    });

    // 3.加入购物车
    $(".in_car").on("click" , function() {

        // 获取尺码
        var size = $(".lt_proSize span.now").text();
        if(!size) {
            mui.toast("请选择尺码");
            return;
        }

        // 获取数量
        var num = $(".mui-input-numbox").val();
        // 发送 ajax 请求
        $.ajax ({
            type : "post",
            url : "/cart/addCart",
            data : {
                num : num,
                size : size,
                productId : productId
            },
            success : function (info) {
                console.log(info);

                // 显示未登录的错误提示
                if (info.error === 400) {
                  // 跳转到login.html 需要指定一个参数[back]，目的就是为了跳回当前页面
                    location.href = "login.html?back=" + location.href;
                }

                // 成功处理
                if(info.success) {
                    // 校验
                    // mui.confirm的参数 去mui.com查看
                    mui.confirm("添加此商品成功" , "温馨提示" , ["去购物车" , "继续浏览"], function(e) {
                        if (e.index === 0) {
                            location.href = "cart.html";
                        }
                    });

                }

            }
        })
    });

});