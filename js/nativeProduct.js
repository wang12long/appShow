/**
 * Created by anxia on 17.2.15.
 */
$(function () {
    doIt();

});
function doIt() {
    getData();
    /*=================给底部返回顶部的箭头添加事件================*/
    $(".top3").on("click", function () {
        $("html,body").animate({scrollTop: 0}, 500);
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
}
function getData() {
    var str = window.location.href;
    str = str.split('?')[1];
    var id = str.replace(/[^0-9]/g, '');
    console.log(str);
    $.ajax({
        url: 'http://139.199.157.195:9090/api/getdiscountproduct?productid=' + id,
        success: function (res) {
            var html1 = template('nativeTpl1', res);
            var html = template('nativeTpl', res);
            var product = res.result[0].productName;
            $('.content').html(html1);
            $('.comment').html(html);
            $('.pro').html(product);
        },
        complete: function () {
            $('#ctl00_ContentBody_Button1').on('click', function () {
                var re = {
                    result: [
                        {
                            text: $('#ctl00_ContentBody_txt_nr').val(),
                            nowTime:getDate()
                        }
                    ]
                };
                console.log($('#ctl00_ContentBody_txt_nr').val());
                var htm2 = template('tpl',re);
                $('.show').prepend(htm2);
                $('#ctl00_ContentBody_txt_nr').val('');
            })
        }
    });
}
function getDate() {
    var time = new Date();
    console.log(time);
    var year = time.getFullYear();
    var month = time.getMonth()+1;
    var day = time.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    month < 10 ? '0' + month : month;
    var t = month+'/'+day+'/'+year;
    return t;
}
