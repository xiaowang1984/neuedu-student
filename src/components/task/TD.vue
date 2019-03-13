<template>
    <div class="tdcontent padding">
      <h4 class="height-large bold" style="cursor:pointer" @click="details()">{{md(entry.startDat)}}-{{md(entry.endDat)}}</h4>
      <div>
        <span v-if="entry.level>=1"  class="icon-star text-yellow text-big"></span>
        <span v-else  class="icon-star-o text-big"></span>
        <span v-if="entry.level>=2"  class="icon-star text-yellow text-big"></span>
        <span v-else  class="icon-star-o  text-big"></span>
        <span v-if="entry.level>=3"class="icon-star text-yellow text-big"></span>
        <span v-else  class="icon-star-o text-big"></span>
        <span v-if="entry.level>=4"  class="icon-star text-yellow text-big"></span>
        <span v-else  class="icon-star-o  text-big"></span>
        <span v-if="entry.level>=5" class="icon-star text-yellow text-big"></span>
        <span v-else  class="icon-star-o  text-big"></span>
      </div>
      <div class="tdline height-big">
        <div>
          <img :src="img('images/gitname.png')">
        </div>
        <div style="flex: 1;">
          作业编号
        </div>
        <div style="width:100px;text-align: right;font-weight: bold;font-size: 14px">
          {{entry.name}}
        </div>
      </div>
      <div class="tdline height-big">
        <div>
          <img :src="img('images/projectname.png')">
        </div>
        <div style="flex: 1;">
          作业名称
        </div>
        <div style="width:100px;text-align: right;font-weight: bold;font-size: 14px">
          {{entry.extend}}
        </div>
      </div>
      <div class="tdline height-big">
        <div>
          <img :src="img('images/code.png')">
        </div>
        <div style="flex: 1;">
          个人代码量
        </div>
        <div style="width:100px;text-align: right;font-weight: bold;font-size: 14px">
          {{codes(entry.workstudents)}}
        </div>
      </div>
      <div class="tdline height-big">
        <div>
          <img :src="img('images/avg.png')">
        </div>
        <div style="flex: 1;">
          班级平均代码量
        </div>
        <div style="width:100px;text-align: right;font-weight: bold;font-size: 14px">
          {{avg}}
        </div>
      </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import layer from 'vue-layer';
    import Description from '@/components/task/Description'
    Vue.prototype.$layer = layer(Vue);
    export default {
      name: "TD",
      props:{
        entry:Object
      },
      data(){
        return {
        }
      },
      mounted(){

      },
      computed:{
        avg(){
          var sum=0;
          var count=0;
          if(this.entry.workgrade.length==0){
            return 0;
          }else{
            for(var i=0;i<this.entry.workgrade.length;i++){
             sum+= (this.entry.workgrade[i].adds-this.entry.workgrade[i].dels)/this.entry.workgrade[i].stucount;
             count++;
            }
          }
          return parseInt(sum/count);
        }
      },
      methods:{
        md(dat){
         var result= dat.split("-");
         return result[1]+"."+result[2];
        },
        img(str){
          return resourcePath+str;
        },
        codes(workstudents){
          var result=0;
          for(var i=0;i<workstudents.length;i++){
            result+=workstudents[i].adds;
            result-=workstudents[i].dels;
          }
          return result;
        },
        details(){
          var description=this.entry.description;

          this.$layer.iframe({
            content: {
              content: Description, //传递的组件对象
              parent: this,//当前的vue对象
              data:{
                description:this.entry.description
              }//props
            },
            area:['800px','600px'],
            title:'功能和要求'
          });
        }
      }
    }
</script>

<style scoped>
   .tdcontent{
     position: relative;
   }
   .details{
     position: absolute;
     left:0px;
     transition: 1s;
     margin-top: 20px;
     display: none;
   }
   .tdline{
    display: flex;
    padding:5px 0px;
    color:#999999;
  }
   .tdline>div:nth-child(2){
     padding:0px 5px;
   }
   .tdline img{
    width: 24px;
    height:24px;
  }

</style>
