
function setMemberApi(path) {
    let global_member='/api/member/';
    return global_member+path;
}

const api={

    //定制文件上传下载功能
    singleFileUpload:setMemberApi("filestore/o_upload"),//单个文件上传服务
    getFileContentSvg:setMemberApi("filestore/getFileContent_svg"),//获取某个svg文件里面具体字符流
    changeFileUrlSvg:setMemberApi("filestore/changeFileUrl_svg"),//修改svg文件中链接跳转
    
    //定制化功能
    carBrandSaveAndEdit:setMemberApi("carbrand/addAndEdit"),//汽车品牌新增修改
    carBrandList:setMemberApi("carbrand/getList"),//获取满足条件的汽车品牌
    carBrandAble:setMemberApi("carbrand/able"),//禁用或者启用汽车品牌
    carBrandValidateRepeat:setMemberApi("carbrand/validateRepeatCodeAndName"),//唯一性验证

    carBrandSeriesElementCascaderList:setMemberApi("carbrand/getBrandSeriesElementCascaderList"),//获取已启用车牌车系级联数据

    carSeriesSaveAndEdit:setMemberApi("carseries/addAndEdit"),//汽车车系新增修改
    carSeriesList:setMemberApi("carseries/getList"),//获取满足条件的汽车车系
    carSeriesAble:setMemberApi("carseries/able"),//禁用或者启用汽车车系
    carSeriesValidateRepeat:setMemberApi("carseries/validateRepeatCodeAndName"),//唯一性验证

    carSeriesListFilter:setMemberApi("carseries/getListFilter"),//获取用于增加目录的列表,带disabled属性

    carCatalogSaveAndEdit:setMemberApi("carcatalog/addAndEdit"),//目录新增修改
    carCatalogList:setMemberApi("carcatalog/getList"),//获取满足条件的目录
    carCatalogAble:setMemberApi("carcatalog/able"),//发布或者撤销目录
    carCatalogCascaderList:setMemberApi("carcatalog/getCatalogElementCascaderList"),//获取配置相关目录的车系目录的级联数据
    carCatalogCascaderListForAdvancedConfig:setMemberApi("carcatalog/getCatalogListForAdvancedConfig"),//获取用来进行高级复制车系对应的某类型已维护数据的车系目录列表
    carCatalogStartCopy:setMemberApi("carcatalog/startCopy"),//开始复制
    carCatalogGetCopyRate:setMemberApi("carcatalog/getCopyRate"),//获取复制进度


    carCatalogDetailSaveAndEdit:setMemberApi("carcatalogdetail/addAndEdit"),//目录详情条目新增修改
    carCatalogDetailList:setMemberApi("carcatalogdetail/getListForElementTree"),//获取目录详情条目(ElementTree对象)
    carCatalogDetailBySeriesIdAndTypeList:setMemberApi("carcatalogdetail/getListForElementTreeBySeriesIdAndType"),//获取目录详情条目(ElementTree对象),通过车系ID和目录type
    carCatalogDetailAble:setMemberApi("carcatalogdetail/deleteById"),//目录详情条目删除
    carCatalogDetailUploadExcel:setMemberApi("carcatalogdetail/o_upload"),//初始化目录条目Excel上传(仅用在初始化)
    carCatalogDetailDeleteMessage:setMemberApi("carcatalogdetail/getDeleteMessage"),//获取删除信息
    carCatalogDetailDeleteCascaderById:setMemberApi("carcatalogdetail/deleteCascaderById"),//开始级联删除
    carCatalogDetailStaticHtml:setMemberApi("carcatalogdetail/getStaticHtml"),//获取静态HTML

    carCatalogDetailContentSaveAndEdit:setMemberApi("carcatalogdetailcontent/addAndEdit"),//目录详情条目内容新增修改
    carCatalogDetailContentData:setMemberApi("carcatalogdetailcontent/getData"),//获取目录详情条目内容实体

    carContentOperateSaveAndEdit:setMemberApi("carcontentoperate/addAndEdit"),//内容操作记录新增
    carContentOperateList:setMemberApi("carcontentoperate/getListByCatalogDetailContentId"),//内容操作记录列表获取

    carCommentList:setMemberApi("catalog/getCommentList"),//获取评论列表
    changeCommentStatus:setMemberApi("catalog/ChangeCommentStatus"),//修改评论状态
    deleteDpComment:setMemberApi("catalog/deleteDpComment"),//删除评论列表


    carCatalogTypeSaveAndEdit:setMemberApi("carcatalogtype/addAndEdit"),//手册类型新增编辑
    carCatalogTypeList:setMemberApi("carcatalogtype/getList"),//获取手册类型列表

    test:setMemberApi("carcatalogdetail/generateStaticHtml"),

}




export default api;


