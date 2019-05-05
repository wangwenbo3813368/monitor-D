//el-scrollbar公共函数 只修改y轴
export default {
    data() {
        return {

        }
    },
    methods: {

    },
    mounted(){
        var self = this;
        this.$nextTick(function(){
            setTimeout(function(){
                self.$EventBus.$emit("refreshSrollBar",{});
            },200)
            // this.$EventBus.$emit("refreshSrollBar",{});
          })
    }

}