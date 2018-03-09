<template>
  <div>
    <div class="canvas" ref="canvasbox" :style="{width:this.width +'px',height:this.height +'px',}">
      <div class="textType" :style="{width:item.width+'px',height:item.heigth+'px',top:item.y+'px',left:item.x+'px',transform: 'rotate(' + (item.degree) + 'deg)',zIndex:item.mapLayer}" v-for="(item,index) in canvas.textList" :class="{'active':inda1 === item}">
        <div class="canType-cell" v-drag="greet" ref="NET" @click="texTemplate(item,index)">
          <img class="canType-cont" v-if="item.picString" :src="'data:image/png;base64,'+item.picString" ref="cellsize" />
          <div class="canType-cont" v-else ref="cellsize">
            <span>{{item.text}}</span>
          </div>
        </div>
        <div class="canType-net" @click="setV"></div>
      </div>
      <div class="photoType" :style="{width:item.width+'px',height:item.heigth+'px',top:item.y+'px',left:item.x+'px',transform: 'rotate(' + (item.degree) + 'deg)',zIndex:item.mapLayer}" v-for="(item,index) in canvas.picList" :class="{'active':inda1 === item}">
        <div class="canType-cell" ref="NET" v-drag="greet" @click="phoTemplate(item,index)">
          <img class="canType-cont" v-if="item.picUrl" :src="baseUrl+'/templet/upload/'+ item.picUrl" />
          <div class="canType-cont" v-else>
            <span> pic</span>
          </div>
        </div>
        <div class="canType-net" @click="setV"></div>
      </div>
      <div class="barcodeType" :style="{width:item.width+'px',height:item.heigth+'px',top:item.y+'px',left:item.x+'px',transform: 'rotate(' + (item.degree) + 'deg)',zIndex:item.mapLayer}" v-for="(item,index) in canvas.barcodeList" :class="{'active':inda1 === item}">
        <div class="canType-cell" ref="NET" v-drag="greet" @click="barTemplate(item,index)">
          <img class="canType-cont" v-if="item.picString" :src="'data:image/png;base64,'+item.picString" />
          <div class="canType-cont" v-else>
            <span>barcode </span>
          </div>
        </div>
        <div class="canType-net" @click="setV"></div>
      </div>
      <div class="priceType" :style="{width:item.width+'px',height:item.heigth+'px',top:item.y+'px',left:item.x+'px',transform: 'rotate(' + (item.degree) + 'deg)',zIndex:item.mapLayer}" v-for="(item,index) in canvas.demicalpriceList" :class="{'active':inda1 === item}">
        <div class="canType-cell" v-drag="greet " ref="NET" @click="pricTemplate(item,index)">
          <img class="canType-cont" v-if="item.picString" :src="'data:image/png;base64,'+item.picString" />
          <div class="canType-cont" v-else>
            <span>price</span>
          </div>
        </div>
        <div class="canType-net" @click="setV"></div>
      </div>
      <div class="RECType" :style="{width:item.width+'px',height:item.heigth+'px',top:item.y+'px',left:item.x+'px',transform: 'rotate(' + (item.degree) + 'deg)',zIndex:item.mapLayer}" v-for="(item,index) in canvas.rectangleList" :class="{'active':inda1 === item}">
        <div class="canType-cell" v-drag="greet" ref="NET" @click="RECTemplate(item,index)">
          <img class="canType-cont" v-if="item.picString" :src="'data:image/png;base64,'+ item.picString" />
          <div class="canType-cont" v-else>
            <span>REC</span>
          </div>
        </div>
        <div class="canType-net" @click="setV"></div>
      </div>
    </div>
  </div>
</template>
<script>
import fabric from 'fabric'
import { mapGetters } from "vuex";
// let  fabric = require('fabric');
export default {
  data() {
    return {
      canvas: {
        textList: [],
        picList: [],
        barcodeList: [],
        demicalpriceList: [],
        rectangleList: [],
        percentageW: '',
        percentageH: '',
        width: '',
        height: '',
      },
    }
  },
  mounted() {
    this.parameter = JSON.parse(this.scrType)
    this.width = this.parameter.tagtypeWidth,
      this.height = this.parameter.tagtypeHeigth,
      window.addEventListener('mouseover', this.setV)
    window.addEventListener('mouseout', this.setW)
  }
  computed: {
    ...mapGetters([
      "templateAdd",
      "baseUrl",
      "index",
      'scrType'
    ])
  },
  methods: {
    setV() {
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
      item.mapLayer++
    },
    phoTemplate(item, index) {
      this.activeAtr = 1;
      this.deletID = "c" + index
      this.inda1 = this.photoform = item;
      this.$store.commit('SET_INDEX', this.deletID);
      this.degreeNum = item.degree
      this.$store.commit('SET_ISDRAG', true);
      item.mapLayer++
    },
    barTemplate(item, index) {
      this.activeAtr = 2;
      this.deletID = "b" + index
      this.inda1 = this.barcodeform = item;
      this.$store.commit('SET_INDEX', this.deletID);
      this.degreeNum = item.degree
      this.$store.commit('SET_ISDRAG', true);
      item.mapLayer++
    },
    RECTemplate(item, index) {
      this.activeAtr = 3;
      this.deletID = "r" + index
      this.inda1 = this.RECform = item;
      this.$store.commit('SET_INDEX', this.deletID);
      this.degreeNum = item.degree
      this.$store.commit('SET_ISDRAG', true);
      item.mapLayer++
    },
    pricTemplate(item, index) {
      this.activeAtr = 4;
      this.deletID = "p" + index
      this.inda1 = this.priceform = item;
      this.$store.commit('SET_INDEX', this.deletID);
      this.degreeNum = item.degree
      this.$store.commit('SET_ISDRAG', true);
      item.mapLayer++
    },
  }
}
}

</script>
<style scoped lang="less">
.com-paint-head {
  display: flex;
  justify-content: space-between;
}

</style>
