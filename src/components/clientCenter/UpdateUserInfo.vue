<template>
  <div class="updateUserinfo">
    <el-card>
      <el-form :inline="true"
      status-icon
      :model="userinfo"
      label-width="80px"
      :rules="updateInfoRules"

      style="text-align: left;color: #999999;
      font-size: 14px;
      font-family: '\5b8b\4f53';"
      ref="updateInfoForm">
      	<el-form-item label="用户名" prop="username">
      		<el-input v-model="userinfo.username" disabled placeholder="请输入用户名"  auto-complete="off" ></el-input>
      	</el-form-item>
        <br />
      	<el-form-item label="微信号" prop="wechat_id" >
          <span style="padding-left: 10px;">{{this.userinfo.wechat_id}}</span>
        </el-form-item>
        <br />
      	<el-form-item label="手机号" prop="phone" >
      		<el-input v-model="userinfo.phone" placeholder="请输入手机号" :disabled="this.disabledObj.phone" auto-complete="off"></el-input>
      	</el-form-item>
      </el-form>
      <div style="padding: 50px 30px; width: 100%;height: 100px;">
        <el-button v-if="this.updateState=='change'" type="info" size="mini" @click="updateUserinfo">修改</el-button>
        <el-button v-if="this.updateState=='save'" type="success" size="mini" @click="saveUserinfo">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  import Vue from 'vue';
  export default{
    data(){
      return{
        userinfo:{},
        userinfoCopy:{},
        disabledObj:{
          phone: true,
        },
        updateInfoRules:{
          phone:[
            { required: true, message: "请输入手机号", trigger: "blur" },
            {pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
            message: '请输入正确的手机号', trigger: 'blur'}
          ],

        },
        updateState: 'change',
      }
    },
    created(){
      this.setUserinfo();
    },
    methods:{
      setUserinfo(){
        this.userinfo = JSON.parse(sessionStorage.getItem('user'));
        this.userinfoCopy = JSON.parse(sessionStorage.getItem('user'));
      },
      updateUserinfo(){
          this.disabledObj.phone = false;

        console.log(this.disabledObj);
        this.updateState = 'save';
      },
      saveUserinfo(){
        this.$refs.updateInfoForm.validate(valid => {
          if(valid){
            this.$confirm('确认修改信息？', '提示', {
              showClose: false,
              right: true
            }).then(() => {
              var avaliable = false;
              let client = {
                clientid:this.userinfo.clientid,
              };
              if(this.userinfo.phone!=this.userinfoCopy.phone){
                client.phone = this.userinfo.phone;
                avaliable = true;
              }else{

              }
              if(avaliable){
                console.log(client);
                Vue.axios.post(`http://localhost:8082/client/update`,client).then(rs=>{
                  if(rs.data.status){
                    this.$message.success("更新成功");
                    Vue.axios.get(`http://localhost:8082/client/getClient`,{params:{
                      clientid: this.userinfo.clientid,
                    }}).then(rs=>{
                      sessionStorage.setItem("user", JSON.stringify(rs.data));
                      location.reload();
                    });
                  }else{
                    this.$message.error(rs.data.msg);
                  }
                });
              }else{
                this.$message.error("更新信息与当前信息相同");
              }

              this.disabledObj.phone = true;
              this.updateState = 'change';
            }).catch(() => {
              this.$message.info("已取消");
            });

          }
        });

      }
    }
  }
</script>

<style>
</style>
