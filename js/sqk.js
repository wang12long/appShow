/**
 * Created by Administrator on 2017/2/14 0014.
 */
$(function(){
    /*广告缓存判断*/
    if(sessionStorage.colse == '1'){
        $(".brand-ad").hide();
    }

    /*固定广告点击事件*/
    $(".ad-close").on("click", function () {
        $(".brand-ad").hide();
        sessionStorage.colse = '1';
    });
    /*返回顶部*/
    $(".top3").on("click", function () {
        $("html,body").animate({scrollTop: 0}, 500);
    })
        function getIndexMenu() {
            var i = getQueryString('pageid')||1;
            var itarger = i;
            $('select')[0].selectedIndex=itarger-1;
            $.get("http://139.199.157.195:9090/api/getmoneyctrl?pageid="+itarger, function (res) {
                var j = res.result.length;
                while(j--){
                    res.result[j].productComCount = getNum(res.result[j].productComCount );
                }
                res.pageid = itarger;
                var html = template("menuTpl", res);
                $("#border").html(html);
                function getNum(str){
                    return str.replace(/[^0-9]+/g,'')
                }
            });

            $('button').on('click', function () {

                //console.log($(this).hasClass('back'));
                if($(this).hasClass('back')){
                    itarger = i>1?i-1:1;
                    if($('select')[0].selectedIndex>0){
                        $('select')[0].selectedIndex--;
                    }else{
                        $('select')[0].selectedIndex=0;
                    }
                }else{
                    itarger = i<15?i+1:15;
                    if($('select')[0].selectedIndex<14){
                        $('select')[0].selectedIndex++;
                    }else{
                        $('select')[0].selectedIndex=14;
                    }
                }

                if(i !== itarger){
                    $.get("http://139.199.157.195:9090/api/getmoneyctrl?pageid="+itarger, function (res) {
                        var j = res.result.length;
                        while(j--){
                            res.result[j].productComCount = getNum(res.result[j].productComCount );
                        }
                        res.pageid = itarger;
                        var html = template("menuTpl", res);
                        $("#border").html(html);
                        $("html,body").animate({scrollTop: 0}, 500);
                        function getNum(str){
                            return str.replace(/[^0-9]+/g,'')
                        }
                    });
                    i=itarger;
                }
            });
            $('select').on('change',function(){
                itarger =$('select')[0].selectedIndex+1;
                $.get("http://139.199.157.195:9090/api/getmoneyctrl?pageid="+itarger, function (res) {
                    var j = res.result.length;
                    while(j--){
                        res.result[j].productComCount = getNum(res.result[j].productComCount );
                    }
                    res.pageid = itarger;
                    var html = template("menuTpl", res);
                    $("html,body").animate({scrollTop: 0}, 10);
                    $("#border").html(html);
                    i = itarger;
                    function getNum(str){
                        return str.replace(/[^0-9]+/g,'')
                    }
                });
            })

        }
        getIndexMenu();

        function getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        }
    }
)

