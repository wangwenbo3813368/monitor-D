<template>
    <div class=" el-input__inner_border_0" >
      <el-input v-model="searchData" placeholder="可搜索主机名称与IP"  >
					<i slot="prefix" class="el-input__icon el-icon-search"></i>
			</el-input>
	     <el-scrollbar  :native="false" :wrapStyle="wrapStyle" wrapClass=""  :viewStyle="viewStyle" tag="section" > 
          <el-table
              :data="tableData"          
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
                min-width="12%">
                <template slot-scope="scope">
                  <span style="color:#E6A23C">{{scope.row.ip}}</span>
                </template>              
              </el-table-column>
              <el-table-column
                :filters="[{text: '启用', value: 0}, {text: '禁用', value: 1}]"
                prop="disabled"
                show-overflow-tooltip
                label="是否启用"
                min-width="12%">
                <template slot-scope="scope">
                  <span v-if="scope.row.disabled==0" style="color:#67C23A">
                    启用
                  </span>
                  <span v-if="scope.row.disabled==1"  style="color:#F56C6C">
                    禁用
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
export default {
     components:{dpPage},
     data(){
          
          var tableData = [];
          for(var i=0;i<40;i++){
             tableData.push({
               name:"Windows2012-15"+i,
               ip:"192.168.222.122",
               disabled:0    
             })
          }
        return {
           tableData:tableData,
           searchData:"",
           dialog_title:'',
        }
     },
     methods:{
        viewHistory(row){
          this.dialog_title = row.name;
          this.$EventBus.$emit("historyDialogShow", {type:row.valuetype=='文本'?'table':'line'});          
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


