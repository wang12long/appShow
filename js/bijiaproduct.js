/**
 * Created by huhan on 2017/2/16.
 */
$(function () {
    //绑定返回顶部事件
    $('#foot .top3').on('click',function () {
        $.scrollTo(0,200);
    })
    var productid = getData().productid;
    //渲染导航栏
    setResult({
        url: 'http://139.199.157.195:9090/api/getcategorybyid',
        data: 'categoryid=' + getData().categoryid,
        domstr: '.nav',
        templateId: 'nav'
    })
    //模版自定义方法
    template.helper('random',function (star,end) {
        var s = end-star+1;
        var num = Math.floor(Math.random()*s)+star;
        return num;
    })
    // console.log(random(4, 5));
    //渲染商品信息
    setResult({
        url: 'http://139.199.157.195:9090/api/getproduct',
        data: 'productid=' + productid,
        domstr: '.info',
        templateId: 'info',
    })
    //渲染评价信息
    setResult({
        url: 'http://139.199.157.195:9090/api/getproductcom',
        data: 'productid=' + productid,
        domstr: '.comment>.content',
        templateId: 'comment',
    })





    //发起请求渲染页面封装
    function setResult(config) {
        $.ajax({
            url: config.url,
            data: config.data || '',
            dataType: 'json',
            success: function (result) {
                if (config.resultDispose) config.resultDispose(result);
                if (config.append) {
                    $(config.domstr).append(template(config.templateId, result));
                } else {
                    $(config.domstr).html(template(config.templateId, result));
                }
                if (config.success) config.success(result);
            }
        });
    }

    //提取url包含的数据封装
    function getData() {
        var url = window.location.href;
        var urlObject = {};
        if (/\?/.test(url)) {
            var urlString = url.substring(url.indexOf("?") + 1);
            var urlArray = urlString.split("&");
            for (var i = 0, len = urlArray.length; i < len; i++) {
                var urlItem = urlArray[i];
                var item = urlItem.split("=");
                urlObject[item[0]] = item[1];
            }
            return urlObject;
        }
        return null;
    }
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