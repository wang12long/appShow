/**
 * Created by lenovo on 2017/2/14.
 */
$(function(){
    /*================方法的调用=================*/
    getBrandTitle();
    /*点击底部按钮--返回顶部*/
    $('.top3').on("click",function(){
        $.scrollTo(0,500);
    });
    /*广告缓存判断*/
    if(sessionStorage.colse == '1'){
        $(".brand-ad").hide();
    }

    /*固定广告点击事件*/
    $(".ad-close").on("click", function () {
        $(".brand-ad").hide();
        sessionStorage.colse = '1';
    });
})

/*====================方法的定义=================*/
function getBrandTitle(){
    $.ajax({
        url:'http://139.199.157.195:9090/api/getbrandtitle',
        beforeSend:function(){
            //$('.load').html('loading...');
            $('.load').html('<img src="images/loading.gif" style="width: 20px;">');
        },
        success:function(res){
            var html = template("brandTitleTpl",res);
            $('.brandTitle-category>.brandTitle-list>ul').html(html);
        },
        complete:function(){
            $(".load").html('');
        }
    });
}
