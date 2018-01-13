/**
 * Created by Administrator on 2018/1/11.
 */

$(function () {
    // 进度条
    NProgress.configure({showSpinner: false});
    $(document).ajaxStart(function () {
        NProgress.start();
    });
    $(document).ajaxStop(function () {
        setTimeout(function () {
            NProgress.done();
        }, 1000);
    });

    // 分类 点击显示出来
    $(".son").prev().on("click", function () {
        $(this).next().slideToggle();
    });

    // 侧边栏隐藏与显示 同时 padding-left:0
    $(".first").on("click" , function() {
        $(".lt-aside").toggleClass("now");
        $(".lt-main").toggleClass("now");
        $(".lt-header").toggleClass("now");
    });

    // 退出显示
    $(".second").on("click" , function() {
        // 模态框显示
        $('#out').modal('show');

        // 不可以在里面注册，否则会被事件覆盖，会连续注册
    });

    // 给退出按钮注册事件
    $(".getOut").on("click",function() {
       //发送ajax 请求退出
        $.ajax ({
            type : "get",
            url : "/employee/employeeLogout",
            success : function(info) {
                if (info.success) {
                    location.href = "login.html";
                }
            }
        })
    });

    // 检测是否登录
    // 在非登录页面，发送ajax请求 检测用户是否登录
    if (location.href.indexOf("login.html") == -1 ) {
        // 发送ajax请求
        $.ajax ({
            type : "get",
            url : "/employee/checkRootLogin",
            success : function(info) {
                // 判断如果是错误 就跳转为登录页面
                if (info.error == 400 ) {
                    location.href = "login.html";
                }
            }
        })
    }

});



