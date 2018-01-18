/**
 * Created by Administrator on 2018/1/15.
 */
$(function() {

    //渲染数据 获取用户名 和 电话
    $.ajax ({
        type : "get",
        url : "/user/queryUserMessage",
        success : function(info) {
            console.log(info);
            // 如果没登录 就跳转到登录页面
            if(info.error === 400 ) {
                location.href = "login.html";
            }

            // 如果成功了，渲染用户信息
            $(".userInfo").html(template("user_tpl" , info));

        }
    });

    // 点击退出按钮
    $(".userOut").on("click" , function () {
        // 发送ajax 退出到登录页面
        $.ajax ({
            type : "get",
            url : "/user/logout",
            success : function(info) {
                if(info.success) {
                    location.href = "login.html";
                }
            }
        })
    })

});