<template>
  <div v-if="priceShow">
    <el-form ref="form" :model="pricefor" label-width="110px" :rules="rulesForm">
      <el-form-item label="属性类型:" prop="relationDB" placeholder="请选择">
        <el-select v-model="pricefor.relationDB" style="width:100%" :loading="loading" :remote-method="remoteMethod">
          <el-option v-for="item in ScreenTypes" :key="item.label" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="价格:" prop="price" style="margin-top:10px;">
        <el-input  v-model.number="pricefor.price"></el-input>
      </el-form-item>
      <el-form-item label="整数部分:" prop="integerPart">
        <el-input   v-model.number="pricefor.integerPart"></el-input>
      </el-form-item>
      <el-form-item label="字体:" prop="fontName">
        <el-select v-model="pricefor.fontName" style="width:100%">
          <el-option v-for="item in fontNames" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文本对齐方式:" prop="alignPosition">
        <el-select v-model="pricefor.alignPosition" @change="" style="width:100%">
          <el-option v-for="item in alignPositions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="千位分隔符:" prop="separator">
        <el-select v-model="pricefor.separator" style="width:100%">
          <el-option v-for="item in separators" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="价格样式:" prop="priceType">
        <el-radio-group v-model.number="pricefor.priceType" @change="priceThird">
          <div>
            <el-radio :label="1"><img src="static/img/price1.png" /></el-radio>
          </div>
          <div>
            <el-radio :label="2"><img src="static/img/price2.png" /></el-radio>
          </div>
          <div>
            <el-radio :label="3"><img src="static/img/price3.png" /></el-radio>
          </div>
          <div>
            <el-radio :label="4"><img src="static/img/price4.png" /></el-radio>
          </div>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="显示模式:" prop="showType">
        <el-radio-group v-model="pricefor.showType">
          <div>
            <el-radio :label="1"><img src="static/img/pricew.png" /></el-radio>
          </div>
          <div>
            <el-radio :label="2"><img src="static/img/priceb.png" /></el-radio>
          </div>
          <div>
            <el-radio :label="3"><img src="static/img/pricer.png" /></el-radio>
          </div>
          <div>
            <el-radio :label="4" style="margin-top:2px;"> <span style="font-weight:bolder;text-decoration:line-through; font-style:italic; color:black;font-size:22px;">strikeout</span></el-radio>
          </div>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="尺寸:" prop="fontSize">
        <el-select v-model="pricefor.fontSize" style="width:100%">
          <el-option v-for="item in fontSizes" :key="item.value" :label="item.label" :value="item.label">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Decimal Size" v-if="decimalShow" prop="decimalSize">
        <el-select v-model="pricefor.decimalSize" @change="" style="width:100%">
          <el-option v-for="item in decimalSizes" :key="item.value" :label="item.label" :value="item.label">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div>
      <el-button size="small" style="margin-left:25%;" @click="apply('form')" class="el-green">应用</el-button>
      <!-- <el-button size="small" @click="cancle('form')">取消</el-button> -->
    </div>
  </div>
</template>
<script>
import { queryDecimalpricePic, queryDbAttribute } from 'api/template'
export default {
  props: ["pricefor"],
  data() {
    var checkIndex = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('字段不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
            callback();
        }
      }, 1);
    };
    return {
      degree: '0',
      picBackgroundColor: '',
      fontNames: [{
        value: 'DS-Digital',
        label: 'FontType1'
      }, {
        value: 'DS-Digital1',
        label: 'FontType2'
      }],
      separators: [{
        value: "Don't display",
        label: "Don't display"
      }, {
        value: '.',
        label: '.'
      }, {
        value: ',',
        label: ','
      }],
      value: '',
      id: 2,
      decimalShow: false,
      fontSizes: [{
          value: '选项1',
          label: "20"
        }, {
          value: '选项2',
          label: '30'
        }, {
          value: '选项3',
          label: '40'
        },
        {
          value: '选项4',
          label: '80'
        }
      ],
      alignPositions: [{
        value: 1,
        label: "左对齐"
      }, {
        value: 2,
        label: '居中'
      }, {
        value: 3,
        label: '右对齐'
      }],
      decimalSizes: [{
          value: '选项1',
          label: "10"
        }, {
          value: '选项2',
          label: '20'
        }, {
          value: '选项3',
          label: '30'
        },
        {
          value: '选项4',
          label: '60'
        }
      ],
      ScreenTypes: [],
      imgURL: '',
      priceShow: true,
      rulesForm: {
        relationDB: [{ required: true, message: '请选择' }],
        price: [{ validator: checkIndex, trigger: 'blur' }],
        integerPart: [{ validator: checkIndex, trigger: 'blur' }],
        fontName: [{ required: true, message: '请选择' }],
        separator: [{ required: true, message: '请选择' }],
        fontSize: [{ required: true, message: '请选择' }],
        decimalSize: [{ required: true, message: '请选择' }],
        alignPosition: [{ required: true, message: '请选择' }],
      },
      loading: false,
    }
  },
  mounted() {
    this.remoteMethod()
  },
  watch: {
    imgURL(val) {
      this.$emit('priceData', val);
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
    apply(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.pricefor.fontSize < this.pricefor.decimalSize) {
            this.$confirm('Decimal FontSize should not be smaller than the integer FontSize').then(_ => {
              this.pricefor.decimalSize = 8
            }).catch(_ => {});
          } else {
            let {
              width,
              heigth,
              relationDB,
              price,
              integerPart,
              separator,
              fontSize,
              decimalSize,
              fontName,
              alignPosition,
              priceType,
              showType,
              x,
              y,
              degree,
              picBackgroundColor
            } = this.pricefor;
            queryDecimalpricePic( this.pricefor).then(res => {
              if(res.data){
                this.imgURL = res.data
              }else{
                this.$message({
                message: "图片获取失败",
                type: "error"
              });
              }
            }).catch(err =>err);
          }
        } 
      });
    },
    priceThird(val) {
      if (val === 3 || val === 4) {
        this.decimalShow = true
      }
    },
    cancle() {
        // this.priceShow = false;
    },
  }
}

</script>
<style lang="less">


</style>
