$(document).ready(function(){

/*回到顶部效果*/
(function(){
   $(window).scroll(function(){
        $(window).scrollTop()>100? $("#returnTop").css("bottom","60px"):$("#returnTop").css("bottom","-200px");
    });
    $("#returnTop").bind("click",function(){
        if($(window).scrollTop != 0){
            if(!$("html,body").is(":animated")){
                $("html,body").animate({scrollTop: 0},500)
            }
            
        }
        
    }); 
})();
 
/*分类目录菜单点击效果*/   
(function(){
    $(".cates").hide();
    $(".category-list li:first-child").css({"background-color": "#CE2323","color":"#FFFFFF"});
    $(".category-list li")
    $(".category-list li").bind("click",function(){
        $(this).css({"background-color": "#CE2323","color":"#FFFFFF"}).siblings().css({"background-color":"transparent","color":"#000000"});
        var cateName = $(this).attr("data-cate");
        $(".cate-posts > ul[data-cate != "+cateName+"]").hide(280);
        $(".cate-posts > ul[data-cate = "+cateName+"]").show(400);
    }); 
})();

/*右侧目录*/
(function(){
   if (typeof $('#markdown-toc').html() === 'undefined') {
        $('.catalog-menu').hide();
    } else {
        $('.catalog-menu .catalog-menu-content').html($('#markdown-toc').html());
    } 
})();

/*首页导航效果*/
(function(){
    var pull = $('#pull');
    menu = $('nav ul');
    menuHeight  = menu.height();

    $(pull).on('click', function(e) {
        e.preventDefault();
        menu.slideToggle();
    });

    $(window).resize(function(){
        var w = $(window).width();
        if(w > 320 && menu.is(':hidden')) {
            menu.removeAttr('style');
        }
    });
})();
});




    
