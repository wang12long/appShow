$(function () {

    /*==========方法调用============================*/
    method();
    var pic=0;
    /*添加公用样式*/
    var imgBox = $(".slide")[0];
    var imgWidth = 200;
    //console.log($(".slide>li"));
    //设置过渡
    var addTransition = function () {
        imgBox.style.webkitTransition = "all .5s";
        imgBox.style.transition = "all .5s";
    };
    /*清除过渡*/
    var removeTransition = function () {
        imgBox.style.webkitTransition = "none";
        imgBox.style.transition = "none";
    };
    /*设置定位*/
    var setTranslateX = function (x) {
        imgBox.style.webkitTransform = 'translateX(' + x + 'px)';
        imgBox.style.transform = 'translateX(' + x + 'px)';
    };
    /*================方法的定义=============*/
    function method() {
        getKfc();
        getPhoto();
    }

    /*============优惠券数据请求=================*/
    //获取当前页面的url的参数
    // var url= window.location.href;获取当前的URL地址

    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }

    //console.log(getQueryString("couponId"));
    //获取对应优惠券的详情页数据;
    function getKfc() {
        $.get("http://139.199.157.195:9090/api/getcouponproduct?couponid=" + getQueryString("couponId") + " ", function (res) {
            var html = template("kfcTpl", res);
            $(".coupons>ul").html(html);
            /*动态生成的元素，只有在页面加载完成之后，才可以进行事件的绑定
             * 否则，事件是绑定不上去的*/
            $(".cover_box").on("click", function () {
                $(".cover")[0].style.display = "block";
                console.log($(this).index());
                pic = $(this).index();
                setTranslateX(-pic*imgWidth);
            });
            $(".cover").on("click", function () {
                $(".cover")[0].style.display = "none";
            });
            //setTranslateX(-pic*imgWidth);
        });
    }


    /*给遮罩里面的轮播图获取图片*/
    function getPhoto() {
        $.get("http://139.199.157.195:9090/api/getcouponproduct?couponid=" + getQueryString("couponId") + " ", function (res) {
            var html = template("slideTpl", res);
            $(".slide").html(html);
            banner();
        });

    }

    //左右焦点轮播图
    function banner() {
        /*点击箭头 让图片移动*/
        //var pic = 0;
        $(".arrRight").on("click", function (e) {
            //console.log($(".slide>li").length);
            e.stopPropagation();
            if (pic == $(".slide >li").length - 1) {
                pic = 0;
                setTranslateX(-pic * imgWidth);
            } else {
                pic++;
                setTranslateX(-pic * imgWidth);
            }
            addTransition();
            //console.log(i);
        });
        /*点击左箭头 让图片移动*/
        $(".arrLeft").on("click", function (e) {
            e.stopPropagation();
            if (pic == 0) {
                setTranslateX(-pic * imgWidth);
            } else {
                pic--;
                setTranslateX(-pic * imgWidth);
            }
            addTransition();
            //console.log(i);
        });
        /*设置触摸滑动*/
        //开始时的位置
        var startX = 0;
        //滑动时的位置
        var moveX = 0;
        //移动的距离
        var distanceX = 0;
        //是否滑动 默认false
        var isMove = false;
        /*注册事件*/
        imgBox.addEventListener("touchstart", function (e) {
            e.stopPropagation();
            startX = e.touches[0].clientX;
        });
        //开始触摸后触发
        imgBox.addEventListener("touchmove", function (e) {
            isMove = true;
            e.stopPropagation();
            moveX = e.touches[0].clientX;
            distanceX = moveX - startX;
            //console.log(distanceX);
            //图片在滑动的时候不断的给图片定位 达到滑动的效果;
            //定位的位置是当前图片的位置加上当前的移动距离
            //清除过渡
            removeTransition();
            //设置定位
            setTranslateX(-pic * imgWidth + distanceX);
        });
        /*离开后触发 在谷歌浏览器 touchend可能会丢失事件*/
        window.addEventListener("touchend", function () {
            //1 当图片滑动到一定的位置的时候 让图片吸附回去;
            // * 2 当图片滑动的距离超过 一定的距离的 时候 让图片的盒子向左 或者向右做相应的跳转*
            // 3 一定的距离就是1/3图片的宽度
            if (Math.abs(distanceX) > (imgWidth / 3) && isMove) {
                /*判断是上一张还是下一张 通过distance的值来判断*/
                if (distanceX > 0) {
                    pic = pic > 0 ? pic - 1 : 0;
                } else {
                    pic++;
                }
            }
            addTransition();
            setTranslateX(-pic * imgWidth);
            /*事件结束后 把所有的属性都清零 以防下次调用*/
            startX = 0;
            moveX = 0;
            distanceX = 0;
            isMove = false;
        });

    }
    /*=================给底部返回顶部的箭头添加事件================*/
    $(".toTop").on("click", function () {
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
});
