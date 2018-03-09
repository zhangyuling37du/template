  
/**
 *拖动事件
 */
 import store from '../vuex'
  const canType = function(val) {

    switch (val.className) {
      case "textType":
        return 0;
        break;
      case "photoType":
        return 1;
        break;
      case "barcodeType":
        return 2;
        break;
      case "RECType":
        return 3;
        break;
      case "priceType":
        return 4;
        break;
      default:
        return -1;
        break;
    }
  }
  export default {
    install(Vue) {
      let oDiv = null;
      let nowDiv = null;

      function darg(el, binding, v) {
        oDiv = el.parentNode
        let canvas = el.parentNode.parentNode
        let type = canType(oDiv);
        let vw = null;
        let vh = null;
        oDiv.onmousedown = function(e) {
          let deletID = store.getters.deletID
          nowDiv = e.target.parentNode.parentNode;
          //鼠标按下，计算当前元素距离可视区的距离
          let disX = e.clientX - nowDiv.offsetLeft;
          let disY = e.clientY - nowDiv.offsetTop;
          binding.value({ deletID })
          document.onmousemove = function(e) {
            console.log(store.getters.isDrag);
            //通过事件委托，计算移动的距离 
            if (store.getters.isDrag) {
              //通过事件委托，计算移动的距离 
              let x = e.clientX - disX;
              let y = e.clientY - disY;
              let _w = canvas.clientWidth - nowDiv.offsetWidth
              let _h = canvas.clientHeight - nowDiv.offsetHeight
              //范围控制
              x = (x < 0) ? 0 : x;
              x = (x > _w) ? _w : x;
              y = (y < 0) ? 0 : y;
              y = (y > _h) ? _h : y;
              //移动当前元素  
              nowDiv.style.left = x + 'px';
              nowDiv.style.top = y + 'px';
              //将此时的位置传出去
              binding.value({ x, y, type, deletID })
              return
            }
            vw = e.offsetX;
            vh = e.offsetY;
            let vw1 = e.offsetX;
            let vh1 = e.offsetY;
              if (e.layerX < 0 || e.layerY < 0) return
            // if (e.toElement.className !=="canvas") {
            // console.log(vw, vh);
            // console.log(e);
            // console.log(e.toElement.className) ;
            // console.log(e.toElement.nodeName == 'DIV');
            //  return
            // }
            binding.value({ vw1, vh1, type, deletID })
          };
          document.onmouseup = function(e) {
            if (!store.getters.isDrag) {
              binding.value({ vw, vh, type, deletID })
            }
            document.onmousemove = null;
            document.onmouseup = null;
            if (store.getters.isDrag ==false &&  document.onmouseup == null) {
              // this.$store.commit('SET_ISDRAG', true);
              // console.log(12)
              console.log(store.getters.isDrag);
            }
          };
          return false;
        };
      }
      //放大和缩小在切换时要点击触发 true false切换
      Vue.directive('drag', {
        bind(el, binding, v) {
          setTimeout(() => {
            darg(el, binding, 'drag')
          }, 0);
        },
      });
    }
  }
