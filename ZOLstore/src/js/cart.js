import { log, $, cookietool, ajax } from './tool.js';
class Cart {
    constructor() {
        this.oTbody = $('.order-table tbody');
        this.sumprice = $('.total-cart-price');
        this.goodsInp = null;
    }
    init() {
        //获取cookie
        let sidarr = cookietool.getcookie('sid').split(',');
        let countarr = cookietool.getcookie('count').split(',');
        //取出cookie中的sid后转换成数组，进行ajax渲染
        this.cartRender(sidarr,countarr)
        //给各个input添加点击事件，采用事件委托方式，每次点击成功执行一次
        this.oTbody.onclick = (e)=>{
            let ev = e || window.event;
            let eTag = ev.target;
            //判断点击的是否为+/-符号
            if(eTag.className =='minus'){
                //取加入购物车的数量
                let oInp = eTag.parentNode.querySelector('.text-amount');
                //最低数量不能少于1
                if(oInp.value>1){
                    oInp.value = parseInt(oInp.value)-1
                }
                //每次点击都重新渲染一次价格
                this.priceRender()
                //取当前点击的按钮的整个商品容器标签
                let goodsTr = eTag.parentNode.parentNode.parentNode;
                //渲染小记价格
                goodsTr.querySelector('.cartGoodsPcie_2980584').innerHTML =parseInt(goodsTr.querySelector('.s-now-price').innerHTML) * oInp.value;
            }else if(eTag.className =='plus'){
                let oInp = eTag.parentNode.querySelector('.text-amount');
                oInp.value = parseInt(oInp.value)+1
                this.priceRender()
                let goodsTr = eTag.parentNode.parentNode.parentNode;
                goodsTr.querySelector('.cartGoodsPcie_2980584').innerHTML =parseInt(goodsTr.querySelector('.s-now-price').innerHTML) * oInp.value
            }
            //取商品复选框
            if (eTag.nodeName=='INPUT'){
                this.priceRender()
            }
        }
        
        
    }
    cartRender(sidarr,countarr) {
        ajax({
            type: 'get',
            dataType: 'json',
            url: 'http://192.168.64.2/www/ZOL/ZOLstore/php/zoldata.php'
        }).then( (data) =>{
            let str = `
                    <tr>
                        <th class="th-1"><label>
                            <input name="checkAllCart" type="checkbox" value="1" checked='true'>全选</label></label>
                        </th>
                        <th class="th-2">所选商品</th>
                        <th class="th-3">单价（元）</th>
                        <th class="th-4">数量</th>
                        <th class="th-6">小计（元）</th>
                        <th class="th-7">操作</th>
                    </tr>
                `
            for(let i = 0;i<sidarr.length;i++){
                for (let value of data) {
                    if(sidarr[i]==value.sid){
                        let count = countarr[sidarr.indexOf(value.sid)];
                        str +=`
                        <tr rel="goods-order" class="cart_2980584" id="${value.sid}">
                            <td colspan="2" class="s-infor">
                                <input  type="checkbox" item="item" checked="">
                                <a href="##" class="pic" target="_blank"><img width="80" height="80" src="${value.url}"></a>
                                <div class="inforbox">
                                    <h3 class="tit"><a href="##" title="##" target="_blank">${value.title}</a></h3>
                                </div>
                            </td>
                            <td class="s-price ">
                                <em class="s-old-price">${value.originalprice}</em>
                                <em class="s-now-price">${value.price}</em>
                            </td>
                            <td class="s-amount ">
                                <div class="buy-num">
                                    <a class="minus" href="##" title="减一">-</a>
                                    <input type="text" class="text-amount" value="${count}"
                                        class="cartNumber_2980584">
                                    <a class="plus" href="javascript:void(0)" title="加一" >+</a>
                                    <div class="tips-2" class="tips_2980584" style="display:none;"></div>
                                </div>
                            </td>
                            <td class="s-total">
                                <em class="cartGoodsPcie_2980584">${parseInt(count)*parseInt(value.price)}</em>
                            </td>
                            <td class="s-del">
                                <div class="s-delbox">
                                    <a href="##">删除</a>
                                </div>
                            </td>
                        </tr>
                        `; 
                    }
                    
                }
            }
            //购物车商品渲染
            this.oTbody.innerHTML=str;
            //取渲染出商品的所有input
            this.goodsInp = $('.cart_2980584>td>input');
            log(this.goodsInp)
            // 价格渲染函数
            this.priceRender()
        })
    }
    // 价格渲染函数,出现点击即调用
    priceRender(){
        let sumPri = 0;
        let zPrice = $('.cartGoodsPcie_2980584');
        //循环累加总价格
        for(let i = 0;i<zPrice.length;i++){
            //判断商品的复选框有没有勾选上，勾选上的价格进行累加
            if(this.goodsInp[i].checked == true){
                sumPri+=parseInt(zPrice[i].innerHTML) 
            }
        }
        this.sumprice[0].innerHTML = sumPri;
        this.sumprice[1].innerHTML = sumPri;
    }
}
export { Cart }
