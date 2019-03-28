<template>
  <div class="bg-white padding" style="height: 100%">
    <div v-for="work in works" class="item" >
      <TD :entry="work"></TD>
    </div>
  </div>
</template>

<script>
    import TD from '@/components/task/TD';
    import Bus from '@/components/bus/Session'
    export default {
        name: "task",
        data(){
          return {
            works:[],
          }
        },
        created(){
          getData({},path2+"work/onework",(data)=>{
            if(data.code==-1)
            {
              Bus.$emit("flush",true);
              Bus.$emit("val",0);
            }else{
              this.works=data;
            }
          });
        },
        components:{
          TD
        }
    }
</script>

<style scoped>
  .item{
    display:inline-block;
    margin-right:10px;
    box-shadow: 0px 0px 4px #aaaaaa;
  }
</style>
