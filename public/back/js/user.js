/**
 * Created by Administrator on 2018/1/12.
 */
$(function () {
    // 点击模态框的按钮
    $("tbody").on("click", ".btn", function () {
        // 模态框 显示出来
        $('#userOut').modal('show');

        // 启用禁止功能
        // 获取对应的id
        var id = $(this).parent().data("id");
        var isDelete = $(this).hasClass("btn-danger") ? 0 : 1;

        // 确定按钮注册事件
        //off(),解绑事件
        $(".getUser").off().on("click", function () {
            // 发送ajax请求
            $.ajax({
                type: "post",
                url: "/user/updateUser",
                data: {
                    id : id,
                    isDelete : isDelete
                },
                success : function(info) {
                    if(info.success) {
                        // 关闭模态框
                        $('#userOut').modal('hide');
                    }
                }
            })
        })
    });

});