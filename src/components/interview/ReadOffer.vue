<template>
  <div class="il_modal" style="display: flex"  id="read_offer_modal">
    <div class="modal_box">
      <div class="modal_title">
        <h1 class="pull_left">查看/编辑详情</h1>
        <button class="close_btn pull_right" @click="cancel()"></button>
      </div>
      <div class="modal_content">
        <table  class="il_table add_interview">
          <tbody>
          <tr>
            <td>企业名称:</td>
            <td>
              <input type="text" class="none_border_text" list="job-position" placeholder="" v-model="offeredit.cName">
              <datalist id="job-position">
                <option v-for="company in companys">{{company.name}}</option>
              </datalist>

              <a href="#" id="add_company_btn" title="添加公司"></a>
            </td>
          </tr>
          <tr>
            <td>选择岗位:</td>
            <td>
              <select class="select_postion">
                <option v-for="job in jobs" :value="job.id">{{job.name}}</option>
              </select>
              <div class="il_learn_radio_group" style="display: inline-block;">
                <label style="font-size: 12px; margin-left: 2em;">
                  <input  type="checkbox" name="insurance" :checked="offeredit.isSkill==0" @change="changeskill($event)" />
                  非技术岗
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <td>面试渠道:</td>
            <td>
              <div class="il_learn_radio_group">
                <label>
                  <input  type="radio" name="channel" value="1" v-model="offeredit.type" /> 企业内推
                </label>
                <label>
                  <input type="radio" name="channel" value="0"  v-model="offeredit.type"/> 自主寻找
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <td>面试时间:</td>
            <td>
              <div>
                <input class="none_border_text"  type="text" id="read_interview_time" v-model="offeredit.cDate"/>
              </div>
            </td>
          </tr>
          <tr>
            <td>实施经理:</td>
            <td>
              <select class="select_postion" v-model="offeredit.tId">
                <option v-for="teacher in teachers" :value="teacher.id">{{teacher.name}}</option>
              </select>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <div class="salary_box">
                <div class="salary">
                  <label>试用期薪资:</label><input class="none_border_text" placeholder="" type="text" v-model="offeredit.probation" />
                </div>
                <div class="salary">
                  <label>实习薪资:</label><input class="none_border_text" placeholder="" type="text" v-model="offeredit.practice"/>
                </div>
                <div class="salary">
                  <label>转正薪资:</label><input class="none_border_text" placeholder="" type="text" v-model="offeredit.salary" />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>保险:</td>
            <td>
              <div class="il_learn_radio_group">
                <label>
                  <input type="radio" name="insurance" value="1" v-model="offeredit.insurance"/> 三险
                </label>
                <label>
                  <input type="radio" name="insurance" value="2" v-model="offeredit.insurance"/> 五险
                </label>
                <label>
                  <input type="radio" name="insurance" value="3" v-model="offeredit.insurance" /> 六险
                </label>
                <label>
                  <input type="radio" name="insurance" value="0" v-model="offeredit.insurance"/> 无
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <td>公积金:</td>
            <td>
              <div class="il_learn_radio_group">
                <label>
                  <input type="radio" name="fund" value="1" v-model="offeredit.fund" /> 一金
                </label>
                <label>
                  <input type="radio" name="fund" value="2" v-model="offeredit.fund"  /> 补充公积金
                </label>
                <label>
                  <input type="radio" name="fund" value="0" v-model="offeredit.fund"  /> 无
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <td>薪酬期数:</td>
            <td>
              <div class="il_learn_radio_group">
                <label>
                  <input type="radio" name="p_number" value="1" v-model="offeredit.month" /> 12
                </label>
                <label>
                  <input type="radio" name="p_number" value="2"  v-model="offeredit.month"/> 13
                </label>
                <label>
                  <input type="radio" name="p_number" value="3"  v-model="offeredit.month"/> 14
                </label>
                <label>
                  <input type="radio" name="p_number" value="0"  v-model="offeredit.month"/> 其他
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <td>股权期权:</td>
            <td>
              <div class="il_learn_radio_group">
                <label>
                  <input  type="radio" name="option" value="1" v-model="offeredit.stock" /> 有
                </label>
                <label>
                  <input type="radio" name="option" value="0" v-model="offeredit.stock"/> 无
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <td>福利待遇:</td>
            <td>
              <input type="text" style="width: 270px;" class="none_border_text" v-model="offeredit.other"  />
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="modal_footer">
        <div class="pull_right add_view_btn_group">
          <button class="il_btn cancel_view_btn" @click="cancel()">取消</button>
          <button class="il_btn add_view_btn" @click="edit()">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "readoffer",
        data(){
          return {
            id:"",
            companys:[],
            jobs:[],
            offeredit:{},
            teachers:[],
            id:0,
            offerDate:""
          }
        },
        created(){
          this.id=this.$route.query.id;
        },
        mounted(){
          getData({withPage:0,isDel:1},path2+"company/list",(data)=>{
            if(data.code==-1)
            {
              Bus.$emit("flush",true);
              Bus.$emit("val",0);
            }else{
              this.companys=data.list;
            }
          });
          getData({withPage:0,isDel:1},path2+"job/list",(data)=>{
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
          getData({"id":this.id},path2+"employment/edit",(data)=>{
            if(data.code==-1)
            {
              Bus.$emit("flush",true);
              Bus.$emit("val",0);
            }else{
              this.offeredit=data;
            }
          });
        },
        methods:{
          changeskill(e){
            this.offeredit.isSkill=this.offeredit.isSkill==0?1:0;
          },
          cancel(){
            this.$router.go(-1)
          },
          edit(){
            let _self=this;
            $.ajax({
              url:path2+"employment/edit",
              type:"post",
              data:this.offeredit,
              async:false,
              dataType:"json",
              xhrFields:{
                withCredentials:true
              },
              success:function(data){
                if(data.code==1)
                  _self.$router.go(-1)
                else
                  console.log(data.message);
              }
            });
          }
        }
    }
</script>

<style scoped>

</style>
