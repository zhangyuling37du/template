<template>
  <div class="barCode">
    <p>属性类型：</p>
    <el-select v-model="barcodeDet.relationDB" style="width:100%" :loading="loading" :remote-method="remoteMethod" placeholder="请选择">
      <el-option v-for="item in ScreenTypes" :key="item.label" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <div class="barCode-text">
      <p></p>
      <el-checkbox v-model="barcodeDet.isshowText" :false-label='0' :true-label='1' >显示文本</el-checkbox>
    </div>
    <el-form ref="form" :model="barcodeDet" label-width="82px" :rules="rulesForm">
       <el-form-item label="条码:"  prop="barcode" >
           <el-input v-model="barcodeDet.barcode"></el-input>
       </el-form-item>
      <el-form-item label="条码类型:" prop="barcodeType" style="margin-top:10px;">
        <el-select v-model="barcodeDet.barcodeType" @change="barcodeTypeChange" style="width:100%">
          <el-option v-for="item in barcodeTypes" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="错误级别:" prop="error">
        <el-select v-model="barcodeDet.error" style="width:100%">
          <el-option v-for="item in errors" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="条码颜色:" prop="foregroundColor" class="radioCor">
        <el-radio-group v-model.number="barcodeDet.foregroundColor">
          <el-radio-button label="0"><i class="ESLfont icon-zhengfangxing1" style="color:black"></i></el-radio-button>
          <el-radio-button label="1"><i class="ESLfont icon-zhengfangxing1" style="color:#f5f7fa;"></i></el-radio-button>
          <!-- <el-radio-button label="2"><i class="ESLfont icon-zhengfangxing1" style="color:red"></i></el-radio-button> -->
        </el-radio-group>
      </el-form-item>
      <el-form-item label="背景颜色:" prop="backgroundColor'" class="radioCor">
        <el-radio-group v-model.number="barcodeDet.backgroundColor">
          <el-radio-button label="0"><i class="ESLfont icon-zhengfangxing1" style="color:black"></i></el-radio-button>
          <el-radio-button label="1"><i class="ESLfont icon-zhengfangxing1" style="color:#f5f7fa;"></i></el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div>
      <el-button size="small" style="margin-left:25%;" @click="apply('form')" class="el-green">应用</el-button>
      <!-- <el-button size="small" @click="cancle('form')">取消</el-button> -->
    </div>
  </div>
</template>
<script>
import { queryBarcodePic, queryDbAttribute } from 'api/template'
export default {
  props: ['barcodeDet'],
  data() {
    return {
      ScreenTypes: [],
      //后期接口调整 
      barcodeTypes: [{
        value: 1,
        label: 'EAN13'
      }, {
        value: 2,
        label: 'CODE 128'
      }, {
        value: 3,
        label: 'QR Code'
      }, {
        value: 4,
        label: 'UPC'
      }],
      errors: [{
        value: 0,
        label: 'L'
      }, {
        value: 1,
        label: 'M'
      }, {
        value: 2,
        label: 'Q'
      }, {
        value: 3,
        label: 'H'
      }],
      value: '',
      imgURL: '',
      rulesForm: {
        barcode:[{ required: true, message: "必填字段" }],
        barcodeType: [{ required: true, message: '请选择' }],
        error: [{ required: true, message: '请选择' }],
      },
      loading: false,
    }
  },
  mounted() {
    this.remoteMethod()
  },
  watch: {
    imgURL(val) {
      this.$emit('barcodeData', val);
    }
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          queryDbAttribute().then(res => {
            this.ScreenTypes = res.data.map(item => {
              return {
                value: item.dbcolumnAttribute,
                label: item.dbcolumnName
              }
            })
          })
        }, 200);
      } else {
        this.ScreenTypes = [];
      }
    },
    barcodeTypeChange(val) {
      console.log(val)
      if (val == 1) {
        if (this.barcodeDet.barcode.length < 13) {
          this.$message({
            message: '条码不能小于13位',
            type: 'error'
          })
        }
      }
    },
    apply(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let {
            relationDB,
            barcodeType,
            error,
            isshowText,
            foregroundColor,
            backgroundColor,
            width,
            heigth,
            barcode,
            x,
            y,
            degree,
            picBackgroundColor
          } = this.barcodeDet
          console.log(this.barcodeDet)
          queryBarcodePic(this.barcodeDet).then(res => {
            if (res.data) {
              this.imgURL = res.data
            } else {
              this.$message({
                message: "条码错误",
                type: "error"
              });
            }
          }).catch(err => err);
        } 
      });
    },
    cancle() {},
  }
}

</script>
<style lang="less" scoped>
.barCode {
  &-text {
    height: 36px;
    display: flex;
    justify-content: space-between;
  }
}

.el-checkbox {
  height: 36px;
  line-height: 36px;
}

</style>
