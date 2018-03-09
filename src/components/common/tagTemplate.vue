<template>
  <div>
    <div>
      <span>绑定标签:{{no}}个</span>
      <div v-for="(tag,index) in tagInfoList">
        <div class="tag-cell">
          <span>标签:&nbsp;{{tag.tagId | IntoSystem}} &nbsp;模板:&nbsp;{{tag.templetName}}&nbsp;{{tag.scrName}} </span>
          <div class="tag-state"><span>{{tag.tagWorkstatus | inUseFormat}}</span></div>
          <el-collapse v-model="index">
            <el-collapse-item title="点击模板图片" name="1" v-if="tag.templetUrl">
              <div class="tag-cont">
                <img v-if="tag.templetUrl" :src="baseUrl+'/templet/'+tag.templetUrl" />
              </div>
            </el-collapse-item>
          </el-collapse>
          <div style="display: flex; justify-content: space-around;margin-top:5px;">
            <el-button size="small" @click="templateAmend(tag.templetId)" v-if="tag.templetUrl">编辑模板</el-button>
            <el-button size="small" @click="removeBinding(tag.tagId)">解除绑定</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { unBindTag } from 'api/commodity'
import { mapGetters } from 'vuex'
import { inUseFormat, IntoSystem } from 'utils/validate'

export default {
  props: ['tagInfo'],
  filters: {
    inUseFormat: function(value) {
      return inUseFormat(value)
    },
    IntoSystem: function(value) {
      return IntoSystem(value)
    },
  },
  data() {
    return {
      no: '',
      tagInfoList: [],
      activeName: '1'
    }
  },
  mounted() {
    this.tagInfoList = this.tagInfo.tagInfoList
    console.log(this.tagInfoList)
    this.tagInfoList.map((v, index) => {
      this.no = index + 1
    })
  },
  computed: {
    ...mapGetters([
      "baseUrl"
    ])
  },
  methods: {
    templateAmend(templetId) {
      this.$router.push({ name: 'templateAmend', query: { id: templetId } })
    },
    removeBinding(tagId) {
      let data = {
        'tagId': tagId,
        'goodCode': this.tagInfo.tagGoodcode
      }
      unBindTag(data).then(res => {
        console.log(res)
        this.$notify({
          title: res.resultStatus ? '成功' : '失败',
          type: res.resultStatus ? 'success' : 'error',
          message: res.resultStatus ? '解除绑定成功' : '解除绑定失败'
        });
      }).catch(err => err)
    },
  }
}

</script>
<style lang="less" scoped>
.tag-cell {
  width: 100%;
  height: 100%;
  background: #e2e2e2;
  border: 1px dashed #126f7e;
  padding: 10px;
  position: relative;
  margin: 10px 0;
  .tag-cont {
    margin: 10px;
    border-bottom: 8px solid #ffffff;
    border-top: 10px solid #ffffff;
    border-right: 10px solid #ffffff;
    border-left: 10px solid #ffffff;
    border-radius: 10px;
    -moz-border-radius: 10px;
    -webkit-box-shadow: 1px 2px 3px #5d5d5d;
    -moz-box-shadow: 1px 2px 3px #5d5d5d;
    box-shadow: 1px 2px 3px #5d5d5d;
    background-color: #ffffff;
    position: relative;
    img {
      border-radius: 8px;
      -webkit-border-radius: 8px;
      -moz-border-radius: 8px;
      cursor: pointer;
    }
  }
  .tag-state {
    position: absolute;
    right: 5px;
    top: -5px;
    span {
      font-size: 18px;
      text-align: center;
      line-height: 50px;
      color: green;
    }
  }
}

.el-collapse {
  border-top: none;
  border-bottom: none;
}

.el-collapse-item__header {
  color: red;
}

</style>
