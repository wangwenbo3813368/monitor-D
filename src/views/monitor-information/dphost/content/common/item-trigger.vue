<template>
  <div>
    <div class="host-view-block-no-top" style="margin-top:0px;border-top:0px">
      <div style="width:100%;font-size:0">
        <div v-dp-sheet="[1,2]">
            <i class="iconfont  icon-block tab-list-icon"></i>
            <span class="li-span">监控项</span>
        </div>
        <div v-dp-sheet="[2,2]">
            <i class="iconfont icon-block tab-list-icon"></i>
            <span class="li-span">触发器</span>
        </div>
      </div>
    </div> 
    <transition  name="slide-top" >
      <component :is="currentComponet"></component>
    </transition>  

  </div>
</template>

<script>
import sheet from '@/mixins/dpSheet'
import item from '@/views/monitor-information/dphost/content/common/item'
import trigger from '@/views/monitor-information/dphost/content/common/trigger'
export default {
     mixins:[sheet],
     components:{item,trigger},
     data(){
        return {
      
        }
     },
     methods:{
        
     },
     computed:{      
        viewStyle(){
          return {"height":this.$store.getters.mainHeight-12+"px",
          width:this.$store.state.sys.clientWidth-this.$store.state.sys.asideWidth+"px"};
        },
        wrapStyle(){
          return {"height":this.$store.getters.mainHeight-12+"px",
          width:this.$store.state.sys.clientWidth-this.$store.state.sys.asideWidth+"px"};
        },
        currentComponet(){
          var component = "item";
          switch(this.activeSheet){
            case 1:
               component =  'item';
               break;
            case 2:
               component = 'trigger';
               break;                           
          }
          return component;
        }        
        
     },
     mounted(){
       console.log("item-trigger");
     }
 
};
</script>

<style scoped>


</style>






