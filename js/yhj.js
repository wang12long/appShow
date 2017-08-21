$(function () {


    /*============优惠券数据请求=================*/
    function getCoupon() {
        $.get("http://139.199.157.195:9090/api/getcoupon", function (res) {
            var html = template("couTpl", res);
            $(".coupon").html(html);
        });
    }
    getCoupon();
    /*广告缓存判断*/
    if(sessionStorage.colse == '1'){
        $(".brand-ad").hide();
    }

    /*固定广告点击事件*/
    $(".ad-close").on("click", function () {
        $(".brand-ad").hide();
        sessionStorage.colse = '1';
    });
});