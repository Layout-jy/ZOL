import { log, $, mathRandom, ajax } from './tool.js';
//商品渲染对象
class goodsRender {
    constructor() {
        this.oList = $('.jinriqianggou');
    }
    init() {
        this.render();
    }
    render() {
        let _this = this;
        ajax({//调用工具库中的ajax插件
            type: 'get',
            url: 'http://192.168.64.2/www/ZOL/ZOLstore/php/zoldata.php',
            dataType: 'json'
        }).then( (data) =>{
            let str = '';
            for (let value of data) {//遍历json数据累加给str
                str += `
                <div class="item ml20 fl">
                <div class="pic-box">
                    <a href="http://192.168.64.2/www/ZOL/ZOLstore/src/detail.html?sid=${value.sid}"
                        target="_blank"><span class="pic-icon pic-icon-one"></span>
                        <img src="${value.url}" alt="${value.title}">
                    </a>
                </div>
                <div class="pic-text f14">
                    <a href="http://192.168.64.2/www/ZOL/ZOLstore/src/detail.html?sid=${value.sid}"   target="_blank">${value.title}</a>
                </div>
                <div class="foot-price mt f22">
                    <span class="f12">¥</span>${value.price} <span class="original c999 f12">
                        ¥${value.originalprice} </span>
                </div>
                </div>
                `;
            }
            this.oList.innerHTML = str;//最后一次性渲染出来
        })
    }
}
export { goodsRender }