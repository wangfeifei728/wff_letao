/**
 * Created by Administrator on 2018/1/12.
 */
$(function () {
    var page = 1;
    var pageSize = 5;
    render();
    // 渲染页面
    function render() {
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info);
                var result = template("tpl", info);
                // 渲染到页面
                $("tbody").html(result);

                // 渲染分页
                $("#pagination").bootstrapPaginator({
                    // 3 的原因是引的包是3+
                    // 结构 ul元素 所以是3
                    // 若是 div元素 则是2
                    // 详细查官网
                    bootstrapMajorVersion: 3,
                    currentPage: page, // 设置当前页
                    numberOfPages: pageSize, // 设置页码数
                    totalPages: Math.ceil(info.total / info.size), // 设置总页数
                    onPageClicked: function (a, b, c, p) {
                        page = p;
                        // 重新渲染
                        render();
                    }
                })
            }
        });
    }

    // 模态框出来
    $(".first_btn").on("click", function () {
        $('#first_box').modal('show')
    });
    // 表单校验
    var $form = $("form");
    $form.bootstrapValidator ({
        // 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields : {
            categoryName : {
                validators : {
                    notEmpty: {
                        message: '一级分类用户名称不能为空'
                    }
                }
            }
        }
    });
    // 表单注册校验成功的事件
    $form.on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            type: "post",
            url: "/category/addTopCategory",
            data: $form.serialize(),
            success: function (info) {
                if (info.success) {
                    // 隐藏模态框
                    $('#first_box').modal('hide');
                    // 重新渲染 并且每次渲染都在第一页
                    page = 1;
                    render();
                    // 重置表单
                    $form.data("bootstrapValidator").resetForm(true);
                }
            }
        })
    });


});