//如果该 meta 元素存在，则获取其 content 的路径
if (process.env.NODE_ENV !== "development" && process.env.TARO_ENV === "h5") {
  // var $path = document.querySelector('meta[name="AppPublic"]');
  // __webpack_public_path__ = $path ? window.AppPublic : '/';
  __webpack_public_path__ =
    window.AppPublic && window.AppPublic.length > 0 ? window.AppPublic : "./";
}

// console.log('window:',window.NETMENT , window.AppPublic)
// import "core-js/es/symbol";
// import "core-js/features/set";
import Taro, { Component } from "@tarojs/taro";
import "@tarojs/async-await";
import { Provider } from "@tarojs/redux";
import dva from "./utils/dva";
import "./utils/request";
// import Platfrom from "./platfrom";
import models from "./models";
import Storage from "./utils/storage";
import global from "./utils/global";
import { STATIC_ASSETS } from "@/config";
import "./app.scss";
/* 处理微信浏览器出现的语法不支持问题，未来如果有其他语法问题也可以单独引用core-js其他模块 */
import 'core-js/fn/object'

const MonitorMesCount = () => {
  return new Promise(resolve => {
    Taro.eventCenter.on("getMessageCount", resolve);
  });
};

if(process.env.TARO_ENV === 'h5'){
  setTimeout(() => {
    document.getElementById('indexLoading').style.display = 'none'
  }, 1000)

  global.header = window.location.protocol.split(':')[0]

  if(window.NETMENT == 2 && process.env.NODE_ENV === 'production'){
    if(window.location.origin.indexOf("eclass1") >= 0){
      global.realm = '1';
    }else if(window.location.origin.indexOf("eclass2") >= 0){
      global.realm = '2';
    }else if(window.location.origin.indexOf("eclass3") >= 0){
      global.realm = '3';
    }
  }
}

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

if (process.env.TARO_ENV === 'h5' && process.env.NODE_ENV !== 'development' && window && window.NETMENT == 2) {
  let Vconsole = require('vconsole');
  const vConsole = new Vconsole()
}
// if (process.env.NODE_ENV !== "development") {
//   console.log = function() {};
// }
const dvaApp = dva.createApp({
  initialState: {},
  models
});

const store = dvaApp.getStore();

class App extends Component {
  config = {
    pages: [
      // 'pages/root/root',
      // "test/test",
      "pages/home/index",
      "pages/login-register/loginEntrance/login",
      "pages/login-register/login/login",
      "pages/login-register/register/register",
      "pages/login-register/setpass/setpass",
      "pages/login-register/modifypass/index",
      "pages/login-register/setpassSuccess/setpassSuccess",
      "pages/login-register/codeInput/codeInput",
      "pages/login-register/notice/index",
      "pages/login-register/notice/indexPrivacy",
      "pages/login-register/change-phone/index",
      "pages/login-register/verify-identity/index",
      "pages/login-register/verify-identity/codeInput/codeInput",
      "pages/user/user",
      "pages/user/personal-page/index",
      "pages/user/release-management/index",
      "pages/user/account-management/index",
      "pages/user/account-info/index",
      "pages/user/personal-info/index",
      "pages/user/personal-info/nick-name/index",
      "pages/user/change-phone/index",
      "pages/user/codeInput/codeInput",
      "pages/user/card-center/index", // 卡券中心
      "pages/notice/notice",
      "pages/notice/detail/index",
      "pages/service/service",
      "pages/release/release",
      "pages/release/recharge/index", // 充值
      "pages/release/pay-for/index", // 支付
      "pages/release/top/index",
      "pages/release/notice/index",
      "pages/release/eCoinService/index",
      "pages/release/success/index",
      "pages/search/search",
      "pages/search/searchList/searchList",
      "pages/location/location",
      "pages/location/search/search",
      "pages/class/detail-master/index",
      "pages/class/commonCategory/commonCategory", //通用类目链表
      "pages/class/carpoolingCar/carpoolingCar", //拼车租车 首页
      "pages/class/carpoolingCar/release/index", //发布拼车租车
      "pages/class/jobHunting/job-wanted/index",
      "pages/class/jobHunting/recruit/index",
      "pages/class/localService/index",
      "pages/class/secondHand/index",
      "pages/class/dating/index", //发布征婚交友
      "pages/class/wantedAny/index",
      "pages/class/buyRentHouse/index",
      "pages/class/productPromotion/index", //发布商品促销 localMeet
      "pages/class/localMeet/index", //发布同城聚会
      "pages/class/businessPartnership/index", //发布同城聚会
      "pages/login-register/wxbind-phone/index", //微信登录绑定手机
      "pages/shopStore/index", //店铺
      "pages/shopStore/apply-settled/index", //店铺入驻
      "pages/shopStore/my-store/index", //我的店铺
      "pages/shopStore/bill-detail/index", //我的店铺账单明细
      "pages/shopStore/Coupon-release/index", //发布优惠券
      // "pages/shopStore/Coupon-release/index.1", //发布优惠券----
      "pages/shopStore/Coupon-management/index", //优惠券管理
      "pages/shopStore/detail/index", //发布优惠券
      "pages/shopStore/rush-to-buy/index", // 代金券立即抢购
      "pages/web-view/index", // 代理后台
      "pages/share/index",//分享
      "pages/share/code/index",//分享二维码
      "pages/shopStore/store-list/index", //切换店铺
      "pages/service/server/index", //客服页面
      "pages/service/server/Recruit", //加盟商页面
      "pages/release/pay-for/post-pay-for",//帖子微信支付页面
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#FF4E3A",
      navigationBarTitleText: "E网生活",
      navigationBarTextStyle: "white",
      navigationStyle: process.env.TARO_ENV === "rn" ? "custom" : "default",
      backgroundColor: "#fff",
      disableScroll: false,
      enablePullDownRefresh: false
    },
    tabBar: {
      color: '#666',
      selectedColor: '#F87C6A',
      backgroundColor: 'white',
      borderStyle: 'white',
      custom: true,
      tabBarComponent:process.env.TARO_ENV === "rn"?require('./custom-tab-bar/index.rn').default:null,
      // extclass:'',
      list: [
        {
          pagePath: 'pages/home/index',
          iconPath: STATIC_ASSETS("images/tab-bar/home.png"),
          selectedIconPath: STATIC_ASSETS("images/tab-bar/home-active.png"),
          text: '首页'
        },{
          pagePath: "pages/notice/notice",
          iconPath: STATIC_ASSETS("images/tab-bar/notice.png"),
          selectedIconPath: STATIC_ASSETS("images/tab-bar/notice-active.png"),
          text: "客服"
        },
        {
          pagePath: "pages/release/release",
          iconPath: STATIC_ASSETS("images/tab-bar/release.png"),
          selectedIconPath: STATIC_ASSETS("images/tab-bar/release.png"),
          text: "发布"
        },
        {
          pagePath: "pages/shopStore/index",
          iconPath: STATIC_ASSETS("images/icon/icon_dianpu.png"),
          selectedIconPath: STATIC_ASSETS("images/tab-bar/icon_dianpu.png"),
          text: "店铺"
        },
        {
          pagePath: "pages/user/user",
          iconPath: STATIC_ASSETS("images/tab-bar/user.png"),
          selectedIconPath: STATIC_ASSETS("images/tab-bar/user-active.png"),
          text: "我的"
        }
      ]
    },
    permission: {
      "scope.userLocation": {
        desc: "你的位置信息将用于小程序位置接口的效果展示"
      }
    }
  };

  globalData = {}

  componentWillMount() {
    const {params = {}} = this.$router || {}
    let { identify , query = {}} = params
    if(query.identify || query.scene){
      identify = query.identify || query.scene;
    }
    // console.log("app-------------",params,identify)

    if(process.env.TARO_ENV === 'h5'){//正常链接清空标示， 其它时候覆盖或者取本地
      console.log("window.location.href",window.location.href);
      console.log("identify",identify);
      if(window.location.href.includes("pages") || window.location.href.includes("identify")){
        console.log("identify--------------",identify);
        if(identify && identify.length > 0 && identify !== 'null'){
          Storage.getInstance().setIdentify(identify);
        }
      }else{
        console.log("identify--------------000000000000000",identify);
        Storage.getInstance().setIdentify('');
      }
    }else{
      if(identify){
        Storage.getInstance().setIdentify(identify);
      }
    }
    
    // else{
    //   Storage.getInstance().setIdentify('')
    // }
  }

  componentDidMount() {
    Taro.$store = store;
    if(process.env.TARO_ENV == 'h5'){
      if (!!window.__wxjs_is_wkwebview) {
          this.globalData.iosFirstUrl = window.location.href
      }
    }
   
  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  render() {
    return <Provider store={store} />;
  }
}

Taro.render(<App />, document.getElementById("app"));
