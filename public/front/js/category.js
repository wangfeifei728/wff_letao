/**
 * Created by Administrator on 2018/1/15.
 */
$(function() {
   // 渲染数据加载到页面 动态数据
    $.ajax ({
        type : "get",
        url : "/category/queryTopCategory",
        success : function(info) {
            console.log(info);
            // 渲染到页面
            $(".cat_left .mui-scroll").html(template("mobile_catLeft" , info));
            // 根据渲染的左边id 牵引到 右边
            renderRight(info.rows[0].id);
        }
    });
    // 根据id 来渲染右边的内容
    function renderRight(id) {
        $.ajax ({
            type : "get",
            url : "/category/querySecondCategory",
            data : {id:id},
            success : function(info) {
                console.log(info);
                // 渲染到页面
                $(".cat_right .mui-scroll").html(template("mobile_catRight" , info));
            }
        })
    }

    // 点击左边，而显示相对应的右边商品
    // 因为 .now类名是动态生成 所以用事件委托
    $(".cat_left .mui-scroll").on("click" ,"li" , function () {
        // 修改样式
       $(this).addClass("now").siblings().removeClass("now");
        // 获取 id
        var id = $(this).data("id");
        // 重新渲染
        renderRight(id);
    })

});