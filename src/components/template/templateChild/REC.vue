<template>
  <div class="REC" ref="RECNode">
    <p>厚度：</p>
    <el-slider v-model.number="RECData.thickness" :min="0" :max="30"></el-slider>
    <div class="REC-text">
      <el-radio class="radio" v-model="radio" :label="1">水平线</el-radio>
      <el-radio class="radio" v-model="radio" :label="0">垂直线</el-radio>
    </div>
    <el-form ref="form" :model="RECData" label-width="80px">
      <el-form-item label="边框颜色:" prop="borderColor" class="radioCor">
        <el-radio-group v-model.number="RECData.borderColor">
          <el-radio-button label="0"><i class="ESLfont icon-zhengfangxing1" style="color:black"></i></el-radio-button>
          <el-radio-button label="1"><i class="ESLfont icon-zhengfangxing1" style="color:#f5f7fa;"></i></el-radio-button>
          <el-radio-button label="2"><i class="ESLfont icon-zhengfangxing1" style="color:red"></i></el-radio-button>
          <el-radio-button label="3"><i class="ESLfont icon-zhengfangxing1" style="color:yellow"></i></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="填充颜色:" prop="fillColor">
        <el-radio-group v-model.number="RECData.fillColor" class="radioCor">
          <el-radio-button label="0"><i class="ESLfont icon-zhengfangxing1" style="color:black"></i></el-radio-button>
          <el-radio-button label="1"><i class="ESLfont icon-zhengfangxing1" style="color:#f5f7fa;"></i></el-radio-button>
          <el-radio-button label="2"><i class="ESLfont icon-zhengfangxing1" style="color:red"></i></el-radio-button>
          <el-radio-button label="3"><i class="ESLfont icon-zhengfangxing1" style="color:yellow"></i></el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div>
      <el-button size="small" style="margin-left:25%;" @click="apply('RECData')" class="el-green">应用</el-button>
      <!-- <el-button size="small" @click="cancle('foRECDatarm')">取消</el-button> -->
    </div>
  </div>
</template>
<script>
import { queryRectanglePic } from 'api/template'
export default {
  props: ['RECData'],
  data() {
    return {
      radio: 1,
      imgURL: '',
      RECParameter: '',
    }
  },
  watch: {
    imgURL(val) {
      this.$emit('RECData', val);
    }
  },
  mounted() {
  },
  methods: {
    apply(formName) {
      if (this.radio == 0) {
        this.RECData.isHorizontal = 0
        this.RECData.isPerpendicular = 1
      }
      let {
        width,
        heigth,
        thickness,
        borderColor,
        fillColor,
        isHorizontal,
        isPerpendicular,
        degree,
        picBackgroundColor
      } = this.RECData;
      console.log(this.RECData)
      queryRectanglePic(this.RECData).then(res => {
        if (res.data) {
          this.imgURL = res.data
        } else {
          this.$message({
            message: "图片获取失败",
            type: "error"
          });
        }
      }).catch(err => err);
    },
    cancle() {},
  }
}

</script>
<style scoped lang="less">
.REC-text {
  display: flex;
  justify-content: center;
  padding: 10px 0;
  div {
    padding: 0 10px;
  }
}

</style>
