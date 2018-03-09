//模板旋转
export function toolRotate(val, textList, picList, barcodeList, demicalpriceList, rectangleList, degreeNum) {
  let a = val.substring(0, 1)
  if (a == "t") {
    let index = val.replace('t', '')
    textList[index].degree = degreeNum;
  } else if (a == "c") {
    let index = val.replace('c', '')
    picList[index].degree = degreeNum;
  } else if (a == "b") {
    let index = val.replace('b', '')
    barcodeList[index].degree = degreeNum;
  } else if (a == "p") {
    let index = val.replace('p', '')
    this.canvas.demicalpriceList[b].degree = degreeNum;
  } else if (a == "r") {
    let index = val.replace('r', '')
    rectangleList[index].degree = degreeNum;
  }
}
//模板删除
export function toolDelete(deletID, textList, picList, barcodeList, demicalpriceList, rectangleList, layerlist) {
  let a = deletID.substring(0, 1)
  if (a == "t") {
    let index = deletID.replace('t', '')
    textList.splice(index, 1);
    layerlist.filter((v, i) => {
      if (textList[index].photoshopT == v.photoshopT) {
        layerlist.splice(i, 1);
      }
    })

  } else if (a == "c") {
    let index = deletID.replace('c', '')
    picList.splice(index, 1);
    layerlist.filter((v, i) => {
      if (picList[index].photoshopP == v.photoshopP) {
        layerlist.splice(i, 1);
      }
    })
  } else if (a == "b") {
    let index = deletID.replace('b', '')
    barcodeList.splice(index, 1);
    layerlist.filter((v, i) => {
      if (barcodeList[index].photoshopB == v.photoshopB) {
        layerlist.splice(i, 1);
      }
    })
  } else if (a == "p") {
    let index = deletID.replace('p', '')
    demicalpriceList.splice(index, 1);
    layerlist.filter((v, i) => {
      if (demicalpriceList[index].photoshopD == v.photoshopD) {
        layerlist.splice(i, 1);
      }
    })
  } else if (a == "r") {
    let index = deletID.replace('r', '')
    rectangleList.splice(index, 1);
    layerlist.filter((v, i) => {
      if (rectangleList[index].photoshopE == v.photoshopE) {
        layerlist.splice(i, 1);
      }
    })
  }
}
//模板放大
export function toolScaleChange(percentageW, percentageH, textList, picList, barcodeList, demicalpriceList, rectangleList) {
  if (textList.length) {
    textList.map(v => {
      v.width = parseInt(v.w1 * percentageW)
      v.heigth = parseInt(v.h1 * percentageH)
      v.x = parseInt(v.x1 * percentageW)
      v.y = parseInt(v.y1 * percentageH)
      console.log(v.x, v.y)
      return v
    })
  }
  if (picList.length) {
    picList.map(v => {
      v.width = parseInt(v.w1 * percentageW)
      v.heigth = parseInt(v.h1 * percentageH)
      v.x = parseInt(v.x1 * percentageW)
      v.y = parseInt(v.y1 * percentageH)
      return v
    })
  }
  if (barcodeList.length) {
    barcodeList.map(v => {
      v.width = parseInt(v.w1 * percentageW)
      v.heigth = parseInt(v.h1 * percentageH)
      v.x = parseInt(v.x1 * percentageW)
      v.y = parseInt(v.y1 * percentageH)
      return v
    })
  }
  if (demicalpriceList.length) {
    demicalpriceList.map(v => {
      v.width = parseInt(v.w1 * percentageW)
      v.heigth = parseInt(v.h1 * percentageH)
      v.x = parseInt(v.x1 * percentageW)
      v.y = parseInt(v.y1 * percentageH)
      return v
    })
  }
  if (rectangleList.length) {
    rectangleList.map(v => {
      v.width = parseInt(v.w1 * percentageW)
      v.heigth = parseInt(v.h1 * percentageH)
      v.x = parseInt(v.x1 * percentageW)
      v.y = parseInt(v.y1 * percentageH)
      return v
    })
  }
}
//模板删除多余属性
export function toolDeleteInfo(textList, picList, barcodeList, demicalpriceList, rectangleList) {
  if (textList.length > 0 || barcodeList.length > 0 || picList.length > 0 || demicalpriceList.length > 0 || rectangleList.length > 0) {
    textList.map(v => {
      Reflect.deleteProperty(v, 'picString')
      Reflect.deleteProperty(v, 'x1')
      Reflect.deleteProperty(v, 'y1')
      Reflect.deleteProperty(v, 'w1')
      Reflect.deleteProperty(v, 'h1')
      Reflect.deleteProperty(v, 'photoshopT')

      return v
    })
    picList.map(v => {
      Reflect.deleteProperty(v, 'x1')
      Reflect.deleteProperty(v, 'y1')
      Reflect.deleteProperty(v, 'w1')
      Reflect.deleteProperty(v, 'h1')
      Reflect.deleteProperty(v, 'photoshopP')
      return v
    })
    barcodeList.map(v => {
      Reflect.deleteProperty(v, 'picString')
      Reflect.deleteProperty(v, 'x1')
      Reflect.deleteProperty(v, 'y1')
      Reflect.deleteProperty(v, 'w1')
      Reflect.deleteProperty(v, 'h1')
      Reflect.deleteProperty(v, 'photoshopB')
      return v
    })
    demicalpriceList.map(v => {
      Reflect.deleteProperty(v, 'picString')
      Reflect.deleteProperty(v, 'x1')
      Reflect.deleteProperty(v, 'y1')
      Reflect.deleteProperty(v, 'w1')
      Reflect.deleteProperty(v, 'h1')
      Reflect.deleteProperty(v, 'photoshopD')
      return v
    })
    rectangleList.map(v => {
      Reflect.deleteProperty(v, 'photoshopE')
      Reflect.deleteProperty(v, 'x1')
      Reflect.deleteProperty(v, 'y1')
      Reflect.deleteProperty(v, 'w1')
      Reflect.deleteProperty(v, 'h1')
      Reflect.deleteProperty(v, 'h1')
      return v
    })
  }
}
//模板保存 放大缩小设置
export function toolScaleSave(percentageW, percentageH, textList, picList, barcodeList, demicalpriceList, rectangleList) {
  if (textList.length || picList.length || barcodeList.length || demicalpriceList.length || rectangleList.length) {
    textList.map(v => {
      v.width = parseInt(v.width / percentageW)
      v.heigth = parseInt(v.heigth / percentageH)
      v.x = parseInt(v.x / percentageW)
      v.y = parseInt(v.y / percentageH)
      return v
    })
    picList.map(v => {
      v.width = parseInt(v.width / percentageW)
      v.heigth = parseInt(v.heigth / percentageH)
      v.x = parseInt(v.x / percentageW)
      v.y = parseInt(v.y / percentageH)
      return v
    })
    barcodeList.map(v => {
      v.width = parseInt(v.width / percentageW)
      v.heigth = parseInt(v.heigth / percentageH)
      v.x = parseInt(v.x / percentageW)
      v.y = parseInt(v.y / percentageH)
      return v
    })
    demicalpriceList.map(v => {
      v.width = parseInt(v.width / percentageW)
      v.heigth = parseInt(v.heigth / percentageH)
      v.x = parseInt(v.x / percentageW)
      v.y = parseInt(v.y / percentageH)
      return v
    })
    rectangleList.map(v => {
      v.width = parseInt(v.width / percentageW)
      v.heigth = parseInt(v.heigth / percentageH)
      v.x = parseInt(v.x / percentageW)
      v.y = parseInt(v.y / percentageH)
      console.log(v.width, v.heigth)
      return v
    })
  }
}
//模板删除属性
export function toolDeleteReflect(data) {
  Reflect.deleteProperty(data, 'picString')
  Reflect.deleteProperty(data, 'w1')
  Reflect.deleteProperty(data, 'h1')
  Reflect.deleteProperty(data, 'x1')
  Reflect.deleteProperty(data, 'y1')
}

const textform = {
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
const photoform = {
  x: 0,
  y: 0,
  width: 200,
  heigth: 100,
  picUrl: '',
  mapLayer: this.mapLayer,
  degree: 0,
  picBackgroundColor: 0,
}
const barcodeform = {
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
const priceform = {
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
const RECform = {
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
export default { textform, photoform, barcodeform, RECform, priceform }
//模板图层顺序

export function toolMaplayer(maplist, textList, picList, barcodeList, demicalpriceList, rectangleList) {
  let layerlist = []
  if (textList.length > 0 || barcodeList.length > 0 || picList.length > 0 || demicalpriceList.length > 0 || rectangleList.length > 0) {
    textList.map(v => {
      maplist.push(v.mapLayer)
    })
    picList.map(v => {
      maplist.push(v.mapLayer);
    })
    barcodeList.map(v => {
      maplist.push(v.mapLayer);
    })
    demicalpriceList.map(v => {
      maplist.push(v.mapLayer);
    })
    rectangleList.map(v => {
      maplist.push(v.mapLayer);
    })
  }
  maplist.sort(sortNumber)
}
export function sortNumber(a, b) {
  return (a < b) ? 1 : -1
}
//多个属性值排序
export function sortComputed(a, b) {
  var c, d;
  for (var i in a) {
    console.log(a)
    c = a[i]
  }
  for (var j in b) {
    d = b[j]
  }
  return c - d;
}
