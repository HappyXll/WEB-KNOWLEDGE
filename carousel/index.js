/**
 * Created by u on 2017/10/17.
 */
/*思路是将最后一张图片复制到第一张图片之前
 将第一张图片复制到最后一张图片之后
 点击pre按钮时，ul像左移动(-=)一个图片的宽度
 如果点击到第一张（data=5）的

 问题处理：当连续点击多次的时候，点到最后或最前面一张的时候，动画没有完成，
 会出现留白的现象。所以得用一个锁来控制，多次点击中只有保证动画完成后才能进行下一个动画的开始。
 */
var clock;
//图片的个数
var  imglen=$('.img-ct>li').length;
//放置图片的ul
var  imgCt=$('.img-ct');
//图片切换的索引
var  index=0;
//每张图片的大小
var imgctwidth=$('.img-ct>li').width();
//向前标志
var pre=$('.pre');
//向后标志
var next=$('.next');
//克隆第一张图片
var firstClone=$('.img-ct>li').eq(0).clone();
//克隆最后一张图片
var lastClone=$('.img-ct>li').eq(imglen-1).clone();
//将克隆的第一张图片放置到最后
imgCt.append(firstClone);
//将克隆的最后一张图片放置到最前面
imgCt.prepend(lastClone);
//设置放置图片的ul的宽度
$('.img-ct').width((imglen+2)*imgctwidth);
//设置ul的宽口展示的left值
imgCt.css({left:-imgctwidth});
//状态锁
var block=false;
//自动播放函数
function autoPlay(){
    clock=setInterval(function(){
        nextPic(1);
    },3000)
}
//停止自动播放函数
function stopAuto(clock)
{
    clearInterval(clock);
}

autoPlay();

//展示前一张图的函数
function prePic(len){
    if(!block)
    {//锁关闭
        block=true;
        index=index-len;
        imgCt.animate({left:'+='+len*imgctwidth},function()
        { //当滑动到第一张图片之前的克隆图片时
            if(index<0)
            {
                //ul的left切换到最后一张图片
                imgCt.css({left:-imglen*imgctwidth});
                //索引切换到最后一张图片。
                index=imglen-1;
            }
            //这些步骤都完成后锁打开。
            block=false;
            console.log(index);
            bullet();

        });


    }
}

//展示下一张图的函数
function nextPic(len){
    if(!block)
    {block=true;
        index=index+len;
        imgCt.animate({left:'-='+len*imgctwidth},function(){
            //当滑动到最后一张图片的时候
            if(index==imglen)
            {

                $('.img-ct').css({left:-imgctwidth});
                index=0;
            }
            console.log(index);
            bullet();
            block=false;
        });

    }}

//图片标签的展示
function bullet()
{
    $('.bullet>li').removeClass('active');
    $('.bullet>li').eq(index).addClass('active');
}

//点击'向前'按钮
pre.on('click',function()
{  //停止自动播放
    stopAuto();
    //展示前一张图片
    prePic(1);

});

//点击'向后'的按钮
next.on('click',function()
{
    //停止自动播放
    stopAuto();
    //展示下一张图片
    nextPic(1);
});

$('.bullet>li').on('click',function(){
    //停止自动播放
    stopAuto();
    var len=$(this).index();
    if(len>index)
    { len=len-index;
        nextPic(len);
    }
    else if(len<index)
    {len=index-len;
        prePic(len);
    }

});