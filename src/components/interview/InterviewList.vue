<template>
    <div>
      <div class="content-container" style="width: 100%">
        <div class="top_area">
          <h1 class="title">面试</h1>
          <div class="btn_area">
            <button id="add_interview_btn" class="il_btn add_btn">新 建</button>
          </div>
        </div>
        <table class="il_table hover_table">
          <thead>
          <tr >
            <th>时间</th>
            <th>公司名称</th>
            <th>岗位</th>
            <th>推荐方式</th>
            <th>OFFER</th>
            <th>最终去向</th>
            <th></th>
          </tr>
          </thead>
          <tbody id="interview_list">
            <tr v-for="employment in employments">
              <td>{{employment.cDate}}</td>
              <td>{{employment.cName}}</td>
              <td>{{getJobName(employment.jId)}}</td>
              <td>
                <span v-if="employment.type==1">企业推荐</span>
                <span v-else>自主寻找</span>
              </td>
              <td>
                <template v-if="employment.offer==1">
                  <a href="javascript:void(0)" @click="read(employment.id)">查阅</a>
                </template>
                <template v-else>
                  <a href="javascript:void(0)" @click="edit(employment.id)" class="add_link add_offer_link">添加</a>
                </template>
              </td>
              <td class="go_direction">
                <template v-if="employment.choice==0">
                  <label class="il_self_radio pointer" @click="check(employment.id)"></label>
                </template>
                <template v-else>
                  <label class="il_self_radio active pointer" >
                    <label class="set_time_input" @click="setTime(employment.id)">设置时间</label>
                  </label>
                </template>
              </td>
              <td>
                <template v-if="employment.choice==1">
                  <span style="font-size:12px">{{employment.offerDate}}</span>
                </template>

              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="il_modal" id="add_interview_modal">
        <div class="modal_box">
          <form id="add" method="post">
            <div class="modal_title">
              <h1 class="pull_left">新增面试</h1>
              <button class="close_btn pull_right"></button>
            </div>
            <div class="modal_content">
              <table  class="il_table add_interview">
                <tbody>
                <tr>
                  <td>企业名称:</td>
                  <td>
                    <input type="text" name="cName" autocomplete="off" class="none_border_text" list="job-position" placeholder="" id="cName">
                    <datalist id="job-position">
                      <option v-for="company in companys">{{company.name}}</option>
                    </datalist>
                  </td>
                </tr>
                <tr>
                  <td>面试渠道:</td>
                  <td>
                    <div class="il_learn_radio_group">
                      <label>
                        <input type="radio" name="type" value="1" /> 企业内推
                      </label>
                      <label>
                        <input type="radio" name="type" value="0" /> 自主寻找
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>面试时间:</td>
                  <td>
                    <div>
                      <input class="none_border_text" type="text" name="cDate" id="interview_time"/>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="modal_footer">
              <div class="pull_right add_view_btn_group">
                <button  type="reset" class="il_btn cancel_view_btn">取消</button>
                <button @click="add" type="button" class="il_btn add_view_btn">确定</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <!--设置日期-->
      <div class="il_modal" id="set_offer_time_modal">
        <form id="timeform" method="post">
          <div class="modal_box">
            <div class="modal_title">
              <h1 class="pull_left">设置时间</h1>
              <button class="close_btn pull_right"></button>
            </div>
            <div class="modal_content">
              <table  class="il_table add_interview">
                <tbody>
                <tr>
                  <td>设置时间:</td>
                  <td>
                    <input type="text" name="offerDate" class="none_border_text" id="add_offer_time_box">
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="modal_footer">
              <div class="pull_right add_view_btn_group">
                <button type="button" class="il_btn cancel_view_btn">取消</button>
                <button type="button" id="add_offer_time_btn" @click="submitoffertime()" class="il_btn add_view_btn">确定</button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="il_modal" id="add_offer_modal">
        <form id="update" method="post">
          <div class="modal_box">
            <div class="modal_title">
              <h1 class="pull_left">新增 offer</h1>
              <button class="close_btn pull_right"></button>
            </div>
            <div class="modal_content">
              <table  class="il_table add_interview">
                <tbody>
                <tr>
                  <td>企业名称:</td>
                  <td>
                    <input type="text" class="none_border_text" readonly="readonly" :value="offeredit.cName" placeholder="">
                    <input type="hidden" :value="offeredit.id" name="id">
                    <input type="hidden" value="1" name="offer">
                    <!--<a href="#" id="add_company_btn" title="添加公司"></a>-->
                  </td>
                </tr>
                <tr>
                  <td>实施经理:</td>
                  <td>
                    <select class="select_postion" name="tId">
                      <option v-for="teacher in teachers" :value="teacher.id">{{teacher.name}}</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <div class="salary_box">
                      <div class="salary">
                        <label>试用期薪资:</label><input name="probation" :value="offeredit.probation" class="none_border_text" placeholder="" type="text" />
                      </div>
                      <div class="salary">
                        <label>实习薪资:</label><input name="practice" :value="offeredit.practice" class="none_border_text" placeholder="" type="text" />
                      </div>
                      <div class="salary">
                        <label>转正薪资:</label><input name="salary" :value="offeredit.salary" class="none_border_text" placeholder="" type="text" />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>保险:</td>
                  <td>
                    <div class="il_learn_radio_group">
                      <label>
                        <input type="radio" name="insurance" value="1" /> 三险
                      </label>
                      <label>
                        <input type="radio" name="insurance" value="2"/> 五险
                      </label>
                      <label>
                        <input type="radio" name="insurance" value="3"/> 六险
                      </label>
                      <label>
                        <input type="radio" name="insurance" value="0" /> 无
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>公积金:</td>
                  <td>
                    <div class="il_learn_radio_group">
                      <label>
                        <input type="radio" name="fund" value="1" /> 一金
                      </label>
                      <label>
                        <input type="radio" name="fund" value="0" /> 无
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>薪酬期数:</td>
                  <td>
                    <div class="il_learn_radio_group">
                      <label>
                        <input type="radio" name="month" value="1" /> 12
                      </label>
                      <label>
                        <input type="radio" name="month" value="2"/> 13
                      </label>
                      <label>
                        <input type="radio" name="month" value="3"/> 14
                      </label>
                      <label>
                        <input type="radio" name="month" value="0"/> 其他
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>股权期权:</td>
                  <td>
                    <div class="il_learn_radio_group">
                      <label>
                        <input type="radio" name="stock" value="1" /> 有
                      </label>
                      <label>
                        <input type="radio" name="stock" value="0" /> 无
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>福利待遇:</td>
                  <td>
                    <input type="text" style="width: 270px;" name="other" class="none_border_text"  />
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="modal_footer">
              <div class="pull_right add_view_btn_group">
                <button type="reset" class="il_btn cancel_view_btn">取消</button>
                <button @click="update()" type="button" class="il_btn add_view_btn">确定</button>
              </div>
            </div>
          </div>
        </form>
      </div>

    </div>
</template>

<script>
  import Bus from '@/components/bus/Session'
    export default {
      name: "interview",
      data(){
        return {
          companys:[],
          jobs:[],
          employments:[],
          offeredit:{
            cName: "",
            choice: 0,
            fund: 0,
            id: 0,
            insurance: 0,
            isDel: 1,
            isSkill: 1,
            jId: 1,
            month: 1,
            offer: 0,
            other: 0,
            practice: 0,
            probation: 0,
            sId: 0,
            salary: 0,
            stock: 0,
            tId: 0,
            type: 1
          },
          teachers:[],
          id:0,
          offerDate:""
        }
      },
      created(){
        getData({withPage:0,isDel:1},path2+"company/list",(data)=>{
          if(data.code==-1)
          {
            Bus.$emit("flush",true);
            Bus.$emit("val",0);
          }else{
            this.companys=data.list;
          }
        });
        getData({withPage:0,isDel:1,is_type:0},path2+"job/list",(data)=>{
          if(data.code==-1)
          {
            Bus.$emit("flush",true);
            Bus.$emit("val",0);
          }else{
            this.jobs=data.list;
          }
        });
        getData({withPage:0,isDel:1,type:3},path2+"teacher/list",(data)=>{
          if(data.code==-1)
          {
            Bus.$emit("flush",true);
            Bus.$emit("val",0);
          }else{
            this.teachers=data.list;
          }
        });
        getData({},path2+"employment/list",(data)=>{
          if(data.code==-1)
          {
            Bus.$emit("flush",true);
            Bus.$emit("val",0);
          }else{
            this.employments=data;
          }
        });
      },
      mounted(){
        var il_modal = (function(){
          function il_modal(modal_id){
            var self = this;
            this.modal = document.getElementById(modal_id);

            var closeBtn = document.querySelector("#"+ modal_id +" .modal_title .close_btn");
            closeBtn.addEventListener("click",function(e){
              e.preventDefault();
              self.hide();
            })

            document.querySelector("#"+modal_id + " .cancel_view_btn").addEventListener('click',function(){
              interview_modal.hide();
            })
          }
          /**
           * 显示模态框
           */
          il_modal.prototype.show = function(){
            this.modal.style.display = "flex";
          }

          /**
           * 隐藏模态框
           */
          il_modal.prototype.hide = function(){
            this.modal.style.display = "none";
          }

          return il_modal;
        }());
        var interview_modal = new il_modal("add_interview_modal");
        var offer_modal = new il_modal("add_offer_modal");
        var set_offertime_modal = new il_modal("set_offer_time_modal");
        //设置offer时间
        var setTimeEles = document.querySelectorAll(".set_time_input");
        //绑定设置offer时间点击事件
        for(let i = 0; i < setTimeEles.length; i++) {
          setTimeEles[i].addEventListener('click',function(e){
            e.stopPropagation();
            var target = e.target;
            set_offertime_modal.show();
            document.getElementById("add_offer_time_btn").addEventListener('click',function(){
              var t_date = document.getElementById("add_offer_time_box").value;
              if(t_date) {
                var eles = document.getElementsByClassName(target.className);
                for(let j = 0; j < eles.length; j++) {
                  eles[j].innerText = "设置时间";
                }
                target.innerText = t_date;
              }
              set_offertime_modal.hide();
            })
          });
        }
        document.querySelector("#add_interview_btn").addEventListener('click',function(e){
          e.preventDefault();
          interview_modal.show();
        })

      if( document.querySelector(".add_offer_link")){
          $(".add_offer_link").click(function(e){
            e.preventDefault();
            offer_modal.show();
          });
        }


       /* //绑定单击事件
        var radios = document.querySelectorAll("#interview_list td .il_self_radio");
        for(let i = 0; i < radios.length; i++) {
          var radio = radios[i];
          radio.addEventListener('click',singleSelect);
        }
        //控制单选
        function singleSelect(e){
          var radios = document.querySelectorAll("#interview_list td .il_self_radio");
          for(let i = 0; i < radios.length; i++) {
            var radio = radios[i];
            radio.className = "il_self_radio";
          }
          e.target.className += " active";
        }*/
        //日期控件，添加面试时间
        laydate({
          elem: document.getElementById("interview_time")
        });
        // 日期控件，添加offer去向时间
        laydate({
          elem: document.getElementById("add_offer_time_box")
        });

      },
      methods:{
        add(){
          var self = this;
          // 表单验证
          let cName = document.getElementById("cName").value;
          let interviewTime = document.getElementById("interview_time").value;
          if ((cName.trim() === null || cName.trim() === '') && (interviewTime.trim() === null || interviewTime.trim() === '')) {
            alert('时间和企业名为必填项');
          } else {
            $('#add').ajaxSubmit({
              url:path2+"employment/add",
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

        },
        getJobName(id){
          for(var i=0;i<this.jobs.length;i++){
            if(id==this.jobs[i].id)
              return this.jobs[i].name;
          }
        },
        edit(id){
          getData({"id":id},path2+"employment/edit",(data)=>{
            if(data.code==-1)
            {
              Bus.$emit("flush",true);
              Bus.$emit("val",0);
            }else{
              this.offeredit=data;
            }
          });
        },
        update(){
          var self = this;
          $('#update').ajaxSubmit({
            url:path2+"employment/edit",
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
        },
        check(id){
          if(confirm("是否确定该企业为最终去向?")){
            getData({"id":id},path2+"employment/check",(data)=>{
              if(data.code==-1)
              {
                Bus.$emit("flush",true);
                Bus.$emit("val",0);
              }else{
                window.location.reload();
              }
            });
          }
        },
        setTime(id){
          this.id=id;
        },
        submitoffertime(){
          var self = this;
          $('#timeform').ajaxSubmit({
            url:path2+"employment/edit",
            type:"post",
            data:{id:this.id},
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
        },
        read(id){
          this.$router.push("/readoffer?id="+id);
        }
      }
    }
</script>

<style scoped>
  .pointer{
    cursor:pointer;
  }
</style>
