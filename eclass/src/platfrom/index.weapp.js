import Taro from "@tarojs/taro";
import utils from "@/utils/utils";
import Dq from "@/config/Dq";

const Platfrom = {};
Platfrom.authFrom = "/pages/user/user";
Platfrom.shareConfig = {};

Platfrom.getType = function () {
  return "mini";
};

Platfrom.getTradeType = function () {
  return "6"
}

Platfrom.appCheckAuth = function (from , params={}, e) {
  const {
    userInfo,
    iv,
    encryptedData
  } = e.detail;
  if (!userInfo) {
    return;
  }
  Taro.$store.dispatch({
    type: "Auth/putAuthorize",
    payload: userInfo
  });

  // console.log('appCheckAuth',e.detail.userInfo)
  // console.log(e.detail.userInfo)
  return new Promise((resolve, reject) => {
    // wx.checkSession({
    //   success () {
    //     //session_key 未过期，并且在本生命周期一直有效
    //     resolve(true)
    //   },
    //   fail () {
    // session_key 已经失效，需要重新执行登录流程
    wx.login({
      success(res) {
        // console.log(res.code);
        if (res.code) {
          
          Taro.$store.dispatch({
            type: "Auth/fetchMiniProgramsAuth",
            payload: {
              code: res.code,
              iv,
              encrypted_data: encryptedData
            } 
          })
          .then(res => {
            if(res){
              Platfrom.authFrom = from;
              if (res.is_mobile == 1) {
                Dq.navigateTo({
                  url: `/pages/login-register/wxbind-phone/index?mobile=${res.mobile}`
                });
              } else if (res.is_mobile == 2) {
                Dq.navigateTo({
                  url: `/pages/login-register/wxbind-phone/index`
                });
              }
              resolve(true);
            }else{
              reject();
            }
          })
          .catch(res => {
            reject();
          });
        } else {
          // console.log("登录失败！" + res.errMsg);
          reject();
        }
      }
    });
    // }
    // })
  });
};

Platfrom.authFinish = function (msg , from) {
  
};

//请求定位
Platfrom.sendLocation = function () {
  var amapFile = require("./amap-wx.js"); //如：..­/..­/libs/amap-wx.js
  return new Promise((resolve, reject) => {
    let myAmapFun = new amapFile.AMapWX({
      key: "cd756541913db261141785015a07eb36"
    });
    myAmapFun.getRegeo({
      success: function (data) {
        //成功回调
        console.log("sendMapPosition-onComplete", data[0]);
        let msg = utils.deepCopy(data[0].regeocodeData);
        msg.lng = data[0].lng;
        msg.lat = data[0].lat;
        resolve(data[0].regeocodeData);
      },
      fail: function (info) {
        // console.log('小程序请求位置失败', info)
        reject(info);
      }
    });
  });
};

//请求天气
Platfrom.sendWeather = function(address) {
  var amapFile = require("./amap-wx.js");
  return new Promise((resolve, reject) => {
    var myAmapFun = new amapFile.AMapWX({key:'cd756541913db261141785015a07eb36'});
    myAmapFun.getWeather({
      success: function(data){
        var msg = {};
        msg.weather = data.weather.data
        msg.temperature = data.temperature.data
        resolve(msg);
        //成功回调
      },
      fail: function(info){
        //失败回调
        resolve(null);
      }
    })
  });
};

//请求输入提示
Platfrom.sendAutocomplete = function () {};

Platfrom.geocoder = address => {
  return new Promise((resolve, reject) => {
    resolve("");
  });
};

//请求支付
Platfrom.sendPay = function (type , payload , callback , from) {
  //payload.amount = 0.01
  payload.pay_method = payload.pay_method || "wx";
  payload.trade_type = payload.trade_type || "6";

  Taro.$store.dispatch({
    type,
    payload
  })
  .then(res => {
    const {
      timeStamp,
      nonceStr,
      // package,
      signType,
      paySign
    } = res;

  // console.log('res.charge_obj',res)
    if(timeStamp && nonceStr && signType && paySign){
      wx.requestPayment({
        timeStamp,
        nonceStr,
        package: res.package,
        signType,
        paySign,
        success: function (res) {
          callback && callback();
        },
        fail: function (res) {},
        complete: function (res) {}
      });
    }
  })
};

//请求分享
Platfrom.sendShare = function (config) {
  Platfrom.shareConfig = config || {};
};

//跳转外部链接
Platfrom.LinksExternal = function (url) {
  Dq.navigateTo({
    url: `/pages/web-view/index?from=/pages/user/user&src=${url}`
  });
};

//请求天气
Platfrom.sendWeather = function(address) {
  
};

export default Platfrom;
