/**
 * Created by Administrator on 2018/1/11.
 */

// 校验登录页面
$(function () {
    //初始化表单校验
    var $form = $("form");
    console.log($form);
    // 使用表单校验插件
    $form.bootstrapValidator({
        // 指定校验时的图标的显示，默认是 bootstrap 的风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok-circle',
            invalid: 'glyphicon glyphicon-remove-circle',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 指定校验字段
        fields: {
            // 校验用户名 对应name表单的name属性
            username: {
                validators: {
                    // 不能为空
                    notEmpty: {
                        message: "用户名不能为空"
                    },
                    callback : {
                        message : "用户名不存在"
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: "密码不能为空"
                    },
                    // 密码长度校验
                    stringLength: {
                        min: 6,
                        message: "密码不能低于六位哦~"
                    },
                    callback : {
                        message : "密码错误"
                    }
                }
            }
        }
    });
    // 注册表单验证成功事件
    $form.on("success.form.bv" , function(e) {
        e.preventDefault();
        // 提交表单验证
        // console.log(1);
        // 使用ajax请求后台
        $.ajax ({
            type : "post",
            url : "/employee/employeeLogin",
            dataType : "json",
            // 表单序列化 获取了username 和 password
            data : $form.serialize(),
            success : function (info) {
                if (info.success) {
                    location.href = "index.html";
                }
                if (info.error === 1000 ) {
                    $form.data("bootstrapValidator").updateStatus("username", "INVALID" ,"callback");
                }
                if (info.error === 1001 ) {
                    $form.data("bootstrapValidator").updateStatus("password", "INVALID" ,"callback");
                }
            }
        })

    });

    // 重置表单
    $("[type='reset']").on("click", function () {
        $form.data("bootstrapValidator").resetForm();

    });

});