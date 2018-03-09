<template>
  <div>
    <p>属性类型：</p>
    <el-select v-model="formData.relationDB" style="width:100%" :loading="loading" :remote-method="remoteMethod" placeholder="请选择">
      <el-option v-for="item in ScreenTypes" :key="item.label" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <p>文本内容:</p>
    <textarea style="width:100%;height:80px;resize:none;" v-model="formData.text"></textarea>
    <el-form ref="form" :model="formData" label-width="82px" :rules="rulesForm">
      <el-form-item label="宽度:" prop="width">
        <el-input v-model.number="formData.width"></el-input>
      </el-form-item>
      <el-form-item label="高度:" prop="heigth">
        <el-input v-model.number="formData.heigth"></el-input>
      </el-form-item>
      <el-form-item label="左边距:" prop="x">
        <el-input v-model.number="formData.x"></el-input>
      </el-form-item>
      <el-form-item label="上边距:" prop="y">
        <el-input v-model.number="formData.y"></el-input>
      </el-form-item>
      <el-form-item label="前景色:" prop="foregroundColor" class="radioCor">
        <el-radio-group v-model.number="formData.foregroundColor">
          <el-radio-button label="0"><i class="ESLfont icon-zhengfangxing1" style="color:black"></i></el-radio-button>
          <el-radio-button label="1"><i class="ESLfont icon-zhengfangxing1" style="color:#f5f7fa;"></i></el-radio-button>
          <el-radio-button label="2"><i class="ESLfont icon-zhengfangxing1" style="color:red"></i></el-radio-button>
          <el-radio-button label="3"><i class="ESLfont icon-zhengfangxing1" style="color:yellow"></i></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="背景颜色:" prop="backgroundColor" class="radioCor">
        <el-radio-group v-model.number="formData.backgroundColor">
          <el-radio-button label="0"><i class="ESLfont icon-zhengfangxing1" style="color:black"></i></el-radio-button>
          <el-radio-button label="1"><i class="ESLfont icon-zhengfangxing1" style="color:#f5f7fa;"></i></el-radio-button>
          <el-radio-button label="2"><i class="ESLfont icon-zhengfangxing1" style="color:red"></i></el-radio-button>
          <el-radio-button label="3"><i class="ESLfont icon-zhengfangxing1" style="color:yellow"></i></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="文本对齐:" prop="alignPosition" class="radioCor1">
        <el-radio-group v-model.number="formData.alignPosition">
          <el-radio-button label="1"><i class="ESLfont icon-zuoduiqi2"></i></el-radio-button>
          <el-radio-button label="2"> <i class="ESLfont icon-juzhong"></i></el-radio-button>
          <el-radio-button label="3"> <i class="ESLfont icon-youduiqi"></i></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="文本属性:" class="textBox">
        <el-checkbox v-model="formData.isBold" :false-label=0 :true-label=1>
          <i class="ESLfont icon-jiacu"></i>
        </el-checkbox>
        <el-checkbox v-model="formData.isUnderscore" :false-label=0 :true-label=1>
          <i class="ESLfont icon-xiahuaxian1"></i>
        </el-checkbox>
        <el-checkbox v-model="formData.isItalic" :false-label=0 :true-label=1>
          <i class="ESLfont icon-xieti2"></i>
        </el-checkbox>
        <el-checkbox v-model="formData.isStrickout" :false-label=0 :true-label=1>
          <i class="ESLfont icon-icon-test"></i>
        </el-checkbox>
      </el-form-item>
      <el-form-item label="字体:" prop="fontName">
        <el-select v-model="formData.fontName" :loading="loading" :remote-method="remoteMethod">
          <el-option v-for="item in fontFamily" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="字号:" prop="fontSize">
        <el-input v-model.number="formData.fontSize"></el-input>
      </el-form-item>
      <el-form-item label="边框粗细:" prop="thickness">
        <el-select v-model="formData.thickness">
          <el-option v-for="item in borders" :key="item.value" :label="item.label" :value="item.label">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="边框颜色:" prop="frameColor" class="radioCor">
        <el-radio-group v-model="formData.frameColor">
          <el-radio-button label="0"><i class="ESLfont icon-zhengfangxing1" style="color:black"></i></el-radio-button>
          <el-radio-button label="1"><i class="ESLfont icon-zhengfangxing1" style="color:#f5f7fa;"></i></el-radio-button>
          <el-radio-button label="2"><i class="ESLfont icon-zhengfangxing1" style="color:red"></i></el-radio-button>
          <el-radio-button label="3"><i class="ESLfont icon-zhengfangxing1" style="color:yellow"></i></el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <el-button size="small" style="margin-left:25%;" @click="apply('form')" class="el-green">应用</el-button>
    <!-- <el-button size="small" @click="cancleText('form')">取消</el-button> -->
  </div>
</template>
<script>
import {
  addTemplet,
  queryFont,
  queryTextPic,
  queryDbAttribute
} from "api/template";
export default {
  props: ["formData"],
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
    var checkSize = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('字段不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 10) {
            callback(new Error('字号不能小于10号'));
          } else {
            callback();
          }
        }
      }, 1);
    };
    return {
      ScreenTypes: [],
      fontFamily: [],
      imgURL: '',
      textarea: "TEXT",
      text: "",
      borders: [{
          value: "",
          label: "0"
        },
        {
          value: "选项2",
          label: "1"
        },
        {
          value: "选项3",
          label: "2"
        },
        {
          value: "选项4",
          label: "3"
        },
        {
          value: "选项5",
          label: "4"
        }
      ],
      loading: false,
      isShow: false,
      isActive: false,
      rulesForm: {
        width: [{ validator: checkIndex, trigger: 'blur', required: true, }],
        heigth: [{ validator: checkIndex, trigger: 'blur', required: true, }],
        x: [{ required: true, message: "必填字段" }, { type: 'number', message: '必须为数字值' }],
        y: [{ required: true, message: "必填字段" }, { type: 'number', message: '必须为数字值' }],
        fontFamily: [{ required: true, message: "请选择", trigger: 'blur' }],
        relationDB: [{ required: true, message: "请选择", required: true, }],
        fontSize: [{ validator: checkSize, trigger: 'blur' }],
      },

    };
  },
  watch: {
    imgURL(val) {
      this.$emit('textData', val);
    },
  },
  mounted() {
    this.queryDbAttribute();
    this.remoteMethod();
  },
  methods: {
    queryDbAttribute() {
      queryDbAttribute().then(res => {
        console.log(res)
        this.ScreenTypes = res.data.map(item => {
          return {
            value: item.dbcolumnAttribute,
            label: item.dbcolumnName
          }
        });
      });
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        queryFont().then(res => {
          this.loading = false;
          this.fontFamily = res.data.map(item => {
            return item;
          });
        }).catch(err => {
          this.loading = false;
        });
      } else {
        this.fontFamily = [];
      }
    },
    apply(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let {
            width,
            heigth,
            text,
            foregroundColor,
            backgroundColor,
            fontSize,
            fontName,
            isBold,
            isStrickout,
            frameColor,
            isUnderscore,
            isItalic,
            alignPosition,
            thickness,
            x,
            y,
            degree,
            picBackgroundColor,
          } = this.formData;
          // console.log(this.formData)
          queryTextPic(this.formData).then(res => {
            if (res.data) {
              this.imgURL = res.data
            } else {
              this.$message({
                message: "图片获取失败",
                type: "error"
              });
            }
          }).catch(err => err);
        }
      });
    },
    cancleText() {}
  }
};

</script>
<style scoped>
.el-checkbox+.el-checkbox {
   margin-left: 0px; 
}


.el-checkbox+.el-checkbox {
 margin-left: 0px; 
}

.el-checkbox+.el-checkbox {
   margin-left: 0px; 
}

.el-checkbox+.el-checkbox {
   margin-left: 0px; 
}

</style>
