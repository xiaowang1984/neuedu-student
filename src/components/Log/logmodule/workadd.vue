<template>
    <div class="wrap">
      <div class="content">
        <div class="top">
          <span class="text-default padding-left" style="font-weight: bold">每日任务总结</span>
        </div>
        <div class="mid border">
            <textarea class="input text-gray" name="wtxt" placeholder="填写内容,请填写每天做了哪些作业，复习了哪些内容，预习了什么，那些作业写的怎样，什么案例写了几遍等，今天学了什么">{{wtxt}}</textarea>
        </div>
        <div class="height">&nbsp;</div>
      </div>
    </div>
</template>

<script>
    import Bus from '@/components/bus/Session'
    export default {
      name: "WorkAdd",
      props: ['dat','wtxt'],
      methods:{
        prev(){
          window.location.href="log";
        }
      }
    }
</script>

<style scoped>

  .wrap{
    background: #eee;
  }
  .wrap .content{
    background: #ffffff;
    padding-left:20px;
  }
  .wrap .content .top{
    height: 49px;
    line-height: 50px;
  }
  .wrap .content .mid{
    padding:30px 30px;
    height:300px;
    border-radius: 10px;
    display: flex;
    flex-direction:column;
  }
  .wrap .content .mid .input{
    background: transparent;
    outline: none;
    border:0;
    flex:1;
  }
  .wrap .content .mid .btn{
      text-align: left;
  }

</style>
