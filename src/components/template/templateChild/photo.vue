<template>
  <div>
    <el-upload :show-file-list="false" :action="batchUploadUrl" multiple :on-success="handleSuccess" :header="headers" ref="upload" name="pic">
      <el-button size="small" class="el-green">导入新图片</el-button>
    </el-upload>
    <div class="photoSlider">
      <div style="width:50%">
        <el-button size="small" style="width:76%;" @click="deletePic">删除</el-button>
      </div>
      <div style="width:50%;">
        <!-- <el-slider v-model="sliderValue" @change="changeImg(sliderValue)"></el-slider> -->
      </div>
    </div>
    <div class="photos">
      <div class="pictures" ref="photos" v-for="(item,index) in uploadPicData" :key="index" @click="leadImg(item)" :class="{'active':inda === item}" :style="{width:IMGwidth +'px',height:IMGheight +'px'}">
        <img :src="item.uploadpiclistUrl" alt="">
        <div>{{index+1}}</div>
      </div>
    </div>
    <el-button size="small" style="margin-left:25%;" @click="applay" class="el-green">应用</el-button>
    <!-- <el-button size="small" @click="canclePhoto('form')">取消</el-button> -->
  </div>
</template>
<script>
import { uploadPic, queryUploadpicUrl, queryPicPic, deleteUploadpicUrl } from 'api/template'
import { mapGetters } from 'vuex'
export default {
  props: ['photoform'],
  data() {
    return {
      sliderValue: 0,
      batchUploadUrl: uploadPic(),
      uploadPicData: [],
      headers: { 'Content-Type': 'multipart/form-data' },
      src4: 'static/img/trigon.png',
      imgitem: '',
      inda: '',
      firstVal: 0,
      secondValL: '',
      IMGwidth: '50',
      IMGheight: '50'
    }
  },
  mounted() {
    this.queryUploadpicUrl()
  },
  computed: {
    ...mapGetters([
      'photoAdd',
      "baseUrl"
    ]),
  },
  watch: {
    sliderValue(val, oldVal) {
      this.firstVal = oldVal
      this.secondValL = val
    }
  },
  methods: {
    queryUploadpicUrl() {
      queryUploadpicUrl().then(res => {
        let a = res.data
        let i = 0;
        for (i in a) {
          a[i].uploadpiclistUrl = `${this.baseUrl}` + '/templet/upload/' + a[i].uploadpiclistUrl
        }
        this.uploadPicData = a
      }).catch(err => {
        this.$message({
          message: '图片获取失败',
          type: 'error'
        })
      })
    },
    handleSuccess(res, file, fileList) {
      console.log(res)
      console.log(file)
      if (res.resultStatus) {
        this.$message({
          message: '上传成功',
          type: 'success'
        });
        this.queryUploadpicUrl()
      } else {
        this.$message.error(res.msg);
      }
    },
    changeImg(val) {
      let pictures = this.$refs.photos
      if (this.secondValL - this.firstVal > 0) {
        for (var i = 0; i < pictures.length; i++) {
          let x = pictures[i].getBoundingClientRect().width
          let y = pictures[i].getBoundingClientRect().height
          let scaleW = x += x * val / 100
          let scaleH = y += y * val / 100
          pictures[i].style.width = (scaleW) + 'px';
          pictures[i].style.height = (scaleH) + 'px';
        }
        // 
        // let x = this.IMGwidth
        // let y = this.IMGheight
        // console.log(val)
        // console.log(x,y)
        // this.IMGwidth = x + x * val/100;
        // this.IMGheight = y + y * val/100;
        // console.log(this.IMGwidth, this.IMGheight)
      } else if (this.secondValL - this.firstVal < 0) {
        for (var i = 0; i < pictures.length; i++) {
          let x = pictures[i].getBoundingClientRect().width
          let y = pictures[i].getBoundingClientRect().height
          let scaleW = x -= x * val / 100
          let scaleH = y -= y * val / 100
          pictures[i].style.width = (scaleW) + 'px';
          pictures[i].style.height = (scaleH) + 'px';
        }
      }
    },
    leadImg(item) {
      this.imgitem = item.uploadpiclistUrl
      this.inda = item
    },
    deletePic() {
      let result = this.imgitem.replace(`${this.baseUrl}` + '/templet/upload/', '')
      let json = { "uploadpiclistUrl": result }
      if (result) {
        deleteUploadpicUrl(json).then(res => {
          this.queryUploadpicUrl()
        }).catch(err => err)
      } else {
        this.$message({
          message: '请先选择分类',
          type: 'warning'
        });
      }
    },
    applay() {
      this.imgURL = this.imgitem
      let result = this.imgURL.replace(`${this.baseUrl}` + '/templet/upload/', '')
      this.$emit('photoData', result);
      console.log(result)
    },
    canclePhoto() {
      // this.photoActive = false
    }
  },
}

</script>
<style scoped lang="less">
.photoSlider {
  display: flex;
  padding: 10px 0;
}

.photos {
  width: 100%;
  height: 342px;
  overflow: auto;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}

.pictures {
  margin-left: 10px;
  float: left;
  position: relative;
  padding: 10px 5px;

  img {
    width: 100%;
    height: 100%;
  }
  div {
    text-align: center;
    color: black;
    font-size: 12px;
  }
}

// 遮罩层
.pictures.active img {
  border: 1px solid red;
}

</style>
