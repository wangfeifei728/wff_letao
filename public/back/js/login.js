/**
 * Created by Administrator on 2018/1/11.
 */
$(function () {

    var $form = $("form");
    // 初始化表单校验插件
    $form.bootstrapValidator({
        fields: {
            username: {
                validators : {
                    notEmpty : {
                        message : "用户名不能为空"
                    }
                }
            },
            password: {}
        }
    })
});