<template>
  <div class="wrap">
    <div class="content">
      <div class="top">
        <div class="text" style="font-weight: bold">
          <button class="button bg-blue" style="width:100%;text-align: left">讲师</button>
        </div>
        <div class="img">
          <ul class="search" style="padding-left:10px;">
            <li>
              <div class="left" >
                <img v-if="lecturercode==1" @click="lecturercode=0"  src="http://47.94.95.151:8080/images/pijiu.png"/>
                <img v-else @click="lecturercode=1"   src="http://47.94.95.151:8080/images/pijiuo.png"/>
              </div>
              <div class="right">
                <span :class="{selected:lecturercode==1}">&nbsp;&nbsp;哈一杯</span>
              </div>
            </li>
            <li>
              <div class="left" >
                <img v-if="lecturercode==2" @click="lecturercode=0"  src="http://47.94.95.151:8080/images/kafei.png"/>
                <img v-else @click="lecturercode=2"   src="http://47.94.95.151:8080/images/kafeio.png"/>
              </div>
              <div class="right">
                <span :class="{selected:lecturercode==2}">&nbsp;&nbsp;哈咖啡</span>
              </div>
            </li>
            <li>
              <div class="left" >
                <img v-if="lecturercode==3" @click="lecturercode=0"  src="http://47.94.95.151:8080/images/jiangpai.png"/>
                <img v-else @click="lecturercode=3"   src="http://47.94.95.151:8080/images/jiangpaio.png"/>
              </div>
              <div class="right">
                <span :class="{selected:lecturercode==3}">&nbsp;&nbsp;送奖牌</span>
              </div>
            </li>
            <li>
              <div class="left" >
                <img v-if="lecturercode==4" @click="lecturercode=0"  src="http://47.94.95.151:8080/images/dianzan.png"/>
                <img v-else @click="lecturercode=4"   src="http://47.94.95.151:8080/images/dianzano.png"/>
              </div>
              <div class="right">
                <span :class="{selected:lecturercode==4}">&nbsp;&nbsp;爱你呦</span>
              </div>
            </li>
            <li>
              <div class="left" >
                <img v-if="lecturercode==5" @click="lecturercode=0"  src="http://47.94.95.151:8080/images/liwu.png"/>
                <img v-else @click="lecturercode=5"   src="http://47.94.95.151:8080/images/liwuo.png"/>
              </div>
              <div class="right">
                <span :class="{selected:lecturercode==5}">&nbsp;&nbsp;送礼物</span>
              </div>
            </li>
            <li>
              <div class="left" >
                <img v-if="lecturercode==6" @click="lecturercode=0"  src="http://47.94.95.151:8080/images/xianhua.png"/>
                <img v-else @click="lecturercode=6"   src="http://47.94.95.151:8080/images/xianhuao.png"/>
              </div>
              <div class="right">
                <span :class="{selected:lecturercode==6}">&nbsp;&nbsp;送发发</span>
              </div>
            </li>
            <li>
              <div class="left" >
                <img v-if="lecturercode==7" @click="lecturercode=0"  src="http://47.94.95.151:8080/images/zhadan.png"/>
                <img v-else @click="lecturercode=7"   src="http://47.94.95.151:8080/images/zhadano.png"/>
              </div>
              <div class="right">
                <span :class="{selected:lecturercode==7}">&nbsp;&nbsp;雷一下</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="mid">
        <form id="fm3">
          <input type="hidden" name="lecturercode" :value="lecturercode">
          <input type="hidden" name="dat" :value="dat">
          <textarea class="input" name="lecturertxt" placeholder="可以向老师道一声辛苦，一句日常问候，可以寻求帮助或解惑，也可以吐槽哦">{{lecturertxt}}</textarea>
          <div class="btn">
            <button class="button border-sub" type="button" @click="cli">提交</button>
            <button class="button border-mix">取消</button>
          </div>
        </form>
      </div>
      <div class="bottom"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Lecturer",
    props: ['dat','lecturercode','lecturertxt'],
    data(){
      return {

      };
    },
    methods:{
      cli(){
        var self = this;
        $('#fm3').ajaxSubmit({
          url:path2+"student/logsave",
          type:"post",
          async:false,
          dataType:"json",
          xhrFields:{
            withCredentials:true
          },
          success:function(data){
            if(data.code==1)
              window.location.reload();
            else
              console.log(data.message);
          }
        });

      }
    }
  }
</script>

<style scoped>
  .selected{
    font-weight: bold;
  }
  .wrap{
    background: #eee;
  }
  .wrap .content{
    background: #ffffff;
    padding:0 30px;
    padding-top:20px;
  }
  .wrap .content .top{
    font-size: 16px;
    display: flex;
    flex-direction:column;
  }
  .wrap .content .top .text{
    height:40px;
    line-height: 40px;
  }
  .wrap .content .top .img{
    flex:1
  }
  .wrap .content .top .img .search li{
    margin-right: 20px;
    display: flex;
  }
  .wrap .content .top .img .search li div{
  }
  .wrap .content .top .img .search li .left{
    width:33px;
  }
  .wrap .content .top .img .search li .left img{
    cursor: pointer;
    margin-top: 10px;
    vertical-align: middle;
  }
  .wrap .content .top .img .search li .right{
    line-height:60px;
    font-size:14px;
    flex:1;
  }
  .wrap .content .mid{
    margin-top:15px;
    padding:30px 30px;
    height:260px;
    background: #eee;
    border-radius: 10px;

  }
  .wrap .content .mid #fm3{
    height: 100%;
    display: flex;
    flex-direction:column;
  }
  .wrap .content .mid .input{
    background: transparent;
    outline: none;
    border:0;
    font-size:16px;
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
