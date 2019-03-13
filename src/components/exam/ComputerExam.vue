<template>
  <div class="content-container score" style="margin-top: 20px;">
    <table class="il_table hover_table">
      <thead>
        <tr>
          <th>日期</th>
          <th>名称</th>
          <th>个人成绩</th>
          <th>平均成绩</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in list">
          <td>{{entry.computer.dat}}</td>
          <td><a href="javascript:void(0)">{{entry.computer.name}}</a></td>
          <td>{{entry.skill}}</td>
          <td>{{avg(entry.avg)}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Bus from '@/components/bus/Session'
  export default {
      name: "computerExam",
      data(){
        return {
          list: []
        }
      },
      created(){
        getData({withPage:0,isDel:1},path2+"score/getScore",(data)=>{
          if(data.code==-1)
          {
            Bus.$emit("flush",true);
            Bus.$emit("val",0);
          }else{
            console.log(data);
            this.list=data;
          }
        });
      },
      methods:{
          avg(val){
            return parseInt(val*100)/100
          }
      }
    }
</script>

<style scoped>

</style>
