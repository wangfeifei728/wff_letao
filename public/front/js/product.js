/**
 * Created by Administrator on 2018/1/15.
 */
$(function() {

    // 获取地址栏中的productId
    var productId = getSearch("productId");

    // 渲染数据 发送ajax请求后台
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
            mui(".mui-numbox").numbox()
        }
    })



});