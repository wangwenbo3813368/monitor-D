<template>
    <el-container v-cloak>
      <el-main style="padding:0px">
        <div class="host-view-block host-view-block-first filterArea"  :style="getFilterAreaStyle(24)">
          <el-input v-model="searchData" placeholder="搜索模板名称或别名" class="filterArea-block"
              style="width:18%" >
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button type="primary" style="margin-left:5px;min-width:5%;" icon="el-icon-search" >查询</el-button>     
        </div>
        <div class="host-view-block host-view-block-last" style="border-right:0px;">
            <el-table
                  :data="[]"
                  style="width:calc((100%));max-width:none;">
                  <el-table-column
                    prop="name"
                    show-overflow-tooltip
                    label="模板名称"
                    min-width="20%">
                  </el-table-column>    
                  <el-table-column
                    prop="alias"
                    show-overflow-tooltip
                    label="别名"
                    min-width="10%">
                  </el-table-column>
                  <el-table-column
                    prop="classificationNumbers"
                    sortable
                    show-overflow-tooltip
                    label="分类"
                    min-width="8%">
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
                    prop="associationTemplate"
                    show-overflow-tooltip
                    label="已连接的模板"
                    min-width="12%">
                  </el-table-column>                           
                  <el-table-column                   
                    prop="associationHostNumbers"
                    sortable
                    show-overflow-tooltip
                    label="已连接到主机"
                    min-width="12%">                       
                  </el-table-column>    
                  <el-table-column                   
                    prop="description"
                    show-overflow-tooltip
                    label="模板描述"
                    min-width="20%">                       
                  </el-table-column>                                                                                  
              </el-table>	      
            <el-scrollbar  :native="false" :wrapStyle="wrapStyle" wrapClass=""  :viewStyle="viewStyle" tag="section" > 
              <el-table
                  :data="tableData"
                  :show-header="false"
                   @row-click="showTemplateDetail"
                  style="width:calc((100%));max-width:none;">
                   <el-table-column
                    prop="name"
                    show-overflow-tooltip
                    label="模板名称"
                    min-width="20%">
                     <template slot-scope="scope">
                      <div style="color:#409EFF">
                        {{scope.row.name}}
                      </div>                            
                    </template>                     
                  </el-table-column>
                   <el-table-column
                    prop="alias"
                    show-overflow-tooltip
                    label="别名"
                    min-width="10%">
                     <template slot-scope="scope">
                      <div style="color:#409EFF">
                        {{scope.row.alias}}
                      </div>                            
                    </template>                     
                  </el-table-column>
                  <el-table-column
                    prop="classificationNumbers"
                    show-overflow-tooltip
                    label="分类"
                    min-width="8%">
                     <template slot-scope="scope">
                      <div style="color:#9ccdc4">
                        {{scope.row.classificationNumbers}}
                      </div>                            
                    </template>                       
                  </el-table-column>                                              
                  <el-table-column
                    prop="itemNumbers"
                    show-overflow-tooltip
                    label="监控项"
                    min-width="8%">
                     <template slot-scope="scope">
                      <div style="color:#9ccdc4">
                        {{scope.row.itemNumbers}}
                      </div>                            
                    </template>                       
                  </el-table-column>  
                  <el-table-column
                    prop="triggerNumbers"
                    show-overflow-tooltip
                    label="触发器"
                    min-width="8%">
                     <template slot-scope="scope">
                      <div style="color:#9ccdc4">
                        {{scope.row.triggerNumbers}}
                      </div>                            
                    </template>                      
                  </el-table-column>  
                  <el-table-column
                    prop="associationTemplate"
                    show-overflow-tooltip
                    label="已连接的模板"
                    min-width="12%">
                     <template slot-scope="scope">
                      <div style="color:#9ccdc4">
                        {{scope.row.associationTemplate}}
                      </div>                            
                    </template>                     
                  </el-table-column>  
                 <el-table-column
                    prop="associationHostNumbers"
                    show-overflow-tooltip
                    label="已连接主机数量"
                    min-width="12%">
                     <template slot-scope="scope">
                      <div style="color:#9ccdc4">
                        {{scope.row.associationHostNumbers}}
                      </div>                            
                    </template>                     
                  </el-table-column>
                  <el-table-column                   
                    prop="description"
                    show-overflow-tooltip
                    label="模板描述"
                    min-width="20%"> 
                     <template slot-scope="scope">
                      <div style="color:#E6A23C">
                        {{scope.row.description}}
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
          var names=["Template Windows","Template Linux","clw-mysql_nginx-portcheck","MAXIMO_Tablespace"];
          var alias=["Windows核心模板","Linux核心模板","代理数据库端口检查模板","表空间模板"];
          var descriptions=["用于Windows主机系统监控的核心模板","用于Linux主机系统监控的核心模板",
          "用于Linux主机系统监控的核心模板","用于Linux主机系统监控的核心模板",]
          var options = [];
          for(var i=0;i<50;i++){
             tableData.push({
               name:names[i%4],
               alias:alias[i%4],
               classificationNumbers:parseInt(Math.random()*100+2),
               itemNumbers:parseInt(Math.random()*100+3),
               triggerNumbers:parseInt(Math.random()*20+1),
               associationTemplate:names[(i+2)%4], 
               associationHostNumbers:parseInt(Math.random()*10+30),     
               description:descriptions[i%4],  
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
        showTemplateDetail(){
            this.routerLinkSimple("/monitor-manager/template/template-detail");
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



