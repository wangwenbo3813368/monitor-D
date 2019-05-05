import Vue from 'vue'
import router from '@/router/index'
import store from '@/store/index'
import { Encrypt } from "@/untils/aes";
import http from "@/api/fetch";
import api from "@/api/api";

var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
function generateMixed(n) {
    var res = "";
    for (var i = 0; i < n; i++) {
        var id = Math.ceil(Math.random() * 35);
        res += chars[id];
    }
    return res;
}
export default {
    install(Vue, options) {
     
        Vue.prototype.$http=http;//axios全局方法
        Vue.prototype.$api = api;//api地址全局方法
        Vue.prototype.$EventBus = new Vue();//全局事件总线bus


        /**
         * 简单路由 不带参数
         */
        Vue.prototype.routerLinkSimple = function () {
            let path = arguments[0] ? arguments[0] : null;         
            router.push(
                {
                    path: path
                }
            )
        }
        /**
         * path 路径
         * params {}
         * id
         */
        Vue.prototype.routerLink = function () {
            let params = {};
            let path = arguments[0] ? arguments[0] : null;
            params['type'] = arguments[1] ? arguments[1] : null;
            params['id'] = arguments[2] ? arguments[2] : 0;
            params['noce_str'] = generateMixed(7);
            let obj = arguments[3] ? arguments[3] : null;
         
            if (obj != null) {
                if (typeof obj == "object") {
                    for (let key in obj) {
                        params[key] = obj[key];
                    }
                } else {
                    throw new Exception("路由链接函数第四个参数只支持object类型");
                }
            }
          
            router.push(
                {
                    path: path,
                    query: params 
                }
            )
        }
        //成功全局方法
        Vue.prototype.successMessage = function (value) {
            this.$message({
                showClose: true,
                message: value,
                type: 'success',
                duration: 1000
            });
        }
        Vue.prototype.errorMessage = function (value) {
            this.$message({
                showClose: true,
                message: value,
                type: 'error',
                duration: 2500
            });
        }
        Vue.prototype.warningMessage = function (value) {
            this.$message({
                showClose: true,
                message: value,
                type: 'warning',
                duration: 2500
            });
        }
        Vue.prototype.$getUrl = function () {       
            let url = store.state.sys.baseUrl;
            let http = url.substring(0, url.indexOf("//") + 2);
            url = url.substring(url.indexOf("//") + 2, url.length);
            if (url.indexOf("/") >= 0) {
                url = url.substring(0, url.indexOf("/"));
            }
            return http + url;
        }
        Vue.prototype.$reset = function () {       
            window.location.reload();
        }         
        //获取当前时间
        Vue.prototype.$getNowDate = function () {
            var date = new Date();
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
            return currentdate;
        },
        /**
        *@desc调换数组中指定下标相邻位置，返回更新好的数组
        *@param {Array} arr 指定数组
        *@param {number} index 需要移动的对象的下标
        *@param {string} type 移动方式，提供上移（up），下移(down),默认为up
        */
        Vue.prototype.$switchArrOrder = function(arr,index,type='up'){
            if(type == 'up'){
                arr.splice(index, 1, ...arr.splice(index-1, 1, arr[index]));
            }else if(type == 'down'){
                arr.splice(index, 1, ...arr.splice(index+1, 1, arr[index]));    
            }
            return arr;
        }
      
        Vue.prototype.$findDimensions =function(){
          var winHeight;
  	      var winWidth;
  		  //获取窗口宽度 
  		  if (window.innerWidth) 
  		    winWidth = window.innerWidth; 
  		  else if ((document.body) && (document.body.clientWidth)) 
  		    winWidth = document.body.clientWidth; 
  		  //获取窗口高度 
  		  if (window.innerHeight) 
  		    winHeight = window.innerHeight; 
  		  else if ((document.body) && (document.body.clientHeight)) 
  		    winHeight = document.body.clientHeight; 
  		  //通过深入Document内部对body进行检测，获取窗口大小 
  		  if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) 
  		  { 
  		    winHeight = document.documentElement.clientHeight; 
  		    winWidth = document.documentElement.clientWidth; 
  		  } 
  		  //结果输出至两个文本框 
  		  return {winHeight:winHeight,winWidth:winWidth};
        }

    
    }
}
