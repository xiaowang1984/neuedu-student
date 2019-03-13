<template>
  <div id="wyhead">
    <div class="left  fadein-top padding-left"><router-link to="/index" ><h1>学生管理系统</h1></router-link></div>
    <div class="right">
      <div style="width: 35px;"><span class="icon-bell-o text-gray text-big"></span></div>
      <div style="width: 70px; line-height: 40px"><img class="touxiang" :src="src" width="40" height="40"></div>
      <div class="user">
        <span>{{user.name}}</span>
        <span @click="menutoggle()" class="downward" style="cursor: pointer"></span>
        <ul class="menu hide"  >
          <li><router-link to="/password" class="go">修改密码</router-link></li>
          <li><router-link to="/image" class="go">上传头像</router-link></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Top",
        props:{
          user:Object
        },
        data(){
          return {
              hidemenu:true
          };
        },
        computed:{
          src(){
            if(this.user.img==null||this.user.img=="")
              return resourcePath+"images/nologin.png"
            else
              return resourcePath+this.user.img
          }
        }
    }
</script>

<style scoped>

  #wyhead{
    height:var(--headerheight);
    display: flex;
    border-bottom: 1px solid #eeeeee;
  }
  #wyhead>.left{
    flex:1px;
    line-height: var( --headerheight);
  }
  #wyhead>.left h1{
    width: var(--leftwidth);
    margin:0;
    padding-left:30px;
    border-right: 1px solid #eeeeee;
    font-size:20px;
  }
  #wyhead>.right{
    width:200px;
    height: var( --headerheight);
    align-self: center;
    line-height: var(--headerheight);
    display: flex;
    align-items: center;
  }
  #wyhead>.right .touxiang{
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
  }
  #wyhead>.right>.user{
    flex:1;
    position: relative;
  }
  #wyhead>.right>.user:hover .menu{
    display: block;
  }
  .menu{
    margin:0;
    padding:0;
    position: absolute;
    top:50px;
    left:-20px;
    z-index: 9;
  }
  .menu li{
    height:40px;
    line-height: 40px;
    background:#ffffff;
    border-bottom: 1px solid #eeeeee;
  }
  .menu li:hover{
    background:#eeeeee;
  }
  .menu li .go{
    padding:0 20px;
  }
  .hide{
    display: none;
  }
</style>
