<template>
  <div class="com-paint ">
    <div class="com-paint-head">
      <div class="com-paint-head-text">
        模板名称：
        <el-input placeholder="" size="small" style="width:106px;" v-model="templetName"></el-input>
        <el-checkbox v-model="templetIsdefault" label="默认模板" style="margin-left: 20px;" :false-label='0' :true-label='1'>
        </el-checkbox>
        <el-button class="image-text1" @click="generalSel('text')"> <span> <i class="ESLfont icon-icont"></i></span></el-button>
        <el-button class="image-text1" @click="generalSel('photo')"><span><i class="ESLfont icon-zhaopian"></i></span></el-button>
        <el-button class="image-text1" @click="generalSel('barCode')"><span><i class="ESLfont icon-tiaowenmatiaoma"></i></span></el-button>
        <el-button class="image-text1" @click="generalSel('price')"><span><i class="ESLfont icon-jiage"></i></span></el-button>
        <el-button class="image-text1" @click="generalSel('REC')"> <span><i class="ESLfont icon-juxing1fuben9"></i></span></el-button>
        <!-- <span @click="generalSel('')"><i class="ESLfont icon-yuanxing"></i></span>
          <span @click="generalSel('')"><i class="ESLfont icon-xiexian"></i></span> -->
        <!-- <el-button class="image-text1">
          <span @click="alignment('left')"> <i class="ESLfont icon-zuoduiqi1"></i>|</span>
          <span @click="alignment('HorizontalCenter')"> <i class="ESLfont icon-shuipingjuzhongduiqi1"></i>| </span>
          <span @click="alignment('right')">  <i class="ESLfont icon-youduiqi2"></i>| </span>
          <span @click="alignment('verticalCenter')">  <i class="ESLfont icon-juzhongduiqi"></i></span> 
        </el-button>-->
        <el-button class="image-text1" @click="scaled()"><i class="ESLfont icon-fangda"></i></el-button>
        <el-button style="width:60px;">
          <input type="text" v-model="inputvalue" class="scaleIn" />% </el-button>
        <el-button class="image-text1" @click="scaledDown()"> <i class="ESLfont icon-suoxiao"></i> </el-button>
        <el-button class="image-text1" @click="rotateTemplate()"><i class="ESLfont icon-xuanzhuan1"></i></el-button>
        <el-input style="width:60px;" v-model="degreeNum"> </el-input>
      </div>
    </div>
    <div class="com-paint-head">
      <div class="com-paint-head-text">
        <span> 模板背景颜色：</span>
        <el-radio-group v-model.number="picBackgroundColor" @change="picBack(picBackgroundColor)">
          <el-radio-button label="0"><i class="ESLfont icon-zhengfangxing1" style="color:black"></i></el-radio-button>
          <el-radio-button label="1"><i class="ESLfont icon-zhengfangxing1" style="color:#f5f7fa;"></i></el-radio-button>
          <el-radio-button label="2"><i class="ESLfont icon-zhengfangxing1" style="color:red"></i></el-radio-button>
          <el-radio-button label="3"><i class="ESLfont icon-zhengfangxing1" style="color:yellow"></i></el-radio-button>
        </el-radio-group>
      </div>
      <div>
        <el-button size="small" @click="goBack">
          <i class="ESLfont icon-fanhui"></i> 返回
        </el-button>
        <el-button size="small" @click="canvasSave">
          <i class="ESLfont icon-baocun"></i>保存
        </el-button>
        <el-button size="small" @click="deletemplate">
          <i class="ESLfont icon-shanchu"></i>删除
        </el-button>
      </div>
    </div>
    <div class="com-paint-main">
      <div class="main-box">
        <div class="template-added-left">
          <el-tabs v-model="activeName">
            <el-tab-pane name="first">
              <span slot="label" style=" margin-left: 25%;"> <img :src='src1'/> 属性</span>
              <div class="template-added-left-attribute">
                <temtext :formData="form" v-if="activeAtr == 0" @textData="textData"> </temtext>
                <photo @photoData="photoData" v-else-if="activeAtr == 1" :photofrom="photoform"> </photo>
                <barCode @barcodeData="barcodeData" :barcodeDet="barcodeform" v-else-if="activeAtr == 2"></barCode>
                <REC @RECData="RECData" :RECData="RECform" v-else-if="activeAtr == 3"></REC>
                <price @priceData="priceData" :pricefor="priceform" v-else-if="activeAtr == 4"></price>
              </div>
            </el-tab-pane>
            <el-tab-pane name="second">
              <span slot="label" style=" margin-left: 25%;"> <img :src='src2'/>图层</span>
              <div class="template-added-left-layer">
                <div class="layCet lf" v-for="(layer,index) in layerlist" :key="layer.index">
                  <div class="layCet-right lf" :class="{'active':ind === index}" @click="tagtab(index,layer)">
                    <i class="ESLfont " :class="layer.icon" style="fontSize:16px;"></i>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="template-added-right" ref="rightBox">
          <div class="template-added-right-message">
            <p>屏幕类型:<span>{{scrTypeName}}</span></p>
          </div>
          <div class="canvas-container" ref="container">
            <div class="canvas" ref="canvasbox" :style="{width:this.width +'px',height:this.height +'px',}">
              <div class="textType" :style="{width:item.width+'px',height:item.heigth+'px',top:item.y+'px',left:item.x+'px',transform: 'rotate(' + (item.degree) + 'deg)',zIndex:item.mapLayer}" v-for="(item,index) in canvas.textList" :class="{'active':inda1 === item}">
                <div class="canType-cell" v-drag="greet" @click="texTemplate(item,index)">
                  <img class="canType-cont" v-if="item.picString" :src="'data:image/png;base64,'+item.picString" />
                  <div class="canType-cont" v-else><span>{{item.text}}</span> </div>
                  <!-- <div class="canType-cont" :style="{width:this.w1+'px',height:this.h1+'px', }"></div> -->
                </div>
                <div class="canType-net" @click="setV(item)"></div>
              </div>
              <div class="photoType" :style="{width:item.width+'px',height:item.heigth+'px',top:item.y+'px',left:item.x+'px',transform: 'rotate(' + (item.degree) + 'deg)',zIndex:item.mapLayer}" v-for="(item,index) in canvas.picList" :class="{'active':inda1 === item}">
                <div class="canType-cell" v-drag="greet" @click="phoTemplate(item,index)">
                  <img class="canType-cont" v-if="item.picUrl" :src="baseUrl+'/templet/upload/'+ item.picUrl" />
                  <div class="canType-cont" v-else>
                    <span> pic</span>
                  </div>
                </div>
                <div class="canType-net" @click="setV"></div>
              </div>
              <div class="barcodeType" :style="{width:item.width+'px',height:item.heigth+'px',top:item.y+'px',left:item.x+'px',transform: 'rotate(' + (item.degree) + 'deg)',zIndex:item.mapLayer}" v-for="(item,index) in canvas.barcodeList" :class="{'active':inda1 === item}">
                <div class="canType-cell" v-drag="greet" @click="barTemplate(item,index)">
                  <img class="canType-cont" v-if="item.picString" :src="'data:image/png;base64,'+item.picString" />
                  <div class="canType-cont" v-else>
                    <span>barcode </span>
                  </div>
                </div>
                <div class="canType-net" @click="setV"></div>
              </div>
              <div class="priceType" :style="{width:item.width+'px',height:item.heigth+'px',top:item.y+'px',left:item.x+'px',transform: 'rotate(' + (item.degree) + 'deg)',zIndex:item.mapLayer}" v-for="(item,index) in canvas.demicalpriceList" :class="{'active':inda1 === item}">
                <div class="canType-cell" v-drag="greet" @click="pricTemplate(item,index)">
                  <img class="canType-cont" v-if="item.picString" :src="'data:image/png;base64,'+item.picString" />
                  <div class="canType-cont" v-else>
                    <span>price</span>
                  </div>
                </div>
                <div class="canType-net" @click="setV"></div>
              </div>
              <div class="RECType" :style="{width:item.width+'px',height:item.heigth+'px',top:item.y+'px',left:item.x+'px',transform: 'rotate(' + (item.degree) + 'deg)',zIndex:item.mapLayer}" v-for="(item,index) in canvas.rectangleList" :class="{'active':inda1 === item}">
                <div class="canType-cell" v-drag="greet" @click="RECTemplate(item,index)">
                  <img class="canType-cont" v-if="item.picString" :src="'data:image/png;base64,'+ item.picString" />
                  <div class="canType-cont" v-else>
                    <span>REC</span>
                  </div>
                </div>
                <div class="canType-net" @click="setV"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>
</template>
<script>
let moment = require("moment");
import Sortable from "sortablejs";
import { mapGetters } from "vuex";
import "assets/public/css/template.less";
import barCode from "./templateChild/barCode.vue";
import photo from "./templateChild/photo.vue";
import REC from "./templateChild/REC.vue";
import price from "./templateChild/price.vue";
import temtext from "./templateChild/text.vue";
import { toolRotate, toolDelete, toolScaleChange, toolDeleteInfo, toolScaleSave, toolDeleteReflect, sortComputed, toolMaplayer } from 'utils/template'
import toolForm from 'utils/template'

import {
  addTemplet,
  queryFont,
  queryTextPic,
  queryDbAttribute,
  queryBarcodePic,
  queryDecimalpricePic,
  queryRectanglePic,
} from "api/template";
export default {
  components: { photo, barCode, REC, price, temtext },
  filters: {
    moment: function(value, formatString) {
      formatString = formatString || "YYYY.MM.DD";
      return moment(value).format(formatString);
    }
  },
  data() {
    return {
      text1: '',
      templetName: "测试模板",
      templetIsdefault: 0,
      activeName: "first",
      inputvalue: 100,
      degree: "0",
      scrTypeName: "",
      src1: "static/img/template-added-19.png",
      src2: "static/img/template-added-11.png",
      layerlist: [],
      picBackgroundColor: 1,
      canvasList: [],
      loading: false,
      ind: "",
      inda: "",
      inda1: '-1',
      canvas: {
        textList: [],
        picList: [],
        barcodeList: [],
        demicalpriceList: [],
        rectangleList: []
      },
      activeAtr: -1,
      form: '',
      photoform: '',
      barcodeform: '',
      priceform: '',
      RECform: '',
      photoform: '',
      drag: false,
      degreeNum: '0',
      width: '',
      height: '',
      templetTagtypeid: '',
      templetScrtypeid: '',
      deletID: '',
      layerLength: '',
      mapLayer: 1,
      ctrlList: [],
      num: 0,
      parameter: '',
      backpage: false,
      percentageW: '',
      percentageH: '',
      maplist: []
    };
  },
  mounted() {
    this.parameter = JSON.parse(this.scrType)
    this.width = this.parameter.tagtypeWidth,
      this.height = this.parameter.tagtypeHeigth,
      this.templetTagtypeid = this.parameter.tagTypeId,
      this.templetScrtypeid = this.parameter.scrTypeId,
      this.scrTypeName = this.parameter.scrTypeName
    this.getMaxIndex()
    if (this.picBackgroundColor == 1) { this.$refs.canvasbox.style.backgroundColor = "white" };
    // window.addEventListener('mouseover', this.setV)
    // window.addEventListener('mouseout', this.setW)

  },
  created() {
    let $this = this;
    document.onkeydown = function(event) {
      var e = event || window.event || arguments.callee.caller.arguments[0];
      let key = e.keyCode;
      if (key == 13) {
        $this.rotateTemplate();
      } else if (key == 46) {
        $this.deletemplate();
      } else if (e.ctrlKey) {}
    }
  },
  watch: {
    activeName(val, oldVal) {
      if (val == "second") {
        let el = document.querySelectorAll(".template-added-left-layer")[0];
        this.sortable = Sortable.create(el, {
          disabled: false,
          onStart: evt => { //开始拖拽出发该函数
            // console.log('onStart.foo:', [evt.item]);
            this.layerlist.map((v, index) => {})
          },
          onSort: function(evt) { //发生排序发生该事件
            console.log('onSort.foo:', [evt.item, evt.from]);
          },
          onEnd: evt => {
            //监听end事件 手动维护列表
            const tempIndex = this.layerlist.splice(evt.oldIndex, 1)[0];
            console.log(tempIndex)
            this.layerlist.splice(evt.newIndex, 0, tempIndex);
            // this.mapLayer++
            // evt.oldIndex = startIndex
            // oldIndex, 开始拖拽节点的索引 就是鼠标按下去拖拽节点的索引
            // newIndex, 拖拽完之后现在节点
            console.log(evt.oldIndex)
            // this.$refs.canvadiv.style.zIndex = this.getMaxIndex() + 1
          }
        });
      }
    },
    // $route: "isTab",
    layerlist(val) {
      this.layerlist.map((v, index) => {
        // v.form.mapLayer = index + 1;
      })
      // console.log(this.layerlist)
    }
  },
  computed: {
    ...mapGetters([
      "templateAdd",
      "baseUrl",
      "index",
      'scrType'
    ])
  },
  methods: {
    goBack(val) {
      this.$router.go(-1);
    },
    setV(item) {
      this.$store.commit('SET_ISDRAG', false);
    },
    setW() {
      this.$store.commit('SET_ISDRAG', true);
    },
    texTemplate(item, index) {
      this.activeAtr = 0;
      this.deletID = "t" + index
      this.inda1 = this.form = item
      this.$store.commit('SET_INDEX', this.deletID);
      this.degreeNum = item.degree;
      this.$store.commit('SET_ISDRAG', true);
      toolMaplayer(this.maplist, this.canvas.textList, this.canvas.picList, this.canvas.barcodeList, this.canvas.demicalpriceList, this.canvas.rectangleList, )
      for (let i = 0; i < this.maplist.length; i++) {
        if (item.mapLayer <= this.maplist[0]) {
          item.mapLayer = this.maplist[0] + 1
        }
      }
    },
    phoTemplate(item, index) {
      this.activeAtr = 1;
      this.deletID = "c" + index
      this.inda1 = this.photoform = item;
      this.$store.commit('SET_INDEX', this.deletID);
      this.degreeNum = item.degree
      this.$store.commit('SET_ISDRAG', true);
      toolMaplayer(this.maplist, this.canvas.textList, this.canvas.picList, this.canvas.barcodeList, this.canvas.demicalpriceList, this.canvas.rectangleList, )
      for (let i = 0; i < this.maplist.length; i++) {
        if (item.mapLayer <= this.maplist[0]) {
          item.mapLayer = this.maplist[0] + 1
        }
      }
    },
    barTemplate(item, index) {
      this.activeAtr = 2;
      this.deletID = "b" + index
      this.inda1 = this.barcodeform = item;
      this.$store.commit('SET_INDEX', this.deletID);
      this.degreeNum = item.degree
      this.$store.commit('SET_ISDRAG', true);
      toolMaplayer(this.maplist, this.canvas.textList, this.canvas.picList, this.canvas.barcodeList, this.canvas.demicalpriceList, this.canvas.rectangleList, )
      for (let i = 0; i < this.maplist.length; i++) {
        if (item.mapLayer <= this.maplist[0]) {
          item.mapLayer = this.maplist[0] + 1
        }
      }
    },
    RECTemplate(item, index) {
      this.activeAtr = 3;
      this.deletID = "r" + index
      this.inda1 = this.RECform = item;
      this.$store.commit('SET_INDEX', this.deletID);
      this.degreeNum = item.degree
      this.$store.commit('SET_ISDRAG', true);
      toolMaplayer(this.maplist, this.canvas.textList, this.canvas.picList, this.canvas.barcodeList, this.canvas.demicalpriceList, this.canvas.rectangleList, )
      for (let i = 0; i < this.maplist.length; i++) {
        if (item.mapLayer <= this.maplist[0]) {
          item.mapLayer = this.maplist[0] + 1
        }
      }
    },
    pricTemplate(item, index) {
      this.activeAtr = 4;
      this.deletID = "p" + index
      this.inda1 = this.priceform = item;
      this.$store.commit('SET_INDEX', this.deletID);
      this.degreeNum = item.degree
      this.$store.commit('SET_ISDRAG', true);
      toolMaplayer(this.maplist, this.canvas.textList, this.canvas.picList, this.canvas.barcodeList, this.canvas.demicalpriceList, this.canvas.rectangleList, )
      for (let i = 0; i < this.maplist.length; i++) {
        if (item.mapLayer <= this.maplist[0]) {
          item.mapLayer = this.maplist[0] + 1
        }
      }
    },
    changeText() {
      this.form = {
        alignPosition: 1,
        backgroundColor: 0,
        degree: 0,
        fontName: "宋体",
        fontSize: 12,
        foregroundColor: 1,
        frameColor: 2,
        heigth: 100,
        isBold: 0,
        isItalic: 0,
        isStrickout: 0,
        isUnderscore: 0,
        mapLayer: this.mapLayer,
        picBackgroundColor: 1,
        relationDB: "",
        text: "TEXT",
        thickness: 0,
        width: 200,
        x: 0,
        y: 0,
        picString: "",
      }
      this.canvas.textList.push(this.form);
      this.canvas.textList.map(v => {
        v.w1 = v.width
        v.h1 = v.heigth
        v.x1 = v.x
        v.y1 = v.y
        v.photoshopT = v.mapLayer
      })
      this.layerlist.push({
        icon: "icon-icont",
        photoshopT: this.form.mapLayer
      });
      this.layerlist.sort(this.sortComputed)
      toolMaplayer(this.maplist, this.canvas.textList, this.canvas.picList, this.canvas.barcodeList, this.canvas.demicalpriceList, this.canvas.rectangleList)
      for (let i = 0; i < this.maplist.length; i++) {
        if (this.form.mapLayer <= this.maplist[0]) {
          this.form.mapLayer = this.maplist[0] + 1
        }
      }
    },
    changePho() {
      this.photoform = {
        x: 0,
        y: 0,
        width: 200,
        heigth: 100,
        picUrl: '',
        mapLayer: this.mapLayer,
        degree: 0,
        picBackgroundColor: 0,
      }
      this.canvas.picList.push(this.photoform);
      this.canvas.picList.map(v => {
        v.w1 = v.width
        v.h1 = v.heigth
        v.x1 = v.x
        v.y1 = v.y
        v.photoshopP = v.mapLayer
      })
      this.layerlist.unshift({
        icon: "icon-zhaopian",
        photoshopP: this.photoform.mapLayer
      });
      this.layerlist.sort(this.sortComputed)
      toolMaplayer(this.maplist, this.canvas.textList, this.canvas.picList, this.canvas.barcodeList, this.canvas.demicalpriceList, this.canvas.rectangleList, )
       console.log(this.maplist)
      for (let i = 0; i < this.maplist.length; i++) {
        if (this.photoform.mapLayer <= this.maplist[0]) {
          this.photoform.mapLayer = this.maplist[0] + 1
        }
      }
    },
    changeBarcode() {
      this.barcodeform = {
        x: 0,
        y: 0,
        width: 200,
        heigth: 100,
        barcode: "6925614222881",
        isshowText: 0,
        barcodeType: 2,
        error: 1,
        foregroundColor: 0,
        backgroundColor: 1,
        relationDB: "",
        mapLayer: this.mapLayer,
        degree: 0,
        picBackgroundColor: 3,
        picString: '',
      }
      this.canvas.barcodeList.push(this.barcodeform);
      this.canvas.barcodeList.map(v => {
        v.w1 = v.width
        v.h1 = v.heigth
        v.x1 = v.x
        v.y1 = v.y
        v.photoshopB = v.mapLayer
      })
      this.layerlist.unshift({
        icon: "icon-tiaowenmatiaoma",
        photoshopB: this.barcodeform.mapLayer

      });
      this.layerlist.sort(this.sortComputed)
      toolMaplayer(this.maplist, this.canvas.textList, this.canvas.picList, this.canvas.barcodeList, this.canvas.demicalpriceList, this.canvas.rectangleList, )
      for (let i = 0; i < this.maplist.length; i++) {
        if (this.barcodeform.mapLayer <= this.maplist[0]) {
          this.barcodeform.mapLayer = this.maplist[0] + 1
        }
      }
    },
    changePrice() {
      this.priceform = {
        x: 0,
        y: 0,
        width: 200,
        heigth: 100,
        price: 12,
        integerPart: 3,
        separator: ".",
        fontSize: 25,
        decimalSize: 20,
        fontName: 'DS-Digital',
        priceType: 1,
        showType: 2,
        alignPosition: 1,
        relationDB: "",
        mapLayer: this.mapLayer,
        degree: 0,
        picBackgroundColor: 3,
        picString: '',
      }
      this.canvas.demicalpriceList.push(this.priceform);
      this.canvas.demicalpriceList.map(v => {
        v.w1 = v.width
        v.h1 = v.heigth
        v.x1 = v.x
        v.y1 = v.y
        v.photoshopD = v.mapLayer
      })
      this.layerlist.unshift({
        icon: "icon-jiage",
        photoshopD: this.priceform.mapLayer
      });
      this.layerlist.sort(this.sortComputed)
      toolMaplayer(this.maplist, this.canvas.textList, this.canvas.picList, this.canvas.barcodeList, this.canvas.demicalpriceList, this.canvas.rectangleList, )
      for (let i = 0; i < this.maplist.length; i++) {
        if (this.priceform.mapLayer <= this.maplist[0]) {
          this.priceform.mapLayer = this.maplist[0] + 1
        }
      }
    },
    changeREC() {
      this.RECform = {
        x: 0,
        y: 0,
        width: 30,
        heigth: 20,
        thickness: 5,
        borderColor: 0,
        fillColor: 1,
        isHorizontal: 1,
        isPerpendicular: 0,
        mapLayer: this.mapLayer,
        degree: 0,
        picBackgroundColor: 3,
        picString: '',
      }
      this.canvas.rectangleList.push(this.RECform);
      this.canvas.rectangleList.map(v => {
        v.w1 = v.width
        v.h1 = v.heigth
        v.x1 = v.x
        v.y1 = v.y
        v.photoshopE = v.mapLayer
      })
      this.layerlist.unshift({
        icon: "icon-juxing1fuben9",
        photoshopE: this.RECform.mapLayer
      });
      this.layerlist.sort(this.sortComputed)
      toolMaplayer(this.maplist, this.canvas.textList, this.canvas.picList, this.canvas.barcodeList, this.canvas.demicalpriceList, this.canvas.rectangleList, )
      for (let i = 0; i < this.maplist.length; i++) {
        if (this.RECform.mapLayer <= this.maplist[0]) {
          this.RECform.mapLayer = this.maplist[0] + 1
        }
      }
    },
    greet(val) {
      // console.log(val)
      if (val.type == 0) {
        let index = val.deletID.replace('t', '')
        if (this.$store.getters.isDrag) {
          this.canvas.textList[index].x = val.x
          this.canvas.textList[index].y = val.y
          this.canvas.textList[index].x1 = val.x
          this.canvas.textList[index].y1 = val.y
        } else {
          this.canvas.textList[index].width = val.vw
          this.canvas.textList[index].heigth = val.vh
          this.canvas.textList[index].w1 = val.vw
          this.canvas.textList[index].h1 = val.vh
          if (this.canvas.textList[index].width && this.canvas.textList[index].heigth) {
            let data = JSON.parse(JSON.stringify(this.canvas.textList[index]))
            toolDeleteReflect(data)
            queryTextPic(data).then(res => {
              if (res.data) {
                this.canvas.textList[index].picString = res.data
              } else {
                this.$message({
                  message: "图片获取失败",
                  type: "error"
                });
              }
            }).catch(err => err);
          }
        }
      } else if (val.type == 1) {
        let index = this.deletID.replace('c', '')
        if (this.$store.getters.isDrag) {
          this.canvas.picList[index].x = val.x
          this.canvas.picList[index].y = val.y
           this.canvas.picList[index].x1 = val.x
          this.canvas.picList[index].y1 = val.y
        } else {
          this.canvas.picList[index].width = val.vw
          this.canvas.picList[index].heigth = val.
          this.canvas.picList[index].w1 = val.vw
          this.canvas.picList[index].h1 = val.vh
        }
      } else if (val.type == 2) {
        let index = val.deletID.replace('b', '')
        if (this.$store.getters.isDrag) {
          this.canvas.barcodeList[index].x = val.x
          this.canvas.barcodeList[index].y = val.y
           this.canvas.barcodeList[index].x1 = val.x
          this.canvas.barcodeList[index].y1 = val.y
        } else {
          this.canvas.barcodeList[index].width = val.vw
          this.canvas.barcodeList[index].heigth = val.vh
           this.canvas.barcodeList[index].w1 = val.vw
          this.canvas.barcodeList[index].h1 = val.vh
          if (this.canvas.barcodeList[index].width && this.canvas.barcodeList[index].heigth) {
            let data = JSON.parse(JSON.stringify(this.canvas.barcodeList[index]))
            toolDeleteReflect(data)
            queryBarcodePic(data).then(res => {
              if (res.data) {
                this.barcodeform.picString = res.data
              } else {
                this.$message({
                  message: "图片获取失败",
                  type: "error"
                });
              }
            }).catch(err => err);
          }
        }
      } else if (val.type == 3) {
        let index = val.deletID.replace('r', '')
        if (this.$store.getters.isDrag) {
          this.canvas.rectangleList[index].x = val.x
          this.canvas.rectangleList[index].y = val.y
          this.canvas.rectangleList[index].x1 = val.x
          this.canvas.rectangleList[index].y1 = val.y
        } else {
          this.canvas.rectangleList[index].width = val.vw
          this.canvas.rectangleList[index].heigth = val.vh
           this.canvas.rectangleList[index].w1 = val.vw
          this.canvas.rectangleList[index].h1 = val.vh
          if (this.canvas.rectangleList[index].width && this.canvas.rectangleList[index].heigth) {
            let data = JSON.parse(JSON.stringify(this.canvas.rectangleList[index]))
            toolDeleteReflect(data)
            queryRectanglePic(data).then(res => {
              if (res.data) {
                this.canvas.rectangleList[index].picString = res.data
              } else {
                this.$message({
                  message: "图片获取失败",
                  type: "error"
                });
              }
            }).catch(err => err);

          }
        }
      } else if (val.type == 4) {
        let index = val.deletID.replace('p', '')
        if (this.$store.getters.isDrag) {
          this.canvas.demicalpriceList[index].x = val.x
          this.canvas.demicalpriceList[index].y = val.y
           this.canvas.demicalpriceList[index].x1 = val.x
          this.canvas.demicalpriceList[index].y1 = val.y
        } else {
          this.canvas.demicalpriceList[index].width = val.vw
          this.canvas.demicalpriceList[index].heigth = val.vh
          this.canvas.demicalpriceList[index].w1 = val.vw
          this.canvas.demicalpriceList[index].h1 = val.vh
          if (this.canvas.demicalpriceList[index].width && this.canvas.demicalpriceList[index].heigth) {
            let data = JSON.parse(JSON.stringify(this.canvas.demicalpriceList[index]))
            toolDeleteReflect(data)
            queryDecimalpricePic(data).then(res => {
              if (res.data) {
                this.canvas.demicalpriceList[index].picString = res.data
              } else {
                this.$message({
                  message: "图片获取失败",
                  type: "error"
                });
              }
            }).catch(err => err);

          }
        }
      }
    },
    generalSel(val) {
      if (val == "text") {
        this.activeAtr = 0;
        this.changeText();
      } else if (val == "photo") {
        this.activeAtr = 1;
        this.changePho();
      } else if (val == "barCode") {
        this.activeAtr = 2;
        this.changeBarcode();
      } else if (val == "REC") {
        this.activeAtr = 3;
        this.changeREC()
      } else {
        this.activeAtr = 4;
        this.changePrice()
      }
    },
    //对齐方式
    alignment(val) {
      if (this.deletID) {} else {
        this.$message({
          duration: 1000,
          message: "按住ctrl+左键控制选中",
          type: "warning"
        });
      }
    },
    picBack(val) {
      if (val == 0) {
        this.$refs.canvasbox.style.backgroundColor = "black";
      } else if (val == 2) {
        this.$refs.canvasbox.style.backgroundColor = "red";
      } else if (val == 3) {
        this.$refs.canvasbox.style.backgroundColor = "yellow";
      } else {
        this.$refs.canvasbox.style.backgroundColor = "white";
      }
    },
    //旋转
    rotateTemplate(val) {
      if (this.deletID) {
        toolRotate(this.deletID, this.canvas.textList, this.canvas.picList, this.canvas.barcodeList, this.canvas.demicalpriceList, this.canvas.rectangleList, this.degreeNum)
      } else {
        this.$message({
          duration: 1000,
          message: "请选中旋转的模板",
          type: "warning"
        });
      }
    },
    deletemplate(val) {
      if (this.deletID) {
        toolDelete(this.deletID, this.canvas.textList, this.canvas.picList, this.canvas.barcodeList, this.canvas.demicalpriceList, this.canvas.rectangleList, this.degreeNum)
      } else {
        this.$message({
          duration: 1000,
          message: "请选中删除的模板",
          type: "warning"
        });
      }
    },
    //层叠顺序
    getMaxIndex() {
      // let index = 0;
      // let canvasbox = this.$refs.canvasbox;
      // console.log(canvadiv)
      // for (var i = 0; i < canvadiv.length; i++) {
      //   if (canvadiv[i].style.zIndex > index) index = canvadiv[i].style.zIndex;
      // }
      // return index;
    },
    scaled() {
      this.inputvalue = this.inputvalue * 1 + 10
      let inputvalue = this.inputvalue
      let x = this.parameter.tagtypeWidth
      let y = this.parameter.tagtypeHeigth
      let _w = this.$refs.rightBox.clientWidth - 100
      let _h = this.$refs.rightBox.clientHeight - 100
      if (this.width >= _w || this.height >= _h) {
        return false
      } else {
        this.width = parseInt(x * inputvalue / 100);
        this.height = parseInt(y * inputvalue / 100);
        this.scaleChange()
      }
    },
    scaled() {
      this.inputvalue = this.inputvalue * 1 + 10
      let inputvalue = this.inputvalue
      let w = this.parameter.tagtypeWidth
      let h= this.parameter.tagtypeHeigth
      let _w = this.$refs.rightBox.clientWidth - 100
      let _h = this.$refs.rightBox.clientHeight - 100
      if (this.width >= _w || this.height >= _h) {
        return false
      } else {
        this.width = parseInt(w * inputvalue / 100);
        this.height = parseInt(h * inputvalue / 100);
        this.scaleChange()
      }
    },
    scaledDown() {
      if (this.inputvalue < 0) {
        this.inputvalue = 0
        return false
      } else {
        if (this.width == this.parameter.tagtypeWidth && this.height == this.parameter.tagtypeHeigth) {
          return false
        } else {
          this.inputvalue = this.inputvalue * 1 - 10
          let w = this.parameter.tagtypeWidth
          let h = this.parameter.tagtypeHeigth
          this.width = parseInt(w * this.inputvalue / 100);
          this.height = parseInt(h * this.inputvalue / 100);
          this.scaleChange()
        }
      }
    },
    scaleChange() {
      this.percentageW = this.width / this.parameter.tagtypeWidth
      this.percentageH = this.height / this.parameter.tagtypeHeigth
      console.log(this.percentageW, this.percentageH)
      if (this.canvas.textList.length) {
        this.canvas.textList.map(v => {
          v.width = parseInt(v.w1 * this.percentageW)
          v.heigth = parseInt(v.h1 * this.percentageH)
          console.log(v.x1)
          console.log(v.w1)
          if (v.x > 0 || v.y > 0) {
            v.x = parseInt(v.x1 * this.percentageW)
            v.y = parseInt(v.y1 * this.percentageH)
          }
          return v
        })
      }
      if (this.canvas.picList.length) {
        this.canvas.picList.map(v => {
          v.width = parseInt(v.w1 * this.percentageW)
          v.heigth = parseInt(v.h1 * this.percentageH)
          v.x = parseInt(v.x1 * this.percentageW)
          v.y = parseInt(v.y1 * this.percentageH)
          return v
        })
      }
      if (this.canvas.barcodeList.length) {
        this.canvas.barcodeList.map(v => {
          v.width = parseInt(v.w1 * this.percentageW)
          v.heigth = parseInt(v.h1 * this.percentageH)
          v.x = parseInt(v.x1 * this.percentageW)
          v.y = parseInt(v.y1 * this.percentageH)
          return v
        })
      }
      if (this.canvas.demicalpriceList.length) {
        this.canvas.demicalpriceList.map(v => {
          v.width = parseInt(v.w1 * this.percentageW)
          v.heigth = parseInt(v.h1 * this.percentageH)
          v.x = parseInt(v.x1 * this.percentageW)
          v.y = parseInt(v.y1 * this.percentageH)
          return v
        })
      }
      if (this.canvas.rectangleList.length) {
        this.canvas.rectangleList.map(v => {
          v.width = parseInt(v.w1 * this.percentageW)
          v.heigth = parseInt(v.h1 * this.percentageH)
          v.x = parseInt(v.x1 * this.percentageW)
          v.y = parseInt(v.y1 * this.percentageH)
          return v
        })
      }
    },
    textData(val) { if (val) return this.form.picString = val },
    photoData(val) { if (val) return this.photoform.picUrl = val },
    priceData(val) { if (val) return this.priceform.picString = val },
    barcodeData(val) { if (val) return this.barcodeform.picString = val; },
    RECData(val) { if (val) return this.RECform.picString = val; },
    // 图层
    tagtab(index) {
      this.ind = index;
    },
    //保存
    canvasSave(val) {
      if (this.templetName == '') {
        this.$confirm(' 请输入模板名称').then(_ => {
          this.templetName = "测试模板"
        }).catch(_ => {});
      }
      this.addTemplet();
    },
    addTemplet() {
      if (this.width > this.parameter.tagtypeWidth) {
        toolScaleSave(this.percentageW, this.percentageH, this.canvas.textList, this.canvas.picList, this.canvas.barcodeList, this.canvas.demicalpriceList, this.canvas.rectangleList)
      }
      let data = {
        templetName: this.templetName,
        templetTagtypeid: this.templetTagtypeid,
        templetScrtypeid: this.templetScrtypeid,
        templetIsdefault: this.templetIsdefault,
        picBackgroundColor: this.picBackgroundColor,
        textList: this.canvas.textList,
        picList: this.canvas.picList,
        barcodeList: this.canvas.barcodeList,
        demicalpriceList: this.canvas.demicalpriceList,
        rectangleList: this.canvas.rectangleList
      };
      console.log(data)
      addTemplet(data).then(res => {
        if (res.resultStatus) {
          toolDeleteInfo(this.canvas.textList, this.canvas.picList, this.canvas.barcodeList, this.canvas.demicalpriceList, this.canvas.rectangleList)
          this.$router.go(-1)
        }
      }).catch(err => {
        this.$message({
          message: "图片保存失败",
          type: "error"
        })
      })
    },
  }
};

</script>
<style lang="less" scoped>


</style>
