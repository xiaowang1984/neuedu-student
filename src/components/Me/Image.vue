<template>
  <div class="mecontent">
    <div class="line max-height">
      <div class="xl5  max-height fm ">
        <h3 style="font-weight: bold;height: 30px;line-height: 30px">上传头像</h3>
        <div style="margin-top:20px;color:#aaa" class="padding-left">
          <form id="fm" enctype="multipart/form-data">
            <div class="line">
              <input name="id" type="hidden" :value="entry.id" />
              <div class="xl3" >
                <img ref="upimg" :src="src" width="80" height="80">
              </div>
              <div class="xl3" style="line-height: 80px;" >
                <button type="button" @click="liulan()" class="button bg-blue " id="image1">浏览图片</button>
                <input name="upfile" type="file" class="hidden" ref="findimg" @change="yulan($event)">
              </div>
              <div class="xl2" style="line-height: 80px;"><button class="button button-little bg-main" @click="submit" type="button">保存</button></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Bus from '@/components/bus/Session'
  export default {
    name: "imagevue",
    data(){
      return {
          entry:{},
          src:"",
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
          if(this.entry.img==null||this.entry.img=="")
            this.src= resourcePath+"images/nologin.png"
          else
            this.src=  resourcePath+this.entry.img
        }
      });
    },
    methods:{
      liulan(){
        this.$refs.findimg.click();
      },
      yulan(ev){
        var _self=this;
        var fr=new FileReader();
        fr.onload=function(e){
          _self.src=e.target.result;
        }
        fr.readAsDataURL(ev.target.files[0]);
      },
      submit(){
       if(this.$refs.findimg.value==""){
         alert("未选择任何图片");
       }else{
         submitForm("fm","student/upimg",{},(data)=>{
           if(data.code==-1){
             Bus.$emit("flush",false);
             Bus.$emit("val",0);
           }
           else if(data.code==1)
             window.location.reload();
           else
             console.log(data.message);
         });
       }
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
    height:60px;
    line-height:60px;
  }
</style>
