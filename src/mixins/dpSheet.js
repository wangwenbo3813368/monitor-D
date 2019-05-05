
export default {
    data(){
        return {
          activeSheet:1,
        }
     },
    methods: {
        openSheet(index){
            this.activeSheet = index;
          },
        getSheetClass(index){
            if(index == this.activeSheet){
              return "dp-tap-li dp-tap-li-active";
            }else{
              return "dp-tap-li";
            }
        },
        getSheetStyle(index){
            var rate = 100/index;
            rate  = Math.floor(rate* 100) / 100;
            return {
                width: rate+"%",
            }
        },        
        isActiveSheet(index){
            return this.activeSheet == index;
        }
    }

}