/**
 * Created by u on 2017/11/3.
 */
define(['jquery'],function ($) {

    /*思路1:ajax获取数据
     *     2.拼接为html节点
     *     3.通过瀑布流的方式展现Dom
     *     4.当页面滚动的时候，通过底部看不见的Dom节点判断是否到达窗口的视线中。
     *     再去请求资源，重复上面三个步骤
     *     伪代码的展现:
     *      show(){
     *      getData(function(data){
     *          //拼接为html节点
     *         var node= getNode(data);
     *         //瀑布流的布局方式
     *          waterfull(node)
     *       })}
     *       $(window).on('scroll',function(){
     *          //Dom节点判断是否到达窗口的视线中
     *          if(isvisibal($Node1)){
     *             show();
     *          }}
     * */
    var waterful= (function(){
    //瀑布流布局构造函数
      function waterfull(ul)
     {  this.ul=ul;
        this.messNum=10;
        this.Curpage=1;
        //存放每列高的数组
        this.colHeights=[];
        //列的个数
        this.cols=parseInt($(this.ul).width()/$("#news .diapper").outerWidth(true));
        this.min=3;
        for(var i=0;i<this.cols;i++)
        {
            this.colHeights[i]=0;
        }
        var _this=this;
      this.getData(function (data) {
          $(data).each(function(index,li){
              var $liNode=_this.getNode(li);
              //当每个图片都加载完成后，开始瀑布流布局，
              // 这个是图片加载的优化，只要图片加入到了标签中，就可以开始加载了!
              $liNode.find('img').on('load',function () {

                  //开始瀑布流的布局方式
                 _this.ul.append($liNode);
                  _this.Layout( $liNode);

              }
            );
              _this.Curpage++;
      });});

         $(".addMore").on('click',function () {
             _this.getData(function (data) {
                 $(data).each(function(index,li){
                     var $liNode=_this.getNode(li);
                     //当每个图片都加载完成后，开始瀑布流布局，
                     // 这个是图片加载的优化，只要图片加入到了标签中，就可以开始加载了!
                     $liNode.find('img').on('load',function () {
                             //开始瀑布流的布局方式
                             _this.ul.append($liNode);
                             _this.Layout( $liNode);

                         }
                     );
                     _this.Curpage++;
                 });});
         })



     }

         //ajax获取数据
         waterfull.prototype.getData =function (callback)
             {  var _this=this;
                 $.ajax({
                     url:"http://platform.sina.com.cn/slide/album_tech",
                     dataType:'jsonp',
                     jsonp:'jsoncallback',
                     data: {
                         app_key: '1271687855',
                         num:_this.messNum,
                         page:_this.Curpage
                     }
                    }).done(function (ret) {
                      if(ret.status.code==0)
                      {
                         callback(ret.data);
                      }
                      else
                      {
                         callback("信息错误");
                      }
                   });
             }
         //拼接为html节点
            waterfull.prototype.getNode= function(node)
             {
                 var html=""
                 html+= '<li class="item">';
                 html+= '<a href='+ node.url+'>';
                 html+= '<img src='+node.img_url;
                 html+= '>';
                 html+= '<h3 class="title">'+node.short_name+'</h3>';
                 html+= '<p class="intro">'+node.short_intro+'</p>';
                 html+= '</a> </li>';
                 return $(html);
             }

             //瀑布流布局
             waterfull.prototype.Layout= function(ele)
             {
                 var index;
                 //选出最小高度的列作为top的值
                 var min=Math.min.apply(null,this.colHeights);
                 index=this.colHeights.indexOf(min);
                 ele.css({
                     top:min,
                     left:index*$(".diapper").outerWidth(true),
                     opacity:1
                 });
                 this.colHeights[index]+=ele.outerHeight(true);
                 $(this.ul).height(Math.max.apply(null,this.colHeights));
             }
           return {
               init:function (ul) {
                 new waterfull(ul);
               }
           }
      })();
   return waterful;
});
