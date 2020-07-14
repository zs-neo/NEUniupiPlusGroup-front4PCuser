<template>
  <div class="myAddress">
    <div class="addButArea"><el-button type="primary" size="mini" @click="routeAddAddress">新增地址</el-button></div>
    <div class="addressArea">
      <div class="address-box" v-if="dataFlash" v-for="(item, index) of addressList" :key="index">
        <div class="address-header">
          <span style="font-size: 20px; font-weight: 900; color: #8f03ca;">{{item.username}}</span>
          <div class="address-action">
            <span @click="edit(index)"><i class="el-icon-edit"></i>修改</span>
            <span @click="del(index)"><Icon type="trash-a"></Icon><i class="el-icon-delete"></i>删除</span>
          </div>
        </div>
        <div class="address-content">
          <p><span class="address-content-title">用户名:</span> {{item.username}}</p>
          <p><span class="address-content-title">手机号:</span> {{item.phone}}</p>
          <p><span class="address-content-title">收货地址:</span> {{item.province}} {{item.city}} {{item.district}}</p>
          <p><span class="address-content-title">详细地址:</span> {{item.address}}</p>
        </div>
      </div>
    </div>
    <Modal v-model="modal" width="530">
        <p slot="header">
          <Icon type="edit"></Icon>
          <span>修改地址</span>
        </p>
        <div>
            <Form :model="formData" ref="updateAddressForm" label-position="left" :label-width="100" :rules="ruleInline">
              <FormItem label="联系人" prop="username">
                <i-input v-model="formData.username" size="large"></i-input>
              </FormItem>
              <FormItem label="收货地址" prop="district">
                <Distpicker :province="formData.province" :city="formData.city" :area="formData.district" @province="getProvince" @city="getCity" @area="getArea"></Distpicker>
              </FormItem>
              <FormItem label="详细地址" prop="address">
                <i-input v-model="formData.address" size="large"></i-input>
              </FormItem>
              <FormItem label="手机号" prop="phone">
                <i-input v-model="formData.phone" size="large"></i-input>
              </FormItem>
            </Form>
        </div>
        <div slot="footer">
            <Button type="primary" size="large" long @click="editAction">修改</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import store from '../../store/index.js';
import { mapState, mapActions } from 'vuex';
import Distpicker from 'v-distpicker';
import Vue from 'vue';
export default {
  name: 'MyAddress',
  data () {
    var validaterArea = (rule, value, callback) => {
      if (value === '' || value==='区') {
          callback(new Error('请选择收货地址'));
      }else{
        callback();
      }
    };
    return {
      addressList :[
        {

        }
      ],
      dataFlash: false,
      modal: false,
      formData: {
        username: '',
        address: '',
        phone: '',
        province: '',
        city: '',
        district: ''
      },
      formDataCopy:{

      },
      ruleInline: {
        district: [{validator: validaterArea, trigger: "blur" }],
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
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
  created () {
    this.getAddress();
  },
  computed: {

  },
  methods: {
    routeAddAddress(){
      this.$router.push('/clientCenter/AddAddress');
    },
    getAddress(){
      this.dataFlash = false;
      this.axios.get("http://localhost:8082/userAddress/getUserAddress").then((res) => {
        if(res.data.status){
          this.addressList = res.data.list;
          console.log(this.addressList);
        }else{
          this.$message.error(res.data.msg);
        }
        this.dataFlash = true;
      });
    },
    edit (index) {
      this.modal = true;
      this.formData = JSON.parse(JSON.stringify(this.addressList[index]));
      this.formDataCopy = JSON.parse(JSON.stringify(this.addressList[index]));
    },
    editAction () {
      this.$refs.updateAddressForm.validate((valid)=>{
        if(valid){
          this.$confirm("确认更新？", "提示",{}).then(()=>{
              if(!this.isObjectValueEquals(this.formData, this.formDataCopy)){
                Vue.axios.post(`http://localhost:8082/userAddress/updateUserAddress`, this.formData).then(rs=>{
                  if(rs.data.status){
                    this.$message.success('更新成功');
                    this.getAddress();
                  }else{
                    this.$message.error(rs.data.msg);
                  }
                });
              }
              this.modal = false;
          }).catch(()=>{
            this.$message.info("已取消");
          });

        }
      });

    },
    del (index) {
      //todo
      this.$confirm("此操作不可撤销, 确认删除？", "警告", {type: 'warning' }).then(()=>{
        Vue.axios.get(`http://localhost:8082/userAddress/deleteUserAddress`, {params:{
          addressid: this.addressList[index].addressid,
        }}).then(rs=>{
              if(rs.data.status){
                this.$message.success('删除成功');
                this.getAddress();
              }else{
                this.$message.error(rs.data.msg);
              }
        });
      }).catch(()=>{
        this.$message.info("已取消");
      });
    },
    isObjectValueEquals(a, b){
      if (a === b) return true;
      // 获取两个对象键值数组
      let aProps = Object.getOwnPropertyNames(a);
      let bProps = Object.getOwnPropertyNames(b);
      // 判断两个对象键值数组长度是否一致，不一致返回false
      if (aProps.length !== bProps.length) return false;
      // 遍历对象的键值
      for (let prop in a) {
        // 判断a的键值，在b中是否存在，不存在，返回false
        if (b.hasOwnProperty(prop)) {
          if (a[prop] !== b[prop]) {
            return false;
          }
        } else {
          return false;
        }
      }
      return true;
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
  components: {
    Distpicker
  },
  store
};
</script>

<style scoped>
  .addressArea{
    height: 90%;
    overflow: auto;
  }
  .addressArea::-webkit-scrollbar{
    display: none;
  }
  .myAddress{
    width: 100%;
    height: inherit;
    box-sizing: border-box;
    padding: 0px 25px;
  }

  .addButArea{
    padding: 10px 20px;
    text-align: right;
  }
.address-box {
  padding: 15px;
  margin: 15px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px #ccc;
  font-family: simsun;
}
.address-header {
  height: 35px;
  display: flex;
  justify-content: space-between;
  color: #232323;
  font-size: 18px;
}
.address-content {
  font-size: 14px;
  font-weight: 900;
}
.address-content p{
    padding: 5px 0px;
  }
.address-content-title {
  color: #999;
  padding-right: 10px;
}
.address-action span{
  margin-left: 15px;
  font-size: 14px;
  color: #2d8cf0;
  cursor: pointer;
}

.address-action span i{
    padding: 0px 5px;
  }

</style>
