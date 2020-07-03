<template>
  <div class="memberCenter">
    <el-card>
      <div style="font-size: 14px;font-weight: 900;color: #666666;" slot="header">
        <span>会员中心</span> <div v-if="this.userinfo.member" style="color: gold; padding: 10px 100px;">您是尊贵的会员，享受至尊的服务！</div>
      </div>
      <div class="mem_center_body">
        <el-form :inline="true"
        status-icon
        :model="memberInfo"
        label-width="80px"
        :rules="updateMemInfoRules"

        style="text-align: left;color: #999999;
        font-size: 14px;
        font-family: '\5b8b\4f53';"
        ref="updateInfoForm">
        	<el-form-item label="证件号" prop="identityid">
        		<el-input v-model="memberInfo.identityid" :disabled="this.disabledObj.identityid" placeholder="请输入证件号"  auto-complete="off" ></el-input>
        	</el-form-item>
          <br />
          <el-form-item label="姓名" prop="realname" >
          	<el-input v-model="memberInfo.realname"  placeholder="请输入姓名" :disabled="this.disabledObj.realname" auto-complete="off"></el-input>
          </el-form-item>
          <br />
        	<el-form-item label="会员等级" prop="rank" >
            <span style="padding-left: 10px;">{{this.rank}}</span>
          </el-form-item>
        </el-form>
        <div style="padding: 20px 50px;">
          <el-button v-if="this.userinfo.type==0&&updateState=='change'" @click="startCerti" type="info" size='mini'>开始认证</el-button>
          <el-button v-if="this.userinfo.type==0&&updateState=='save'" @click="save" type="success" size='mini'>提交</el-button>

        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import Vue from 'vue';
  export default{
    data(){
      return{
        userinfo:{

        },

        memberInfo:{
          identityid:'',
          realname:'',
        },
        disabledObj:{
          identityid: true,
          realname: true,
        },
        updateMemInfoRules:{
          realname: [{ required: true, message: "请输入姓名", trigger: "blur" },
          			{min: 2,message: '姓名格式有误'}],
          identityid:[
          			  { required: true, message: "请输入证件号", trigger: "blur" },
          			   {
          				  pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
          				  message: '证件号码格式有误',
          				  trigger: 'blur'
          				}
          ],
        },
        updateState: 'change',
        rank:'未认证',
      }
    },
    created(){

      this.setUserinfo();
      console.log(this.userinfo);

    },
    mounted() {
      this.checkUserType();
    },
    methods:{
      memberOpenDialog(){
        this.$alert('欢迎您，尊贵的会员', '会员中心', {
          confirmButtonText: '确定',
          right:true,
          callback: action => {

          }
        });
      },
      commOpenDialog(){
        this.$alert('加入会员，享受大额优惠和最优质的服务！', '会员中心', {
          showCancelButton: true,
          confirmButtonText: '加入会员',
          cancelButtonText: '后退',
          center: true
        }).then(() => {

        }).catch(() => {
          this.$router.push('/clientCenter/info/updateUserInfo');
        });
      },
      checkUserType(){
        if(this.userinfo.type==1){
          this.memberOpenDialog();
        }else{
          this.commOpenDialog();
        }
      },
      setUserinfo(){
        this.userinfo = JSON.parse(sessionStorage.getItem('user'));
        if(this.userinfo.type==1){
          this.memberInfo.identityid = this.userinfo.member.identityid;
          this.memberInfo.realname = this.userinfo.member.realname;
          if(this.userinfo.member.accumulatescores&&this.userinfo.member.accumulatescores!=''){
            if(this.userinfo.member.accumulatescores<500){
              this.rank = '黄金会员';
            }
            else if(this.userinfo.member.accumulatescores>=500){
              this.rank='白金会员';
            }else if(this.userinfo.member.accumulatescores>=1000){
              this.rank='钻石会员';
            }
          }
        }
      },
      startCerti(){
          this.disabledObj.identityid = false;
          this.disabledObj.realname = false;

        console.log(this.disabledObj);
        this.updateState = 'save';
      },
      /*
        submit function
      */
      save(){
        this.$refs.updateInfoForm.validate(valid => {
          if(valid){
            this.$confirm('信息确认后不可修改，是否继续！', '友情提示', {
              showClose: false,
              center: true
            }).then(() => {
              this.memberInfo.clientid = this.userinfo.clientid;
              this.memberInfo.accumulatescores = this.userinfo.scores;
              Vue.axios.post(`http://localhost:8082/member/memberRegis`,this.memberInfo).then(rs=>{
                if(rs.data.status){
                  this.$message.success("认证成功");
                  Vue.axios.get(`http://localhost:8082/client/getClient`,{params:{
                    clientid: this.userinfo.clientid,
                  }}).then(rs=>{
                    sessionStorage.setItem("user", JSON.stringify(rs.data));
                    location.reload();
                  })
                  
                }else{
                  this.$message.error(rs.data.msg);
                }
              });
              this.disabledObj.identityid = true;
              this.disabledObj.realname = true;
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

<style scoped>
  .memberCenter{
    height: 100%;
    width: 100%;
    font-family: '\5b8b\4f53'
  }
</style>
