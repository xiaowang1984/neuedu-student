<template>
  <div class="bg-white padding-top" style="height:100%">
   <div class="title" >
      <div class="tongji" style="line-height: 30px;width:200px;">
        <div>{{tongji[0]}}</div>
        <div>{{tongji[1]}}</div>
        <div>{{tongji[2]}}</div>
        <div>{{tongji[3]}}</div>
        <div>{{tongji[4]}}</div>
      </div>
      <div class="ym">
        <span class="prev" @click="prev()">&lt;</span>&nbsp;&nbsp;
        <span style="display: inline-block;width:80px">{{select}}</span>&nbsp;&nbsp;
        <span class="next" @click="next()">&gt;</span>
      </div>
    </div>
    <table id="tb"  >
      <thead>
      <tr>
        <th>周日</th>
        <th>周一</th>
        <th>周二</th>
        <th>周三</th>
        <th>周四</th>
        <th>周五</th>
        <th>周六</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(r,index) in days">
        <td v-for="d in r" ><router-link style="display:block;width:100%;height: 100%" :to="logdetails(d.name)" v-html="d.code"></router-link></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { Base64 }  from 'js-base64';
  import Bus from '@/components/bus/Session'

  export default {
    name: "LogIndex",
    data(){
      return {
        year:0,
        month:0
      }
    },
    mounted(){
      var dat=new Date();
      this.year=dat.getFullYear();
      this.month=dat.getMonth()+1;
    },
    computed:{
      list(){
        var result=[];
        getData({year:this.year,month:this.month},path2+"student/getLogs",(data)=>{
          if(data.code==-1)
          {
            Bus.$emit("flush",true);
            Bus.$emit("val",0);
          }else{
            result=data;
          }
        });
        return result;
      },
      tongji(){
        var result=[0,0,0,0,0];
        for(var i=0;i<this.list.length;i++){
          if(this.list[i].moodcode==1)
            result[0]++;
          else if(this.list[i].moodcode==2)
            result[1]++;
          else if(this.list[i].moodcode==3)
            result[2]++;
          else if(this.list[i].moodcode==4)
            result[3]++;
          else if(this.list[i].moodcode==5)
            result[4]++;
        }
        return result;
      },
      days(){
        var result = [];
        var dateSize= getDateSize(this.year,this.month);
        var first=new Date(this.year,this.month-1,1);
        var i=1;
        while( i<= dateSize){
          var a = [];
          var month=this.month<10?"0"+this.month.toString():this.month.toString();
          for (var j = 0;j < 7 ;j++){
            var day=i<10?"0"+i:i.toString();
            var entry = this.getEntry(this.year.toString()+"-"+month+"-"+day);
            if(i==1&&first.getDay()==j){
              if(entry!=null) {
                a.push({name:1,code:"<span style='display:inline-block;color:#fff;text-align:center;line-height:30px;height: 30px;width:30px;border-radius:15px;background: "+typecolor(entry.moodcode)+"'>1</span>"});
              }else{
                a.push({name:1,code:"<span>1</span>"});
              }
              i++;
            }else if(i>1&&i<=dateSize){
              if(entry!=null){
                a.push({name:i,code:"<span style='display:inline-block;color:#fff;text-align:center;line-height:30px;height: 30px;width:30px;border-radius:15px;background: "+typecolor(entry.moodcode)+"'>"+i+"</span>"});
              }else {
                a.push({name:i,code:"<span>"+i+"</span>"});
              }
              i++;
            }else
              a.push({name:"",code:""});
          }
          result.push(a);
        }
        return result;
      },
      select(){
        return ymtxt(this.year,this.month);
      }
    },
    methods:{
      logdetails(d){
        if(d!=""){
          return "logadd?dat="+Base64.encode(this.year+"-"+this.month+"-"+d);
        }else{
          return "";
        }
      },
      getEntry(dat){
        for(var i=0;i<this.list.length;i++){
          if(this.list[i].dat==dat)
            return this.list[i];
        }
        return null;
      },
      prev(){
        if(this.month==1){
          this.year--;
          this.month=12;
        }else {
          this.month--;
        }
      },
      next(){
        if(this.month==12){
          this.year++;
          this.month=1;
        }else {
          this.month++;
        }
      }
    }
  }
  function ymtxt(year,month) {
    var monthtxt="";
    switch (month) {
      case 1:
        monthtxt="01";
        break;
      case 2:
        monthtxt="02";
        break;
      case 3:
        monthtxt="03";
        break;
      case 4:
        monthtxt="04";
        break;
      case 5:
        monthtxt="05";
        break;
      case 6:
        monthtxt="06";
        break;
      case 7:
        monthtxt="07";
        break;
      case 8:
        monthtxt="08";
        break;
      case 9:
        monthtxt="09";
        break;
      case 10:
        monthtxt="10";
        break;
      case 11:
        monthtxt="11";
        break;
      default:
        monthtxt="12";
    }
    return year+"-"+monthtxt;
  }
</script>

<style scoped>
  .title{
    width: 500px;
    height: 30px;
    margin:20px auto;
    display:flex;
  }
  .ym{
    height: 100%;
    line-height: 30px;
    width: 150px;
    text-align: center;
    border-radius:10px;
    border: 1px solid #cccccc;
    padding:0 10px;
    color: #cccccc;
  }
  .ym .prev,.ym .next{
    cursor: pointer;
  }
  .ym .prev:hover,.ym .next:hover{
    color: black;
    font-weight: bold;
  }
  #tb{
    border-collapse: collapse;
    width: 780px;
    margin:0 auto;
  }
  #tb th{
    padding:10px 28px;
  }
  #tb td{
    border: 1px solid #cccccc;
    height:100px;
    color:#333;
    padding:15px;
    vertical-align:top;
  }
  .tongji>div{
    display: inline-block;
    width: 30px;
    height:30px;
    text-align: center;
    color:#fff;
    border-radius: 15px;
  }
  .tongji>div:nth-child(1){
    background: #FE4C88;
  }
  .tongji>div:nth-child(2){
    background: #FFDB41;
  }
  .tongji>div:nth-child(3){
    background: #9D40FF;
  }
  .tongji>div:nth-child(4){
    background: #4181FF;
  }
  .tongji>div:nth-child(5){
    background: #3FFFAC;
  }

</style>
