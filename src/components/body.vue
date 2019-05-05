<template>
  <div >
        <!-- 头部 -->
          <dp-header></dp-header>       
          <el-aside :width="$store.state.sys.asideWidth+'px'" style="overflow:hidden" class="dp-left-aside">
            <!-- 左侧部 -->                             
              <dp-submenu></dp-submenu>
          </el-aside>         
          <div  :style="rightMarginLeft">                  
                <app-main class="firstContainer"></app-main>                 
          </div>
  </div>
     
</template>

<script>

import dpHeader from "@/components/header.vue";
import dpSubmenu from "@/components/subMenu.vue";
import axios from "axios"
export default {
  components: {dpHeader, dpSubmenu},
     watch: {
        $route: function(to, from) {
          
        }
      },

  data() {
    return {
    }
  },
  methods:{
     queryChange(){
        let clientWidth=document.body.clientWidth;
        let clientHeight=document.body.clientHeight;
          $('.firstContainer').css('minHeight',this.$store.getters.mainHeight+'px');
         if(clientWidth<1200){
           this.$store.dispatch('setCollapse',true);
         }else{
            this.$store.dispatch('setCollapse',false);
         }
         //广播给全局所有组件 屏幕大小变化了 两种方式 事件总线 与vuex
         this.$store.dispatch('setResize',{clientHeight:clientHeight,clientWidth:clientWidth});
         //this.$EventBus.$emit("resize", {clientHeight:clientHeight,clientWidth:clientWidth});
     }, 
  },
  computed:{
    rightMarginLeft(){
      return {
      "margin-left":this.$store.state.sys.asideWidth+'px',
      "margin-top":this.$store.state.sys.headerHeight+'px',
      padding:"0px",
      };
    },
    viewStyle(){
      return {"height":this.$store.getters.mainHeight+"px"};
    },
    wrapStyle(){
      return {"height":this.$store.getters.mainHeight+"px"};
    },
  },
  mounted() {
    const self = this;
    self.queryChange();
    window.onresize = () => {
      return (() => {
          self.queryChange();
      })();
    };
  }
};
</script>
 <style lang="scss" scoped>
 @import  'static/css/mixins.scss';
.dp-left-aside{
    z-index: 10;
    // background-color:#3C3F41;
    @include background_level01_color(#ffffff);
    bottom: 0;
    margin-top: 0;
    padding-bottom: 30px;
    position: fixed;
    top: 40px; 
}
 .firstContainer{
  	 font-size:13px;
     font-family: "Microsoft YaHei","Roboto",sans-serif;
     @include background_level02_color(#ffffff);
     @include font_normal_color(#ffffff);
}
</style>

