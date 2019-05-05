<template>
    <el-container v-cloak>
      <el-main style="padding:0px">
        <div class="host-view-block host-view-block-first filterArea"  :style="getFilterAreaStyle(24)">
          <el-input v-model="searchData" placeholder="搜索主机组名称" class="filterArea-block"
              style="width:18%" >
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button type="primary" style="margin-left:5px;min-width:5%;" icon="el-icon-search" >查询</el-button>
          <el-button type="success" style="float:right;min-width:5%;" icon="el-icon-plus"
           @click="addHostgroup"
          >新增主机组</el-button>
                                     
        </div>
        <div class="host-view-block host-view-block-last" style="border-right:0px;">
            <el-table
                  :data="[]"
                  style="width:calc((100%));max-width:none;">
                  <el-table-column
                    prop="name"
                    show-overflow-tooltip
                    label="主机组名称"
                    min-width="20%">
                  </el-table-column>        
                  <el-table-column
                    prop="hostNumbers"
                    show-overflow-tooltip
                    label="已连接主机数量"
                    min-width="15%">
                  </el-table-column>
                  <el-table-column
                    prop="sort"
                    sortable
                    show-overflow-tooltip
                    label="排序"
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
                    label="主机组名称"
                    min-width="20%">
                     <template slot-scope="scope">
                      <div style="color:#409EFF">
                        {{scope.row.name}}
                      </div>                            
                    </template>                     
                  </el-table-column>        
                  <el-table-column
                    prop="hostNumbers"
                    show-overflow-tooltip
                    label="已连接主机数量"
                    min-width="15%">
                     <template slot-scope="scope">
                      <div style="color:#E6A23C">
                        {{scope.row.hostNumbers}}
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
                    show-overflow-tooltip
                    label="操作"
                    min-width="15%">
                     <template slot-scope="scope">
                      <div class="self-icon-orange" style="display:inline-block" @click="editHostgroup(scope.row)">
                         <i class="iconfont icon-edit" ></i>
                         编辑
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
          var names=["主机组一","数据库组二","网络组三","应用服务组四"];
          var options = [];
          for(var i=0;i<4;i++){
             tableData.push({
               name:names[i],
               sort:i+1,
               hostNumbers:parseInt(Math.random()*100+3),       
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
        addHostgroup(){
            this.routerLinkSimple("/monitor-manager/hostgroup/add-edit");
        },
        editHostgroup(){
            //vuex操作
            this.routerLinkSimple("/monitor-manager/hostgroup/add-edit");
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



