<template>
    <el-container >
      <el-main style="padding:0px">
        <div class="host-view-block host-view-block-first filterArea"  :style="getFilterAreaStyle(24)">
          <el-input v-model="searchData" placeholder="搜索主机名称或IP" class="filterArea-block"
              style="width:18%" >
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-select v-model="value1" filterable clearable placeholder="资源类型"  class="filterArea-block"
            style="margin-left:5px;width:12%;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value2" filterable clearable  placeholder="模板类型" class="filterArea-block"
            style="margin-left:5px;width:12%;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value3" filterable clearable placeholder="是否在线" class="filterArea-block"
            style="margin-left:5px;width:12%;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value4" filterable clearable placeholder="主机状态"  class="filterArea-block"
            style="margin-left:5px;width:12%;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary" style="margin-left:5px;min-width:5%;" >查询</el-button>
          <el-button type="warning" style="margin-left:5px;min-width:5%;" >重置</el-button>
          
          <div class="filterArea-block change-mode"> 
            <el-tooltip content="切换成树形模式" placement="bottom-start">
                <i class="iconfont icon-vote_tree" v-if="viewmode=='table'"  @click="changeViewmode"
                style="vertical-align: middle;line-height:28px;max-width:5%;
                cursor:pointer;font-size:22px;margin:0 5px"></i>    
            </el-tooltip >
            <el-tooltip content="切换成表格模式" placement="bottom-start">
                <i class="iconfont icon-table"  v-if="viewmode=='tree'"   @click="changeViewmode"
                style="vertical-align: middle;line-height:28px;max-width:5%;
                cursor:pointer;font-size:22px;margin:0 5px"></i>
            </el-tooltip>        
          </div>                                  
        </div>
        <transition  name="bounce" mode="out-in">
          <template v-if="viewmode=='table'"> 
            <keep-alive>  
              <hostlistTable  ></hostlistTable> 
            </keep-alive>
          </template>
          <template v-if="viewmode=='tree'" >
            <keep-alive>    
              <hostlistTree  ></hostlistTree>
            </keep-alive>
          </template>  
        </transition>        
     </el-main>
  </el-container>      
</template>

<script>
import dpPage from '@/components/dpcomponents/page/page' 
import hostlistTable from '@/views/monitor-information/dphost/view-hostlist-table' 
import hostlistTree from '@/views/monitor-information/dphost/view-hostlist-tree' 
import hostDetail from "@/mixins/hostDetail";
import filterArea from "@/mixins/dpFilterArea";
export default {
     mixins:[hostDetail,filterArea],
     components:{dpPage,hostlistTable,hostlistTree},
     data(){
          var tableData = [];
          var options = [];
          for(var i=0;i<30;i++){
             tableData.push({
               name:"强制等待虚拟CPU的时间"+i,
               key:"net.tcp.service[tcp,,8080]"+i,
               grouptype:i%2==0?"Memory":"Disk",
               intervaltime:"90秒",
               lasttime:"2019-04-17 11:33:28",
               valuetype:i%2==0?"文本":"数值",
               lastvalue:i%2==0?"等待时间"+i*10:i*7+2,
               status:(i+1)%2,          
             });
             options.push({
                value: '0'+i,
                label: '测试选型0'+i,
             })
          }
        return {
           viewmode:'table',
           tableData:tableData,
           searchData:"",
            options:options,
            value1: '',
            value2: '',
            value3: '',
            value4: '',

        }
     },
     methods:{
        changeViewmode(){
          if(this.viewmode =='table'){
             this.viewmode = 'tree';
          }else{
             this.viewmode = 'table';
          }
        }
     },
     computed:{      
        viewStyle(){
          return {"height":this.$store.getters.mainHeight-30-90+"px",
                  width:"100%"
          }
        },
        wrapStyle(){
          return {"height":this.$store.getters.mainHeight-30-90+"px",
                  width:"100%"
          }
        }      
     },
     mounted(){

     }
 
};
</script>

<style lang="scss" scoped>
@import  'static/css/mixins.scss';

.change-mode{
  @include border_normal();
  float:right;
  }
.icon-vote_tree{
  color:#C0C4CC;
}
.icon-vote_tree:hover{
  color:#409EFF;
}
.icon-table{
  color:#C0C4CC;
}
.icon-table:hover{
  color:#409EFF;
}

</style>



