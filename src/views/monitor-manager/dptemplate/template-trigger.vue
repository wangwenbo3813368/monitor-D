<template>

    <div class="el-input__inner_border_0">
      <el-input v-model="searchData" placeholder="可搜索名称与表达式"  >
					<i slot="prefix" class="el-input__icon el-icon-search"></i>
			</el-input>
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

</template>

<script>
import dpPage from '@/components/dpcomponents/page/page' 
import colors from "@/mixins/colors";
export default {
     mixins:[colors],
     components:{dpPage},
     data(){
          var tableData = [];
          for(var i=0;i<100;i++){
             tableData.push({
               level:i%5+1,  
               name:"WindowsService.RemotingDataAccess.OBA服务不可用"+i,
               key:"net.tcp.service[tcp,,8080]"+i,
               expression:"{41MESAPP1:service_state[WindowsService.RemotingDataAccess.OBA].last(0)}<0",
               status:(i+1)%5==1?0:1,          
             })
          }
        return {
           tableData:tableData,
           searchData:"",
           dialog_title:'',
        }
     },
     methods:{
        getColor(index){
            return {color:this.getTriggerColor(index)};
        }
     },
     computed:{
        viewStyle(){
          return {"height":this.$store.getters.mainHeight-30-110+"px",
                  width:"calc((100%))"
          }
        },
        wrapStyle(){
          return {"height":this.$store.getters.mainHeight-30-110+"px",
                  width:"calc((100%))"
          }
        },        
     }
     
 
};
</script>

<style lang="scss" scoped>
@import  'static/css/mixins.scss';
.el-table--border, .el-table--group {
  border: 0px !important;
  @include border_top();
} 
.el-table{
  @include border_top();
}
</style>


