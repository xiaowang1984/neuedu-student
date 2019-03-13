<template>
  <div class="body-content" id="app" v-cloak>
    <form method="post" class="form-x" id='fm'>
      <input type="hidden" name="id"  />
      <div class="form-group">
        <div class="label">
          <label>原密码：</label>
        </div>
        <div class="field">
          <input type="password"  autocomplete="off"  class="input w50" name="opassword" :data-validate="validate" />
          <div class="tips"></div>
        </div>
      </div>
      <div class="form-group">
        <div class="label">
          <label>新密码：</label>
        </div>
        <div class="field">
          <input type="password"  autocomplete="off" class="input w50" name="password" data-validate="required:请输入新密码" />
          <div class="tips"></div>
        </div>
      </div>
      <div class="form-group">
        <div class="label">
          <label>确认新密码：</label>
        </div>
        <div class="field">
          <input type="password"  autocomplete="off" class="input w50" name="cpassword" data-validate="required:请重复输入新密码,repeat#password:两次新密码不一致" />
          <div class="tips"></div>
        </div>
      </div>
      <div class="form-group">
        <div class="label">
          <label></label>
        </div>
        <div class="field">
          <button class="button bg-main icon-check-square-o" type="button" @click="submit" > 提交</button>
        </div>
      </div>
    </form>
  </div>

</template>

<script>
    import Bus from '@/components/bus/Session'
    export default {
        name: "Password",
        computed:{
          validate:function(){
            return "required:请输入原密码,ajax#checkstupwd?password=:密码不正确";
          }
        },
        methods:{
          submit(){
            submitForm("fm","changeStuPwd",{},(data)=>{
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
</script>

<style scoped>

</style>
