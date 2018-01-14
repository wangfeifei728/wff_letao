/**
 * Created by Administrator on 2018/1/12.
 */

$(function () {

    var page = 1;
    var pageSize = 5;
    var imgArr = [];
    // 数据渲染页面
    function render() {
        $.ajax({
            type: "get",
            url: "/product/queryProductDetailList",
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info);
                $("tbody").html(template("tpl2", info));

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
                    },
                    // 控制每个按钮的内容
                    itemTexts: function (type, page, current) {
                        // type: 具体页码，返回page 首页 first 上一页 prev 下一页 next 最后一页 last
                        // page: 页码
                        // current：当前页

                        // switch 循环
                        switch (type) {
                            case "first" :
                                return "首页";
                            case "prev" :
                                return "上一页";
                            case "next" :
                                return "下一页";
                            case "last" :
                                return "末页";
                            case "page" :
                                return "第" + page + "页";
                        }
                    },
                    // 设置按钮的title属性
                    tooltipTitles: function (type, page, current) {

                    }
                })
            }
        })
    }

    render();

    // 点击添加商品 模态框弹出来
    $(".product_btn").on("click", function () {
        // 显示模态框
        $('#product-modal').modal('show');

        // 动态渲染下拉菜单
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (info) {
                console.log(info);
                $(".dropdown-menu").html(template("tpl3", info));
            }
        })

    });

    // 给dropdown-menu下面的所有的 a 注册 点击事件
    // 因为 a 是动态生成的 所以死事件委托
    $(".dropdown-menu").on("click", "a", function () {
        // 修改按钮 内容
        $(".dro-text").text($(this).text());
        // 获取id 将值赋于隐藏框
        $("#brandId").val($(this).data("id"));
        // 手动设置brandId值 为 VALID 状态
        $form.data("bootstrapValidator").updateStatus("brandId", "VALID");
    });

    // 初始化文件上传功能
    $("#fileupload").fileupload({
        dataType: "json",
        done: function (e, data) {
            console.log(data);
            if (imgArr.length >= 3) {
                return;
            }
            console.log(data.result);
            $(".img_box").append('<img src="' + data.result.picAddr + '" width="100px" height="100px" alt="">')
            imgArr.push(data.result);


            // 根据数组的长度 对 productLogo 进行校验
            if (imgArr.length === 3) {
                $form.data("bootstrapValidator").updateStatus("productLogo", "VALID");
            } else {
                $form.data("bootstrapValidator").updateStatus("productLogo", "INVALID");
            }

        }
    });

    // 表单验证
    var $form = $("form");
    $form.bootstrapValidator({
        //配置不做校验的内容，给空数组，目的是让隐藏的和禁用的都做校验
        excluded: [],
        // 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            brandId: {
                validators: {
                    notEmpty: {
                        message: '亲，二级分类不能为空…'
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: '亲，商品名称不能为空…'
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: '亲，商品描述不能为空…'
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: '亲，商品库存不能为空…'
                    },
                    //正则：只能有数字组成，并且第一位不能是0
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: "请输入标准的库存，比如，不能以0开头…"
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: '亲，商品尺寸不能为空…'
                    },
                    //正则：只能有数字组成，并且第一位不能是0
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: "请输入标准的尺码，比如:[36-45]…"
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: '亲，商品原价不能为空…'
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: '亲，商品现价不能为空…'
                    }
                }
            },
            productLogo: {
                validators: {
                    notEmpty: {
                        message: '亲，至少要上传三张图片哦…'
                    }
                }
            }
        }
    });

    // 给表单注册校验成功的事件
    $form.on('success.form.bv', function (e) {
        e.preventDefault();
        // 表单序列化
        var formNum = $form.serialize();
        // 拼接数组中的 imgArr 和 picAddr
        formNum += "&picName1="+imgArr[0].picName + "&picAddr1="+imgArr[0].picAddr;
        formNum += "&picName2="+imgArr[1].picName + "&picAddr2="+imgArr[1].picAddr;
        formNum += "&picName3="+imgArr[2].picName + "&picAddr3="+imgArr[2].picAddr;

        //使用ajax提交逻辑
        $.ajax({
            type : "post",
            url : "/product/addProduct",
            data : formNum,
            success : function (info) {
                console.log(info);
                if (info.success) {
                    // 隐藏模态框
                    $('#product-modal').modal('hide');
                    // 新加的数据添加到第一页
                    page = 1;
                    // 重新渲染
                    render();

                    // 重置表单
                    $form.data("bootstrapValidator").resetForm(true);
                    $(".dro-text").text("请选择商品分类~");
                    $(".img_box").remove(); // 图片自杀
                }
            }
        })
    });


});