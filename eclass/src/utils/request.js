import Taro, { Component } from "@tarojs/taro";
import BASEHOST ,{HOST} from "../config";
import { commonParams, requestConfig } from "../config/requestConfig";
import interceptors from "../config/interceptors";
import Tips from "./tips";
import storage from "@/utils/storage";
import global from "./global";
import { stdConfig } from "./common";
import CryptoJS from 'crypto-js'
import times from "./times";

// if (Taro.getEnv() !== Taro.ENV_TYPE.RN) {
  interceptors.forEach(i => Taro.addInterceptor(i));
// }

var objToKeyValue = function(param, key, encode) {
  if (param == null) return "";
  var paramStr = "",
    t = typeof param;
  if (t == "string" || t == "number" || t == "boolean") {
    paramStr += "&" + key + "=" + param; //((encode == null || encode) ? encodeURIComponent(param) : param);
  } else {
    for (var i in param) {
      var k =
        key == null
          ? i
          : key + (param instanceof Array ? "[" + i + "]" : "." + i);
      paramStr += objToKeyValue(param[i], k, encode);
    }
  }
  return paramStr;
};

var addKeyValue = function(str , key , value){
  if(str && str.length > 0){
    str += `&${key}=${value}`;
  }else{
    str += `${key}=${value}`;
  }
  return str;
}

var IV = '8NONwyJtHesysWpM';
var KEY = 'UITN25LMUQC436IM';
var data = 'ABCDEFGH';

// 加密
function encrypt(str) {
    var key = CryptoJS.enc.Utf8.parse(KEY);
    var iv = CryptoJS.enc.Utf8.parse(IV);
    var encrypted = CryptoJS.AES.encrypt(str,key,{iv:iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7});
    return encrypted.toString();
}

// 解密
function decrypt(str) {
    var key = CryptoJS.enc.Utf8.parse(KEY);
    var iv = CryptoJS.enc.Utf8.parse(IV);
    var decrypted = CryptoJS.AES.decrypt(str,key,{iv:iv,padding:CryptoJS.pad.Pkcs7});
    return decrypted.toString(CryptoJS.enc.Utf8);
}

// var encode = encrypt(data);
// var decode = decrypt(encode);
// console.log(JSON.stringify({"encode":encode,"decode":decode,"iv":IV,"key":KEY,"data":data}));


export class Request {
  // 获取token的promise
  static tokenReadyPromise = Promise.resolve();

  // 正在登陆
  static isLoading = false;
  // static isToken = false
  // static isConfigCategory = false

  // 导出的API对象
  static apiLists = {};

  static throttle = (function(){
    const THROTTLE_CONFIG = {
      MIN_DURATION:100,//同一请求两次之间的最小间隔
      REQUEST_COUNT_LIMIT:50,//同一请求短时间反复请求的最大次数
      RESUME_TIME:10000,//恢复请求所需要的时间
    }
    let requestInfoList = []
    return function(request) {
      requestInfoList.push({
        count:0,
        request,
        lastRequestTS:0
      })
      return function(...args){
        let now = Date.now()
        const requestInfo = requestInfoList.find(info => info.request === request)
        if (now - requestInfo.lastRequestTS > THROTTLE_CONFIG.MIN_DURATION && requestInfo.count < THROTTLE_CONFIG.REQUEST_COUNT_LIMIT) {
          requestInfo.lastRequestTS = now
          return request(...args)
        } 
        if (requestInfo.count < THROTTLE_CONFIG.REQUEST_COUNT_LIMIT){
          requestInfo.lastRequestTS = now
          requestInfo.count++
          return request(...args)
        } 
        if (now - requestInfo.lastRequestTS > THROTTLE_CONFIG.RESUME_TIME){
          requestInfo.count = 0
          requestInfo.lastRequestTS = now
          return request(...args)
        }
        requestInfo.count ++ 
        requestInfo.lastRequestTS = now
        Tips.toast('短时间内请求次数过多')
        return null
      }
    }
  })()

  // 开始处理options
  static conbineOptions(opts, data, method) {
    var commondata = commonParams(data);
    typeof opts === "string" && (opts = { url: opts });
    let header = {'content-type': 'application/x-www-form-urlencoded', referer:HOST}//'content-type': 'application/json'//'content-type': 'application/x-www-form-urlencoded'
    // if (commondata.token) {
    //   header.Authorization = `${commondata.token}`;
    // }
  
    let msg = {};
    const data_obj = { ...commondata.body , ...opts.data, ...data };
    let time = times.getTime().toString();
    data_obj.time = time.substr(0,time.length-3);
    let data_value = JSON.stringify(data_obj);//objToKeyValue(data_obj);
    
    // if(data_value && data_value.length > 0){
    //   data_value = data_value.substr(1,data_value.length)
    // }
    // let time = times.getTime().toString();
    // data_value = addKeyValue(data_value , 'time' , time.substr(0,time.length-3));

    let sign = encrypt(data_value);
    // msg = {sign:sign};
    msg = data_obj;
    msg.sign = sign;
    if(commondata.token){
      msg.token = `${commondata.token}`;
    }
    // if(commondata.token){
    //   msg.token = commondata.token;
    // }
    // console.log("sign:url=%s , msg=%s",opts.url , JSON.stringify(data_obj))
    // console.log("sign:", data_value)
    // console.log("decode:", decrypt(sign))
    const host = process.env.NODE_ENV === 'production' && process.env.TARO_ENV === 'h5' && global.realm.length > 0 
                    ? BASEHOST.replace('enet' , 'enet' + global.realm) : BASEHOST;
    return {
      data: msg,
      method: opts.method || data.method || method || "GET",
      url: `${global.header}${host}${opts.url}`,//${opts.host || BASEHOST}
      header: {...header}
    };
  }

  //检查token
  static checkToken() {
    let token = storage.getInstance().getToken();
    if (!token) {
      // stdConfig.isToken = true;
      // let token = storage.getInstance().getToken();
      if (!token || token.length <= 0) {
        this.tokenReadyPromise = this.onGetToken();
      }
    }
    // if (!stdConfig.isToken) {
    //   stdConfig.isToken = true;
    //   let token = storage.getInstance().getToken();
    //   if (!token || token.length <= 0) {
    //     this.tokenReadyPromise = this.onGetToken();
    //   }
    // }
    return this.tokenReadyPromise;
  }

  //检查token
  // static async checkToken() {
  //     let token = storage.getInstance().getToken()
  //     if(!token){
  //       token = await storage.getInstance().initToken()
  //       if (!token) this.tokenReadyPromise = this.onGetToken()
  //     }
  //   return this.tokenReadyPromise
  // }

  static onGetToken() {
    return new Promise(async (resolve, reject) => {
      let data = await Taro.request({
        url: `${BASEHOST}/api/user/gettoken`,
        data: {}
      });
      if (data) {
        this.isToken = true;
        if (Taro.getEnv() === Taro.ENV_TYPE.RN) {
          Promise.all([
            storage.getInstance().setToken(data.data.data.token),
            storage.getInstance().setLoginState(data.data.data.is_login)
          ])
            .then(resolve)
            .catch(reject);
        } else {
          storage.getInstance().setToken(data.token);
          storage.getInstance().setLoginState(data.is_login);
          resolve();
        }
      } else {
        reject();
      }
    });
  }

  // 检查配置
  // static checkConfig() {
  //   if (stdConfig.isCategory) {
  //     return;
  //   }
  //   stdConfig.isCategory = true;
  //   let config = stdConfig.getData();
  //   if (!config) {
  //     return stdConfig.sendConfig();
  //   }
  // }
  // static checkConfigShop() {
  //   if (stdConfig.isShopcategory) {
  //     return;
  //   }
  //   stdConfig.isShopcategory = true;
  //   let config = stdConfig.getDataShop();
  //   if (!config) {
  //     return stdConfig.sendConfig("shopcategory");
  //   }
  // }
  /**
   * 基于 Taro.request 的 request 请求
   *
   * */
  static request(opts) {
    if (opts.data instanceof Object) {
      // opts.data = objToKeyValue(opts.data);
      opts.data = JSON.stringify(opts.data);
    }
    console.log("opts",opts);
    // Taro.request 请求
    return Taro.request(opts);
  }

  /**
   * 创建请求函数
   */
  static creatRequests(opts) {
    let _request =  async (data = {}, method = "POST") => {
      //await this.checkToken(); //检查token
      // await this.checkConfig(); //检查配置
      // await this.checkConfigShop(); //检查配置商店
      const _opts = this.conbineOptions(opts, data, method);
      const res = await this.request(_opts);
      return res;
    };
    return this.throttle(_request)
  }

  /**
   * 抛出API方法
   */

  static getApiList(requestConfig) {
    if (!Object.keys(requestConfig).length) {
      return {};
    }
    Object.keys(requestConfig).forEach(key => {
      this.apiLists[key] = this.creatRequests(requestConfig[key]);
    });
    return this.apiLists;
  }
}

const Api = Request.getApiList(requestConfig);
Component.prototype.$api = Api; // 挂在全局Api
export default Api;
