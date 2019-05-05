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
                  <el-form ref="form" :rules="rules" :inline="true" :model="host" 
                           style="padding-top:22px;font-size:0;"  v-form-label-width:p="120">
                     <el-form-item label="主机名称" style="width:100%"  prop="name" >
                        <el-input v-model="host.name" placeholder="资源名称" style="width:50%"></el-input>
                     </el-form-item>          
                     <el-form-item label="主机组" style="width:100%"  prop="key" >
                           <el-select v-model="host.key" filterable clearable placeholder="选择或者输入键值" style="width:50%">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                           </el-select>
                        </el-form-item> 
                   <el-form-item v-for="item in 10" :key="item"  label="测试" style="width:50%" prop="name">
                      <el-input v-model="host.name"   placeholder="测试" style="width:100%"></el-input>
                  </el-form-item>  
                   <el-form-item v-for="item in 9" :key="item"  label="测试1" style="width:33.33%" prop="name">
                      <el-input v-model="host.name"   placeholder="测试1" style="width:100%"></el-input>
                  </el-form-item> 
                   <el-form-item v-for="item in 3" :key="item"  label="测试2" style="width:100%" prop="name">
                      <el-input v-model="host.name"   placeholder="测试2" style="width:100%"></el-input>
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
           title:"新增主机",
           rules: {
               name: [
                  { required: true, message: '请输入名称', trigger: 'blur' },
                  { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
               ]
            },
            host:{}        

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



