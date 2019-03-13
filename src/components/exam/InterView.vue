<template>
  <div class="content-container view_score" style="width: 100%">
    <table class="il_table hover_table exam-info">
      <thead>
      <tr>
        <th style="width:150px;">日期</th>
        <th style="width: 100px;">面试名称</th>
        <th style="width: 90px;">技术得分</th>
        <th style="width: 90px;">口才得分</th>
        <th style="width: 120px;">技术班平均</th>
        <th style="width: 120px;">口才班平均</th>
        <th>备注</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="entry in list ">
          <td>{{entry.interview.dat}}</td>
          <td>{{entry.interview.name}}</td>
          <td>{{entry.skill}}</td>
          <td>{{entry.express}}</td>
          <td>{{entry.avgskill}}</td>
          <td>{{entry.avgexpress}}</td>
          <td>
            {{gethtml(entry.mark)}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
    import Bus from '@/components/bus/Session';
    export default {
      name: "iterviewexam",
      data(){
        return {
          list:[]
        };
      },
      created(){
        getData({withPage:0,isDel:1},path2+"interView/stuinterview",(data)=>{
          if(data.code==-1)
          {
            Bus.$emit("flush",true);
            Bus.$emit("val",0);
          }else{
            this.list=data;
            console.log(data);
          }
        });
      },
      methods:{
         gethtml(str){
           return replacen(str);
         }
      }
    }
</script>

<style scoped>

</style>
