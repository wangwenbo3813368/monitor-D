<template>
  <el-container v-cloak >
      <el-main style="padding:0px;overflow:hidden">
         <div class="host-view-block host-view-block-first">
            <div  class=" host-view-block-header" style="text-align:center;border-bottom: 0px !important;" >
                  <span >{{title}}</span>
                  <div class="self-icon-back" >                    
                     <i class="iconfont icon-back1"  @click="goback"
                     style="vertical-align: top;height:23px;
                     line-height:23px;cursor:pointer;font-size:18px;margin:0 2px"></i>
                 </div>
            </div>           
         </div>  
         <div class="host-view-block">
            <div style="width:100%;font-size:0;display:block;">
              <div  v-dp-sheet="[1,4]">
                <i class="iconfont icon-item-manage tab-list-icon"></i>
                <span class="li-span">监控项</span>
              </div>
              <div v-dp-sheet="[2,4]">
                <i class="iconfont icon-item-manage tab-list-icon"></i>
                <span class="li-span">触发器</span>
              </div>    
              <div v-dp-sheet="[3,4]">
                <i class="iconfont icon-item-manage tab-list-icon"></i>
                <span class="li-span">连接的主机</span>
              </div>
              <div v-dp-sheet="[4,4]">
                <i class="iconfont icon-item-manage tab-list-icon"></i>
                <span class="li-span">分类</span>
              </div>                                                     
            </div>
         </div>                   
         <div class="host-view-block">
            <transition  name="slide-top" >
              <component :is="currentComponet"></component>
            </transition>  
         </div>        
      </el-main>              
  </el-container>      
</template>

<script>
import sheet from '@/mixins/dpSheet'
import templateItem from '@/views/monitor-manager/dptemplate/template-item'
import templateTrigger from '@/views/monitor-manager/dptemplate/template-trigger'
import templateHost from '@/views/monitor-manager/dptemplate/template-host'
import templateClassification from '@/views/monitor-manager/dptemplate/template-classification'
export default {
     mixins:[sheet],
     components:{
     "template-item":templateItem,
     "template-trigger":templateTrigger,
     "template-host":templateHost,
     "template-classification":templateClassification},
     data(){
         
        return {
           title:"Template Windows",
        }
     },
     methods:{
          goback(){
             this.$router.go(-1);
          }
     },
     computed:{       
        currentComponet(){
          var component = "template-item";
          switch(this.activeSheet){        
            case 1:
               component =  'template-item';
               break;
            case 2:
               component = 'template-trigger';
               break;    
            case 3:
               component = 'template-host';
               break;     
            case 4:
               component = 'template-classification';
               break;                                                      
          }
          return component;
        }    
     },
     mounted(){

     }
 
};
</script>




