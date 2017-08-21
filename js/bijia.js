/**
 * Created by huhan on 2017/2/14.
 */
$(function () {
    $('#foot .top3').on('click',function () {
        $.scrollTo(0,200);
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
    //渲染页面数据
    setResult({
        url: "http://139.199.157.195:9090/api/getcategorytitle",
        domstr: "body>.category",
        templateId: "classtit",
        success: function () {
            //渲染后绑定点击展开事件
            $('.category').on('click', '.tit', function () {
                if ($(this)) {
                    $(this)
                        .parent()
                        .toggleClass('active')
                        .find('.item')
                        .slideToggle(function () {
                            if($(this).parent().hasClass('active')){
                                $.scrollTo($(this).prev()[0],{
                                    offset: -100,
                                    duration: 600
                                });
                            }
                        });
                }
            })
            $('.item').each(function (i) {
                setResult({
                    url: "http://139.199.157.195:9090/api/getcategory",
                    data: "titleid=" + i,
                    domstr: "[titleId=" + i + "]>.item",
                    templateId: "classitem",
                });
            })
        }
    });

    //ajax渲染页面函数封装
    /*
    * 参数:
    * url:请求的地址,不用跟要发送的数据,必需
    * data:发送的数据,可选
    * domstr:页面标签选择字符串,必需
    * templateId:模版id,必需
    * resultDispose:返回数据的处理函数,会接收请求到的数据,进行处理,可选
    * append:布尔值,追加页面内容时使用,可选
    * success:页面渲染之后要执行的函数,可选
    * */
    function setResult(config) {
        $.ajax({
            url: config.url,
            data: config.data || '',
            dataType: 'json',
            success: function (result) {
                if (config.resultDispose) config.resultDispose(result);
                if (config.append){
                    $(config.domstr).append(template(config.templateId, result));
                }else{
                    $(config.domstr).html(template(config.templateId, result));
                }
                if (config.success) config.success();
            }
        });
    }
});