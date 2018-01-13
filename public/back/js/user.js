/**
 * Created by Administrator on 2018/1/12.
 */
$(function () {
    var page = 1; // 记录页码
    var pageSize = 5; // 每页的条数
    render();
    // 渲染
    function render() {
        // 发送ajax请求 获取用户数据
        // 通过模板引擎渲染数据
        $.ajax ({
            type : "get",
            url : "/user/queryUser",
            data : {
                page : page,
                pageSize : pageSize
            },
            success : function(info) {
                // 准备渲染的数据 info就是数据
                console.log(info);
                // 让数据和模板进行绑定 template 模板 + 数据 = html的结果
                // 第一个参数 ： 模板的id
                // 第二个参数 ： 对象
                // 返回 ： html结果的字符串
                var result= template("tpl" , info);
                // 渲染到页面
                $("tbody").html(result);

                // 渲染分页
                $("#pagination").bootstrapPaginator ({
                    // 3 的原因是引的包是3+
                    // 结构 ul元素 所以是3
                    // 若是 div元素 则是2
                    // 详细查官网
                    bootstrapMajorVersion : 3,
                    currentPage : page, // 设置当前页
                    numberOfPages : pageSize, // 设置页码数
                    totalPages : Math.ceil(info.total/info.size), // 设置总页数
                    onPageClicked : function(a,b,c,p) {
                        page = p ;
                        // 重新渲染
                        render();
                    }
                })
            }
        });
    }
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
                    id: id,
                    isDelete: isDelete
                },
                success: function (info) {
                    if (info.success) {
                        // 关闭模态框
                        $('#userOut').modal('hide');
                        // 重新渲染
                        render();
                    }
                }
            })
        })
    });

});