$(function () {
    //设置开关
    var flag = false;
    var arr1;
    doIt();
    /*广告缓存判断*/
    if(sessionStorage.colse == '1'){
        $(".brand-ad").hide();
    }

    /*固定广告点击事件*/
    $(".ad-close").on("click", function () {
        $(".brand-ad").hide();
        sessionStorage.colse = '1';
    });
    /*=================给底部返回顶部的箭头添加事件================*/
    $(".top3").on("click", function () {
        $("html,body").animate({scrollTop: 0}, 500);
    });
});

function doIt() {
    //调用getajax函数从后台获取数据
    getAjax();
    var i = 1;
    $(window).on('scroll', function () {
        //当开关 关 时，直接跳出
        if(!flag){
            return;
        }
        //获取事件发生条件
        var height = $('.axProduct').height();
        var offsetTop = $('.axProduct').offset().top;
        var scrollTop = $(this).scrollTop();
        var winHeight = $(this).height();
        var offset = offsetTop + height - scrollTop - winHeight;
        if (offset <=50) {
            i++;
            flag = false;
            if(i==5){
                //最后一组加载完毕后不在进行加载，跳出
                return;
            }
            renderer(i);
        }
    });
}

function getAjax(){
    $.ajax({
        url: 'http://139.199.157.195:9090/api/getinlanddiscount',
        success: function (res) {
            //定义一个三维数组来将获取的数据分为5个数组每个数字右4组数据来存储
            arr1 = [[], [], [], [], []];
            var k = 0;
            //将数据存入数组
            for (var i = 0; i < 5; i++) {
                for (var j = 0; j < 4; j++)
                    arr1[i][j] = (res.result[k++])
            }
            //进行首次渲染
            renderer(0);
            renderer(1);
        }
    });

}
//将数据渲染单独封装成一个函数
function renderer(page) {
            var re = {
                result: arr1[page]
            };
            console.log(re);
            var html = template('nativeTpl', re);
            $('.product').append(html);
            flag = true;
        }



//测试
    /*$.ajax({
        //url: 'http://mmb.ittun.com/api/getinlanddiscount',
        url: 'http://139.199.157.195:9090/api/getinlanddiscount',
        success: function (res) {
            var arr1 = [[], [], [], [], []];
            var k = 0;
            //var k = -1;
            //for(var i = 0;i<res.result.length;i++){
            //    if(i%3==0){
            //        k++;
            //    }
            //    arr1[k][i%3]=(res.result[i]);
            //
            //}
            for (var i = 0; i < 5; i++) {
                for (var j = 0; j < 4; j++)
                    arr1[i][j] = (res.result[k++])
            }
            var re = {
                result: arr1[page]
            };
            //console.log(re);
            var html = template('nativeTpl', re);
            //console.log(arr1);
            $('.product').append(html);
            console.log('����' + page + 'ҳ');
            flag = true;
        }
    });
*/
