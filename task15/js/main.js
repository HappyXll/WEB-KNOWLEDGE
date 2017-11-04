/**
 * Created by u on 2017/11/2.
 */
require(['jquery',"Carousel","waterfull","GoTop"],function ($,carousel,waterfull,goTop) {
    carousel.action($(".carousel"));
   waterfull.init($("#news .box")) ;
    var  gotop=document.querySelector("#goTop");
    goTop.init(gotop);
})