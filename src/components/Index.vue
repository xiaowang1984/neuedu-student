<template>
  <div id="main">
      <header id="mainhead">
        <Top :user="user"></Top>
      </header>
      <main id="mainmid">
        <aside class="left">
          <Menu></Menu>
        </aside>
        <div class="right">
          <router-view ></router-view>
        </div>
      </main>
      <div v-if="flag==0" class="login">
        <Login></Login>
      </div>
  </div>
</template>

<script>
  import Top from '@/components/frame/Top'
  import Menu from '@/components/frame/Menu'
  import Bus from '@/components/bus/Session'
  import Login from '@/components/frame/login'
  export default {
    name: "Index",
    data(){
      return {
        user:{},
        flag:1
      };
    },
    mounted(){
      var vm = this;
      Bus.$on('val', (data) => {
        vm.flag = data
      });
      getData({},path2+"student/getUser",(data)=>{
        if(data.code==-1)
        {
          Bus.$emit("flush",true);
          this.flag=0;
        }else{
          this.user=data.message;
        }
      });
    },
    components:{
      Top,
      Menu,
      Login
    }
  }
</script>

<style>

  #main{
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  #mainhead{
    height: var(--headerheight);
  }
  #mainmid{
    flex:1;
    display:flex;
  }
  #mainmid>.left{
    width: var(--leftwidth);
    border-right:1px solid #eeeeee;
  }
  #mainmid>.right{
    flex: 1;
    background:#ffffff;
    box-shadow: 0 0 2px #eeeeee;
  }
  .login{
    position:absolute;
    width:100%;
    height:100%;
    top:0;
    left:0;
    z-index: 99;
    background: #000000;
    opacity: 0.8;
  }
</style>
