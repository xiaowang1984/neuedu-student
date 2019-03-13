<template>
    <div class="mecontent">
      <div class="line max-height">
        <div class="xl5  max-height fm border-right">
          <h3 style="font-weight: bold;height: 30px;line-height: 30px">个人资料</h3>
          <div style="margin-top:20px;color:#aaa" class="padding-left">
            <div class="text-red">此处需要维护gitHub,如果其他有误,请及时联系班主任</div>
            <form id="fm" onkeydown="if(event.keyCode==13){return false}">
              <div class="line flex-column ">
                <input name="id" type="hidden" :value="entry.id" />
                <div><label>姓名:</label><label class="padding-left">{{entry.name}}</label></div>
                <div><label>学校:</label><label class="padding-left">{{entry.school}}</label></div>
                <div><label>专业:</label><label class="padding-left">{{entry.specialty}}</label></div>
                <div><label>电话:</label><label class="padding-left">{{entry.phone}}</label></div>
                <div><label>身份证号:</label><label class="padding-left">{{entry.idCard}}</label></div>
                <div><label>性别:</label><label class="padding-left" v-if="entry.gender==1">男</label><label v-else>女</label></div>
                <div><label>地址:</label><label class="padding-left">{{entry.address}}</label></div>
                <div><label>专业:</label><label class="padding-left">{{entry.specialty}}</label></div>
                <div><label class="text-black">Github:</label><label class="padding-left"><input class="wyinput" name="git" v-model="entry.git"></label><button class="button bg-main margin-left" type="button" @click="setgit" style="height:26px;line-height:0px;">保存</button></div>
              </div>
            </form>
          </div>
        </div>
        <div class="xl4 max-height fm">
           <div class="top" :style="{background:'url('+topimg+')','background-size':'100% 100%'}"></div>
           <div style="height: 60px;position: relative">
                <img class="img" :src="src" height="80px" width="80px">
           </div>
          <div class="height-large text-center text-big" style="font-weight: bold;color: #FF8130;">{{entry.name}}</div>
          <div class="text-center text-gray height-large" @dblclick="changeflag">个人说明</div>
          <div class="text-center text-gray" v-if="flag" v-html="changehtml(entry.mark)"></div>
          <div v-else class="border padding">
            <form id="markfm" method="post">
              <input name="id" type="hidden" :value="entry.id" />
              <textarea name="mark" class="input" style="border:0;width: 100%;height:200px" cols="10">{{entry.mark}}</textarea>
              <button type="button" class="button button-little bg-main" @click="savemark">保存</button>
            </form>
          </div>
        </div>

      </div>
    </div>
</template>

<script>
    import Bus from '@/components/bus/Session'
    export default {
        name: "MeDetails",
        data(){
          return {
            entry:{},
            topimg:resourcePath+"images/syd.jpg",
            flag:true
          };
        },
        mounted(){
          getData({},path2+"student/getUser",(data)=>{
            if(data.code==-1)
            {
              Bus.$emit("flush",true);
              Bus.$emit("val",0);
            }else{
              this.entry=data;
            }
          });
        },
        computed:{
          src(){
            if(this.entry.img==null||this.entry.img=="")
              return resourcePath+"images/nologin.png"
            else
              return resourcePath+this.entry.img
          }
        },
        methods:{
          setgit(){
               submitForm("fm","student/edit",{},(data)=>{
                 if(data.code==-1){
                   Bus.$emit("flush",false);
                   Bus.$emit("val",0);
                 }
                 else if(data.code==1){
                   alert("保存成功")
                   window.location.reload();
                 }
                 else
                   console.log(data.message);
               });
          },
          changeflag(){
            this.flag=!this.flag;
          },
          savemark(){
            submitForm("markfm","student/edit",{},(data)=>{
              if(data.code==-1){
                Bus.$emit("flush",false);
                Bus.$emit("val",0);
              }
              else if(data.code==1){
                alert("保存成功");
                window.location.reload();
              }
              else
                console.log(data.message);
            });
          },
          changehtml(str){
            if(str!=null)
              return replacen(str);
            else
              return "";
          }
        }
    }
</script>

<style scoped>
  .mecontent{
    height: 100%;
  }

  .fm{
    background: #ffffff;
    padding:20px;
  }
  .wyinput{
    padding:5px;
    padding-left:20px;
    border-radius: 6px;
    border: none;
    background-color: #eeeeee;
  }
  .flex-column div{
    margin-right:30px;
    height:40px;
    line-height:40px;
  }
  .top{
    height:80px;
  }
  .img{
    -webkit-border-radius: 40px;
    -moz-border-radius: 40px;
    border-radius: 40px;
    position: absolute;
    top:-75%;
    left:50%;
    margin-left:-40px;
  }
</style>
