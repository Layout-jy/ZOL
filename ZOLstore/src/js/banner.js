import{ bufferMove } from './move.js';
function log(obj){
    console.log(obj)
};
function qS(node){
    if(document.querySelectorAll(node).length>1){
        return document.querySelectorAll(node);
    }else {
        return document.querySelector(node);
    }
}
class Banner {
    constructor(){
        this.aLi = qS('#slideBox .hd li');//获取小圆点
        this.oUl = qS('#slideBox .bd ul');//获取整个轮播框
        this.oPic = qS('#slideBox .bd li');//获取轮播框内所有图片外的li
        this.index = 0;//索引，贯穿前后
        this.prev = qS('.prev');//左边按钮
        this.next = qS('.next');//右边按钮
    }
    init(){
        let liW = qS('#slideBox .bd li')[0].offsetWidth;
        this.oUl.style.width = liW * this.aLi.length +'px';
        this.touch_aLi(liW);
        this.aLeft(liW);
        this.aRight(liW);
    }
    //给小圆圈添加点击事件 
    touch_aLi(liW) {
        let _this = this;
        for (let i = 0;i<this.aLi.length;i++){
            this.aLi[i].onclick = function(){
                _this.index = i;
                _this.ulmove(liW)
                _this.aLi[_this.index].className = 'on';
            }
        }
    }
    //给左右按钮添加点击事件
    aLeft(liW){
        let _this = this;
        this.prev.onclick = function(){
            if(_this.index>0){
                _this.index--;
            }else{
                _this.index= _this.oPic.length-1;
            }
           _this.ulmove(liW);
           _this.aLi[_this.index].className = 'on'
        }
    }
    aRight(liW){
        let _this = this;
        this.next.onclick = function(){
            if(_this.index<_this.oPic.length-1){
                _this.index++;
            }else{
                _this.index= 0;
            }
           _this.ulmove(liW);
           _this.aLi[_this.index].className = 'on'
        }
    }
    //ul运动函数
    ulmove(liW){
        for(let j = 0;j<this.aLi.length;j++){
            this.aLi[j].className = '';
        }
        bufferMove(this.oUl,{left:-liW * this.index})
    }
}
export{
    Banner
};