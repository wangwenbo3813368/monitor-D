
export default {
    data() {

    },
    methods: {
        getFilterAreaStyle(padingWidth){
            return {
               padding:"5px",
               fontSize:0,
               display:"inline-block",
               "vertical-align":"top",
               width:this.$store.state.sys.clientWidth- this.$store.state.sys.asideWidth-padingWidth+"px",
               height:40+'px',
           }         
       }   
    }

}