
import Vue from 'vue'
Vue.directive("form-label-width", 
   function (el, binding, vnode) {
        var doms_label = Array.apply(null,el.getElementsByClassName("el-form-item__label"));
        doms_label.forEach(element => {
            if(binding.arg=='p'){
                element.style.width= binding.value +"px";
            }else if(binding.arg=='r'){
                element.style.width= Math.max(100,binding.value) +"%";
            }else{
                element.style.width= binding.value +"px";
            }
        });

        var doms_content = Array.apply(null,el.getElementsByClassName("el-form-item__content"));
        doms_content.forEach(element => {
            if(binding.arg=='p'){
                element.style.width= "calc(100% - "+ binding.value+"px)";
            }else if(binding.arg=='r'){
                element.style.width= 100-Math.max(100,binding.value) +"%";
            }else{
                element.style.width= "calc(100% - "+ binding.value+"px)";
            }
        });
    }
);

//v-form-label-width:r="20"          label宽度为20%
//v-form-label-width:p="120"          label宽度为120px

//自定义sheet命令
Vue.directive("dp-sheet", 
   function (el, binding, vnode) {
       if(vnode.context.getSheetClass&&vnode.context.getSheetStyle&&vnode.context.openSheet){
            el.className = vnode.context.getSheetClass(binding.value[0]);
            var styleObj = vnode.context.getSheetStyle(binding.value[1]);
            for(var name in styleObj){
            el.style[name] = styleObj[name];
            }
            el.onclick = function(){
            vnode.context.openSheet(binding.value[0]);
            }
       }else{
           console.warn("未mixins相关sheet实例,请先引入相关mixins");
       }
    }
);