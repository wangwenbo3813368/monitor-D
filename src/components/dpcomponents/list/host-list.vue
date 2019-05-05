<template>
  <div  style="margin:12px 12px 12px 6px;overflow:hidden;
    width: calc((100% - 18px)); height: calc((100% - 24px));" class="host-view-block">
    <div class="host-list-search  el-input__inner_border_0" style="height:29px;width:100%;">
      <el-input   :style="inputWidth"
         @focus="collInput(true)"  @blur="collInput(false)"
         placeholder="请输入主机名或IP查询" v-model="searchData">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <div class="self-icon-close"   @click="closeHostList">
         <i class="iconfont icon-guanbi" 
              style="vertical-align: middle;height:28px;
              line-height:28px;color:#7F99AC;cursor:pointer;font-size:12px;margin:0 10px"></i>
      </div>
      <div style="float:right;">
         <i class="iconfont icon-gallery-view self-icon-color"  @click="changeHostListViewType('table')" v-if="viewType=='gallery'"
              style="vertical-align: middle;height:28px;line-height:28px;font-size:20px;margin-right:10px"></i>
         <i class="iconfont icon-menu self-icon-color"   @click="changeHostListViewType('gallery')" v-if="viewType=='table'"
              style="vertical-align: middle;height:28px;line-height:28px;font-size:20px;margin-right:10px"></i>
      </div>        
    </div>
    <transition  name="bounce" mode="out-in">
      <template v-if="getShowGallery"> 
        <keep-alive>  
          <dpHostListGallery  @viewHostDetail="viewHostDetail"></dpHostListGallery> 
        </keep-alive>
      </template>
       <template v-if="getShowTable" >
        <keep-alive>    
          <dpHostListTable  @viewHostDetail="viewHostDetail" ></dpHostListTable>
        </keep-alive>
      </template>  
    </transition>

     <dpPage></dpPage>
  </div>
</template>

<script>

import dpHostListGallery from '@/components/dpcomponents/list/host-list-gallery' 
import dpHostListTable from '@/components/dpcomponents/list/host-list-table' 
import dpPage from '@/components/dpcomponents/page/page' 
export default {
    components:{dpHostListGallery,dpHostListTable,dpPage},
    data() {
      return {
         searchData:"",
         inputWidth:{
           width:"20%"
         },
         backgroundStyle:{
           background:""
         },
         viewType:'table',
      }
    },
    methods:{
      collInput(flag){
        if(flag){
          this.inputWidth.width="80%";
        }else{
          if(this.searchData==""){
            this.inputWidth.width="20%";
          }        
        }
      },
      hoverClose(flag){
        if(flag){
          this.backgroundStyle.background="#3C3F41";
        }else{
          this.backgroundStyle.background="";
        }
      },
      closeHostList(){
         this.routerLinkSimple("/monitor-information/resource/host");
      },
      changeHostListViewType(type){
        this.viewType = type;
      },
      viewHostDetail(){
        this.routerLinkSimple("/monitor-information/hostDetail");
      }
    },
    computed:{
       getShowGallery(){
         return this.viewType == 'gallery';
       },
       getShowTable(){
         return this.viewType == 'table';
       }
    }
 
};
</script>

<style lang="scss" scoped>
@import  'static/css/mixins.scss';
.host-list-search{
  @include border_bottom();
}
.host-list-search .el-input__inner{
  border: 0px !important;
  font-size: 13px;
  border-radius: 0px;
  padding:0px 0px 0px 30px;
  @include font_normal_color(#ffffff);
  @include background_level01_color(#ffffff);
}
.host-list-search{
  -webkit-user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
</style>