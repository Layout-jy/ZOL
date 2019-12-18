import { Banner } from './banner.js';
import { goodsRender } from './goodsRender.js';
import { DetailRender } from './detail.js';
import { Cart } from './cart.js';
if (document.querySelector('#slideBox')) {
    new Banner().init();
    new goodsRender().init();
}

if (document.querySelector('#zoom1-big')) {
    new DetailRender().init();
}

if(document.querySelector('.order-table tbody')){
    new Cart().init();
}


