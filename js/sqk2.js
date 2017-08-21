/**
 * Created by Administrator on 2017/2/15 0015.
 */
$(function(){
    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }
    console.log(getQueryString("productId"));
    console.log(getQueryString("pageid"));
    $('header .back')[0].href = 'moneyctrl.html?pageid='+getQueryString("pageid");
    function getIndexMenu(){
        $.get("http://139.199.157.195:9090/api/getmoneyctrlproduct?productid="+getQueryString("productId") +"",function(res){
            var html = template('Shop',res)
            $("section").html(html);
        })

    }
    getIndexMenu();
    $(".top3").on("click", function () {
        $("html,body").animate({scrollTop: 0}, 500);
    })
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



