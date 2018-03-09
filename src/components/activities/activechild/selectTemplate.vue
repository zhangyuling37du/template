<template>
  <div>
    <ModalDialog widAndHei='[620,560]' ref="ModalDialogNode">
      <div class="out-mid-title">
        <span>标签类型</span>
        <span>选择模板</span>
      </div>
      <div class="out-mid">
        <div class="out-mid-left tag">
          <div v-for="(item,index) in typeList" class="esl" @click="tagType(item,index)">
            <div :class="{'active':ind === index}"><span>{{item.tagtypeScrtypename}}</span></div>
          </div>
          标签页码
          <el-input v-model="actionPage"></el-input>
        </div>
        <div class="out-mid-left">
          <div v-for="(item,index) in imglist" @click="checkTem(item,index)">
            <div :class="{'active':ind1 === index}"><img :src="'data:image/png;base64,'+item.actionTempletPic" /></div>
          </div>
        </div>
      </div>
      <div style="text-align: center;margin-top: 5%">
        <el-button class="el-green el-nomal" type="info" @click="selectSure"> 确认</el-button>
        <el-button class="el-gray el-nomal" type="info" @click="$refs.ModalDialogNode.close();">取消'</el-button>
      </div>
    </ModalDialog>
  </div>
</template>
<script>
import { queryByActionId, updateActionInfo, getTempletPic } from "api/active";
import { queryDbAttribute, queryTagtypecom } from "api/template";
export default ({
  props: ['selectDetail'],
  data() {
    return {
      ind: "",
      ind1: "",
      imglist: [],
      typeList: [],
      actionTagtype: '',
      actionScrtype: '',
      actionPage: 1,
      templetList: {},
      actionTempletPic: '',
      actionTemplet: '',
      actionTempletName: '',
      tagtypeScrtypename: '',
      templetList1: {},
    }
  },
  mounted() {
    queryTagtypecom().then(res => {
      this.typeList = res.data
    })
  },
  methods: {
    showSelectDeta() {
      this.$refs.ModalDialogNode.open();
      // console.log(this.selectDetail)
    },
    tagType(item, index) {
      this.tagtypeScrtypename = item.tagtypeScrtypename
      this.actionTagtype = item.tagtypeId,
        this.actionScrtype = item.tagtypeScrtypeid,
        this.ind = index;
      getTempletPic(item.tagtypeId, item.tagtypeScrtypeid).then(res => {
        if (res.data) {
          this.imglist = res.data
        } else {
          this.$message({
            message: "模板获取失败",
            type: "error"
          });
        }
      }).catch(err => err)
    },
    checkTem(item, index) {
      this.ind1 = index;
      this.actionTempletName = item.actionTempletName
      if (this.selectDetail.changeTem == true) {
        this.actionTempletPic = item.actionTempletPic,
          this.actionTemplet = item.actionTemplet
      } else {
        this.templetList1 = {
          actionTemplet: item.actionTemplet,
          actionPage: this.actionPage,
          actionTempletPic: item.actionTempletPic,
          actionTagtype: this.actionTagtype,
          actionScrtype: this.actionScrtype,
          actionScrName: this.tagtypeScrtypename
        }
      }
    },
    selectSure() {
      console.log(this.templetList1)
      //子传父
      this.$refs.ModalDialogNode.close();
      if (this.selectDetail.changeTem == true) {
        this.templetList = {
          actionTempletPic: this.actionTempletPic,
          changeTem: this.selectDetail.changeTem,
          index: this.selectDetail.index,
          actionTemplet: this.actionTemplet,
          actionTagtype: this.actionTagtype,
          actionScrtype: this.actionScrtype,
          actionPage: this.actionPage,
        }
        this.$emit('selectData', this.templetList);
      } else {
        let addtemplete = this.selectDetail.templetidList
        if (addtemplete.length > 0) {
          let a = addtemplete.filter(v => {
            if (v.actionPage === this.templetList1.actionPage && v.actionScrName === this.templetList1.actionScrName) {
              console.log(v.actionPage, v.actionScrName)
              console.log(this.templetList1.actionPage, this.templetList1.actionScrName)
              return v
            }
          })
          if (a.length > 0) {
            this.$message({
              message: "同一页码下的标签不能重复选择",
              type: "error"
            });
          } else {
            this.selectDetail.templetidList.push(this.templetList1)
          }
        } else {
          this.selectDetail.templetidList.push(this.templetList1)
        }
      }
    },
  }
})

</script>
<style lang="less" scoped>
.out-mid {
  height: 412px;
  display: flex;
  padding: 10px;
}

.out-mid-left {
  width: 50%;
  overflow: auto;
  border: 1px solid #ccc;
  margin-right: 10px;
  img {
    border: 1px solid #ccc;
    margin: 10px;
  }
}

.out-mid-left div.active img {
  border-color: #126f7e;
}

.out-mid-title {
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: black;
  height: 45px;
}

.tag {
  padding-top: 10px;
  .esl div {
    height: 25px;
    line-height: 25px;
    background-color: #ffffff;
    -webkit-box-shadow: 1px 2px 2px #c6c6c6;
    -moz-box-shadow: 1px 2px 2px #c6c6c6;
    box-shadow: 1px 2px 2px #c6c6c6;
    font-size: 12px;
    color: #888888;
    margin-bottom: 10px;
    cursor: pointer; // margin:0 10px;
    span {
      margin-left: 10px;
      color: #555555;
    }
  }
  .esl div.active {
    background: #126f7e;
    span {
      color: #fff;
    }
  }
}

</style>
