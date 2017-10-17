
$(".products>.head>ul>li").on('click',function(){
    var $that=$(this);
    $that.siblings().removeClass("active");
    $that.addClass( "active" );
    var $index=$that.index();
   /* console.log($that.index());
    console.log($that.parents(".products").index())*/
   $that.parents(".products").find(".content li").hide().eq($index).show();

})