$(function () {

    /*====================方法的调用================*/
    init();
    /*====================方法的定义================*/

    /*初始化*/
    function init() {
        getgsshop();
        getShoparea();
        getProduct();
        //返回顶部
        $(".top3").on("click",function(){
            $("html,body").animate({scrollTop:0}, 500);
        })
    }
    var shopid = 0,areaid = 0;

    //请求店铺信息
    function getgsshop() {
        $.ajax({
            type:'get',
            url:"http://139.199.157.195:9090/api/getgsshop",
            success:function(res){
                var html= template("item1",res);
                $(".popsort>ul").html(html);
                addEvent();
            }
        })
    };
    //请求地区信息
    function getShoparea() {
        $.ajax({
            type:'get',
            url:"http://139.199.157.195:9090/api/getgsshoparea",
            success:function(res){
                var html= template("item2",res);
                $(".popprice>ul").html(html);
                addEvent();
            }
        })
    };
    //请求商品列表信息渲染到页面封装函数
    function getProduct(shopid,areaid) {
        console.log('sss');
        $.ajax({
            url: "http://139.199.157.195:9090/api/getgsproduct?shopid="+(shopid||0)+"&areaid="+(areaid||0),
            success: function (res) {
                var html = template("item3", res);
                $("#container").html(html);
            }
        });
    };

    /*绑定点击更多事件*/
    function addEvent() {
        var popboxs = document.querySelectorAll(".popbox");
        var search = document.querySelector(".search");
        var popsorts = document.querySelectorAll(".popsort li");//店铺
        var popprices = document.querySelectorAll(".popprice li");//区域
        var popcats = document.querySelectorAll(".popcat li");//价格
        var lis = document.querySelectorAll(".coudan .list .filter li");
        var aAa1 = document.querySelectorAll(".popsearch #s1 dd a");
        var aAa2 = document.querySelectorAll(".popsearch #s2 dd a");

        //绑定标题点击展开子类并且排他
        lis[lis.length] = search;
        for (var i = 0; i <= lis.length; i++) {
            lis[i].index = i;
            lis[i].onclick = function () {
                $('.coudan .list .filter li.on,.coudan .list .search.on').not(this).removeClass('on');
                $(this).toggleClass("on");
                $('.popbox').hide();
                if($(this).hasClass("on")){
                    $(popboxs[this.index]).show();
                }else{
                    $(popboxs[this.index]).hide();
                }
            }
        };
        //子类绑定排他,和请求数据渲染页面,更改标题栏信息
        getOn(popsorts,'.coudan .popsort ul li.on');
        getOn(popprices,'.coudan .popprice ul li.on');
        getOn(popcats,'.coudan .popcat ul li.on');
        getOn(aAa1,'.popsearch #s1 dd a.on');
        getOn(aAa2,'.popsearch #s2 dd a.on');


       function getOn(elements,element){
           for(var i = 0;i<elements.length;i++){
               elements[i].index = i;
               elements[i].onclick =function(){
                   $(element).not(this).removeClass('on');
                   $(this).addClass("on");
                   //店铺
                   if(elements==popsorts){
                       console.log(this.index);
                       shopid = this.index;
                       var str = $(this).find('a').html();
                       setTimeout(function () {
                           $('.coudan .popsort').slideUp();
                           $('.coudan .list .filter li.on').removeClass('on').find('a').html(str);
                       },200);
                       getProduct(shopid,areaid);//请求对应数据
                   }
                   //区域
                   if(elements==popprices){
                       console.log(this.index);
                       areaid = this.index;
                       var str = $(this).find('a').html();
                       str = str.slice(0,str.indexOf('（'))+'<i></i>';
                       setTimeout(function () {
                           $('.coudan .popprice').slideUp();
                           $('.coudan .list .filter li.on').removeClass('on').find('a').html(str);
                       },200)
                       getProduct(shopid,areaid);//请求对应数据
                   }
                   //价格
                   if(elements==popcats){
                       console.log(this.index);
                       areaid = this.index;
                       var str = $(this).find('a').html();
                       setTimeout(function () {
                           $('.coudan .popcat').slideUp();
                           $('.coudan .list .filter li.on').removeClass('on').find('a').html(str);
                       },200)
                       getProduct(shopid,areaid);//请求对应数据
                   }
               }
           }
       }
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


