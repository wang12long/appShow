/**
 * Created by huhan on 2017/2/15.
 */
$(function () {
    //获取分类id
    var categoryId = getData().categoryId;
    //渲染导航栏
    setResult({
        url: 'http://139.199.157.195:9090/api/getcategorybyid',
        data: 'categoryid=' + categoryId,
        domstr: '.nav',
        templateId: 'nav'
    });
    //渲染商品列表,并且实现列表翻页功能
    function productlist() {
        var page = 1,//当前页面索引
            pageTarget = page,//目标页面索引
            pageMax = 0; //总页码
        setResult({
            url: 'http://139.199.157.195:9090/api/getproductlist',
            data: 'categoryid=' + categoryId,
            domstr: '.productlist',
            templateId: 'productlist',
            success: function (result) {
                pageMax = Math.ceil(result.totalCount / result.pagesize);
                var html = '';
                for (var i = 1; i <= pageMax; i++) {
                    html += '<option value="' + i + '">第' + i + '页</option>';
                }
                $('.pagebox select').html(html);
                $('.buttom').on('click', function () {
                    if ($(this).index() === 0) {
                        pageTarget = page === 1 ? 1 : page - 1;
                    } else {
                        pageTarget = page === pageMax ? pageMax : page + 1;
                    }
                    changePage();
                })
                $('select').on('change',function () {
                    pageTarget = $('select option:selected').index()+1;
                    changePage();
                })
            }
        });
        //翻页函数封装
        function changePage() {
            if (pageTarget !== page) {
                $.scrollTo(0 , 200 );
                setResult({
                    url: 'http://139.199.157.195:9090/api/getproductlist',
                    data: 'categoryid=' + categoryId + '&pageid=' + pageTarget,
                    domstr: '.productlist',
                    templateId: 'productlist',
                    success: function () {
                        $('select option:nth-child(' + pageTarget + ')')[0].selected = true;
                        page = pageTarget;
                    }
                });
            }
        }
    }
    productlist();

    //绑定返回顶部事件
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
})