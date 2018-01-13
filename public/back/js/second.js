/**
 * Created by Administrator on 2018/1/12.
 */
$(function () {
    var page = 1; // 记录页码
    var pageSize = 10; // 记录页数
    render();
    // 数据渲染页面
    function render() {
        // 请求ajax 后台要数据
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info);
                // 将数据渲染到页面上
                $("tbody").html(template("tpl", info));
                // 渲染分页
                $("#pagination").bootstrapPaginator({
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
        })
    }

    render();
    //点击按钮 弹出模态框
    $(".second_btn").on("click", function () {
        // 模态框出来
        $('#second_box').modal('show');

        // 动态渲染一级列表
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (info) {
                console.log(info);
                // 渲染到列表中
                $(".dropdown-menu").html(template("tpl1", info));
            }
        })
    });

    // 下拉列表选中功能
    // 思路 ： 给下拉列表的a注册点击事件
    // 获取a的内容 赋于dro-text文本
    // 因为 a 是动态生成的 所以用事件委托事件
    $(".dropdown-menu").on("click", "a", function () {
        // 修改按钮的内容
        $(".dro-text").text($(this).text());
        // 获取id 将id赋于隐藏域
        $("#categoryId").val($(this).data("id"));
        // 手动将categoryId设置为VALID状态  VALID为校验成功得状态
        $form.data("bootstrapValidator").updateStatus("categoryId", "VALID");
    });

    // 初始化文件上传功能
    $("#fileupload").fileupload({
        dataType: "json",
        done: function (e, data) {
            //e：事件对象
            //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
            console.log(data);
            var result = data.result.picAddr;
            $(".img_box img").attr("src", result);
            // 修改隐藏域的id值
            $("#brandLogo").val(result);
            $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
        }
    });


    // 表单校验功能
    var $form = $("form");
    $form.bootstrapValidator({
        //配置不做校验的内容，给空数组，目的是让隐藏的和禁用的都做校验
        excluded:[],
        // 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: '请选择一级分类名称…'
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: '请填写名牌名称…'
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: '请上传名牌图片…'
                    }
                }
            }
        }
    });

    // 表单校验成功事件
    $form.on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            type : "post",
            url : "/category/addSecondCategory",
            data :$form.serialize(),
            success : function(info) {
                console.log(info);
                if (info.success) {
                    $('#second_box').modal('hide');
                    page = 1;
                    render();

                    //重置表单样式
                    $form.data("bootstrapValidator").resetForm(true);
                    //重置按钮的值
                    //重置图片的值
                    //dro-text是一个span，不能用val，用text方法
                    $(".dro-text").text('请选择一级分类~');
                    $(".img_box img").attr("src", 'images/none.png');
                }
            }
        })
    });


});