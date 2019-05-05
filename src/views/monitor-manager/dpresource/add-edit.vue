<template v-cloak>
   <el-container>
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
            <el-scrollbar  :native="false" :wrapStyle="wrapStyle" wrapClass=""  :viewStyle="viewStyle" tag="section" > 
               <div style="padding:0 20px;">
                  <el-form ref="form" :rules="rules" :inline="true" :model="resource" 
                           style="padding-top:22px;font-size:0;"  v-form-label-width:p="120">
                     <el-form-item label="资源名称" style="width:100%"  prop="name" >
                        <el-input v-model="resource.name" placeholder="资源名称" style="width:50%"></el-input>
                     </el-form-item>          
                     <el-form-item  label="资源编码" style="width:100%" prop="code">
                        <el-input v-model="resource.code" placeholder="资源编码" style="width:50%"></el-input>
                     </el-form-item> 
                     <el-form-item  label="排序" style="width:100%" prop="sort">
                        <el-input-number v-model="resource.sort"  :min="1" :max="100000" label="排序" style="width:50%"></el-input-number>
                     </el-form-item> 
                     <el-form-item  label="是否启用" style="width:100%" prop="diabled">
                        <el-switch v-model="resource.disabled"></el-switch>
                     </el-form-item>                     
                  </el-form>
               </div>
            </el-scrollbar>
            <div  class=" host-view-block-foot" style="text-align:right;" >
                  <el-button type="primary" style="min-width:5%;" icon="el-icon-save"
                  @click="submitForm('form')" >保存</el-button>
                  <el-button type="info" style="margin-right:10px;min-width:5%;"  @click="goback">取消</el-button>
            </div>

         </div>
      </el-main>
   </el-container>
</template>

<script>

export default {

     data(){
         
        return {
           title:"新增资源",
           rules: {
               name: [
                  { required: true, message: '请输入名称', trigger: 'blur' },
                  { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
               ]
            },
            resource:{

            }        

        }
     },
     methods:{
      goback(){
          this.$router.go(-1);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
     },
     computed:{      
        viewStyle(){
          return {"height":this.$store.getters.mainHeight-80+"px",
                  width:"100%"
          }
        },
        wrapStyle(){
          return {"height":this.$store.getters.mainHeight-80+"px",
                  width:"100%"
          }
        }  
     },
     mounted(){

     }
 
};
</script>



