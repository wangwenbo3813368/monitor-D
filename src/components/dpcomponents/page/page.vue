<template>
    <div class="dp-page" style="display:flex;justify-content:flex-end;height:30px;width:100%;">
      <div style="display:block;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="4000">
          </el-pagination>
        </div>
    </div>
</template>

<script>

export default {
    data(){
      return {
        currentPage:1,
      }
    },
    methods:{
      handleSizeChange(){

      },
      handleCurrentChange(){

      }
    }
 
};
</script>

<style lang="scss" >
@import  'static/css/mixins.scss';
.dp-page{
   @include page_background_color();
}

.dp-page .el-pagination {
    padding: 4px 20px;

}
.dp-page .el-pagination button{
    // border:1px solid #606266;
    @include border_normal();
}
.dp-page .el-pagination button:disabled {
    // color: #606266;
    // background-color: #3C3F41;
    @include font_disabled_color(#ffffff);
    @include background_level01_color(#ffffff);
    cursor: not-allowed;
}
.dp-page .el-pagination .btn-prev {
    padding-right: 6px;
    // background: #3C3F41;
    // color:#F2F6FC;
    @include font_special_color(#ffffff);
    @include background_level01_color(#ffffff);
}
.dp-page .el-pagination .btn-next{
    padding-left: 6px;
    margin-left:3px;
    // color:#F2F6FC;
    // background: #3C3F41;
    @include font_special_color(#ffffff);
    @include background_level01_color(#ffffff);

}
.dp-page .el-dialog, .el-pager li {
    // background: #3C3F41;
    @include background_level01_color(#ffffff);
    -webkit-box-sizing: border-box;
}

.dp-page .el-input--mini .el-input__inner {
    height: 22px;
    line-height: 22px;
    font-size: 12px;
    // border:1px solid #606266;
    // background-color: #3C3F41;
    // color:#C0C4CC;
    @include border_normal();
    @include font_normal_color(#ffffff);
    @include background_level01_color(#ffffff);
}
.dp-page .el-pagination button{
    height: 22px;
    line-height: 22px;
    font-size: 12px;
}
.dp-page .el-pager li{
    height: 22px;
    line-height: 20px;
    font-size: 12px;
    min-width: 32px;
    margin-left:3px;
    // border: 1px solid #606266;
    // color:#C0C4CC;
    @include border_normal();
    @include font_normal_color(#ffffff);
}

.dp-page .el-pagination__editor{
    height: 22px;
    line-height: 22px;
    font-size: 12px;
}
.dp-page .el-pagination span:not([class*=suffix]) {
    height: 22px;
    line-height: 22px;
    font-size: 12px;
}
.dp-page .el-pagination__editor.el-input .el-input__inner {
    height: 22px;
    line-height: 22px;
    font-size: 12px;
    // border: 1px solid #606266;
    // background-color: #3C3F41;
    // color:#C0C4CC;
    @include border_normal();
    @include font_normal_color(#ffffff);
    @include background_level01_color(#ffffff);    
}

.dp-page  .el-input--mini .el-input__icon {
    line-height: 22px;
    font-size: 12px;
}


.dp-page .el-input__inner {
     padding: 0px; 
     font-size: 12px;
}

.dp-page  .el-pager li.active+li {
    // border-left: 1px solid #606266;
    @include border_left();
}
.dp-page .el-pager li.active {
    cursor: default;
    color: #EBEEF5;
    background: #409EFF !important;
}
.dp-page .el-pager .more::before {
    line-height: 22px;
}

</style>
