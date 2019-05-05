<template>
    <el-container v-cloak>
      <el-main style="padding:0px">
        <div class="host-view-block host-view-block-first filterArea"  :style="getFilterAreaStyle(24)">
          <el-input v-model="searchData" placeholder="搜索主机名称或IP" class="filterArea-block"
              style="width:18%" >
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-select v-model="value1" filterable clearable placeholder="主机组"  class="filterArea-block"
            style="margin-left:5px;width:12%;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>          
          <el-button type="primary" style="margin-left:5px;min-width:5%;" icon="el-icon-search" >查询</el-button>
          <el-button type="warning" style="margin-left:5px;min-width:5%;" icon="el-icon-refresh">重置</el-button>    
          <el-button type="success" style="float:right;min-width:5%;" icon="el-icon-plus"
           @click="addHost"
          >新增主机</el-button>        
        </div>
        <div class="host-view-block host-view-block-last" style="border-right:0px;">
          <el-table
              :data="[]"
              style="width:calc((100%));max-width:none;">
              <el-table-column
                prop="name"
                show-overflow-tooltip
                label="主机名称"
                min-width="15%">
              </el-table-column>
              <el-table-column
                prop="name"
                show-overflow-tooltip
                label="IP"
                min-width="10%">
              </el-table-column>
              <el-table-column
                prop="hostgroup"
                show-overflow-tooltip
                label="主机组"
                min-width="10%">
              </el-table-column>              
              <el-table-column
                prop="itemNumbers"
                sortable
                show-overflow-tooltip
                label="监控项"
                min-width="8%">
              </el-table-column>
              <el-table-column
                prop="triggerNumbers"
                sortable
                show-overflow-tooltip
                label="触发器"
                min-width="8%">
              </el-table-column>                                      
              <el-table-column
                prop="templateType"
                show-overflow-tooltip
                label="模板类型"
                min-width="12%">          
              </el-table-column>                       
              <el-table-column
                show-overflow-tooltip
                label="操作"
                min-width="12%">               
              </el-table-column>                                                            
          </el-table>	      
          <el-scrollbar  :native="false" :wrapStyle="wrapStyle" wrapClass=""  :viewStyle="viewStyle" tag="section" > 
            <el-table
                :data="tableData"
                border
                :show-header="false"
                style="width:calc((100%));max-width:none;">
                <el-table-column
                  prop="name"
                  show-overflow-tooltip
                  label="主机名称"
                  min-width="15%">
                  <template slot-scope="scope">
                    <span style="color:#409EFF">{{scope.row.name}}</span>
                  </template>  
                </el-table-column>
                <el-table-column
                  prop="ip"
                  show-overflow-tooltip
                  label="IP"
                  min-width="10%">
                  <template slot-scope="scope">
                    <span style="color:#ca8622">{{scope.row.ip}}</span>
                  </template>  
                </el-table-column> 
                <el-table-column
                  prop="hostgroup"
                  show-overflow-tooltip
                  label="主机组"
                  min-width="10%">
                  <template slot-scope="scope">
                    <span style="color:#ca8622">{{scope.row.hostgroup}}</span>
                  </template>                    
                </el-table-column>                 
                <el-table-column
                  prop="itemNumbers"
                  show-overflow-tooltip
                  label="监控项"
                  min-width="8%">
                  <template slot-scope="scope">
                    <span style="color:#8ca3a1">{{scope.row.itemNumbers}}</span>
                  </template>                    
                </el-table-column>
                <el-table-column
                  prop="triggerNumbers"
                  show-overflow-tooltip
                  label="触发器"
                  min-width="8%">
                   <template slot-scope="scope">
                    <span style="color:#8ca3a1">{{scope.row.triggerNumbers}}</span>
                  </template>                      
                </el-table-column>                                               
                <el-table-column
                  prop="templateType"
                  show-overflow-tooltip
                  label="模板类型"
                  min-width="12%">
                  <template slot-scope="scope">
                    <span style="color:#8ca3a1">{{scope.row.templateType}}</span>
                  </template>            
                </el-table-column>          
                <el-table-column
                  show-overflow-tooltip
                  label="操作"
                  min-width="12%">
                     <template slot-scope="scope">
                      <div class="self-icon-orange" style="display:inline-block" @click="editHost(scope.row)">
                         <i class="iconfont icon-edit" ></i>
                         编辑
                      </div>                       
                      <div  class="self-icon-blue" style="display:inline-block" @click="configHost(scope.row)">
                         <i class="iconfont icon-icon-config"></i>
                         配置主机
                      </div>                                                   
                    </template>                   
                </el-table-column>                                                            
            </el-table>		
          </el-scrollbar>      
          <dpPage></dpPage>            
        </div>                
     </el-main>
  </el-container>      
</template>

<script>
import dpPage from '@/components/dpcomponents/page/page';
import filterArea from "@/mixins/dpFilterArea";

export default {
     mixins:[filterArea],
     components:{dpPage},
     data(){
          var tableData = [];
          var options = [];
          for(var i=0;i<30;i++){
             tableData.push({
               name:"DFL-ITSHARE-02"+i,
               ip:'192.168.222.123',
               hostgroup:"主机组1",
               templateType:i%2==0?"Template Windows,Template linux":"Template linux,Template Windows",     
               itemNumbers:parseInt(Math.random()*100+3),
               triggerNumbers:parseInt(Math.random()*20+1),   
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

        }
     },
     methods:{
        configHost(){
            this.routerLinkSimple("/monitor-manager/host/config");
        },
        addHost(){
            this.routerLinkSimple("/monitor-manager/host/add-edit");
        },
        editHost(){
            this.routerLinkSimple("/monitor-manager/host/add-edit");
        }
     },
     computed:{
        viewStyle(){
          return {"height":this.$store.getters.mainHeight-30-93+"px",
                  width:"calc((100%))"
          }
        },
        wrapStyle(){
          return {"height":this.$store.getters.mainHeight-30-93+"px",
                  width:"calc((100%))"
          }
        }   
     },
     mounted(){

     }
 
};
</script>

<style lang="scss" scoped>
@import  'static/css/mixins.scss';






</style>



