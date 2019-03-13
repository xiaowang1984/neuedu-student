<template>
  <div class="person_info_container">
    <div class="normal_box student_info">
      <div class="photo_box">
        <img class="photo" :src="photo()" />
        <div class="name-info">
          <span class="name">{{entry.student.name}}</span>
          <p class="motto" >{{entry.student.mark}}</p>
        </div>
      </div>
      <!--<div class="line"></div>-->
      <div class="basic_info_box">
        <div class="info phone-info line1">手机<span class="colon">:</span>{{entry.student.phone}}</div>
        <div class="info major-info line1">专业<span class="colon">:</span>{{entry.student.specialty}}</div>
        <div class="info school-info">学校<span class="colon">:</span>{{entry.student.school}}</div>
        <div class="info edu-background-info">学历<span class="colon">:</span>{{entry.student.education}}</div>
      </div>
    </div>

    <div class="stat_box">
      <div class="stat_content">
        <div id="code_number_chart">

        </div>
      </div>
    </div>
    <div class="stat-list">
      <div class="stat_box">
        <div class="stat_title">
          <div class="top">
            <label class="icon task">任务</label>
            <a class="dot_dot_dot" href="#">
              <div></div>
              <div></div>
              <div></div>
            </a>
          </div>
          <div class="bottom">
            <div class="box_desc">共计{{this.entry.workcount}}次作业</div>
          </div>
        </div>
        <div class="stat_content">
          <div id="task_chart" class="pie">

          </div>
        </div>
        <div class="stat_footer">
          <strong>完成<span>{{this.entry.donecount}}</span>次</strong>
          <strong>代码量：<span>{{this.entry.sumcode}}</span></strong>
        </div>
      </div>
      <div class="stat_box">
        <div class="stat_title">
          <div class="top">
            <label class="icon pen_test">笔试</label>
            <a class="dot_dot_dot" href="#">
              <div></div>
              <div></div>
              <div></div>
            </a>
          </div>
          <div class="bottom">
            <div class="box_desc active">一般考试</div>
            <div class="line"></div>
            <div class="box_desc">阶段考试</div>
          </div>
        </div>
        <div class="stat_content">
          <div id="pen_test_chart" class="pie">

          </div>
        </div>
        <div class="stat_footer">
          <strong>完成<span>8</span>次</strong>
          <strong>平均分：<span>88.9</span></strong>
        </div>
      </div>
      <div class="stat_box">
        <div class="stat_title">
          <div class="top">
            <label class="icon log_card">日志卡</label>
            <a class="dot_dot_dot" href="#">
              <div></div>
              <div></div>
              <div></div>
            </a>
          </div>
          <div class="bottom">
            <div class="box_desc">日志填写率</div>
          </div>
        </div>
        <div class="stat_content">
          <div id="log_rate_chart" class="pie">

          </div>
        </div>
        <div class="stat_footer">
          <strong>心情分数：</strong>
          <strong style="margin-left: -3em;">个人平均：<span>{{avgmoodstudent}}</span></strong>
          <strong>班级平均：<span>{{avgmoodgrade}}</span></strong>
        </div>
      </div>
    </div>

    <div class="stat-list">
      <div class="stat_box">
        <div class="stat_title" style="border: none;">
          <div class="top">
            <label class="icon">上机考试成绩</label>
            <a class="dot_dot_dot" href="#">
              <div></div>
              <div></div>
              <div></div>
            </a>
          </div>
        </div>
        <div class="stat_content">
          <div class="box_tab">
            <img  :src="zonghe()" >
            <div class="chengji">
              <p>综合平均成绩</p>
              <em>{{entry.avgscore}}</em>
            </div>
          </div>
          <div class="box_tab">
            <img  :src="avgclass()" >
            <div class="chengji">
              <p>班级平均成绩</p>
              <em>{{parseInt(entry.avggradescore*100)/100}}</em>
            </div>
          </div>
        </div>
      </div>
      <div class="stat_box">
        <div class="stat_title" style="border: none;">
          <div class="top">
            <label class="icon interview">模拟面试</label>
            <a class="dot_dot_dot" href="#">
              <div></div>
              <div></div>
              <div></div>
            </a>
          </div>
        </div>
        <div class="stat_content">
          <ul class="interview-list">
            <li>
              <p class="left-item">技术平均分</p>
              <strong class="score red">{{parseInt(entry.avginterview.avgskill*100)/100}}</strong>
            </li>
            <li>
              <p class="left-item">表达平均分</p>
              <strong class="score blue">{{parseInt(entry.avginterview.avgexpress*100)/100}}</strong>
            </li>
            <li>
              <p class="left-item">班技术平均分</p>
              <strong class="score yellow">{{parseInt(entry.avggradinterview.avgskill*100)/100}}</strong>
            </li>
            <li>
              <p class="left-item">班表达平均分</p>
              <strong class="score blue">{{parseInt(entry.avggradinterview.avgexpress*100)/100}}</strong>
            </li>
          </ul>
        </div>

      </div>
    </div>

    <div class="stat-list">
      <div class="stat_box" id="interview-card">
        <div class="stat_title">
          <div class="top">
            <label class="icon">面试卡</label>
            <a class="dot_dot_dot" href="#">
              <div></div>
              <div></div>
              <div></div>
            </a>
          </div>
        </div>
        <div class="stat_content">
          <div class="company_history">
            <div class="content">
              <table class="company_list_table">
                <thead>
                <tr>
                  <th style="width: 550px;">公司名称</th>
                  <th style="width: 300px;">岗位</th>
                  <th style="width: 220px;">面试渠道</th>
                  <th style="width: 200px;">时间</th>
                </tr>
                </thead>
                <tbody>
                  <tr v-for="employment in entry.employmentlist">
                    <td>
                      <span class="active">
                           {{employment.cName}}
                      </span>
                      <i v-if="employment.offer==1" class="il_icon offer"></i>
                      <i v-if="employment.choice==1" class="il_icon go"></i>
                    </td>
                    <td>{{jobName(employment.jId)}}</td>
                    <td>
                      <span v-if="employment.type==1">企业内推</span>
                      <span v-else>自主寻找</span>
                    </td>
                    <td>{{employment.cDate}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import Bus from '@/components/bus/Session'
  export default {
        name: "statistics",
        data(){
          return {
            entry:{}
          }
        },
        computed:{
          avgmoodgrade(){
            return parseInt(this.entry.avgmood*100)/100
          },
          avgmoodstudent(){
            var sum=0;
            var count=0;
            for(var i=0;i<this.entry.moodlist.length;i++){
              sum+=this.entry.moodlist[i].moodcode;
              count++;
            }
            return  parseInt(sum/count*100)/100;
          }
        },
        created(){
          getData({},path2+"student/studentReport",(data)=>{
            if(data.code==-1)
            {
              Bus.$emit("flush",true);
              Bus.$emit("val",0);
            }else{
              this.entry=data;
            }
          });
        },
        mounted(){
          console.log(this.entry);
          var chart = new il_chart();
          var date =this.entry.dates;
          var class_data = [];
          var stu_data = [];
          for(var i=0;i<this.entry.stuCode.length;i++){
            class_data.push(parseInt(this.entry.stuCode[i].avgcode));
            stu_data.push(this.entry.stuCode[i].code);
          }
          //代码量
          chart.init_code_number("code_number_chart",date, class_data, stu_data);
          var finished_data = 300;
          var total_data = 380;
          chart.task_chart("task_chart",this.entry.donecount,this.entry.workcount)

          chart.pen_test_chart("pen_test_chart",finished_data,total_data)

          chart.log_rate_chart("log_rate_chart",this.entry.moodlist.length,this.entry.summood)


        },
        methods:{
          photo(){
            return resourcePath+"img/photo.png"
          },
          zonghe(){
            return resourcePath+"img/zonghe.png"
          },
          avgclass(){
            return resourcePath+"img/avg_class.png"
          },
          jobName(jid){
            for(var i=0;i<this.entry.joblist.length;i++){
              if(this.entry.joblist[i].id==jid)
                return this.entry.joblist[i].name
            }
          }
        }
    }
</script>

<style scoped>
  .left-item{
    line-height: 70px;
  }
</style>
