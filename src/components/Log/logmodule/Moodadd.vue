<template>
    <div class="wrap">
      <div class="content">
        <div class="top">
          <div class="text text-default padding-left" style="font-weight: bold">晒心情</div>
          <div class="img">
            <ul class="search" style="padding-left:10px;">
              <li :class="{selected1:moodcode==1}">
                <div class="left" >
                  <img v-if="moodcode==1" @click="moodcode=0"  src="http://47.94.95.151:8080/images/yun.png"/>
                  <img v-else @click="moodcode=1"   src="http://47.94.95.151:8080/images/yuno.png"/>
                </div>
                <div class="right">
                  <div style="font-weight: bold">晕</div>
                  <div>要崩溃</div>
                </div>
              </li>
              <li :class="{selected2:moodcode==2}">
                <div class="left">
                  <img v-if="moodcode==2" @click="moodcode=0"  src="http://47.94.95.151:8080/images/jianqiang.png"/>
                  <img v-else @click="moodcode=2"   src="http://47.94.95.151:8080/images/jianqiango.png"/>
                </div>
                <div class="right">
                  <div style="font-weight: bold">坚强</div>
                  <div>加油挺过去</div>
                </div>
              </li>
              <li :class="{selected3:moodcode==3}">
                <div class="left">
                  <img v-if="moodcode==3" @click="moodcode=0"  src="http://47.94.95.151:8080/images/haihao.png"/>
                  <img v-else @click="moodcode=3"   src="http://47.94.95.151:8080/images/haihaoo.png"/>
                </div>
                <div class="right">
                  <div style="font-weight: bold">还好</div>
                  <div>还需要多练习</div>
                </div>
              </li>
              <li :class="{selected4:moodcode==4}">
                <div class="left">
                  <img v-if="moodcode==4" @click="moodcode=0"  src="http://47.94.95.151:8080/images/zan.png"/>
                  <img v-else @click="moodcode=4"   src="http://47.94.95.151:8080/images/zano.png"/>
                </div>
                <div class="right">
                  <div style="font-weight: bold">赞</div>
                  <div>理解无压力</div>
                </div>
              </li>
              <li :class="{selected5:moodcode==5}">
                <div class="left">
                  <img v-if="moodcode==5" @click="moodcode=0"  src="http://47.94.95.151:8080/images/easy.png"/>
                  <img v-else @click="moodcode=5"   src="http://47.94.95.151:8080/images/easyo.png"/>
                </div>
                <div class="right">
                  <div style="font-weight: bold">SO EASY</div>
                  <div>求老师虐</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="mid border">
          <input type="hidden" name="moodcode" :value="moodcode">
          <textarea class="input text-gray" name="moodtxt" placeholder="可以说说你今天的感受，做作业的心情，激动、苦闷、紧张、高兴等，留下你的小心情吧">{{moodtxt}}</textarea>
          <div class="btn">
            <button class="button bg-main button-little" type="button" @click="cli">提交</button>
            <button class="button bg-main button-little" type="reset">取消</button>
          </div>
        </div>
        <div class="bottom"></div>
      </div>
    </div>
</template>

<script>
    import Bus from '@/components/bus/Session'
    export default {
      name: "MoodAdd",
      props: ['dat','moodcode','moodtxt'],
      data(){
        return {

        };
      },
      methods:{
        cli(){
          var self = this;
          if(this.moodcode==0){
            alert("请选择心情")
          }else{
            $('#fm').ajaxSubmit({
              url:path2+"student/logsave",
              type:"post",
              async:false,
              dataType:"json",
              xhrFields:{
                withCredentials:true
              },
              success:function(data){
                if(data.code==-1){
                  Bus.$emit("flush",false);
                  Bus.$emit("val",0);
                }
                else if(data.code==1){
                  alert("保存完成");
                  window.location.reload();
                }
                else
                  console.log(data.message);
              }
            });
          }

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
    display: flex;
    flex-direction:column;
  }
  .wrap .content .top .text{
    height:40px;
    line-height: 40px;
  }
  .wrap .content .top .img{
    flex:1;

  }
  .wrap .content .top .img .search li{
    margin-right: 40px;
    display: flex;
  }
  .wrap .content .top .img .search li div{
    line-height: 50px;
  }
  .wrap .content .top .img .search li .left{
    width:33px;
  }
  .wrap .content .top .img .search li .left img{
    width:20px;
    height:30px;
    cursor: pointer;
    vertical-align: middle;
  }
  .wrap .content .top .img .search li .right{
    flex:1;
    display: flex;
    flex-direction: column;
  }
  .wrap .content .top .img .search li .right div{
    flex:1;
    line-height:25px;
  }
  .wrap .content .mid{
    margin-top:15px;
    padding:30px 30px;
    height:260px;
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
  .wrap .content .bottom{
    height:30px;
    border-bottom: 1px solid #ccc;
  }
</style>
