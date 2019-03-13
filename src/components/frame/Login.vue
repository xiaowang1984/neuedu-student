<template>
  <div>
    <div class="container">
      <div class="line bouncein">
        <div class="xs6 xm4 xs3-move xm4-move">
          <div style="height:150px;"></div>
          <div class="media media-y margin-big-bottom">
          </div>
          <form  method="post" id="loginfm">
            <div class="panel loginbox" style="background:#cccccc;">
              <div class="text-center margin-big padding-big-top"><h1>后台管理中心</h1></div>
              <div class="panel-body" style="padding:30px; padding-bottom:10px; padding-top:10px;">
                <div class="form-group">
                  <div class="field field-icon-right">
                    <input type="text" class="input input-big" name="loginId" placeholder="登录账号" data-validate="required:请填写账号" />
                    <span class="icon icon-user margin-small"></span>
                  </div>
                </div>
                <div class="form-group">
                  <div class="field field-icon-right">
                    <input type="password" class="input input-big" name="pwd" placeholder="登录密码" data-validate="required:请填写密码" />
                    <span class="icon icon-key margin-small"></span>
                  </div>
                </div>
                <div style="color:red;font-size: 16px;height: 20px">{{message}}</div>
              </div>
              <div style="padding:30px;"><input @click="login" type="button" class="button button-block bg-main text-big input-big" value="登录"></div>
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
    name: 'Login',
    data () {
      return {
        message:"",
        flush:true
      };
    },
    mounted(){
      var vm = this;
      Bus.$on('flush', (data) => {
        vm.flush = data
      });
    },
    methods:{
      login(){
        var self = this;
        $('#loginfm').ajaxSubmit({
          url:path2+"student/login",
          type:"post",
          async:false,
          dataType:"json",
          xhrFields:{
            withCredentials:true
          },
          success:function(data){
            if(data.code==1) {
                Bus.$emit("val", 1);
              if(self.flush)
                window.location.reload();
            }
            else
              self.message=data.message;
          }
        });

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
