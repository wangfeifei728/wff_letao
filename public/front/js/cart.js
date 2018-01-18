/**
 * Created by Administrator on 2018/1/15.
 */
$(function () {

    // 下拉刷新
    mui.init({
        pullRefresh: {
            container: ".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                auto: true,//可选,默认false.首次加载自动下拉刷新一次
                callback: function () {//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    // 发送ajax请求，获取购物车信息
                    $.ajax({
                        type: "get",
                        url: "/cart/queryCart",
                        success: function (info) {
                            console.log(info);
                            setTimeout(function () {
                                // 失败
                                if (info.error == 400) {
                                    location.href = "login.html?back = " + location.href;
                                }
                                // 成功 渲染页面
                                 $("#OA_task_2").html(template("cart_tpl" , {list : info}));

                                // 结束下拉刷新
                                mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                            }, 1000)
                        }
                    })

                }

            }
        }
    });

    // 删除功能
    // 找到所有删除按钮 注册点击事件 因为是动态生成 所以用事件委托
    $("#OA_task_2").on("tap" , ".mui_out" , function () {
        // 获取删除的id
        var id = $(this).parent().data("id");
        console.log(id);
        mui.confirm ("亲，确认要删除这个商品吗？" , "温馨提示:" , ["是" , "否"] , function (e) {
            if (e.index === 0 ) {
                // 请求ajax请求
                $.ajax ({
                    type : "get",
                    url : "/cart/deleteCart",
                    // id 是个数组
                    data : {id : [id] },
                    success : function (info) {
                        console.log(info);
                        // 重新刷新页面
                        if (info.success) {
                            // 手动刷新 js代码刷新
                            mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                        }
                    }
                })
            }
        })
    });


    // 修改功能
    // 找到修改按钮 注册点击事件
    $("#OA_task_2").on("tap" , ".mui_write" , function () {

        // 获取购物车数据
        var data = this.dataset;
        console.log(data);
        // 获取结构
        var html = template("cart_tpl2" , data);
        // html 的原因 浏览器会解析有br 换行，所以用正则将换行替换掉
        //把html中所有的换行(\n)给替换掉，因为mui会把\n给替换成br
        html = html.replace(/\n/g, "");
        // 模态框
        mui.confirm (html , "编辑商品" , ["确认" , "取消"] , function(e) {
            if (e.index==0) {

                // 获取 id size num
                var id = data.id;
                var size = $(".lt_cartSize span.now").text();
                var num = $(".mui-input-numbox").val();

                // 请求ajax
                $.ajax ({
                    type : "post",
                    url : "/cart/updateCart",
                    data : {
                        id : id,
                        size : size,
                        num : num
                    },
                    success : function (info) {
                        console.log(info);
                        // 成功后 再下拉刷新一次
                        mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                    }
                })
            }
        });


        //mui在mui.init()中会自动初始化基本控件,但是 动态添加的Numbox组件需要手动初始化
        mui(".lt_cartNum").numbox();

        //初始化尺码选择功能
        $(".lt_cartSize span").on("click" , function () {
            $(this).addClass("now").siblings().removeClass("now");
        })

    });


    // 计算总额
    // 点击复选框  获取金额
    $("#OA_task_2").on("change" , ".cart_ck" , function () {
        //总数
        var total = 0;
        // 获取点击的复选框的价格
        $(".cart_ck:checked").each(function () {
            var price = $(this).data("price");
            var num = $(this).data("num");
            total += price * num ;
        });
        console.log(total);

        $(".money span").text(total);
    });

});