<template>
  <div class="com-box" v-show="isShow">
    <div class="com-rightBox">
      <div class="com-leftBox-cell" @click="leftClose()"></div>
      <div class="com-rightBox-cell" :class="{sliderightout:!isactive,slideleftin:isactive}">
        <div class="com-rightBox-title">
          <div>{{title}}</div>
          <slot name="header"></slot>
        </div>
        <div :class="{'box-content':boxShow}">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  //padding 是否有padding属性
  props: ['title', 'padding', 'prompt'],
  data() {
    return {
      isShow: false, // 是否显示模态框
      isactive: false
    }
  },
  computed: {
    boxShow() {
      if (this.padding === undefined) return true
      return false;
    }
  },
  mounted(){
  },
  methods: {
    open() {
      this.isShow = true;
      this.isactive = this.isShow;
    },
    /**
     * 关闭,将promise断定为reject状态
     * @param type {number} 关闭的方式 0表示关闭按钮关闭,1表示取消按钮关闭
     */
    close() {
      this.isactive = false;
      setTimeout(() => {
        this.isShow = false;
      }, 300);
    },
    leftClose() {
      if (!this.prompt) {
        this.$confirm('确认关闭？').then(_ => {
          this.close();
          console.log(453653)
        }).catch(_ => {});
      } else {
        this.close();
      }
    }
  }
}

</script>
<style scoped>
.com-rightBox {
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 998;
  background-color: rgba(0, 0, 0, .1);
}

.com-leftBox-cell {
  position: absolute;
  height: 100%;
  right: 40rem;
  top: 0;
  left: 0;
}


/*模态框*/

.box-content {
  height: 86%;
  padding: 4% 6rem 4% 4rem;
}

.com-rightBox-cell {
  width: 40rem;
  float: right;
  box-shadow: -5px 0 15px #cccccc;
  background-color: #fff;
  z-index: 999;
  position: relative;
  min-height: 100%;
  overflow-x: hidden;
  height: 100%;
  transform: translate3d(0, 0, 0);
  -webkit-transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

@-webkit-keyframes sliderightout {
  from {
    -webkit-transform: translateX(0px);
    opacity: 1
  }
  to {
    -webkit-transform: translateX(50%);
    opacity: 0
  }
}

@-webkit-keyframes slideleftin {
  from {
    -webkit-transform: translateX(-50%);
    opacity: 0
  }
  to {
    -webkit-transform: translateX(0px);
    opacity: 1
  }
}

@-o-keyframes sliderightout {
  from {
    -webkit-transform: translateX(0px);
    opacity: 1
  }
  to {
    -webkit-transform: translateX(50%);
    opacity: 0
  }
}

@-o-keyframes slideleftin {
  from {
    -webkit-transform: translateX(-50%);
    opacity: 0
  }
  to {
    -webkit-transform: translateX(0px);
    opacity: 1
  }
}

@-moz-keyframes sliderightout {
  from {
    -webkit-transform: translateX(0px);
    opacity: 1
  }
  to {
    -webkit-transform: translateX(50%);
    opacity: 0
  }
}

@-moz-keyframes slideleftin {
  from {
    -webkit-transform: translateX(-50%);
    opacity: 0
  }
  to {
    -webkit-transform: translateX(0px);
    opacity: 1
  }
}

@-ms-keyframes sliderightout {
  from {
    -webkit-transform: translateX(0px);
    opacity: 1
  }
  to {
    -webkit-transform: translateX(50%);
    opacity: 0
  }
}

@-ms-keyframes slideleftin {
  from {
    -webkit-transform: translateX(-50%);
    opacity: 0
  }
  to {
    -webkit-transform: translateX(0px);
    opacity: 1
  }
}

@keyframes sliderightout {
  from {
    transform: translateX(0);
    opacity: 1
  }
  to {
    transform: translateX(50%);
    opacity: 0;
  }
}

@keyframes slideleftin {
  from {
    transform: translateX(50%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.slideleftin {
  -webkit-animation: slideleftin 350ms ease-in-out;
  -moz-animation: slideleftin 350ms ease-in-out;
  -ms-animation: slideleftin 350ms ease-in-out;
  -o-animation: slideleftin 350ms ease-in-out;
  animation: slideleftin 350ms ease-in-out;
}

.sliderightout {
  -webkit-animation: sliderightout 350ms ease-in-out;
  -moz-animation: sliderightout 350ms ease-in-out;
  -ms-animation: sliderightout 350ms ease-in-out;
  -o-animation: sliderightout 350ms ease-in-out;
  animation: sliderightout 350ms ease-in-out;
}

.com-rightBox-title {
  height: 8%;
  border-bottom: 1px solid #E7EBEE;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  padding: 0 3rem;
  justify-content: space-between;
}

</style>
