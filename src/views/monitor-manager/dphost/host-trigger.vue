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
                <el-form ref="form"  :inline="true" :model="current_trigger" 
                        style="padding-top:22px;font-size:0;"  v-form-label-width:p="120">
                   <el-form-item  label="名称" style="width:100%" prop="name">
                      <el-input v-model="current_trigger.name"   placeholder="名称" style="width:50%"></el-input>
                  </el-form-item>                        
                  <el-form-item label="类型" style="width:100%"  prop="type" >
                      <el-select v-model="current_trigger.type" filterable clearable placeholder="选择类型" style="width:50%">
                              <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                              </el-option>
                      </el-select>
                  </el-form-item> 
                 <el-form-item label="键值" style="width:100%"  prop="key" >
                      <el-select v-model="current_trigger.key" filterable clearable placeholder="选择或者输入键值" style="width:50%">
                              <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                              </el-option>
                      </el-select>
                  </el-form-item>          
                  <el-form-item  label="排序" style="width:100%" prop="aaa">
                      <el-input-number v-model="current_trigger.aaa"  :min="1" :max="100000" label="排序" style="width:50%"></el-input-number>
                  </el-form-item>  
                   <el-form-item v-for="item in 10" :key="item"  label="测试" style="width:50%" prop="name">
                      <el-input v-model="current_trigger.name"   placeholder="测试" style="width:100%"></el-input>
                  </el-form-item>  
                   <el-form-item v-for="item in 9" :key="item"  label="测试1" style="width:33.33%" prop="name">
                      <el-input v-model="current_trigger.name"   placeholder="测试1" style="width:100%"></el-input>
                  </el-form-item> 
                   <el-form-item v-for="item in 3" :key="item"  label="测试2" style="width:100%" prop="name">
                      <el-input v-model="current_trigger.name"   placeholder="测试2" style="width:100%"></el-input>
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
          <el-input v-model="searchData" placeholder="可搜索名称与表达式" class="filterArea-block"
              style="width:18%" >
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>           
          <el-button type="success" style="float:right;min-width:5%;" icon="el-icon-plus"  @click="addItem"  
          >新增触发器</el-button>        
    </div>
    <div class="host-view-block-no-top" style="margin-top:0px !important" >
      <el-scrollbar  :native="false" :wrapStyle="wrapStyle" wrapClass=""  :viewStyle="viewStyle" tag="section" >	  
        <el-table
            :data="tableData"     
            style="width:calc((100%));max-width:none;">
            <el-table-column
              :filters="[{text: '正常', value: 0}, {text: '警告', value: 1}, {text: '严重', value: 2}]"            
              show-overflow-tooltip
              label="触发级别"
              min-width="12%">
              <template slot-scope="scope">
                <span :style="getColor(scope.row.level)">
                  <i class="iconfont icon-remind_fill icon-host-warning"  
                    :style="getColor(scope.row.level)"></i>
                    {{getTriggerName(scope.row.level)}}</span>
              </template>  
            </el-table-column>          
            <el-table-column
              prop="name"
              show-overflow-tooltip
              label="触发器名称"
              min-width="38%">
              <template slot-scope="scope">
                <span style="color:#ca8622">{{scope.row.name}}</span>
              </template>  
            </el-table-column>
            <el-table-column
              prop="expression"
              show-overflow-tooltip
              label="触发器表达式"
              min-width="40%">
              <template slot-scope="scope">
                <span style="color:#8ca3a1">{{scope.row.expression}}</span>
              </template>              
            </el-table-column>        
            <el-table-column
              :filters="[{text: '正常', value: 0}, {text: '警告', value: 1}, {text: '严重', value: 2}]"
              prop="status"
              show-overflow-tooltip
              label="状态"
              min-width="10%">
                <template slot-scope="scope">
                  <span v-if="scope.row.status==0" style="color:#F56C6C">
                    <i class="iconfont icon-flashlight_fill icon-host-warning"  
                      style="color:#F56C6C"></i>
                    已停用
                  </span>
                  <span v-if="scope.row.status==1"  style="color:#67C23A">
                    <i class="iconfont icon-flashlight_fill icon-host-warning"  
                      style="color:#67C23A"></i>
                    已启用
                  </span>
                </template>             
            </el-table-column>                                                                    
        </el-table>		
      </el-scrollbar>  
      <dpPage></dpPage>  
    </div>
  </div>     
</template>

<script>
import colors from "@/mixins/colors"
import dpPage from '@/components/dpcomponents/page/page' 
import filterArea from "@/mixins/dpFilterArea"
export default {
     mixins:[colors,filterArea],
     components:{dpPage},
     data(){
          var tableData = [];
          var options = [];
          for(var i=0;i<40;i++){
             tableData.push({
               level:i%5+1,  
               name:"WindowsService.RemotingDataAccess.OBA服务不可用"+i,
               key:"net.tcp.service[tcp,,8080]"+i,
               expression:"{41MESAPP1:service_state[WindowsService.RemotingDataAccess.OBA].last(0)}<0",
               status:(i+1)%5==1?0:1,          
             })
             options.push({
                value: '0'+i,
                label: '测试选型0'+i,
             })
          }
        return {
           tableData:tableData,
           searchData:"",
           dialog_title:'新增触发器',
           options:options,
           dialog_visible:false,
           current_trigger:{},
        }
     },
     methods:{
       addItem(){
         this.dialog_visible = true;
       },
       editItem(){
         this.dialog_visible = true;
       },
       getColor(index){
            return {color:this.getTriggerColor(index)};
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



