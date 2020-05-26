import Taro from "@tarojs/taro";
import Tips from '@/utils/tips'
import BASEHOST from "../config";
import storage from "./storage";

//判断平台
export function getPlatform() {
  const platfrom = Taro.getEnv();
  return {
    isRN: platfrom === Taro.ENV_TYPE.RN, //React Native 环境
    isWeb: platfrom === Taro.ENV_TYPE.WEB, //网页、H5环境
    isWX: platfrom === Taro.ENV_TYPE.WEAPP, //微信小程序环境
    isSwan: platfrom === Taro.ENV_TYPE.SWAN, //百度小程序环境
    isAlipay: platfrom === Taro.ENV_TYPE.ALIPAY, // 支付宝小程序环境
    isTT: platfrom === Taro.ENV_TYPE.TT // 字节跳动小程序环境
  };
}

// // 设置一个全局对象
// const globalData = {};

// export function setGlobalData(key, val) {
//   globalData[key] = val;
// }

// export function getGlobalData(key) {
//   return globalData[key];
// }

//判断是否在微信内置浏览器
export function is_Weixin () {
  var ua = navigator.userAgent.toLowerCase();
  
  return /MicroMessenger/i.test(ua)

//   if(ua.match(/MicroMessenger/i)=="micromessenger") {
//     return true
//   }else{
//    　return false;      
// 　}
}

//判断手机是否安装微信
export function weixinApp(url){
  let timeout, t=1000, hasApp = true
  setTimeout(()=>{
    if(!hasApp){
      //没有安装微信
      Taro.showModal({
        title: '您还没有安装微信，请先安装微信！',
        confirmColor : '#F87C6A'
      }).then(res =>{
        if(res.confirm){
          location.href = 'http://weixin.qq.com'
        }
      })
    }
    document.body.removeChild(ifr)

  },2000)

  let t1 = Date.now()
  let ifr = document.createElement('iframe')
  ifr.setAttribute('src', url)
  ifr.setAttribute('style', 'display:none'); 
  document.body.appendChild(ifr); 
  
  timeout = setTimeout(()=>{
    let t2 = Date.now()
    if(!t1||t2-t1 < t+100){
      hasApp = false
    }
  },t)
}

// 对象转为数组对象
export function setArrayObject(obj) {
  let arr = [];
  for (let [key, value] of Object.entries(obj)) {
    arr.push({ key, name: value });
  }
  return arr;
}
// 对象转为数组
export function setArray(obj) {
  let arr = [];
  for (let [key, value] of Object.entries(obj)) {
    arr.push(value);
  }
  return arr;
}

//分平台阻止事件冒泡
export function stopPropagation(e) {
  if (!getPlatform().isRN) {
    e.stopPropagation();
  }
}

export function preventDefault(e) {
  if (!getPlatform().isRN) {
    e.preventDefault();
  }
}

var stdArray = {};
stdArray.splitString = function(str, type = ",") {
  if (!str || str.length <= 0) {
    return [];
  }
  str += "";
  return str.split(type);
};

export default stdArray; //数组扩展操作

export const stdConfig = {}; //配置表
stdConfig.category = null;
stdConfig.shopcategory = null;
stdConfig.isToken = false;
stdConfig.isCategory = false;
stdConfig.isShopcategory = false;

stdConfig.sendConfig = function(category = "category") {
  return stdConfig[category]; // 部分帖子发布页面存在这个方法 统一修改后删掉该方法
  // if (stdConfig[category]) {
  //   return true;
  // }
  // let token = storage.getInstance().getToken();
  // return Taro.request({
  //   url:
  //     category === "category"
  //       ? `${BASEHOST}/api/homepage/getSecondCategory`
  //       : `${BASEHOST}/api/shop/shopcategory`,
  //   method: "POST",
  //   data: JSON.stringify({ token: token })
  // })
  //   .then(res => {
  //     if (Taro.getEnv() === Taro.ENV_TYPE.RN) {
  //       stdConfig[category] = res.data.data;
  //     } else {
  //       stdConfig[category] = res;
  //     }
  //   })
  //   .catch(res => console.log(res));
};

stdConfig.setData = function(val) {
  stdConfig[category] = val;
};

stdConfig.getDataShop = function(...value) {
  const data = stdConfig.shopcategory;
  if (!data) return;
  let key;
  if (!value) {
    key = data;
  }
  if (value.length === 1) {
    Object.keys(data).find(k => {
      if (k === value[0]) {
        key = data[k].title;
      }
    });
  }
  if (value.length === 2) {
    let k = value[0];
    Object.keys(data[k].list).find(v => {
      if (v == value[1]) {
        key = data[k].list[v];
      }
    });
  }

  return key;
};

stdConfig.getData = function(...value) {
  const category = "category";
  if(!stdConfig[category]){
    return;
  }
  if (!value || value.length < 1) {
    return stdConfig[category];
  }
  if (value.length == 3) {
    if (!value[0]) {
      return value[0];
    }
    return stdConfig[category][value[0]][value[1]][value[2]];
  } else if (value.length == 2) {
    if (!value[0]) {
      return value[0];
    }
    let data = stdConfig[category][value[0]][value[1]];

    if (Object.prototype.toString.call(data) === "[object Object]") {
      let arr = [];
      for (let i in data) {
        arr.push({ key: i, name: data[i], value: i });
      }
      return arr;
    } else {
      return data;
    }
  } else if (value.length == 1) {
    return stdConfig[category][value[0]];
  }
};
