$(function () {
    init();


    function init() {
        getIndexMenu();
        addEvent();
        getRebate();
    };


    /*===============首页菜单数据请求=====================*/
    function getIndexMenu() {
        $.ajax({
            url: "http://139.199.157.195:9090/api/getindexmenu",
            success: function (res) {
                var html = template("menuTpl", res);
                $(".menu>.row").html(html);
            }
        })
    }

    //给更多绑定点击事件
    function addEvent() {
        $(".menu>.row").on("click", "div:nth-child(8)", function () {
            $(".menu>.row>div:nth-last-child(-n+4)").slideToggle();
        })
    }

    /*=============================折扣商品数据请求==================================*/
    function getRebate() {

        $.get("http://139.199.157.195:9090/api/getmoneyctrl", function (res) {
            var i = res.result.length;
            while (i--) {
                res.result[i].productComCount = getNum(res.result[i].productComCount);
            }
            //给template注册自定义的方法
            //template.helper('getNum',getNum);
            var html = template("rebateTpl", res);
            $(".rebate>.rebate-item").html(html);

            function getNum(str) {
                return str.replace(/[^0-9]+/g, '');
            }
        })
    }
    /*=================给底部返回顶部的箭头添加事件================*/
    $(".toTop").on("click",function(){
        $("html,body").animate({scrollTop:0}, 500);
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
});
