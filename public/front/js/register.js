/**
 * Created by Administrator on 2018/1/15.
 */
$(function () {


    // 注册功能
    // 给 注册 按钮注册点击事件
    $(".mui_new").on("click", function (e) {
        // 阻止跳转事件
        e.preventDefault();

        // 获取表单的所有值
        var username = $("[name = 'username']").val();
        var password = $("[name = 'password']").val();
        var againPassword = $(".againPassword").val();
        var mobile = $("[name = 'mobile']").val();
        var vCode = $("[name = 'vCode']").val();

        // 校验各项值
        if (!username) {
            mui.toast("用户名不能为空");
            return;
        }

        if (!password) {
            mui.toast("密码不能为空");
            return;
        }

        if (againPassword != password) {
            mui.toast("亲，你两次输入的密码不一致");
            return;
        }

        if (!mobile) {
            mui.toast("手机号不能为空");
            return;
        }

        if (!vCode) {
            mui.toast("验证码不能为空");
            return;
        }

        // 手机号正则表达式
        if (!(/^1[3-9]\d{9}$/).test(mobile)) {
            mui.toast("亲，你的手机号格式不对哦");
            return;
        }


        // 发送ajax请求
        $.ajax({
                type: "post",
                url: "/user/register",
                data: $("form").serialize(),
                success: function (info) {
                    console.log(info);

                    // 错误提示
                    if (info.error) {
                        mui.toast(info.message);
                        return;
                    }

                    // 成功提示
                    if (info.success) {
                        mui.toast("恭喜你，注册成功~ 1秒后跳转登录页面^_^");
                        // 定时器
                        setTimeout(function () {
                            location.href = "login.html";
                        }, 1000);
                    }
                }

            }
        )

    });

    // 验证码功能
    // 给验证码注册点击事件
    $(".mui_tryText").on("click", function (e) {
        // 阻止默认行为
        e.preventDefault();
        var $this = $(this);
        // 按钮变色
        // disabled 属性规定应该禁用 input 元素。
        $this.prop("disabled", true).addClass("disabled").text("发送中…");

        // 发送ajax
        $.ajax({
            type: "get",
            url: "/user/vCode",
            success: function (info) {
                console.log(info.vCode);
                //开启倒计时 10s 后重新获取验证码

                var time = 10;
                var time_id = setInterval(function () {

                    time--;
                    $this.text(time + " 秒后重新发送…");

                    if (time <= 0) {
                        // 清除定时器
                        clearInterval(time_id);

                        // 恢复按钮
                        $this.prop("disabled", false).removeClass("disabled").text("请在重新发一遍");
                    }
                }, 1000)
            }
        })


    });


});