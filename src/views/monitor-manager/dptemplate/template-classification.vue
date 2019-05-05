<template>
    <div class=" el-input__inner_border_0" >
      <el-input v-model="searchData" placeholder="可搜索名称"  >
					<i slot="prefix" class="el-input__icon el-icon-search"></i>
			</el-input>
	     <el-scrollbar  :native="false" :wrapStyle="wrapStyle" wrapClass=""  :viewStyle="viewStyle" tag="section" > 
          <el-table
              :data="tableData"          
              style="width:calc((100%));max-width:none;">
              <el-table-column
                prop="name"
                show-overflow-tooltip
                label="分类名称"
                min-width="50%">
                <template slot-scope="scope">
                  <span style="color:#409EFF">{{scope.row.name}}</span>
                </template>  
              </el-table-column>
              <el-table-column
                prop="itemNumbers"
                show-overflow-tooltip
                label="监控项数量"
                min-width="50%">
                <template slot-scope="scope">
                  <span style="color:#E6A23C">{{scope.row.itemNumbers}}</span>
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
          var names =["Classes","Compilation","Garbage Collector","Memory","Operating System"]
          var tableData = [];
          for(var i=0;i<10;i++){
             tableData.push({
               name:names[i%5],
               itemNumbers:i+2, 
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


