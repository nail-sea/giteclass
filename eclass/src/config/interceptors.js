import Taro, { request } from "@tarojs/taro";
import { HTTP_STATUS } from "./index";
import utils from '@/utils/utils'
import { stdConfig } from "@/utils/common";
import storage from "@/utils/storage";
import times from "@/utils/times";
import Dq from "@/config/Dq";
import ENUM from "@/config/enum";

function showError(message, show = true) {
  show &&
    Taro.showToast({
      title: message || "请求异常",
      icon: "none"
    });
  return Promise.reject(message || "请求异常");
}

const customInterceptor = function (chain) {
  const requestParams = chain.requestParams;
  const { showToast } = requestParams;
  return chain
    .proceed(requestParams)
    .catch(res => {
      // 这个catch需要放到前面才能捕获request本身的错误，因为showError返回的也是Promise.reject
      console.error('request interceptor: ',res);
      Taro.showToast({
        title: '错误接口消息',
        icon: "none"
      });
      return null;
      // return showError(res.message, showToast);
    })
    .then(async (res) => {
      if(!res || res.statusCode == null){
        return null;
      }
      if(res.data.currentTime){
        times.setTime(res.data.currentTime);
      }
      // 只要请求成功，不管返回什么状态码，都走这个回调
      if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
        return showError("请求资源不存在", showToast);
      } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
        return showError("服务端出现了问题", showToast);
      } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
        return showError("需要鉴权", showToast);
      } else if (res.statusCode === HTTP_STATUS.OVERDUE//token过期
        || res.statusCode === HTTP_STATUS.ILLEGAL) {//非法请求
        const token = storage.getInstance().getToken()
        if(token && token.length > 0){
          stdConfig.isToken = false;
          stdConfig.isCategory = false;
          stdConfig.isShopcategory = false;
          storage.getInstance().setToken('')
          const url = utils.getPageUrl()
          Dq.redirectTo({
            url: url
          })
        }
        return ;
      } else if (res.statusCode >= 400) {
        let errorMsg = res.data && res.data.message;
        return showError(errorMsg, showToast);
      } else if (res.statusCode == HTTP_STATUS.SUCCESS) {
        return new Promise((resolve, reject) => {
          if(res.data.code == 200){
              if (Object.prototype.toString.call(res.data.data) === '[object Object]' && Object.keys(res.data.data).length <= 0) {
                resolve(null)
              }else{
                resolve(res.data.data)
              }
          } else if (res.data.code === 117){
            Dq.redirectTo({
              url: ENUM.LOGINURL
            });
          }else if (res.data.code === HTTP_STATUS.OVERDUE || res.data.code === HTTP_STATUS.ILLEGAL){
            const token = storage.getInstance().getToken()
            if(token && token.length > 0){
              stdConfig.isToken = false;
              stdConfig.isCategory = false;
              stdConfig.isShopcategory = false;
              storage.getInstance().setToken('')
              const url = utils.getPageUrl()
              Dq.redirectTo({
                url: url
              })
            }
            // resolve(res.data.data)
            reject(res.data.message)
          } else {
            Taro.showToast({
              title: res.data.message,
              icon: "none"
            });
            reject(res.data.message)
          }
        })
        // if (Object.prototype.toString.call(res.data.data) === '[object Number]') {
        //   return res.data.data;
        // }
        if (Object.prototype.toString.call(res.data.data) === '[object Object]' && Object.keys(res.data.data).length <= 0) {
          return null;
        }

        return res.data.data;
      } else {
        return showError("请求异常", showToast);
      }
    });
};

const interceptors = [customInterceptor];
if (Taro.getEnv() !== Taro.ENV_TYPE.RN) {
  interceptors.push(Taro.interceptors.logInterceptor)
}

export default interceptors;
