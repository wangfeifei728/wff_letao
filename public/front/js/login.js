/**
 * Created by Administrator on 2018/1/15.
 */
$(function() {
    // 给登录按钮注册点击事件，并且阻止表单提交
    $(".btn_sure").on("click" , function(e) {
        e.preventDefault();
        // 获取用户名 和 密码 俩参数
        var username = $("[name = 'username']").val();
        var password = $("[name = 'password']").val();
        // 表单校验
        if(!username) {
            mui.toast("用户名不能为空");
            return;
        }
        if(!password) {
            mui.toast("密码不能为空");
            return;
        }

        // 发送ajax
        $.ajax ({
            type : "post",
            url : "/user/login",
            data : {
                username : username,
                password : password
            },
            success : function (info) {
                console.log(info);
                // 错误提示
                if (info.error) {
                    mui.toast(info.message);
                }

                // 成功跳转页面
                if (info.success) {
                    // 判断是否带了 back 的参数
                    // 若 有 就是直接跳到所对应的页面
                    // 若 没有 则是默认页面
                    if (location.search.indexOf("back") == -1 ) {
                        // 没有的话 用户页面
                        location.href = "user.html";
                    }else {
                        // 有 就跳到back指定的页面
                        var search = location.search;
                        // 没有的话  就用getSearch
                        // 利用 replace 替换
                        search = search.replace("?back=" , "");
                        location.href = search;
                    }
                }

            }
        })
    })
});