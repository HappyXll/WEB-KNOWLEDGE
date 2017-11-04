/**
 * Created by u on 2017/11/2.
 */
define(["jquery"],function ($) {
    var carousel=(function(){
        function Carousel(wrapper)
        {
            this.wrapper=wrapper;
            //定时器
            this.clock;
            //图片的个数
            this.imglen=wrapper.find('.img-ct>li').length;
            //放置图片的ul
            this.imgCt=wrapper.find('.img-ct');
            //图片切换的索引
            this.index=0;
            //每张图片的大小
            this.imgctwidth=wrapper.find('.img-ct>li').width();
            //向前标志
            this.pre=wrapper.find('.pre');
            //向后标志
            this.next=wrapper.find('.next');
            this.block;
            this.init();
        }
        Carousel.prototype.init=function () {

            //克隆第一张图片
            this.firstClone=this.wrapper.find('.img-ct>li').eq(0).clone();
            //克隆最后一张图片
            this.lastClone=this.wrapper.find('.img-ct>li').eq(this.imglen-1).clone();
            //将克隆的第一张图片放置到最后
            this.imgCt.append(this.firstClone);
            //将克隆的最后一张图片放置到最前面
            this.imgCt.prepend(this.lastClone);
            //设置放置图片的ul的宽度
            this.imgCt.width((this.imglen+2)*this.imgctwidth);
            //设置ul的宽口展示的left值
            this.imgCt.css({left:-this.imgctwidth});
            //状态锁
            this.block=false;
            var _this=this;

            this.pre.on('click',function () {
                _this.stopAuto();
                _this.prePic(1);
                _this.autoPlay();
            });
            this.next.on('click',function () {
                _this.stopAuto();
                _this.nextPic(1);
                _this.autoPlay();
            });
            this.wrapper.find('.bullet>li').on('click',function(){
                //停止自动播放
                _this.stopAuto();
                var len=$(this).index();
                if(len>_this.index)
                { len=len-_this.index;
                    _this.nextPic(len);
                }
                else if(len<_this.index)
                {len=_this.index-len;
                    _this.prePic(len);
                }
                _this.autoPlay();
            });
            this.autoPlay();
        };
        //自动播放函数
        Carousel.prototype.autoPlay=function ()
        {
            this.clock=setInterval(function(){
                nextPic(1);
            },3000)
        };
        //停止自动播放函数
        Carousel.prototype.stopAuto=function ()
        {
            clearInterval(this.clock);
        }
        //展示前一张图的函数
        Carousel.prototype.prePic=function(len){
            if(!this.block)
            {//锁关闭
                this.block=true;
                this.index= this.index-len;
                var _this=this;
                this.imgCt.animate({left:'+='+len*_this.imgctwidth},function()
                {
                    //当滑动到第一张图片之前的克隆图片时
                    if(_this.index<0)
                    {
                        //ul的left切换到最后一张图片
                        _this.imgCt.css({left:-_this.imglen*_this.imgctwidth});
                        //索引切换到最后一张图片。
                        _this.index=_this.imglen-1;
                    }
                    //这些步骤都完成后锁打开。

                    _this.bullet();
                    _this.block=false;
                });
            }
        }
        //展示下一张图的函数
        Carousel.prototype.nextPic=function(len){
            if(!this.block)
            {this.block=true;
                this.index= this.index+len;
                var _this=this;
                this.imgCt.animate({left:'-='+len*_this.imgctwidth},function(){
                    //当滑动到最后一张图片的时候
                    if(_this.index==_this.imglen)
                    {
                        _this.imgCt.css({left:-_this.imgctwidth});
                        _this.index=0;
                    }
                    _this.bullet();
                    _this.block=false;
                });
            }}
        //图片标签的展示
        Carousel.prototype.bullet=function () {
            this.wrapper.find('.bullet>li').removeClass('active');
            this.wrapper.find('.bullet>li').eq(this.index).addClass('active');
        }
        //自动播放函数
        Carousel.prototype.autoPlay=function ()
        {   var nextpic=this.nextPic.bind(this,1);
            this.clock=setInterval(function(){
                nextpic(1);
            },3000);
        }
        Carousel.prototype.stopAuto=function ()
        {
            clearInterval(this.clock);
        }
        return {
            action:function(wrap){
                new Carousel(wrap);
            }
        }
    })();
    return carousel;
})