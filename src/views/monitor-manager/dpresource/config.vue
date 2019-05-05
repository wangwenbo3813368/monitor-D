<template>
   <el-container v-cloak>
      <div >
         <el-dialog 
               :title="title_configTemplate"
               :visible.sync="dialog_visible" 
               :center="true"
               :width="dialogWidth" 
               top="2%"
               :close-on-click-modal = "false"            
         >
            <el-scrollbar  :native="false" :wrapStyle="wrapStyle_dialog" wrapClass=""  :viewStyle="viewStyle_dialog" tag="section" > 
                  <div style="padding:0 20px;width:100%;">
                     <el-form ref="form"  :inline="true" :model="current_tempalte" 
                              style="padding-top:22px;font-size:0;"  v-form-label-width:p="120">
                        <el-form-item label="模板" style="width:100%"  prop="name" >
                           <el-select v-model="current_tempalte.name" filterable clearable placeholder="选择模板" style="width:50%">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                           </el-select>
                        </el-form-item>          
                        <el-form-item  label="排序" style="width:100%" prop="aaa">
                           <el-input-number v-model="current_tempalte.aaa"  :min="1" :max="100000" label="排序" style="width:50%"></el-input-number>
                        </el-form-item>                   
                     </el-form>
                  </div>
            </el-scrollbar>
            <div  class=" host-view-block-foot" style="text-align:right;border-top:0px !important;" >
                  <el-button type="primary" style="min-width:5%;" icon="el-icon-save"
                 >保存</el-button>
                  <el-button type="info" style="margin-right:10px;min-width:5%;" @click="dialog_visible=false" >取消</el-button>
            </div>            
         </el-dialog>
      </div>
      <el-main style="padding:0px">
         <div class="host-view-block host-view-block-first">
            <div  class=" host-view-block-header" style="text-align:center" >
                  <span >{{title}}</span>
                  <div class="self-icon-back" >                    
                     <i class="iconfont icon-back1"  @click="goback"
                     style="vertical-align: top;height:23px;
                     line-height:23px;cursor:pointer;font-size:18px;margin:0 2px"></i>
                 </div>
            </div>

            <el-container>
               <el-main style="padding:0px">
               <div class="host-view-block host-view-block-first filterArea"  :style="getFilterAreaStyle(50)">
                  <el-input v-model="searchData" placeholder="搜索模板名称" class="filterArea-block"
                     style="width:18%" >
                     <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                  <el-button type="primary" style="margin-left:5px;min-width:5%;" icon="el-icon-search" >查询</el-button>
                  <el-button type="success" style="float:right;min-width:5%;" icon="el-icon-plus" @click="addTemplate"
                  >配置模板</el-button>                                            
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
                           prop="code"
                           show-overflow-tooltip
                           label="监控项数量"
                           min-width="10%">
                           </el-table-column>  
                           <el-table-column
                           prop="templateNumbers"
                           show-overflow-tooltip
                           label="触发器数量"
                           min-width="10%">
                           </el-table-column>  
                           <el-table-column
                           prop="sort"
                           show-overflow-tooltip
                           label="排序"
                           min-width="8%">
                           </el-table-column>                           
                           <el-table-column                   
                           prop="description"
                           show-overflow-tooltip
                           label="描述"
                           min-width="20%">                       
                           </el-table-column>               
                           <el-table-column
                           show-overflow-tooltip
                           label="操作"
                           min-width="10%">                    
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
                           label="模板名称"
                           min-width="20%">
                              <template slot-scope="scope">
                              <div style="color:#409EFF">
                                 {{scope.row.name}}
                              </div>                            
                           </template>                     
                           </el-table-column>        
                           <el-table-column
                           prop="itemNumber"
                           show-overflow-tooltip
                           label="监控项数量"
                           min-width="10%">
                              <template slot-scope="scope">
                              <div style="color:#9ccdc4">
                                 {{scope.row.itemNumber}}
                              </div>                            
                           </template>                       
                           </el-table-column>  
                           <el-table-column
                           prop="triggerNumber"
                           show-overflow-tooltip
                           label="触发器数量"
                           min-width="10%">
                              <template slot-scope="scope">
                              <div style="color:#9ccdc4">
                                 {{scope.row.triggerNumber}}
                              </div>                            
                           </template>                      
                           </el-table-column>  
                           <el-table-column
                           prop="sort"
                           show-overflow-tooltip
                           label="排序"
                           min-width="8%">
                              <template slot-scope="scope">
                              <div style="color:#9ccdc4">
                                 {{scope.row.sort}}
                              </div>                            
                           </template>                     
                           </el-table-column>                           
                           <el-table-column
                           prop="description"
                           show-overflow-tooltip
                           label="描述"
                           min-width="20%">
                              <template slot-scope="scope">
                              <div style="color:#409EFF">
                                 {{scope.row.description}}
                              </div>                            
                           </template>                     
                           </el-table-column>                                   
                           <el-table-column
                           show-overflow-tooltip
                           label="操作"
                           min-width="10%">
                              <template slot-scope="scope">
                              <div class="self-icon-orange" style="display:inline-block" @click="addTemplate">
                                 <i class="iconfont icon-edit" ></i>
                                 编辑
                              </div>
                              <div class="self-icon-red" style="display:inline-block" >
                                 <i class="iconfont icon-delete" ></i>
                                 删除
                              </div>                                                                                  
                           </template>                                            
                           </el-table-column>                                                          
                     </el-table>		
                     </el-scrollbar>      
                     <dpPage></dpPage>
                  </div>                
             </el-main>
            </el-container> 


         </div>
      </el-main>
   </el-container>
</template>

<script>
import dpPage from '@/components/dpcomponents/page/page'
import filterArea from "@/mixins/dpFilterArea";
export default {
     mixins:[filterArea],
     components:{dpPage},
     data(){
          var tableData = [];
          var names=["Template App Cisco","Template Windows","Template Linux","Template App Huawei CE"];
          var options = [];
          for(var i=0;i<40;i++){
             tableData.push({
               name:names[i%4],
               itemNumber:i*2,
               triggerNumber:i*3+1,
               sort:i+1,
               description:"测试测试",         
             });
             options.push({
                value: '0'+i,
                label: '测试选型0'+i,
             })
          }        
        return {
           title:"主机-模板配置",
           title_configTemplate:"主机-新增模板",
           dialog_visible:false,
           searchData:'',
           optionValue:'',
           tableData:tableData,
           options:options,
           current_tempalte:{},

        }
     },
     methods:{
      goback(){
          this.$router.go(-1);
      },
      addTemplate(){
         this.dialog_visible = true;
      }
     },
     computed:{      
        viewStyle(){
          return {"height":this.$store.getters.mainHeight-24-24-40-82+"px",
                  width:"100%"
          }
        },
        wrapStyle(){
          return {"height":this.$store.getters.mainHeight-24-24-40-82+"px",
                  width:"100%"
          }
        },
        dialogWidth(){
             return  parseInt(this.$store.state.sys.clientWidth*0.9)+"px";
        },
        viewStyle_dialog(){
          return {"height":this.$store.getters.mainHeight-100+"px"
          }
        },
        wrapStyle_dialog(){
          return {"height":this.$store.getters.mainHeight-100+"px"
          }
        }          
     },
     mounted(){

     }
 
};
</script>





