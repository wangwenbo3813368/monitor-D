<template>
    <el-container v-cloak>
      <el-main style="padding:0px">
        <div class="host-view-block host-view-block-first filterArea"  :style="getFilterAreaStyle(24)">
          <el-input v-model="searchData" placeholder="搜索资源名称" class="filterArea-block"
              style="width:18%" >
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-select v-model="value3" filterable clearable placeholder="是否启用" class="filterArea-block"
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
           @click="addResource"
          >新增资源</el-button>
                                     
        </div>
        <div class="host-view-block host-view-block-last" style="border-right:0px;">
            <el-table
                  :data="[]"
                  style="width:calc((100%));max-width:none;">
                  <el-table-column
                    prop="name"
                    show-overflow-tooltip
                    label="资源名称"
                    min-width="20%">
                  </el-table-column>        
                  <el-table-column
                    prop="code"
                    show-overflow-tooltip
                    label="资源编码"
                    min-width="15%">
                  </el-table-column>  
                  <el-table-column
                    prop="templateNumbers"
                    sortable
                    show-overflow-tooltip
                    label="模板数量"
                    min-width="10%">
                  </el-table-column>  
                  <el-table-column
                    prop="sort"
                    sortable
                    show-overflow-tooltip
                    label="排序"
                    min-width="10%">
                  </el-table-column>                           
                  <el-table-column                   
                    prop="disabled"
                    show-overflow-tooltip
                    label="是否启用"
                    min-width="10%">                       
                  </el-table-column>               
                  <el-table-column
                    show-overflow-tooltip
                    label="操作"
                    min-width="15%">                    
                  </el-table-column>                                                            
              </el-table>	      
            <el-scrollbar  :native="false" :wrapStyle="wrapStyle" wrapClass=""  :viewStyle="viewStyle" tag="section" > 
              <el-table
                  :data="tableData"
                  :show-header="false"
                  style="width:calc((100%));max-width:none;">
                   <el-table-column
                    prop="name"
                    show-overflow-tooltip
                    label="资源名称"
                    min-width="20%">
                     <template slot-scope="scope">
                      <div style="color:#409EFF">
                        {{scope.row.name}}
                      </div>                            
                    </template>                     
                  </el-table-column>        
                  <el-table-column
                    prop="code"
                    show-overflow-tooltip
                    label="资源编码"
                    min-width="15%">
                     <template slot-scope="scope">
                      <div style="color:#E6A23C">
                        {{scope.row.name}}
                      </div>                            
                    </template>                       
                  </el-table-column>  
                  <el-table-column
                    prop="templateNumbers"
                    show-overflow-tooltip
                    label="模板数量"
                    min-width="10%">
                     <template slot-scope="scope">
                      <div style="color:#9ccdc4">
                        {{scope.row.templateNumbers}}
                      </div>                            
                    </template>                      
                  </el-table-column>  
                  <el-table-column
                    prop="sort"
                    show-overflow-tooltip
                    label="排序"
                    min-width="10%">
                     <template slot-scope="scope">
                      <div style="color:#9ccdc4">
                        {{scope.row.sort}}
                      </div>                            
                    </template>                     
                  </el-table-column>                           
                  <el-table-column
                    :filters="[{text: '正常', value: 0}, {text: '警告', value: 1}, {text: '严重', value: 2}]"
                    prop="disabled"
                    show-overflow-tooltip
                    label="是否启用"
                    min-width="10%">      
                     <template slot-scope="scope">
                      <div v-if="scope.row.disabled==0" style="color:#67C23A">
                        已启用
                      </div>
                      <div v-if="scope.row.disabled==1" style="color:#F56C6C">
                        未启用
                      </div>                                
                    </template>                           
                  </el-table-column>                                    
                  <el-table-column
                    show-overflow-tooltip
                    label="操作"
                    min-width="15%">
                     <template slot-scope="scope">
                      <div class="self-icon-orange" style="display:inline-block" @click="editResource(scope.row)">
                         <i class="iconfont icon-edit" ></i>
                         编辑
                      </div>
                      <div  class="self-icon-blue" style="display:inline-block" @click="configTemplate(scope.row)">
                         <i class="iconfont icon-icon-config"></i>
                         配置模板
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
          var names=["主机","数据库","网络","应用服务"];
          var codes=["host","db","net","service"]
          var options = [];
          for(var i=0;i<4;i++){
             tableData.push({
               name:names[i],
               code:codes[i],
               sort:i+1,
               templateNumbers:parseInt(Math.random()*100+3),
               disabled:0,          
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
        addResource(){
            this.routerLinkSimple("/monitor-manager/resource/add-edit");
        },
        editResource(resource){
            //vuex操作
            this.routerLinkSimple("/monitor-manager/resource/add-edit");
        },
        configTemplate(){
            this.routerLinkSimple("/monitor-manager/resource/config");
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



