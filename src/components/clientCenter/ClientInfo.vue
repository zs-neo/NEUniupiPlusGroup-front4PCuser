<template>
  <div class="clientInfo">
    <div class="mytitle">
      <div class="titleArea">
        <h3>基本信息</h3>
      </div>
    </div>
    <div class="showArea">
      <div class="showInfo">
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
        		<el-input v-model="userinfo.username" :disabled="this.disabledObj.username" placeholder="请输入用户名"  auto-complete="off" ></el-input>
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
        <div style="padding: 50px 30px;">
          <el-button v-if="this.updateState=='change'" type="info" size="mini" @click="updateUserinfo">修改</el-button>
          <el-button v-if="this.updateState=='save'" type="primary" size="mini" @click="saveUserinfo">保存</el-button>
        </div>
      </div>
      <div class="showInfoFrame">
        <InfoFrame></InfoFrame>
      </div>
    </div>
  </div>
</template>

<script>
  import InfoFrame from './InfoFrame.vue'
  export default{
    components:{
      InfoFrame,
    },
    data(){
      return{
        userinfo:{
          username:'Jack Ma',
          password:'',
          wechat_id:'wxid',
          icon:'',
          phone:'18745161585',
          createdate:'2020-7-2 16:03:20',
          type:1,
          state:1,
          scores:150,
        },
        disabledObj:{
          username: true,
          phone: true,
        },
        updateInfoRules:{
          phone:[
            { required: true, message: "请输入手机号", trigger: "blur" },
            {pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
            message: '请输入正确的手机号', trigger: 'blur'}
          ],
          username:[
            { required: true, message: "请输入用户名", trigger: "blur" }
          ]
        },
        updateState: 'change',
      }
    },
    created() {

    },
    methods:{
      updateUserinfo(){
        
        
        
        this.updateState = 'save';
      },
      saveUserinfo(){
        
        this.updateState = 'change';
      }
    }
  }
</script>

<style scoped>
  .clientInfo{
    width: 100%;
    height: 95%;
    background-color: #00B43C;
    display: block;
    box-sizing: border-box;
  }
  .mytitle{
    padding: 10px 20px 20px;
    margin: 0px 0px 20px;
    background-color: #999999;
  }
  .titleArea{
    /* box-sizing: border-box; */
    padding:10px 0px 0px;
    background-color: #00B43C;
  }

  .titleArea h3{
    font-size: 14px;
    color: #666;
    font-family: '\5b8b\4f53';
    line-height: 18px;
  }
  .showArea{
    box-sizing: border-box;
    margin: 20px;
    display: flex;
    background-color: #FFE4C4;
    height: 85%;
  }
  .showInfoFrame{
    background-color: red;
    flex: 1;
    padding: 15px;
    height: 170px;
  }
  .showInfo{
    flex: 2;
    padding: 20px;
  }
  .infoRow{
    color: #999999;
    font-size: 14px;
    font-family: '\5b8b\4f53';
    font-weight: 800;
    padding: 10px 20px;
  }

</style>
