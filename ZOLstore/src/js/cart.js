import { log, $, cookietool, ajax } from './tool.js';
class Cart {
    constructor() {
        this.oTbody = $('.order-table tbody');
        this.sumprice = $('.total-cart-price');
    }
    init() {
        //获取cookie
        let sidarr = cookietool.getcookie('sid').split(',');
        let countarr = cookietool.getcookie('count').split(',');
        
        log(sidarr)
        //取出cookie中的sid后转换成数组，进行ajax渲染
        this.cartRender(sidarr,countarr)
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
                            <input name="checkAllCart" type="checkbox" value="1" checked>全选</label></label>
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
                        <tr rel="goods-order" id="cart_2980584" istuan="1">
                            <td colspan="2" class="s-infor">
                                <input  type="checkbox" item="item" checked="">
                                <a href="##" class="pic" target="_blank"><img width="80" height="80" src="${value.url}"></a>
                                <div class="inforbox">
                                    <h3 class="tit"><a href="##" title="##" target="_blank">甲骨龙GL01 Intel九代i7 9700K RTX2070 8G独显256G M.2固态硬盘海盗船16G 3000HZ内存</a></h3>
                                </div>
                            </td>
                            <td class="s-price ">
                                <em class="s-old-price">${value.originalprice}</em>
                                <em>${value.price}</em>
                            </td>
                            <td class="s-amount ">
                                <div class="buy-num">
                                    <a class="minus" href="javascript:void(0)" title="减一">-</a>
                                    <input type="text" class="text-amount" value="${count}"
                                        id="cartNumber_2980584">
                                    <a class="plus" href="javascript:void(0)" title="加一" >+</a>
                                    <div class="tips-2" id="tips_2980584" style="display:none;"></div>
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
            // 价格渲染函数
            this.priceRender()
            
        })
    }
    priceRender(){
        // 价格渲染函数
        let sumPri = 0;
        let zPrice = $('.cartGoodsPcie_2980584');
        
        for(let i = 0;i<zPrice.length;i++){
            sumPri+=parseInt(zPrice[i].innerHTML) 
        }
        log(sumPri)
        this.sumprice[0].innerHTML = sumPri;
        this.sumprice[1].innerHTML = sumPri;
    }
}
export { Cart }
