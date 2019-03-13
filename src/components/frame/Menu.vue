<template>
  <ul id="menu">
    <li v-for="item in menu">
      <router-link @click="selectmenu(item.id)" :style="{'background-image':'url('+getimage(item)+')','background-repeat' : 'no-repeat' ,'background-size':'16px 16px','background-position':'25px center'}" :class="{selected:item.id==selected}"   :to="item.url"  >{{item.name}}</router-link>
    </li>
  </ul>

</template>

<script>
    export default {
        name: "Menu",
        data(){
          return {
            selected:0,
            menu:[
              {"name":"任务","id":1,"url":"/task","img":"http://47.94.95.151:8080/images/work.png","selectimg":"http://47.94.95.151:8080/images/work1.jpg"},
              {"name":"日志","id":2,"url":"/log","img":"http://47.94.95.151:8080/images/log.png","selectimg":"http://47.94.95.151:8080/images/log1.png"},
              {"name":"成绩","id":3,"url":"/exam","img":"http://47.94.95.151:8080/images/score.png","selectimg":"http://47.94.95.151:8080/images/score1.png"},
              {"name":"面试","id":4,"url":"/interview","img":"http://47.94.95.151:8080/images/mianshi.png","selectimg":"http://47.94.95.151:8080/images/mianshi1.png"},
              {"name":"统计","id":5,"url":"/statistics","img":"http://47.94.95.151:8080/images/statistics.png","selectimg":"http://47.94.95.151:8080/images/statistics1.png"},
              {"name":"设置","id":6,"url":"/me","img":"http://47.94.95.151:8080/images/me.png","selectimg":"http://47.94.95.151:8080/images/me1.png"}
            ]
          };
      },
        methods:{
        selectmenu(id){
          this.selected=id;
        },
        getimage(item){
          if(item.id==this.selected)
            return item.selectimg;
          else
            return item.img
        }
      }
    }
</script>

<style scoped>
  #menu{
    padding:0;
    font-size:12px;
  }
  #menu>li>a{
    text-decoration: none;
    color: #777;
    display: block;
    padding-left:60px;
    height:40px;
    line-height: 40px;
  }
  #menu>li>a:hover{
    background: #eeeeee;
    color:#000000;
    border-left:2px solid #4181FF;
  }
  #menu>li>.selected{
    background: #eeeeee;
  }
</style>
