/**
 * Created by Administrator on 2017/2/14.
 */
$(function () {
    //模版绑定取随机数方法
    template.helper('random',function (start,end) {
        var s = end-start+1;
        return Math.floor(Math.random()*s)+start;
    })
    //搜索栏收起放下部分
    $('.icon_search').on('click', function () {
        // console.log('111')
        $('.showcase').slideToggle();
        $('.icon_search span').fadeToggle(0);
    });
    var titlength = 0;
    //动态获取导航的内容
    $.get('http://139.199.157.195:9090/api/getbaicaijiatitle', function (info) {
        var html = template("msg", info);
        $('.search').append(html);
        //获取导航条的个数
        //是结果的长度
        titlength = info.result.length;
        // console.log(titlength);
        intable();
        //导 航点击事件
        $('.search>ul>li').on('click', function () {
            // console.log(this);
            if ($(this).hasClass('active')) {
                return;
            }
            if($(this).index()==0){
                indexFlag = true;
                $('.wait').show();
            }else{
                indexFlag = false;
                $('.wait').hide();
            }
            $(this)
                .addClass('active')
                .siblings('.active')
                .removeClass('active');
            var that = this;
            $.get('http://139.199.157.195:9090/api/getbaicaijiaproduct?titleid=' + $(this).index(), function (info) {
                var html = template("tpl", info);
                $('.content').html(html);
                if($(that).index()==0){
                    i=0;
                    m=0;
                    heightArray = [$('.content').height()];
                    console.log(heightArray);
                }
            })
        })
    });
    //导航滑动效果
    function intable() {
        var $parent = $('.search');
        var $child = $parent.find('ul');
        var $lis = $child.find('li');

        var width = 0;
        $lis && $lis.each(function () {
            width += $(this).outerWidth(true);
        });

        $child.width(width + 90);
        itcast.iScroll({
            swipeDom: $parent.get(0),
            swipeType: 'x',
            swipeDistance: 50
        });
    };
    //用来记录每次获取的商品的总高度
    var heightArray = [];
    // 动态获取商品部分
    $.get('http://139.199.157.195:9090/api/getbaicaijiaproduct?titleid=0', function (info) {
        var html = template("tpl", info);
        $('.content').append(html);
        heightArray = [$('.content').height()];
        console.log(heightArray);
    })

    $(window).on('scroll', function () {
        var height = $('body').scrollTop();
        // console.log(height);
        if (height < 330) {
            $('.turntop').hide();
        } else {
            $('.turntop').show();
        }
    })
    //回到顶部的滑动效果
    $('.turntop').on('click', function () {
        var t = setInterval(function () {
            var targer = 0;
            var leader = scroll().top;
            var step = (targer - leader) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            leader = leader + step;
            window.scrollTo(0, leader);
            if (leader == targer) {
                clearInterval(t);
            }
        }, 15)

    })

    $('.top3').on('click', function () {
        var t = setInterval(function () {
            var targer = 0;
            var leader = scroll().top;
            var step = (targer - leader) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            leader = leader + step;
            window.scrollTo(0, leader);
            if (leader == targer) {
                clearInterval(t);
            }
        }, 15)
    })

    function scroll() {
        return {
            top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
            left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
        };
    }

    //懒加载和滚动切换标记
    //节流阀
    var flag = true;
    //请求的数据id从0开始
    var i = 0;
    //标记页面是否是全部一栏
    var indexFlag = true;
    //标记当前滚动到第几页的数据
    var m=0;
    $(window).on("scroll", function () {
        if ((!flag)||(!indexFlag)) return false;
        //获取滚到底部的距离
        var offsetTop = $('.content').offset().top;
        var height = $('.content').height();
        var scrollTop = $(this).scrollTop();
        var winHeight = $(this).height();

        //商品滚轮回拨的时候 红色下划线跟着动
        // var m = Math.floor((scrollTop)/2750);
        // console.log(scrollTop);
        for(var j=0;j<heightArray.length;j++){
            if((scrollTop+$(window).height())<heightArray[j]){
                m=j;
                break;
            }
        }
        // console.log(m);
        $('.search>ul>li').removeClass('active').eq(m).addClass('active');



        // 计算滚动条的位置
        var offset = offsetTop + height - scrollTop - winHeight;
        if (offset <= -100) {
            flag = false;
            //当导航条的值大于自身的时候 跳出
            if (i >= titlength - 1) {
                $('.wait').hide()
                return false;
            }
            i++;
            $.get('http://139.199.157.195:9090/api/getbaicaijiaproduct?titleid=' + i, function (info) {
                var html = template("tpl", info);
                setTimeout(function () {
                    $('.content').append(html);
                    $('.search>ul>li').removeClass('active').eq(i).addClass('active');
                    flag = true;
                    heightArray.push($('.content').height());
                    console.log($(heightArray));
                }, 100);

            })
        }
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