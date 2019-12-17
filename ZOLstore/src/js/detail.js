import { log, $, mathRandom, ajax } from './tool.js';
class DetailRender {
    constructor() {
        this.showpic = $('#zs-big-pic img');//展示框内的大图（小图）
        this.showLi = $('#zs-big-pic a')//小图的容器
        this.bigpic = $('#zoom1-big img');//大图
        this.smallfdj = $('.MagicZoomPup');//小放大镜
        this.bigfdj = $('.MagicZoomBigImageCont')//大放大镜
        this.oul = $('#zs-focus-list ul'); //缩略图列表的容器
        this.sid = location.search.slice(1).split('=')[1];
        this.zbig=$('#zoom1-big');
        
    }
    init() {
        this.renderLi()
        this.magnifyingGlass()
    }
    //渲染所有的小图，数据库有几张渲染几张
    renderLi() {
        ajax({
            type: 'get',
            dataType: 'json',
            url: 'http://192.168.64.2/www/ZOL/ZOLstore/php/detail.php',
            data: { sid: this.sid }
        }).then((data) => {
            let urls = data.urls;
            urls = urls.split(',');
            let str = '';
            log(urls);
            for (let value of urls) {
                str += `
                <li style="cursor:pointer;" class="">
                <a href="##"><img style="padding:0px;height:70px;width:70px;" src="${value}"></a>
                <i class="border" style="width:-4px;"></i>
                </li>
                `
            }

            this.oul.innerHTML = str;
            this.liClick();
        })

    }
    //给所有渲染出到小图添加点击事件
    liClick() {
        let oli = $('#zs-focus-list ul li');
        let smallPic = $('#zs-focus-list ul li a img');
        log(this.smallfdj)
        let _this = this;
        oli[0].className = 'hover';
        for (let i = 0; i < oli.length; i++) {
            oli[i].onclick = function () {
                for (let j = 0; j < oli.length; j++) {
                    oli[j].className = '';
                }
                oli[i].className = 'hover';
                _this.showpic.src = smallPic[i].src;
                _this.bigpic.src = _this.showpic.src;
            }
        }
    }
    //放大镜效果
    magnifyingGlass(){
        
        let _this = this;
        this.showLi.onmouseover = function(){
            _this.smallfdj.style.visibility="visible";
            _this.zbig.style.display = 'block';
            _this.showLi.onmouseout = function(){
                _this.smallfdj.style.visibility="hidden";
                _this.zbig.style.display = 'none';
            }
            _this.showLi.onmousemove = function(e){
                let ev =e || window.event;
                let bili = _this.bigpic.offsetWidth/_this.bigfdj.offsetWidth;//求运动比例
                //设置小放大镜的宽高
                let sfW = _this.bigfdj.offsetWidth/_this.bigpic.offsetWidth*_this.showpic.offsetWidth;
                let sfH = _this.bigfdj.offsetHeight/_this.bigpic.offsetHeight*_this.showpic.offsetHeight;
                _this.smallfdj.style.width = sfW+'px';
                _this.smallfdj.style.height = sfH +'px';
                //获取鼠标距离小图边界的位置
                let mouseX = ev.clientX-_this.showLi.offsetLeft;
                let mouseY = ev.clientY-_this.showLi.offsetTop;
                //小放大镜中心点相对于父元素的距离
                let sfTop = mouseY-_this.smallfdj.offsetHeight/2;
                let sfLeft = mouseX-_this.smallfdj.offsetWidth/2;
                //小放大镜运动
                _this.smallfdj.style.left = sfLeft+'px';
                _this.smallfdj.style.top = sfTop+'px';
                //大图运动
                _this.bigpic.style.left = -bili*sfLeft+'px';
                _this.bigpic.style.top = -bili*sfTop+'px';
                log(bili)
                log(sfLeft)
                //限制运动范围
                if(sfTop<=0){
                    _this.smallfdj.style.top = 0+'px';
                    _this.bigpic.style.top = 0+'px';
                }else if(sfTop>_this.showpic.offsetHeight-sfH){
                    _this.smallfdj.style.top = _this.showpic.offsetHeight-sfH+'px';
                    _this.bigpic.style.top = -bili*(_this.showpic.offsetHeight-sfH)+'px';
                }
                if(sfLeft<=0){
                    _this.smallfdj.style.left = 0+'px';
                    _this.bigpic.style.left = -0+'px';
                }else if(sfLeft>_this.showpic.offsetWidth-sfW){
                    _this.smallfdj.style.left = _this.showpic.offsetWidth-sfW+'px'
                    _this.bigpic.style.left = -bili*(_this.showpic.offsetWidth-sfW)+'px'
                }

            }
            
        }
        
    }
    
}
new DetailRender().init()