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
                <el-form ref="form"  :inline="true" :model="current_item" 
                        style="padding-top:22px;font-size:0;"  v-form-label-width:p="120">
                   <el-form-item  label="名称" style="width:100%" prop="name">
                      <el-input v-model="current_item.name"   placeholder="名称" style="width:50%"></el-input>
                  </el-form-item>                        
                  <el-form-item label="类型" style="width:100%"  prop="type" >
                      <el-select v-model="current_item.type" filterable clearable placeholder="选择类型" style="width:50%">
                              <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                              </el-option>
                      </el-select>
                  </el-form-item> 
                 <el-form-item label="键值" style="width:100%"  prop="key" >
                      <el-select v-model="current_item.key" filterable clearable placeholder="选择或者输入键值" style="width:50%">
                              <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                              </el-option>
                      </el-select>
                  </el-form-item>          
                  <el-form-item  label="排序" style="width:100%" prop="aaa">
                      <el-input-number v-model="current_item.aaa"  :min="1" :max="100000" label="排序" style="width:50%"></el-input-number>
                  </el-form-item>  
                   <el-form-item v-for="item in 10" :key="item"  label="测试" style="width:50%" prop="name">
                      <el-input v-model="current_item.name"   placeholder="测试" style="width:100%"></el-input>
                  </el-form-item>  
                   <el-form-item v-for="item in 9" :key="item"  label="测试1" style="width:33.33%" prop="name">
                      <el-input v-model="current_item.name"   placeholder="测试1" style="width:100%"></el-input>
                  </el-form-item> 
                   <el-form-item v-for="item in 3" :key="item"  label="测试2" style="width:100%" prop="name">
                      <el-input v-model="current_item.name"   placeholder="测试2" style="width:100%"></el-input>
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
          <el-input v-model="searchData" placeholder="可搜索名称与键值" class="filterArea-block"
              style="width:18%" >
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>           
          <el-button type="success" style="float:right;min-width:5%;" icon="el-icon-plus"  @click="addItem"  
          >新增监控项</el-button>        
    </div>
    <div class="host-view-block-no-top" style="margin-top:0px !important" >
	     <el-scrollbar  :native="false" :wrapStyle="wrapStyle" wrapClass=""  :viewStyle="viewStyle" tag="section" > 
          <el-table
              :data="tableData"          
              @row-click="editItem"
              style="width:calc((100%));max-width:none;">
              <el-table-column
                prop="name"
                show-overflow-tooltip
                label="监控项名称"
                min-width="15%">
                <template slot-scope="scope">
                  <span style="color:#409EFF">{{scope.row.name}}</span>
                </template>  
              </el-table-column>
              <el-table-column
                prop="key"
                show-overflow-tooltip
                label="键值"
                min-width="12%">
                <template slot-scope="scope">
                  <span style="color:#8ca3a1">{{scope.row.key}}</span>
                </template>              
              </el-table-column>
              <el-table-column
                :filters="[{text: '正常', value: 0}, {text: '警告', value: 1}, {text: '严重', value: 2}]"
                prop="grouptype"
                show-overflow-tooltip
                label="分类"
                min-width="10%">
                <template slot-scope="scope">
                  <span style="color:#8ca3a1">{{scope.row.grouptype}}</span>
                </template>            
              </el-table-column>
              <el-table-column
                sortable
                prop="intervaltime"
                show-overflow-tooltip
                label="刷新频率"
                min-width="10%">
                <template slot-scope="scope">
                  <span style="color:#8ca3a1">{{scope.row.intervaltime}}</span>
                </template>                  
              </el-table-column>
              <el-table-column
                :filters="[{text: '正常', value: 0}, {text: '警告', value: 1}, {text: '严重', value: 2}]"
                prop="valuetype"
                show-overflow-tooltip
                label="数据类型"
                min-width="10%">
                <template slot-scope="scope">
                  <span style="color:#8ca3a1">{{scope.row.valuetype}}</span>
                </template>                 
              </el-table-column>            
              <el-table-column
                :filters="[{text: '正常', value: 0}, {text: '警告', value: 1}, {text: '严重', value: 2}]"
                prop="status"
                show-overflow-tooltip
                label="状态"
                min-width="7%">
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
import dpPage from '@/components/dpcomponents/page/page' 
import filterArea from "@/mixins/dpFilterArea";
export default {
     mixins:[filterArea],
     components:{dpPage},
     data(){
          var tableData = [];
          var options = [];
          for(var i=0;i<40;i++){
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
           tableData:tableData,
           searchData:"",
           dialog_title:'新增监控项',
           options:options,
           dialog_visible:false,
           current_item:{},
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



