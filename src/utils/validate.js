/* 是否是公司邮箱*/
export function isWscnEmail(str) {
  const reg = /^[a-z0-9](?:[-_.+]?[a-z0-9]+)*@wallstreetcn\.com$/i;
  return reg.test(str.trim());
}
/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(textval);
}
/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}
/* 验证key*/
// export function validateKey(str) {
//     var reg = /^[a-z_\-:]+$/;
//     return reg.test(str);
// }
/* 正整数*/
export function validateNumCase(str) {
  const reg = /^\+?[1-9][0-9]*$/;
  return reg.test(str);
}
/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}
/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}
/* 标签状态 0：离线，1：离线，2：在线*/
export function inUseFormat(value) {
  if (value === 0) {
    return "离线"
  }
  if (value === 1) {
    return "离线"
  }
  if (value === 2) {
    return "在线"
  }
}
//设备管理 标签查询标签状态   
export function inUseFormat1(value) {
  if (value === 0) {
    return "未绑定"
  }
  if (value === 1) {
    return "绑定"
  }
  if (value === 2) {
    return "绑定失败"
  }
}
export function inUseFormat2(value) {
  if (value === 0) {
    return "未更新"
  }
  if (value === 1) {
    return "正在更新"
  }
  if (value === 2) {
    return "更新失败"
  }
  if (value === 3) {
    return "更新成功"
  }
}
// tagStatus 状态 1：在线，2：离线
export function tagStatus(value) {
  if (value === 1) {
    return "在线"
  }
  if (value === 2) {
    return "离线"
  }
}
/* "isActive": "integer,0：无效，1：有效"*/
export function isActiveFormat(value) {
  if (value === 0) {
    return "无效"
  }
  if (value === 1) {
    return "有效"
  }
}
// inUseFormat3 "integer,0：不显示，1：显示
export function inUseFormat3(value) {
  if (value === 0) {
    return "不显示"
  }
  if (value === 1) {
    return "显示"
  }
}

// inUseFormat4 "integer,1：字符，2：数字，3：时间
export function inUseFormat4(value) {
  if (value === 1) {
    return "字符"
  }
  if (value === 2) {
    return "数字"
  }
  if (value === 3) {
    return "时间"
  }
}
//inUseFormat5 "integer,0：否，1：是  
export function inUseFormat5(value) {
  if (value === 0) {
    return "否"
  }
  if (value === 1) {
    return "是 "
  }
}
/*基站在线状态 状态 0：离线，1：在线，*/
export function inUseFormat6(value) {
  if (value === 0) {
    return "离线"
  }
  if (value === 1) {
    return "在线"
  }

}
//数据同步 inUseFormat7状态
export function inUseFormat7(value) {
  if (value === 'false') {
    return "未绑定"
  }
  if (value === 'true') {
    return "绑定"
  }

}
//actionLevel优先级别 "integer,1：大于，2：等于，3：小于
export function level(value) {
  switch (value) {
    case 1:
      return '等于';
      break;
    case 2:
      return '大于';
      break;
    case 3:
      return '小于';
      break;
    case 4:
      return '大于等于';
      break;
    case 5:
      return '小于等于';
      break;
    case 6:
      return '不等于';
      break;
    default:
      return '包含';
      break;
  }
}
// authorization 手持机连接状态"integer,0：不授权，1：授权
export function authorization(value) {
  if (value === 0) {
    return "不授权"
  }
  if (value === 1) {
    return "授权"
  }
}
/*保留两位小数 */
export function dataRatePercent(value) {
  if (value < 0) {
    return -parseFloat((value * 100).toFixed(2))
  }
  return parseFloat((value * 100).toFixed(2))
}
/*排序*/
export function convertData(arr, type) {
  return arr.sort(function(a, b) {
    return a[type] - b[type]
  })
}
//10进制装16进制转换
export function IntoSystem(value) {
  value = (value >= 0 ? value : 0x100000000 + value).toString(16)
  return value.substr(6, 2) + value.substr(4, 2) + value.substr(2, 2) + value.substr(0, 2);
}
//16进制转10进制
export function IntoSystem10(value) {
  value = value.substr(6, 2) + value.substr(4, 2) + value.substr(2, 2) + value.substr(0, 2);
  return value = (parseInt(value, 16)) << 0
}
//基站编号进制转换
export function IntoSystemBs(value) {
  return value = (value >= 0 ? value : 0x100000000 + value).toString(16)
}
