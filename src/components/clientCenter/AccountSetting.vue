<template>
  <div class="accountSetting">
    <el-card shadow="always" style="background-color: #F0FAFF;">
      <div slot="header">
        <span style="font-size: 14px; font-family: '\5b8b\4f53'; font-weight: 900; color: #666666;">账号设置</span>
      </div>
      <el-form  :inline="true" status-icon :model="passwordArea" label-width="150px" :rules="updatePwdRules"  ref="updatePwdForm" style="text-align: left;">
        <el-form-item label="旧密码" prop="oldPwd">
          <el-input style="padding:0 30px;" v-model="passwordArea.oldPwd" clearable placeholder="请输入当前密码" show-password auto-complete="off"></el-input>
        </el-form-item>
        &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <el-form-item label="新密码" prop="newPwd" >
          <el-input style="padding:0 30px;" v-model="passwordArea.newPwd" clearable placeholder="请输入新密码" show-password  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="rNewPwd" >
          <el-input style="padding:0 30px;" v-model="passwordArea.rNewPwd" clearable placeholder="请确认密码" show-password auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: right; padding: 20px 10px;">
        <el-button type="primary" @click="updatePwd">提 交</el-button>
      </div>
    </el-card>
  </div>

</template>

<script>
  import Vue from 'vue';
  import { Loading } from 'element-ui';
  export default{

    data(){
      var validaterPass = (rule, value, callback) => {
      	if (value === '') {
      	    callback(new Error('请再次输入密码'));
      	}
      	else if (value !== this.passwordArea.newPwd) {
      	  callback(new Error('两次输入密码不一致!'));
      	}else{
      		callback();
      	}
      };
      var validRepeat = (rule, value, callback) =>{
        if (value === '') {
            callback(new Error('请输入新密码'));
        }
        else if (value == this.passwordArea.oldPwd) {
          callback(new Error('新密码与当前密码一致'));
        }else{
        	callback();
        }
      };
      return{
        passwordArea:{
        	oldPwd:'',
        	newPwd:'',
        	rNewPwd:''
        },
        updatePwdRules:{
        	oldPwd:[{ required: true, message: "请输入当前密码", trigger: "blur" }],
        	newPwd: [
        		{ validator:validRepeat, trigger: "blur" },
        		{ min: 5,max: 25,message: '长度在 5 到 25个字符'},
        		{pattern: /^(\w){5,25}$/, message: '只能输入5-25个字母、数字、下划线'}
        	],
        	rNewPwd: [
        				  { validator:validaterPass, trigger: "blur" },
        	],
        }
      }
    },
    methods:{
      updatePwd(){
      	this.$refs.updatePwdForm.validate(valid => {
      	  if (valid) {
      		  this.$confirm("确认更新吗？", "提示", {}).then(() => {
              console.log(this.passwordArea);
      		  	let loadingInstance = Loading.service({text: '请稍后'});
              Vue.axios.get(`http://localhost:8082/client/updatePwd`,{params:{
                oldPwd:this.passwordArea.oldPwd,
                newPwd:this.passwordArea.newPwd
              }}).then(rs=>{
                loadingInstance.close();
                if(rs.data.status){
                  this.$message.success("更新成功");
                  let userinfo = JSON.parse(sessionStorage.getItem("user"));
                  Vue.axios.get(`http://localhost:8082/client/getClient`,{params:{
                    clientid: userinfo.clientid,
                  }}).then(rs=>{
                    sessionStorage.setItem("user", JSON.stringify(rs.data));
                    location.reload();
                  })
                }else{
                  this.$message.error(rs.data.msg);
                }
                this.$refs.updatePwdForm.resetFields();
              });

      		  }).catch(()=>{
      		  	this.$message.info("已取消");
      			// this.$refs.updatePwdForm.resetFields();
      		  });
      	  }
      	});
      },
    }
  }
</script>

<style>
</style>
