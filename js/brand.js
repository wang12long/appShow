/**
 * Created by lenovo on 2017/2/14.
 */
$(function () {
    /*================方法的调用=================*/
    getBrand();
    getBrandTitle();
    /*点击底部按钮--返回顶部*/
    $('.top3').on("click", function () {
        $.scrollTo(0, 500);
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


/*-------解析url------------*/
function serilizeUrl() {
    var url = window.location.href;  //页面URL
    var urlObject = {};
    if (/\?/.test(url)) {  //test()方法用于检测一个字符串是否匹配某个模式.
        var urlString = url.substring(url.indexOf("?") + 1); //substring() 方法用于提取字符串中介于两个指定下标之间的字符。
                                                             //indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
        var urlArray = urlString.split("&");        //split() 方法用于把一个字符串分割成字符串数组。
        // console.log(urlArray);
        for (var i = 0; i < urlArray.length; i++) {
            var urlItem = urlArray[i];
            var item = urlItem.split("=");   //等号分割字符串
            //console.log(item);
            urlObject[item[0]] = item[1];
        }
        return urlObject;
    }
    return null;
}
// console.log(serilizeUrl());

/*---第一部分数据获取 并渲染----*/
function getBrand() {
    $.ajax({
        url: 'http://139.199.157.195:9090/api/getbrand',
        data: {'brandtitleid': serilizeUrl().brandtitleid},
        beforeSend: function () {
            $('.load').html('<img src="images/loading.gif" style="width: 25px;">');
        },
        success: function (res) {
            var html = template("brandTpl1", res);
            $('.goodbrand>.goodbrand-list>ul').html(html);
        },
        complete: function () {
            $(".load").remove();
        }
    });
}

/*--------懒加载----------*/
//定义变量
var flag = 10;
var res2 = {};
//滚动事件
$(window).on("scroll", function () {
    if (flag % 10 !== 0) {
        return;
    }
    //定义一个临界高度
    var height = $(".brand-category").offset().top + $(".brand-category").height() - $(window).scrollTop() - $(window).height();
    console.log(height);
    if (height <= 0) {
        console.log('loading');

        if (flag == 10) {
            flag = 11;
            getBrandproductList();
        }

        if (flag >= 20) {
            var leng = 4;
            if (res2.result.length <= 4) {
                leng = res2.result.length;
            }
            if (res2.result.length == 0) {
                flag = 1;
                $(".load3").remove();
            }
            for (var i = 0; i < leng; i++) {
                var result = {};
                result.productId = res2.result[0].productId;
                result.productImg = res2.result[0].productImg;
                result.productName = res2.result[0].productName;
                res2.result.shift();
                flag += 1;
                getProductCom(result);
            }
        }
    }
});

/*---第二部分数据获取 并渲染----*/
function getBrandproductList() {
    $.ajax({
        url: 'http://139.199.157.195:9090/api/getbrandproductlist?brandtitleid=' + serilizeUrl().brandtitleid,
        beforeSend: function () {
            $('.load2').html('<img src="images/loading.gif" style="width: 25px;">');
        },
        success: function (res) {
            res2 = res;
            var html = template("brandTpl2", res);
            $('.brand-category>.brandsales>.brandsales-list>ul').html(html);
            flag = 20;
        },
        complete: function () {
            $(".load2").remove();
        }
    });
}

/*---第三部分数据获取 并渲染----*/
function getProductCom(result) {
    $.ajax({
        url: 'http://139.199.157.195:9090/api/getproductcom',
        data: {'productid': result.productId},
        beforeSend: function () {
            $('.load3').html('<img src="images/loading.gif" style="width: 25px;">');
        },
        success: function (res) {
            res.productImg = result.productImg;
            res.productName = result.productName;
            var html2 = template("brandTpl3", res);
            $('.brand-category>.review>.review-list>ul').append(html2);
            flag += 9;
        }
    });
}
/*导航栏动态获取*/
function getBrandTitle() {
    $.ajax({
        url: 'http://139.199.157.195:9090/api/getbrandtitle',
        success: function (res) {
            var str = res.result[serilizeUrl().brandtitleid].brandTitle;

            str = str.replace("十大品牌", "");
            var str1 = str + '哪个牌子好';

            // console.log(res);
            $(".brand-nav").append(str1);
            $(".goodbrand>.b-list-title>h3").html(str1);
            $(".brandsales>.b-list-title>a").html(str + '产品销量排行');
            $(".review>.b-list-title>a").html(str + '最新评论');
        }
    });
}

