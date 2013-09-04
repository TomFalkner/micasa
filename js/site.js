$("a.portfolio").fancybox();
$("a.swfportfolio").fancybox({width:300, height:250, maxWidth:300, maxHeight:250, fitToView:false });
$("#scroll").click(function(){
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
});


