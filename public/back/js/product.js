/**
 * Created by Administrator on 2018/1/12.
 */

$(function () {

    var page = 1;
    var pageSize = 5;
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
                    }
                })
            }
        })
    }

    render();

    // 点击添加商品 模态框弹出来
    $(".product_btn").on("click", function () {
        // 显示模态框
        $('#product-modal').modal('show')
    });


});