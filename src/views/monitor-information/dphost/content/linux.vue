<template>
 
 <el-scrollbar :ref="'hostDetailScrollbar'" :native="false" :wrapStyle="wrapStyle" wrapClass=""  :viewStyle="viewStyle"  tag="section">  
  <div :ref="'hostDetailScrollbar-div'">
    <div class="host-view-block-no-bottom host-view-block-first" style="fontSize:0;border-right:0px;border-bottom:0px;">
      <div class="host-view-div" v-for="(item,index) in basicInformation" :key="index"
          :style="getDivStyle(item.width)">
        <label class="host-view-label">
          {{item.label}}
        </label>  
        <template v-if="item.type=='status'">
            <div v-if="item.value==0" class="host-view-div-inline" style="color:#67C23A">
              <span class="host-view-div-span">
              <i class="iconfont icon-remind_fill icon-host-warning"  
                  style="color:#67C23A"></i>
              正常
              </span>
            </div>
            <div v-if="item.value==1" class="host-view-div-inline" style="color:#E6A23C">
              <span class="host-view-div-span">
              <i class="iconfont icon-remind_fill icon-host-warning"  
                  style="color:#E6A23C"></i>
              警告
              </span>
            </div>
            <div v-if="item.value==2" class="host-view-div-inline" style="color:#F56C6C">
              <span class="host-view-div-span">
              <i class="iconfont icon-remind_fill icon-host-warning"  
                  style="color:#F56C6C"></i>
              严重
              </span>
            </div>          
        </template>
        <template v-else-if="item.type=='online'">
              <div v-if="item.value==0" class="host-view-div-inline" style="color:#67C23A">
                <span class="host-view-div-span">
                  <i class="iconfont icon-flashlight_fill icon-host-warning"  
                      style="color:#67C23A"></i>
                  在线
                </span>
              </div>
              <div v-if="item.value==1" class="host-view-div-inline" style="color:#F56C6C">
                <span class="host-view-div-span">
                  <i class="iconfont icon-flashlight_fill icon-host-warning"  
                      style="color:#F56C6C"></i>
                  离线
                </span>
              </div> 
        </template>
        <template v-else >
          <div  class="host-view-div-inline" >
            <span class="host-view-div-span">
            {{item.value}}
            </span>
          </div>         
        </template>    
      </div>         
    </div>  

    <div class="host-view-block">
      <div style="width:100%;font-size:0;display:block;">
          <div v-dp-sheet="[1,3]">
            <i class="iconfont  icon-item-manage tab-list-icon"></i>
            <span class="li-span">概述信息</span>
          </div>
          <div v-dp-sheet="[2,3]">
            <i class="iconfont icon-item-manage tab-list-icon"></i>
            <span class="li-span">资产信息</span>
          </div>
          <div v-dp-sheet="[3,3]">
            <i class="iconfont icon-item-manage tab-list-icon"></i>
            <span class="li-span">监控指标</span>
          </div>                     
      </div>
    </div>
    <transition  name="slide-top"  >
      <component :is="currentComponet"></component>
      <!-- <template v-if="isActiveSheet(1)">
        <linuxOverview></linuxOverview> 
      </template>
      <template v-if="isActiveSheet(2)">
        <linuxAssets></linuxAssets>
      </template>
      <template v-if="isActiveSheet(3)">
        <linuxMonitor></linuxMonitor>
      </template> -->
    </transition>  
  </div>
 </el-scrollbar>
</template>

<script>
import elScrollbarParent from "@/mixins/el-scrollbar-parent"; 
import sheet from '@/mixins/dpSheet'
import linuxOverview from '@/views/monitor-information/dphost/content/linux/linux-overview' 
import linuxAssets from '@/views/monitor-information/dphost/content/linux/linux-assets' 
import itemTrigger from '@/views/monitor-information/dphost/content/common/item-trigger'  //共同的sheet页  监控项与触发器的展示页面
export default {
     mixins:[elScrollbarParent,sheet],
     components:{linuxOverview,linuxAssets,"item-trigger":itemTrigger},
     data(){
        return {
          basicInformation:[
            {
               label:"主机名称",
               value:"Windows2012-15",
               width:[1,4],
            },
            {
               label:"操作系统",
               value:"Windows WINDOWS2012-15 6.3.9600 Microsoft Windows Server 2012 R2 Standard x64",
               width:[3,4],
            }
            ,
            {
               label:"IP地址",
               value:"192.168.1.1",
               width:[1,4],
            }
            ,
           {
               label:"是否在线",
               value:1,
               width:[1,4],
               type:'online',
            }
            ,
            {
               label:"主机状态",
               value:0,
               width:[1,4],
               type:'status',
            }
            ,
            {
               label:"运行时间",
               value:"1天5小时52分钟",
               width:[1,4],
            },            
          ]
        }
     },
     methods:{
        getDivStyle(widthAry){
          var rate = 100*widthAry[0]/widthAry[1];
          return {
                 width:"calc( "+rate+"% )"
                 }
        }    
     },
     computed:{      
        viewStyle(){
          return {"height":this.$store.getters.mainHeight-12
          -(this.$store.state.sys.hostContentWidthRate==1?0:52)+"px",
          width:(this.$store.state.sys.clientWidth-this.$store.state.sys.asideWidth)*this.$store.state.sys.hostContentWidthRate+"px"};
        },
        wrapStyle(){
          return {"height":this.$store.getters.mainHeight-12
          -(this.$store.state.sys.hostContentWidthRate==1?0:52)+"px",
          width:(this.$store.state.sys.clientWidth-this.$store.state.sys.asideWidth)*this.$store.state.sys.hostContentWidthRate+"px"};
        },
        currentComponet(){
          var component = "linuxOverview";
          switch(this.activeSheet){
            case 1:
               component =  'linuxOverview';
               break;
            case 2:
               component = 'linuxAssets';
               break;
            case 3:
               component = 'item-trigger';
               break;                             
          }
          return component;
        }
        
     }

 
};
</script>


<style scoped>

</style>

