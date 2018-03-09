<template>
  <div class="com-paint">
    <div class="com-paint-head">
      <div>
        <el-button size="small" @click="goBack">
          <i class="ESLfont icon-fanhui"></i> 返回
        </el-button>
      </div>
      <div>
        <el-button size="small" @click="butSave">
          <i class="ESLfont icon-baocun"></i> 保存
        </el-button>
      </div>
    </div>
    <div class="com-paint-main">
      <div class="main-box mainEnter">
        <div style="margin-top:20px">
          <h3>数据导入</h3>
          <el-form ref="form" label-width="80px" style="border:1px solid #ccc; border-width:1px 0px 1px 0px;">
            <el-form-item label="数据文件:" style="margin-top:22px;">
              <el-input placeholder="选择csv文件" size="small" style="width:482px" v-model="uploadPicDataTag"></el-input>
              <el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false" :before-upload="beforeUpload" :show-file-list="false">
                <el-button style="width:80px;" class="butColor" @click="binding">浏览</el-button>
              </el-upload>
            </el-form-item>
            <el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
              <el-button size="large" class="CSVEnter butColor" @click="binding">导入</el-button>
            </el-upload>
          </el-form>
          <p>导入的数据文件必须是为csv格式,否则系统无法识别!</p>
          <p>csv文件有Excel软件生成</p>
          <p>在Excel软件中编辑完成联系人信息之后，选择另存为操作，在弹出文件存储对话框底部，</p>
          <p>【保存类型】选择为：CSV(逗号隔开)(#.csv)!</p>
          <el-button class="download butColor" @click="binding">数据模板下载</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: '',
      fileList: [],
      uploadPicDataTag: ''
    }
  },
  methods: {
    goBack(val) {
      this.$router.go(-1)
    },
    save() {
      console.log(val)
    },
    butSave(val) {
      console.log(val)
    },
    binding(val) {
      console.log(val)
    },
    // 文件删除
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //已上传的文件链接时的钩子, 可以通过 file.response 拿到服务端返回数据
    handlePreview(file) {
      console.log(file);
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      const isCSV = file.type;
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 2MB!');
      }
      if (isCSV === 'image/jpeg' || isJPG === 'image/png') {} else {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
    }
  }

}

</script>
<style scoped lang="less">
.com-paint-head {
  display: flex;
  justify-content: space-between;
}

.mainEnter {
  display: flex;
  justify-content: center;
  align-items: center;

  .CSVEnter {
    margin: 3.57rem 18rem;
    width: 120px;
  }
  .download {
    width: 120px;
    margin: 3.57rem 0;
  }
}

</style>
