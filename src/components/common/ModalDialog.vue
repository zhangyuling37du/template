<template>
  <div class="out-content" v-show="show">
    <div class="out-content-cell" :style="style">
      <!-- <div class="out-head">
        <span class="out-head-title">{{title}}</span>
        <i class="el-icon-close out-head-close" @click="close"></i>
      </div> -->
      <div class="out-content-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  //widAndHei='[800,600]'
  export default {
    props: ['title', 'widAndHei'],
    data(){
      return {
        show: false
      }
    },
    methods: {
      open(){
        this.show = true;
      },
      close(){
        this.show = false;
      }
    },
    computed: {
      style(){
        if (!this.widAndHei) return;
        return {
          width: JSON.parse(this.widAndHei)[0] + 'px',
          height: JSON.parse(this.widAndHei)[1] + 'px'
        }
      }
    }
  }
</script>

<style scoped>
  /*模态框*/
  .out-content {
    position: fixed;
    background-color: rgba(0, 0, 0, .1);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .out-content-cell {
    width: 540px;
    height: 560px;
    background-color: #fff;
    border-radius: 10px;
    position: relative;
  }

  .out-head {
    width: 100%;
    height: 58px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: rgb(242, 243, 245);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .out-head-title {
    padding: 5px 1.5rem;
    font-size: 1.1rem;
  }

  .out-head-close {
    padding: 5px 1.5rem;
    color: #bfcbd9;
    cursor: pointer;
  }
  .out-content-content{
    position: absolute;
    bottom:50px;
    top: 0px;
    left: 0;
    right: 0;
    /*padding: 15px 10px;*/
    /*overflow: auto;*/
    span{
     text-align:center;
    }
  }
</style>
