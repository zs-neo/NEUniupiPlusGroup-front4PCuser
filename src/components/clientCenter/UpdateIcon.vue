<template>
  <div class="updateIcon">
    <div class="uploadContent" >
      <el-card shadow="always" style="background-color: #F0FAFF;">
        <div slot="header">
          <span style="font-size: 14px; font-family: '\5b8b\4f53'; font-weight: 900; color: #666666;">头像上传</span>
        </div>
        <div style="text-align: center;">
          <el-upload
            :limit=1
            ref="upload"
            drag
            action="#"
            :auto-upload="false"
            :on-change="loadSuccess">
            <div class="uploadArea">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </div>
          </el-upload>
        </div>
      </el-card>

    </div>

    <el-dialog
      title="头像预览"
      :visible.sync="previewState"
      width="40%">
    	<div id="picArea">
    	  <img src=""  style="border-radius: 50%;height: 100px;width: 100px;" />
    	  <div style="margin-top: 10px;"><span>预览头像</span></div>
    	</div>
    	<el-divider></el-divider>
    	<div style="width: 100%;margin-top: 20px;" align="right">
    		<el-button @click="backToUpload" style="margin-right: 100px;" type="info">上一步</el-button>
    		<el-button @click="upload" style="margin-right: 10px;" type="primary">提交</el-button>
    	</div>
    </el-dialog>
  </div>

</template>

<script>
  import Vue from 'vue';
  import { Loading } from 'element-ui';
  export default{
    data(){
      return{
        picFile:'',
        limitNum:1,
        previewState: false,
        userinfo:{
          icon:'',
        }
      }
    },
    methods:{
      //加载成功后，自动预览
      loadSuccess(res, file, filelist){
      	let pic = file[0].raw;
      	this.picFile = file[0].raw;
      	let reader = new FileReader();
      	reader.onload = (function(e){
      		document.getElementById("picArea").firstElementChild.src = e.target.result;
      	});
      	reader.readAsDataURL(pic);
      	this.previewState = true;
      	this.iconDialogVisible = false;
      },
      //更新头像
      upload(){
      	this.$confirm("确认更新吗？", "提示", {}).then(() => {
      		let loadingInstance = Loading.service({text: '上传中，请稍后'});
      		let formData = new FormData();
      		formData.append("mf", this.picFile);
      		Vue.axios.post(`http://localhost:8082/client/updateIcon`, formData,{
      			headers: {
      				'content-Type':'multipart/form-data',
      			},

      		}).then(rs=>{
            console.log(rs.data);
            if(rs.data.status){
              let userinfo = JSON.parse(sessionStorage.getItem("user"));
              Vue.axios.get(`http://localhost:8082/client/getClient`,{params:{
                clientid: userinfo.clientid,
              }}).then(rs=>{
                sessionStorage.setItem("user", JSON.stringify(rs.data));
                location.reload();
              });
              this.$message.success("上传成功");
              this.previewState = false;
              this.$refs.upload.clearFiles();
            }else{
              this.$message.error(rs.data.msg);
            }
      			loadingInstance.close();
      		});
      	}).catch(()=>{
      		this.$message.info("已取消");
      	});
      },
      //回到上传页面
      backToUpload(){
      	this.previewState = false;
        this.$refs.upload.clearFiles();
      },
    }
  }
</script>

<style scoped>
  .updateIcon{
    padding:0 50px;
  }

  .uploadArea{
    background-color: #FFFFFF;
    height: inherit;
  }
  #picArea{
    margin:0 auto;
    text-align: center;
    background-color: #F0FAFF;
    height: 100%;
  }
</style>
