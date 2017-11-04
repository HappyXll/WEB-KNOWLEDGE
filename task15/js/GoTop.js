/**
 * Created by u on 2017/11/4.
 */
define(function () {
    var GoTop=(function () {
        function GotTop(ct)
        {
            this.ct=ct;
            this.target=this.createNode(this.ct);
            this.bindEvent('click')
        }
        GotTop.prototype.createNode=function(par){
            var div=document.createElement('div');
            div.innerText="回到顶部"
            par.appendChild(div);
            return div;

        }
        GotTop.prototype.bindEvent=function(event)
        {
            this.ct.addEventListener(event,function(){
                scrollTo(0,0);

            });
        }
        /*var s=document.querySelector(".wrapper");
        var f=new GotTop(s);*/
        return {
            init:function (wrapper) {
                new GotTop(wrapper);
            }
        }
    })();
    return GoTop;
})