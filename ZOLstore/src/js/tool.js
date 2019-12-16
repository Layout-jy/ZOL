//console.log简写
function log(obj) {
    console.log(obj)
};
//获取元素封装
function $(node) {
    if (document.querySelectorAll(node).length > 1) {
        return document.querySelectorAll(node);
    } else {
        return document.querySelector(node);
    }
}
//随机数
function mathRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
//ajax插件
function ajax(obj) {
    //将对象转换成数据拼接适合的字符串的格式?&
    function objToString(obj) {
        if (Object.prototype.toString.call(obj).slice(8, -1) === 'Object') {
            let objarr = [];
            for (let i in obj) {
                objarr.push(i + '=' + obj[i]);
            }
            return objarr.join('&')
        }
    }

    //创建promise实例
    let promise = new Promise((resolve, reject) => {
        let ajax = new XMLHttpRequest(); //获取ajax对象

        //1.默认get,此参数可以省略。
        obj.type = obj.type || 'get';

        //2.接口地址不能为空
        if (!obj.url) {
            throw new Error('接口地址不能为空');
        }

        //3.数据存在(对象转字符串，字符串直接使用)
        if (obj.data) {
            if (Object.prototype.toString.call(obj.data).slice(8, -1) === 'Object') {
                obj.data = objToString(obj.data);
            } else {
                obj.data = obj.data;
            }
        }

        //4.数据存在，同时get请求，将数据拼接到地址栏的后面
        if (obj.data && obj.type === 'get') {
            obj.url += '?' + obj.data;
        }

        //6.是否异步,如果同步无需onreadystatechange进行监听
        if (obj.async === 'false' || obj.async === false) {
            obj.async = false;
        } else {
            obj.async = true;
        }

        ajax.open(obj.type, obj.url, obj.async);

        //5.数据存在和post,通过send和请求头传输数据
        if (obj.data && obj.type === 'post') {
            ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            ajax.send(obj.data);
        } else {
            ajax.send();
        }

        //7.同步异步获取数据(利用回调函数将数据传输出来)
        if (obj.async) { //异步
            ajax.onreadystatechange = function () {
                if (ajax.readyState === 4) { //服务器响应成功
                    if (ajax.status === 200) { //请求接口成功
                        let objdata = null;
                        if (obj.dataType === 'json') {
                            objdata = JSON.parse(ajax.responseText);
                        } else {
                            objdata = ajax.responseText;
                        }
                        resolve(objdata);

                    } else { //接口有误
                        reject('接口地址有误');
                    }
                }
            }
        } else { //同步
            if (ajax.status === 200) {
                let objdata = null;
                if (obj.dataType === 'json') {
                    objdata = JSON.parse(ajax.responseText);
                } else {
                    objdata = ajax.responseText;
                }
                resolve(objdata);
            } else {
                reject('接口地址有误');
            }
        }

    });

    return promise;
}

export{
    log,
    $,
    mathRandom,
    ajax
};