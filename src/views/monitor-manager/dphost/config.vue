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
              <div  v-dp-sheet="[1,3]">
                <i class="iconfont icon-item-manage tab-list-icon"></i>
                <span class="li-span">监控项</span>
              </div>
              <div v-dp-sheet="[2,3]">
                <i class="iconfont icon-item-manage tab-list-icon"></i>
                <span class="li-span">触发器</span>
              </div>    
              <div v-dp-sheet="[3,3]">
                <i class="iconfont icon-item-manage tab-list-icon"></i>
                <span class="li-span">连接的模板</span>
              </div>                                                 
            </div>
         </div>                   
         
          <transition  name="slide-top" >
            <component :is="currentComponet"></component>
          </transition>  
              
      </el-main>              
  </el-container>      
</template>

<script>
import sheet from '@/mixins/dpSheet'
import hostItem from '@/views/monitor-manager/dphost/host-item'
import hostTrigger from '@/views/monitor-manager/dphost/host-trigger'
import hostTemplate from '@/views/monitor-manager/dphost/host-template'
export default {
     mixins:[sheet],
     components:{
     "host-item":hostItem,
     "host-trigger":hostTrigger,
     "host-template":hostTemplate,
     },
     data(){
         
        return {
           title:"DFL-ITSHARE-02",
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
               component =  'host-item';
               break;
            case 2:
               component = 'host-trigger';
               break;    
            case 3:
               component = 'host-template';
               break;                                                        
          }
          return component;
        }    
     },
     mounted(){

     }
 
};
</script>




