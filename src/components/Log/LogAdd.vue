<template>
    <div class="addwrap">
      <form id="fm">
        <input type="hidden" name="dat" :value="dat">
        <WorkAdd :dat="dat" :wtxt="studentlog.wtxt"></WorkAdd>
        <MoodAdd :dat="dat" :moodcode="studentlog.moodcode" :moodtxt="studentlog.moodtxt"></MoodAdd>
      </form>
    <!--  <Lecturer :dat="dat" :lecturercode="studentlog.lecturercode" :lecturertxt="studentlog.lecturertxt"></Lecturer>
      <Manager :dat="dat" :managercode="studentlog.managercode" :managertxt="studentlog.managertxt"></Manager>-->
    </div>
</template>

<script>
    import { Base64 } from 'js-base64';
    import WorkAdd from '@/components/log/logmodule/workadd'
    import MoodAdd from '@/components/log/logmodule/Moodadd'
    import Lecturer from '@/components/log/logmodule/lecturer'
    import Manager from '@/components/log/logmodule/Manager'
    import Bus from '@/components/bus/Session'
    export default {
        name: "LogAdd",
        data(){
          return {
            studentlog:{}
          }
        },
        computed:{
          dat(){
            return  Base64.decode(this.$route.query.dat);
          },
        },
      mounted(){
        getData({dat:this.dat},path2+"student/getLogOne",(data)=>{
          if(data.code==-1)
          {
            Bus.$emit("flush",true);
            Bus.$emit("val",0);
          }else{
            this.studentlog=data;
          }
        });
        var stardat=getDateByStr(this.dat,'-');
        stardat.setHours(16);
        var endat=dateAdd(getDateByStr(this.dat,'-'),1);
        endat.setHours(2);
        if(stardat>new Date()||endat<new Date()){
           $("textarea").attr("disabled","disabled");
           $("button").hide();
        }
        console.log(endat<new Date());
        console.log(stardat>new Date());
      },
        components:{
          WorkAdd:WorkAdd,
          MoodAdd:MoodAdd,
         /* Lecturer:Lecturer,
          Manager:Manager*/
        },
        methods:{

        }
    }
</script>

<style scoped>

</style>
