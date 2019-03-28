<template>
    <div id="a" v-html="des"></div>
</template>

<script>
    export default {
        name: "description",
        props:{
          description:String
        },
        computed:{
          des(){
           var $div = $("<div></div>").append($(this.description));
            $div.find("img").each(function(index,element){
              $(element).attr("src",resourcePath+$(element).attr("src"));
            });

            return  $div.html();
          }
        },
      mounted(){

        }
    }
</script>

<style scoped>

</style>
