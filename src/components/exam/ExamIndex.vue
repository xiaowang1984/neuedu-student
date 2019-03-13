<template>
  <div class="content-container menu">
    <div class="item-list">
      <div class="item">
        <img class="logo" :src="shangjiImg" />
        <div class="info_box">
          <h1 class="opt">上机考试</h1>
          <router-link class="number" to="/computerExam">{{shangjicount}}</router-link>
        </div>
      </div>
      <div class="item">
        <img class="logo" :src="bishiImg" />
        <div class="info_box">
          <h1 class="opt">笔试</h1>
          <label class="number">{{bishicount}}</label>
        </div>
      </div>
      <div class="item">
        <img class="logo" :src="mianshiImg" />
        <div class="info_box">
          <h1 class="opt">面试</h1>
          <router-link class="number" to="/interexam">{{mianshicount}}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Bus from '@/components/bus/Session';
    export default {
        name: "exam",
        data(){
          return {
            shangjiImg:resourcePath+"img/computer.png",
            bishiImg:resourcePath+"img/paper.png",
            mianshiImg:resourcePath+"img/evaluate.png",
            shangjicount:0,
            bishicount:0,
            mianshicount:0
          };
        },
      created(){
        getData({withPage:0,isDel:1},path2+"student/examcount",(data)=>{
          if(data.code==-1)
          {
            Bus.$emit("flush",true);
            Bus.$emit("val",0);
          }else{
            this.shangjicount=data.computer;
            this.mianshicount=data.interview;
          }
        });
      }
    }
</script>

<style scoped>
  .logo{
     float: none;
     color: #FFF;
     margin-top: 0;
     line-height: 0;
  }
</style>
