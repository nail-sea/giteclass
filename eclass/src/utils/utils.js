import Taro from "@tarojs/taro";
import { requestConfig } from "@/config/requestConfig";
import Storage from "@/utils/storage";
import BASEHOST , {HOST}from "../config";

var utils = {};

let throttleTimer = {};
// TODO 多处地方同时调用throttle时，如果第一个传的是ahead = true，另外一个传的是ahead = false, 有可能造成两个的method方法都不会被调用
utils.throttle = ({ method, delay = 300, ahead = false, type = "common" }) => {
  // console.log('已阻止频繁触发..........', ahead)
  if (ahead && !throttleTimer[type]) {
    method();
  }
  clearTimeout(throttleTimer[type]);
  throttleTimer[type] = setTimeout(() => {
    if (!ahead) {
      method();
    }
    clearTimeout(throttleTimer[type]);
    throttleTimer[type] = undefined;
  }, delay);
};

utils.vibrateShort = () => {
  if (process.env.TARO_ENV != "h5") {
    Taro.vibrateShort();
  }
};
//拼接字符串，以逗号
utils.stringJoin = (...arr) => {
  let str = "";
  for (var i = 0; i < arr.length; i++) {
    str += arr[i] + ",";
  }

  if (str.length > 0) {
    str = str.substr(0, str.length - 1);
  }
  return str;
};

utils.getValueFromArray = (arr, key, name = "name", keyname = "key") => {
  for (let i in arr) {
    let obj = arr[i];
    if (obj[keyname] == key) {
      return obj[name];
    }
  }
  return null;
};
utils.isNil = input => {
  if (!input && typeof input !== "object") return true;
  if (typeof input === "object") return Object.keys(input).length === 0;
  return false;
};

utils.getPageUrl = (num = 1) => {
  //获取完整路由地址 用以刷新  num为前几个页面 1表示当前页
  const pages = Taro.getCurrentPages();
  let url = "/pages/home/index";
  if (Taro.getEnv() == Taro.ENV_TYPE.WEB) {
    // console.log("getPageUrl",pages)
    let curPage = null;
    for (let i = pages.length - num; i >= 0; i--) {
      if (pages[i]) {
        curPage = pages[i];
        break;
      }
    }
    // console.log(curPage)
    if (curPage) {
      let params = curPage.$router.params;
      var p = "";
      if (params != {}) {
        p = "?";
        for (let i in params) {
          p += i + "=" + params[i] + "&";
        }
        p = p.substr(0, p.length - 1);
      }
      url = curPage.$router.path + p;
    }
  } else {
    // console.log("getPageUrl",pages)
    url = "/" + pages[pages.length - num].route;
  }

  return url;
};
utils.getPageLength = () => {
  //获取完整路由地址 用以刷新  num为前几个页面 1表示当前页
  const pages = Taro.getCurrentPages();
  if (Taro.getEnv() == Taro.ENV_TYPE.WEB) {
    let num = 0;
    for (let i = pages.length -1; i >= 0; i--) {
      if (pages[i]) {
        num +=1;
      }
    }
    return num;
  }

  return pages.length;
};

utils.getUrlParams = (params, filter = false) => {
  let urlParams = '?'
  for (let key in params){
    if(!filter || (key != 'url' && key != 'params')){
      urlParams += `${key}=${params[key]}&`
    }
  }
  urlParams = urlParams.slice(0, urlParams.length - 1)
  urlParams = urlParams == '?' ? '' : urlParams
  return urlParams
}

utils.getPageIndex = (url) => {
  const pages = Taro.getCurrentPages();
  if (Taro.getEnv() == Taro.ENV_TYPE.WEB) {
    let index = 0;
    for (let i = 0; i < pages.length; i++) {
      if (pages[i] && pages[i].vnode && pages[i].vnode._owner) {
        const route = pages[i].vnode._owner.props.path;
        if (url == route) {
          return i - index
        }
      } else {
        index += 1;
      }
    }
  } else {
    for (let i = pages.length - 1; i >= 0; i--) {
      const route = "/" + pages[i].route;
      if (url == route) {
        return pages.length - i
      }
    }
  }
  return 0;
};


utils.transCategoryData = function (data) {
  const arr = []
  for (const key in data) {
    const element = data[key];
    const children = Object.keys(element.list).map(key => ({
      label: element.list[key],
      value: key
    }))
    arr.push({
      label: element.title,
      value: key,
      children
    })
  }
  return arr
}

/**
 * 
 * 返回对相应的数据类型
 */    
function getType(data) {
return Object.prototype.toString.call(data).substring(8).split(/]/)[0]
}

/**
 * 
 * @param {*} sourceObj     
 * @param {*} compareObj    
 * 
 * 比较对象是否相等
 * 
 */
utils.comparisonObject = function(x, y) {
  if (arguments.length < 2) throw "Incorrect number of parameters";
  var i, l, leftChain, rightChain;

  function compare2Objects(x, y) {
    var p;

    // remember that NaN === NaN returns false
    // and isNaN(undefined) returns true
    if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
        return true;
    }

    // Compare primitives and functions.     
    // Check if both arguments link to the same object.
    // Especially useful on the step where we compare prototypes
    if (x === y) {
        return true;
    }

    // Works in case when functions are created in constructor.
    // Comparing dates is a common scenario. Another built-ins?
    // We can even handle functions passed across iframes
    if ((typeof x === 'function' && typeof y === 'function') ||
        (x instanceof Date && y instanceof Date) ||
        (x instanceof RegExp && y instanceof RegExp) ||
        (x instanceof String && y instanceof String) ||
        (x instanceof Number && y instanceof Number)) {
        return x.toString() === y.toString();
    }

    // At last checking prototypes as good as we can
    if (!(x instanceof Object && y instanceof Object)) {
        return false;
    }

    if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
        return false;
    }

    if (x.constructor !== y.constructor) {
        return false;
    }

    if (x.prototype !== y.prototype) {
        return false;
    }

    // Check for infinitive linking loops
    if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
        return false;
    }

    // Quick checking of one object being a subset of another.
    // todo: cache the structure of arguments[0] for performance
    for (p in y) {
        if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
            return false;
        } else if (typeof y[p] !== typeof x[p]) {
            return false;
        }
    }

    for (p in x) {
        if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
            return false;
        } else if (typeof y[p] !== typeof x[p]) {
            return false;
        }

        switch (typeof(x[p])) {
            case 'object':
            case 'function':

                leftChain.push(x);
                rightChain.push(y);

                if (!compare2Objects(x[p], y[p])) {
                    return false;
                }

                leftChain.pop();
                rightChain.pop();
                break;

            default:
                if (x[p] !== y[p]) {
                    return false;
                }
                break;
        }
    }

    return true;
  }

  if (arguments.length < 1) {
    return true; //Die silently? Don't know how to handle such case, please help...
    // throw "Need two or more arguments to compare";
  }

  for (i = 1, l = arguments.length; i < l; i++) {

    leftChain = []; //Todo: this can be cached
    rightChain = [];

    if (!compare2Objects(arguments[0], arguments[i])) {
        return false;
    }
  }

  return true;
}


utils.getType = function getType(obj) {
  if (Object.prototype.toString.call(obj) == "[object Object]") {
    return "Object";
  } else if (Object.prototype.toString.call(obj) == "[object Array]") {
    return "Array";
  } else {
    return "nomal";
  }
};

utils.deepCopy = function deepCopy(obj) {
  if (utils.getType(obj) == "nomal") {
    return obj;
  } else {
    var newObj = utils.getType(obj) == "Object" ? {} : [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = utils.deepCopy(obj[key]);
      }
    }
  }
  return newObj;
};


utils.money=function(str){
  var reg=/(\d)(?=(?:\d{3})+\b)/g
  return  str.replace(reg,'$1,')
}

export default utils;
