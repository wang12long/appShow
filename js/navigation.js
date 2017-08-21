/**
 * Created by lenovo on 2017/2/17.
 */
$(function(){
    /*================方法的调用=================*/
    getSiteNav();
    /*点击底部按钮--返回顶部*/
    $('.top3').on("click",function(){
        $.scrollTo(0,100);
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


function getSiteNav(){
    $.ajax({
        url:'http://139.199.157.195:9090/api/getsitenav',
        success:function(res){
            var html = template("navTpl",res);
            $('.navigation-content').html(html);
        }
    });
}