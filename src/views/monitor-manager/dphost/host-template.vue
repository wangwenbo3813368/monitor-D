<template>
  <div>
    <el-dialog 
               :title="dialog_title"
               :visible.sync="dialog_visible" 
               :center="true"
               :width="dialogWidth" 
               top="2%"
               :close-on-click-modal = "false"            
         >
       <el-scrollbar  :native="false" :wrapStyle="wrapStyle_dialog" wrapClass=""  :viewStyle="viewStyle_dialog" tag="section" > 
            <div style="padding:0 20px;width:100%;">
                <el-form ref="form"  :inline="true" :model="current_template" 
                        style="padding-top:22px;font-size:0;"  v-form-label-width:p="120">                    
                  <el-form-item label="模板" style="width:100%"  prop="template" >
                      <el-select v-model="current_template.template" filterable clearable placeholder="选择类型" style="width:50%">
                              <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                              </el-option>
                      </el-select>
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
    <div class="host-view-block filterArea"  :style="getFilterAreaStyle(24)">
          <el-input v-model="searchData" placeholder="可搜索名称" class="filterArea-block"
              style="width:18%" >
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>           
          <el-button type="success" style="float:right;min-width:5%;" icon="el-icon-plus"  @click="addItem"  
          >关联新模板</el-button>        
    </div>
    <div class="host-view-block-no-top" style="margin-top:0px !important" >
	     <el-scrollbar  :native="false" :wrapStyle="wrapStyle" wrapClass=""  :viewStyle="viewStyle" tag="section" > 
          <el-table
              :data="tableData"          
              style="width:calc((100%));max-width:none;">
              <el-table-column
                prop="name"
                show-overflow-tooltip
                label="模板名称"
                min-width="40%">
                <template slot-scope="scope">
                  <span style="color:#409EFF">{{scope.row.name}}</span>
                </template>  
              </el-table-column>
              <el-table-column
                prop="status"
                :filters="[{text: '正常', value: 0}, {text: '警告', value: 1}, {text: '严重', value: 2}]"
                show-overflow-tooltip
                label="是否关联"
                min-width="20%">
               <template slot-scope="scope">
                <span v-if="scope.row.status==0" style="color:#F56C6C">
                  未关联
                </span>
                <span v-if="scope.row.status==1"  style="color:#67C23A">
                  已关联
                </span>
              </template>
              </el-table-column>   
                  <el-table-column
                    show-overflow-tooltip
                    label="操作"
                    min-width="30%">
                     <template slot-scope="scope">
                      <div v-if="scope.row.status==0" class="self-icon-blue" style="display:inline-block">
                         <i class="iconfont icon-edit" ></i>
                         关联模板
                      </div>
                       <div v-if="scope.row.status==1" class="self-icon-orange" style="display:inline-block">
                         <i class="iconfont icon-edit" ></i>
                         取消关联
                      </div>                     
                      <div  class="self-icon-red" style="display:inline-block" >
                         <i class="iconfont icon-delete"></i>
                         删除关联模板
                      </div>                                                   
                    </template>                                            
                </el-table-column>                                                                                                      
          </el-table>		
	     </el-scrollbar>
       <dpPage></dpPage>    
    </div>
  </div>     
</template>

<script>
import dpPage from '@/components/dpcomponents/page/page' 
import filterArea from "@/mixins/dpFilterArea";
export default {
     mixins:[filterArea],
     components:{dpPage},
     data(){
          var tableData = [];
          var options = [];
          for(var i=0;i<2;i++){
             tableData.push({
               name:["Template Windows","Template Linux"][i],
               status:(i+1)%2,          
             });
             options.push({
                value: '0'+i,
                label: '测试选型0'+i,
             })
          }
        return {
           tableData:tableData,
           searchData:"",
           dialog_title:'关联新模板',
           options:options,
           dialog_visible:false,
           current_template:{},
        }
     },
     methods:{
       addItem(){
         this.dialog_visible = true;
       },
       editItem(){
         this.dialog_visible = true;
       }
     },
     computed:{
        viewStyle(){
          return {"height":this.$store.getters.mainHeight-30-110-12+"px",
                  width:"calc((100%))"
          }
        },
        wrapStyle(){
          return {"height":this.$store.getters.mainHeight-30-110-12+"px",
                  width:"calc((100%))"
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
     }
 
};
</script>



