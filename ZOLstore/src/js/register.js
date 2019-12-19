import { log, $, cookietool, ajax } from './tool.js';
class FormValidator{
    constructor(){
        this.oInp = $('.register-form .text');
        this.oWrong = $('.register-form .wrong-tips');
        this.oRight = $('.register-form .right-tips');
        this.phoneFlag = false;
        this.passwordFlag = false;
        this.rePassFlag = false;
        this.emailFlag = false;
    }
    init(){
        this.register();
    }
    //表单验证函数
    register(){
        //手机号判断
        this.oInp[0].onblur = ()=>{
            let phone_num =this.oInp[0].value;//手机号码的值
            if(phone_num != ''){//判断输入是否为空
                if(phone_num.length==11){//判断手机号是否小于11位(最大长度已经限制11位数)
                    if(/^1[3578]\d{9}$/.test(phone_num)){//正则判断
                        this.oWrong[0].style.display = 'none';
                        this.oRight[0].style.display = 'block';
                        this.phoneFlag = true;
                    }else{
                        this.oWrong[0].style.display = 'block';
                        this.oWrong[0].innerHTML = '手机号格式有误' ;
                    }
                }else{
                    this.oWrong[0].style.display = 'block';
                    this.oWrong[0].innerHTML = '手机号不能少于11位';
                }
            }else{
                this.oWrong[0].style.display = 'block';
                this.oWrong[0].innerHTML = '手机号不能为空';
            }
        }
        //密码判断
        this.oInp[1].onblur = ()=>{
            let password = this.oInp[1].value;
            if(password.length>=6){
                if(/^\w+$/.test(password)){
                    if(/[a-zA-Z]+/g.test(password)&&/[0-9]+/g.test(password)){
                        this.oWrong[1].style.display = 'none';
                        this.oRight[1].style.display = 'block';
                        this.passwordFlag = true;
                    }else{
                        this.oWrong[1].style.display = 'block';
                        this.oWrong[1].innerHTML = '密码必须是数字字母组合';
                    }
                }else{
                    this.oWrong[1].style.display = 'block';
                    this.oWrong[1].innerHTML = '不可用特殊字符';
                }
            }else{
                this.oWrong[1].style.display = 'block';
                this.oWrong[1].innerHTML = '请输入6-16位数密码';
            }
        }
        //确认密码
        this.oInp[2].onblur = ()=>{
            if(this.oInp[2].value==this.oInp[1].value){
                this.oWrong[2].style.display = 'none';
                this.oRight[2].style.display = 'block';
                this.rePassFlag = true;
            }else{
                this.oWrong[2].style.display = 'block';
                this.oWrong[2].innerHTML = '密码不一致';
            }
        }
        //邮箱验证
        this.oInp[3].onblur = ()=>{
            let email = this.oInp[3].value;
            if(email!=''){
                if(/^(\w+[\+\-\_\.]*\w+)\@(\w+[\+\-\_\.]*\w+)\.(\w+[\+\-\_\.]*\w+)$/.test(email)){
                    this.oWrong[3].style.display = 'none';
                    this.oRight[3].style.display = 'block';
                    this.emailFlag = true;
                }else{
                    this.oWrong[3].style.display = 'block';
                    this.oWrong[3].innerHTML = '邮箱格式有误';
                }
            }else{
                this.oWrong[3].style.display = 'block';
                this.oWrong[3].innerHTML = '邮箱不能为空';
            }
        }
    }

}
export { FormValidator }