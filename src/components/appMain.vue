<template>
<div :style="mainStyle" class="appContent">
     <!-- <router-view></router-view> -->
      
        <transition name="slide-main" >
          <router-view ></router-view>
        </transition>

</div>

 
</template>

<script>
export default {
     name:'app-main',
     computed:{
       mainStyle(){
          return {"min-height":this.$store.getters.mainHeight+"px",
                   width:"100%"};
       }
     }
    
}
</script>

<style lang="scss" scoped>
  @import  'static/css/mixins.scss';
  .appContent{
    @include font_normal_color(#ffffff);
    @include background_level02_color(#ffffff);
  }
</style>

