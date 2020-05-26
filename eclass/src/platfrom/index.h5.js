import Taro from "@tarojs/taro";
import utils from "@/utils/utils";
import Tips from "../utils/tips";
import { SHAREINFO , HOST} from "@/config";
import wx  from "weixin-js-sdk";
import Storage from "@/utils/storage";
import ENUM from "@/config/enum";
// import {getGlobalData} from '@/utils/global'
import { is_Weixin } from '@/utils/common'
const APPID = "wxa6320a1795b77fab";

const Platfrom = {};
Platfrom.shareConfig = {}

Platfrom.authFrom = "/pages/user/user";

Platfrom.getType = function() {
  return "h5";
};

Platfrom.appCheckAuth = function(from, params={}) {
  return new Promise(resolve => {
    try {
      // 非第一次登录
      const { Auth } = Taro.$store.getState();

      if (Auth.appOnLaunch == 1) {
        //1=>已绑定手机号 2=>未绑定手机号
        resolve(true);
      } else {
        const identify=Storage.getInstance().getIdentify()
        let REDIRECT_URI = `${HOST}/pages/login-register/wxbind-phone/index`;
        if(params&&Object.keys(params).length>0){
          const paramsStr = utils.getUrlParams(params)
          REDIRECT_URI = `${REDIRECT_URI}${paramsStr}&identify=${identify}`
          console.log(REDIRECT_URI,'=====================')
        }else{
          REDIRECT_URI = `${REDIRECT_URI}?identify=${identify}`
        }
       

        console.log(REDIRECT_URI,'REDIRECT_URIREDIRECT_URIREDIRECT_URIREDIRECT_URI')
        window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=snsapi_userinfo&state=${from}#wechat_redirect`)
       // window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=snsapi_userinfo&state=${from}#wechat_redirect`;
      }
    } catch (error) {
      console.log(error);
    }
  });
};

//请求定位
Platfrom.sendLocation = function() {
  return new Promise((resolve, reject) => {
    if(map){
      map.plugin("AMap.Geolocation", function() {
        const geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认：true
          timeout: 10000 // 设置定位超时时间，默认：无穷大
        });
        if (AMap.UA.ios) {
            //使用远程定位，见 remogeo.js
            var remoGeo = new RemoGeoLocation();
            //替换方法
            navigator.geolocation.getCurrentPosition = function() {
                return remoGeo.getCurrentPosition.apply(remoGeo, arguments);
            };
            //替换方法
            navigator.geolocation.watchPosition = function() {
                return remoGeo.watchPosition.apply(remoGeo, arguments);
            };
        }
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);
  
        function onComplete(data) {
          console.log("sendMapPosition-onComplete", data);
          let msg = utils.deepCopy(data);
          msg.lng = data.position.lng;
          msg.lat = data.position.lat;
  
          resolve(msg);
        }
  
        function onError(data) {
          console.log("sendMapPosition-onError",data)
          if(data.message.indexOf('Geolocation permission denied')>=0){
            Taro.showToast({
              title: '定位失败 , 请在设置里开启定位服务',
              icon: "none",
              duration:3000
            });
          }
          resolve(null);
        }
      });
    } else {
      resolve(null);
    }
  });
};

//请求输入提示
Platfrom.sendAutocomplete = function(idList) {
  idList.forEach(id => {
    new AMap.Autocomplete({
      input: id
    });
  });
};

Platfrom.geocoder = address => {
  return new Promise((resolve, reject) => {
    var geocoder = new AMap.Geocoder();
    if(geocoder){
      geocoder.getLocation(address, function(status, result) {
        if (status === "complete" && result.geocodes.length) {
          let lnglat = result.geocodes[0].location;
          resolve(lnglat);
        } else {
          resolve("");
        }
      });
    } else {
      resolve("");
    }
    
  });
};

//请求天气
Platfrom.sendWeather = function(address) {
  return new Promise((resolve, reject) => {
    if(map){
      AMap.plugin('AMap.Weather', function() {
        var weather = new AMap.Weather();
        //查询实时天气信息, 查询的城市到行政级别的城市，如朝阳区、杭州市
        weather.getLive(address, function(err, data) {
            if (!err) {
              var msg = {};
              msg.weather = data.weather
              msg.temperature = data.temperature
              resolve(msg);
            } else {
              resolve(null);
            }
        });

      });
    } else {
      resolve(null);
    }
  });
};

//请求支付
Platfrom.sendPay = function(type , payload , callback , from, openid,urlParams) {
  //payload.amount = 0.01
  payload.pay_method = payload.pay_method || "wx";
  payload.trade_type = payload.trade_type || "5";

  // const { Auth } = Taro.$store.getState();
  // const { authorize: { openid } } = Auth;
  if (!openid) {
    Platfrom.appCheckAuth(from,urlParams);
    return
  }

  function onBridgeReady() {
    Taro.$store.dispatch({
      type,
      payload
    })
    .then(data => {//let { trade_no, charge_obj } 
      const params = data.charge_obj;
      params["timeStamp"] = params["timeStamp"] + "";

      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        params,
        function(res) {
          //alert(JSON.stringify(res));
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            if(type == "Auth/submitSendPay"){//充值
              Taro.$store.dispatch({
                type:'Auth/RechargeCallback',
                payload:{trade_no:data.trade_no}
              })
              console.log("WeixinJSBridge:RechargeCallback",data.trade_no);
            }else if(type == "publish/postOrderPay" || type == "publish/payTop"){//帖子支付和置顶
              Taro.$store.dispatch({
                type:'publish/payCallback',
                payload:{trade_no:data.trade_no}
              })
              console.log("WeixinJSBridge:postOrderPay",data.trade_no);
            }

            if (callback) {
              callback(urlParams);
            }
          }
        }
      );
    })
  }

  if (typeof WeixinJSBridge == "undefined") {
    if (document.addEventListener) {
      document.addEventListener("WeixinJSBridgeReady", onBridgeReady, false);
    } else if (document.attachEvent) {
      document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
      document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
    }
  } else {
    onBridgeReady();
  }
};

Platfrom.sendShare = async function(shareConfig={}) {
  if (!is_Weixin()) {
    return;
  }
  const app = Taro.getApp();
  const { iosFirstUrl } = app.globalData

  let agentIdentify = null
  const loginState = await Storage.getInstance().getLoginState();
  if(loginState===ENUM.LOGINSTATUS){
    let { userInfo, identify } = Taro.$store.getState().user
    if(Object.keys(userInfo).length==0){
      userInfo =  await Taro.$store.dispatch({
        type:'user/fetchMyInfo',
        payload:{}
      })
      
    }
    if(userInfo/*&&userInfo.is_agent==1*/){ //登录用户是代理
      if(!identify){
        await Taro.$store.dispatch({
          type: "user/fetchGetshareIdentify"
        })
      }
    }
  }
  //代理或者用户分享带代理标示  ，不然带链接的标示(链接标示是全局参数，不是本地保存)
  console.log("identify代理",Taro.$store.getState().user.identify);
  console.log("identify链接",Storage.getInstance().getIdentify());

  if(Taro.$store.getState().user.identify){
    agentIdentify = Taro.$store.getState().user.identify;
  }else{
    agentIdentify = Storage.getInstance().getIdentify();
  }

  if (!shareConfig) {
    shareConfig = {
      title: SHAREINFO.defaut.title,
      desc: SHAREINFO.defaut.desc,
      link: window.location.origin+'?identify='+agentIdentify,
      imgUrl: (SHAREINFO.defaut.imgUrl).replace(/^(https|http)/,"https")
    };
  }else{
    shareConfig.link = HOST + shareConfig.link+'&identify='+agentIdentify;
  }
  console.log(Storage.getInstance().getIdentify())
  console.log(JSON.stringify(shareConfig))

  const url =  window.location.href.split('#')[0]
  
  let config_url = null;

  if (!!window.__wxjs_is_wkwebview) {
      config_url =iosFirstUrl
  }else{
    config_url = url
  }

   Taro.$store
    .dispatch({
      type: "Auth/getShareConfig",
      payload: {
       url:config_url
      }
    }).then(authRes=>{
      if(authRes&&authRes.appId){
        const { appId, timestamp, nonceStr, signature } = authRes;
       
       
        // window.location.origin +`/pages/class/detail-master/index?post_id=${postId}&isShare=1&identify=${agentIdentify}`
        wx.config({
          debug: false,
          appId,
          timestamp,
          nonceStr,
          signature,
          jsApiList: [
            "updateAppMessageShareData", //分享朋友
            "updateTimelineShareData", //分享朋友圈
          ]
        });
        wx.error(err => {
         console.log('签名报错：', err);
        });
        wx.ready(function() {
          const { title, desc, imgUrl,link} = shareConfig
          const shareImgUrl = imgUrl.replace(/^(https|http)/,"https")
          let data = {
            title,
            desc,
            link,//shareUrl,
            imgUrl:shareImgUrl
          }

          wx.updateAppMessageShareData({
            ...data,
            success: () => {
              
            }
          });
          wx.updateTimelineShareData({ ...data,
              success:()=>{
              }
          })
        });
      }
    })
    
  
};


//跳转外部链接
Platfrom.LinksExternal = function(url) {
  Taro.navigateTo({
    url
  });
};

export default Platfrom;



