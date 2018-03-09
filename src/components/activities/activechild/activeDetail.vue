<template>
  <div class="com-paint">
    <div class="com-paint-head">
      <div>
        <el-button size="small" @click="goBack"> <i class="ESLfont icon-fanhui"></i> 返回 </el-button>
        <el-button size="small" @click="detailEdit()"> <i class="ESLfont  icon-bianji"></i>编辑 </el-button>
        <el-button size="small" @click="updateDetail()"> <i class="ESLfont icon-baocun"></i>保存</el-button>
      </div>
    </div>
    <div class="com-paint-main">
      <div class="main-box">
        <div class="main-box-left">
          <el-form ref="form" :model="activeForm" label-width="80px" class="detail-one">
            <el-form-item label="活动编号:" prop="actionId">
              <span>{{activeForm.actionId}}</span>
            </el-form-item>
            <el-form-item label="活动名称:" prop="actionName">
              <span>{{activeForm.actionName}}</span>
            </el-form-item>
            <el-form-item label="活动描述:" prop="actionDescription" class="labelNUm">
              <span>{{activeForm.actionDescription}}</span>
            </el-form-item>
          </el-form>
          <el-form :model="activeForm" label-width="85px" class="detail-two">
            <el-form-item label="优先级别:" prop="actionLevel" style="margin-bottom:10px;">
              <span>{{activeForm.actionLevel }}</span>
            </el-form-item>
            <el-form-item class="lf" label="开始时间:" prop="actionStarttime">
              <span>{{activeForm.actionStarttime | moment}}</span>
            </el-form-item>
            <el-form-item class="lf" label="结束时间:" prop="actionEndtime">
              <span>{{activeForm.actionEndtime | moment}}</span>
            </el-form-item>
          </el-form>
          <el-form ref="form" label-width="80px" class="detail-three">
            <el-form-item label="商品属性:" prop="actionDbname">
              <el-select style="width:135px;" v-model="actionDbname" placeholder="请选择" @change="selectName(actionDbname)" :disabled="disabled">
                <el-option v-for="item in ScreenTypes" :key="item.value" :label="item.label" :value="item.value" :name="item.name">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="逻辑条件:" prop="actionCondition" class="labelNUm">
              <el-select v-model="actionCondition" style="width:135px;" :disabled="disabled">
                <el-option v-for="item in logiclist" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="值:" prop="actionValue" class="labelNUm">
              <el-input v-model="actionValue" style="width:135px;" v-show="filtertxtShow" :disabled="disabled"></el-input>
              <el-date-picker v-model="dataValue" type="datetime" placeholder="选择日期时间" v-show="filterdateShow" :disabled="disabled">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button class="el-green" @click="addActive" :disabled="disabled"> <i class="ESLfont icon-iconfontzengjia"></i>新增 </el-button>
            </el-form-item>
          </el-form>
          <div class="com-paint-table">
            <el-table class="com-table" :data="tableData" border>
              <el-table-column prop="actionDbname" label="商品属性">
              </el-table-column>
              <el-table-column prop="actionDbtype" label="商品类型">
                <template slot-scope="scope">
                  <span>{{ scope.row.actionDbtype | inUseFormat4 }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="actionCondition" label="逻辑条件">
                <template slot-scope="scope">
                  <span>{{ scope.row.actionCondition | level }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="actionValue" show-overflow-tooltip label="值">
                <template slot-scope="scope">
                  <span v-if="scope.row.actionDbtype==3">{{ scope.row.actionValue | moment }}</span>
                  <span v-else>{{ scope.row.actionValue  }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="id" label="操作">
                <template slot-scope="scope">
                  <span @click="detailEdit(scope.row)" class="doIt"> <i class="ESLfont icon-bianji4 blue  ic"></i></span>
                  <span @click="deletList(scope.row,scope.$index)" class="doIt"> <i class="ESLfont icon-delete red ic"></i></span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="main-box-right ">
          <div v-for="(item,index) in templetidList">
            <div v-if="item.actionTempletPic" class="item-cell">
              <img :src="'data:image/png;base64,'+item.actionTempletPic" />
              <div style="text-align:center;margin:5px;"><span>标签页码&nbsp;{{item.actionPage}}  &nbsp; 
                模板&nbsp;{{item.actionScrName}}</span>
              </div>
              <div style="display: flex; justify-content: space-around;">
                <el-button size="small" @click="replaceTemplate(item,index)" class="lf">更换模板</el-button>
                <!-- <el-button size="small" @click="tepAmend"> 编辑模板</el-button> -->
                <el-button size="small" @click="deletList(item,index)"> 删除模板</el-button>
              </div>
            </div>
          </div>
          <div class="item-cell">
            <span style="line-height:200px;height:200px;color:black;margin-left: 87px;" @click="selectTemplate()"><i class="ESLfont icon-iconfontzengjia"></i>选择模板</span>
          </div>
        </div>
      </div>
    </div>
    <EslRightBox ref="rightBox" :title="title">
      <el-form ref="activeForm" label-width="80px" v-if="activeTxt">
        <el-form-item label="活动编号:" prop="actionId">
          <el-input v-model="activeForm.actionId" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="活动名称:" prop="actionName">
          <el-input v-model="activeForm.actionName"></el-input>
        </el-form-item>
        <el-form-item label="活动描述:" prop="actionDescription" class="labelNUm">
          <el-input v-model="activeForm.actionDescription"></el-input>
        </el-form-item>
        <el-form-item label="优先级别:" prop="actionLevel">
          <el-select v-model="activeForm.actionLevel" @change="selectLevel(activeForm.actionLevel)">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间:" prop="actionStarttime" v-show="dataShow">
          <el-date-picker v-model="activeForm.actionStarttime" type="datetime" placeholder="选择日期时间" :readonly='readonly'>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间:" prop="actionEndtime" v-show="dataShow">
          <el-date-picker v-model="activeForm.actionEndtime" type="datetime" placeholder="选择日期时间" :readonly='readonly'>
          </el-date-picker>
        </el-form-item>
        <el-form-item class="boxSave">
          <el-button class="el-green el-nomal" type="info" @click="$refs.rightBox.close()">保存</el-button>
          <el-button class="el-gray el-nomal" @click="$refs.rightBox.close()">返回</el-button>
        </el-form-item>
      </el-form>
      <el-form ref="editform" label-width="80px" v-if="activeTable">
        <el-form-item label="商品属性:" prop="actionDbname">
          <el-select v-model="editform.actionDbname" placeholder="请选择" @change="selectName(editform.actionDbname)">
            <el-option v-for="item in ScreenTypes" :key="item.value" :label="item.label" :value="item.value" :name="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="逻辑条件:" prop="actionCondition" class="labelNUm">
          <el-select v-model="editform.actionCondition">
            <el-option v-for="logic in logiclist" :key="logic.value" :label="logic.label" :value="logic.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="值:" prop="actionValue" class="labelNUm" style="margin-bottom:10px;">
          <el-input v-model="editform.actionValue" style="width:135px;" v-show="filtertxtShow"></el-input>
          <el-date-picker v-model="editform.actionValue" type="datetime" placeholder="选择日期时间" v-show="filterdateShow">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="boxSave">
          <el-button class="el-green el-nomal" type="info" @click="save()">保存</el-button>
          <el-button class="el-gray el-nomal" @click="$refs.rightBox.close()">返回</el-button>
        </el-form-item>
      </el-form>
    </EslRightBox>
    <selectTemplate ref="selectTemplate" :selectDetail="selectDetail" @selectData="selectData"></selectTemplate>
  </div>
</template>
<script>
import 'assets/public/css/activities.css'
import selectTemplate from 'components/activities/activechild/selectTemplate.vue'
import { queryDbAttribute, queryTagtypecom } from "api/template";
import { queryByActionId, updateActionInfo, getTempletPic } from "api/active";
import { level, inUseFormat4 } from 'utils/validate'

let moment = require('moment');
export default {
  components: { selectTemplate },
  filters: {
    moment: function(value, formatString) {
      formatString = formatString || 'YYYY年MM月DD日 HH:mm:ss';
      return moment(value).format(formatString);
    },
    monent1: function(value, formatString) {
      return moment(value).format('X');
    },
    level: function(value) {
      return level(value)
    },
    inUseFormat4: function(value) {
      return inUseFormat4(value)
    },
  },
  data() {
    return {
      activeForm: {
        actionName: '',
        actionId: '',
        actionLevel: '',
        actionDescription: '',
        actionStarttime: '',
        actionEndtime: '',
      },
      title: '商品活动修改',
      actionDbname: "",
      actionCondition: "",
      actionValue: "",
      actionDbtype: '',
      options: [{
          value: '1',
          label: '1'
        }, {
          value: '2',
          label: '2'
        }, {
          value: '3',
          label: '3'
        },
        {
          value: '4',
          label: '4'
        },
        {
          value: '5',
          label: '5'
        }, {
          value: '6',
          label: '6'
        }
      ],
      logiclist: [{
          value: 1,
          label: '等于'
        }, {
          value: 2,
          label: '大于'
        }, {
          value: 3,
          label: '小于'
        },
        {
          value: 4,
          label: '大于等于'
        },
        {
          value: 5,
          label: '小于等于'
        },
        {
          value: 6,
          label: '不等于'
        }, {
          value: 7,
          label: '包含'
        }
      ],
      filterdateShow: false,
      filtertxtShow: true,
      readonly: false,
      tableShow: false,
      tableData: [],
      ScreenTypes: [],
      templetidList: [],
      activeTxt: true,
      activeTable: false,
      editform: {
        actionDbname: "",
        actionCondition: "",
        actionValue: "",
      },
      changeTem: false,
      disabled: false,
      dataShow: true,
      dataValue: '',
      selectDetail: '',
    }
  },
  watch: {
    dataValue(val, oldval) {
      this.actionValue = this.dataValue * 1
    },
  },
  mounted() {
    this.queryDbAttribute()
    this.queryByActionId()
  },
  methods: {
    queryDbAttribute() {
      queryDbAttribute().then(res => {
        this.ScreenTypes = res.data.map(item => {
          return {
            value: item.dbcolumnAttribute,
            label: item.dbcolumnName,
            name: item.dbcolumnDatatype
          }
        });
      });
    },
    queryByActionId() {
      queryByActionId(this.$route.query.actionId).then(res => {
         console.log(res)
        if (res.data) {
          let { actionId, actionName, actionDescription, actionStarttime, actionEndtime, actionLevel } = res.data;
          if (actionLevel == 1) {
            this.readonly = true
            this.disabled = true
          }
          this.activeForm = res.data
          this.tableData = res.data.actionFilterList
          res.data.actionFilterList.map(v => {
            if (v.actionDbtype == 3) {
              v.actionValue = v.actionValue * 1
            }
          })
          this.templetidList = res.data.templetidList
          console.log(this.templetidList)
        }
      }).catch(err => err)
    },
    goBack(val) {
      this.$router.go(-1)
    },
    addActive() {
      this.tableData.push({
        actionDbname: this.actionDbname,
        actionCondition: this.actionCondition,
        actionValue: this.actionValue,
        actionDbtype: this.actionDbtype,
        actionId: this.activeForm.actionId

      })
      console.log(this.tableData)
    },
    selectLevel(val) {
      if (val == 1) {
        this.activeForm.actionStarttime = '2001-1-1 00:00:01'
        this.activeForm.actionEndTime = '2100-1-1 00:00:01'
        this.readonly = true
        this.disabled = true
        this.dataShow = false
      } else {
        this.readonly = false
        this.disabled = false
        this.dataShow = true
      }
    },
    selectName(val) {
      this.ScreenTypes.map(v => {
        if (val == v.value) {
          this.actionDbtype = v.name
          if (v.name == 3) {
            this.filterdateShow = true
            this.filtertxtShow = false
          } else {
            this.filterdateShow = false
            this.filtertxtShow = true
          }
        }
      })
    },
    deletList(val, index) {
      if (val.actionDbname) {
        this.tableData.splice(index, 1);
      } else {
        this.templetidList.splice(index, 1);
      }
    },
    //编辑
    detailEdit(val) {
      if (val) {
        this.activeTxt = false
        this.activeTable = true
        this.editform = val
        if (val.actionDbtype == 3) {
          this.filterdateShow = true
          this.filtertxtShow = false
        }
      } else {
        this.activeTxt = true
        this.activeTable = false
      }
      this.$refs.rightBox.open();
    },

    //保存
    save() {
      this.$refs.rightBox.close()
      if (this.filterdateShow) {
        return this.editform.actionValue * 1
      }
    },
    selectTemplate(val) {
      this.$refs.selectTemplate.showSelectDeta();
      this.selectDetail = { templetidList: this.templetidList }
      // console.log(this.selectDetail)
    },
    replaceTemplate(item, index) {
      this.changeTem = true
      this.selectDetail = {
        changeTem: this.changeTem,
        templetidList: this.templetidList[index],
        index: index
      }
      this.$refs.selectTemplate.showSelectDeta();
    },
    selectData(val) {
      console.log(val)
      if (val.changeTem) {
        this.templetidList[val.index].actionTempletPic = val.actionTempletPic
        this.templetidList[val.index].actionPage = val.actionPage
        this.templetidList[val.index].actionTemplet = val.actionTemplet
        this.templetidList[val.index].actionTagtype = val.actionTagtype
        this.templetidList[val.index].actionScrtype = val.actionScrtype
      } else {
        this.templetidList = val
      }
      console.log(this.templetidList)
    },
    updateDetail() {
      let { actionName, actionId, actionLevel, actionDescription, actionStarttime, actionEndtime } = this.activeForm
      this.templetidList.map(v => {
        Reflect.deleteProperty(v, 'actionTempletPic')
        Reflect.deleteProperty(v, 'actionScrName')
        return v
      })
      let data = {
        "actionId": actionId,
        "actionName": actionName,
        "actionDescription": actionDescription,
        "actionFilterList": this.tableData,
        "actionLevel": actionLevel,
        "actionStarttime": actionStarttime,
        "actionEndTime": actionEndtime,
        templetidList: this.templetidList
      }

      console.log(data)
      updateActionInfo(data).then(res => {
        if (res.resultStatus) {
          this.$router.go(-1)
        }
      }).catch(err => err)
    },

  }
}

</script>
<style lang="less" scoped>
.main-box {
  padding: 20px;
  display: flex;
  &-left {
    flex: 7;
    border-right: 1px solid #ccc;
    padding-right: 20px;
    span {
      color: #1f2d3d;
      padding-right: 10px;
    }
    .detail-one {
      display: flex;
      width: 100%;
      padding-bottom: 10px;
    }
    .detail-two {
      display: flex;
      width: 100%;
      border-top: 2px solid #ccc;
      border-bottom: 2px solid #ccc;
      padding: 10px 0 5px 0;
    }
    .labelNUm {
      margin-left: 20px;
    }
    .el-form-item {
      margin-bottom: 0px;
      margin-right: 10px;
    }
    .detail-three {
      display: flex;
      width: 100%;
      margin: 10px 0;
    }
  }
  &-right {
    flex: 3;
    padding-left: 20px;
    height: 700px;
    overflow-y: auto;
    .item-cell {
      width: 250px; // background: #e2e2e2;
      border: 1px dashed #126f7e;
      padding: 25px;
      margin: 10px 0;
      img {
        border-radius: 8px;
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        cursor: pointer;
        padding-bottom: 10px;
      }
    }
  }
}

</style>
