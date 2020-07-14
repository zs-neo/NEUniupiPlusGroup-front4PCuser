<template>
  <div class="addAddressPage">
    <el-card class="contentCard">
      <div slot="header"  class="add-title">
        <h1>添加收货地址</h1>
      </div>
      <div class="add-container">
        <div class="add-box">
          <Form :model="formData" label-position="left" ref="addAddressForm" :label-width="100" :rules="ruleInline">
            <FormItem label="联系人" prop="username">
              <i-input v-model="formData.username" size="large" clearable></i-input>
            </FormItem>
            <FormItem label="收货地址" prop="district">
              <Distpicker :province="formData.province" :city="formData.city" :area="formData.district" @province="getProvince" @city="getCity" @area="getArea"></Distpicker>

            </FormItem>
            <FormItem label="详细地址" prop="address">
              <i-input v-model="formData.address" size="large" clearable></i-input>
            </FormItem>
            <FormItem label="手机号" prop="phone">
              <i-input v-model="formData.phone" size="large" clearable></i-input>
            </FormItem>
          </Form>
        </div>
        <div class="add-submit">
          <el-button style="font-size: 14px;" min-width="300px" type="primary" @click="addAddress" size="mini">保存</el-button>
        </div>
      </div>

    </el-card>

  </div>
</template>

<script>
  import Distpicker from 'v-distpicker';
  import Vue from 'vue';
export default {
  components: {
    Distpicker
  },
  name: 'AddAddress',
  data () {
    var validaterArea = (rule, value, callback) => {
    	if (value === '' || value === '区') {
    	    callback(new Error('请选择收货地址'));
    	}else{
    		callback();
    	}
    };
    return {
      formData: {
        username: '',
        address: '',
        phone: '',
        province: '',
        city: '',
        district: '',

      },
      ruleInline: {
        district: [{validator: validaterArea, trigger: "blur" }],
        username: [
          { required: true, message: '请填写收货人姓名', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { type: 'string', pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '手机号格式错误', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    addAddress(){
      this.$refs.addAddressForm.validate((valid)=>{
        if(valid){
          this.$confirm("确认添加地址？", "提示",{}).then(()=>{
            Vue.axios.post(`http://localhost:8082/userAddress/insertUserAddress`, this.formData).then(rs=>{
              if(rs.data.status){
                this.$message.success("添加成功");
                this.$refs.addAddressForm.resetFields();
                this.formData = {};
              }else{
                this.$message.error(rs.data.msg);
              }
            });
            console.log(this.formData);
          }).catch(()=>{
            this.$message.info("已取消");
          });
        }
      })

    },
    getProvince (data) {
      this.formData.province = data.value;
    },
    getCity (data) {
      this.formData.city = data.value;
    },
    getArea (data) {
      this.formData.district = data.value;
    }
  },

};
</script>

<style scoped>
  .contentCard{
    width: 90%;
    margin: auto;
    margin-right: 0px;
  }
  .addAddressPage{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  .el-button{
    width: 100%;
  }
.add-container {
  margin: 15px auto;
  width: 80%;
  font-family: simsun;
  font-weight: 900;
}
.add-title {
  text-align: center;
  font-family: simsun;
  color: #666666;
}
.add-submit {
  display: flex;
  justify-content: center;
  padding: 20px 10px;
}
</style>
