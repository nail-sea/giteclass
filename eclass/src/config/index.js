import images from "../assets/images";
import global from "@/utils/global";

var NETMENT = 2;  //1: 正式环境  2：测试环境
if (window && window.NETMENT) {
  NETMENT = window.NETMENT;
}

/**
 * 服务器配置
 */

export const PRODHOST =
  process.env.TARO_ENV === "weapp"
    ? "://enet.enetlife.shop"
    : "://enet.enetlife.shop"; 
export const DEVHOST =
  process.env.TARO_ENV === "weapp"
    ? "://enet.douqutj.com"
    : "://enet.douqutj.com"; 

const BASEHOST =
  process.env.NODE_ENV === "development" || (NETMENT == 2)
    ? DEVHOST
    : PRODHOST;
export default BASEHOST;

/**
 * 静态资源
 */
//https://img.enetlife.cn/dist/production/assets
//https://assets.enetlife.cn/assets
const PROD_ASSETS = "https://img.enetlife.cn/dist/production/assets/"; // 发布环境
const DEV_ASSETS = "https://img.enetlife.cn/dist/testing/assets/";//"https://eclass.douqutj.com/assets/"; //开发环境 或 内网环境

export const STATIC_ASSETS = path => {
  // console.log('static assets, path = ', path, 'get image require = ', images[path])
  if (process.env.TARO_ENV === "rn" && images[path]) return images[path];

  if ((process.env.TARO_ENV === "h5" || process.env.TARO_ENV === "weapp") && images[path]){
    let host = (process.env.NODE_ENV === "development" || (NETMENT == 2) ? DEV_ASSETS : PROD_ASSETS);

    // if(global.realm.length <= 0 || global.realm == '1'){//测试oss资源
    //   host = 'https://img.enetlife.cn/dist/testing/assets/'
    // }

    // host = process.env.NODE_ENV === 'production' && process.env.TARO_ENV === 'h5' && global.realm.length > 0 && NETMENT == 2
    //                 ? host.replace('https://eclass' , 'http://eclass' + global.realm) : host;

    return  host + images[path];
  }
  

  // console.log("STATIC_ASSETS" , path);
  return (
    (process.env.NODE_ENV === "development" || (NETMENT == 2)
      ? DEV_ASSETS
      : PROD_ASSETS) + path
  );
};

//前台地址
const PROD_STAGE = "https://eclass.enetlife.cn"; // 发布环境
const DEV_STAGE = "https://eclass.douqutj.com"; //开发环境 或 内网环境
export const HOST =
  process.env.NODE_ENV === "development" || (NETMENT == 2)
    ? DEV_STAGE
    : PROD_STAGE;

//代理后台地址
const PROD_AGENT = "https://eclass-cms-agent.enetlife.cn"; // 发布环境
const DEV_AGENT = "http://eclass-cms-agent.douqutj.com"; //开发环境 或 内网环境

export const HOST_AGENT =
  process.env.NODE_ENV === "development" || (NETMENT == 2)
    ? DEV_AGENT
    : PROD_AGENT;
//客服地址    
export const CUSTOMER_SERVICE = "https://cschat-ccs.aliyun.com/index.htm?tntInstId=_1ikjm1I&scene=SCE00005949"
/**
 * 全局的分享信息， 不用每一个都去写
 */

export const SHAREINFO = {
  defaut:{
    title: `_E网生活`,//(北京站)
    desc: "E网生活,让生活更便利。招聘求职，房屋租售，二手物品，拼车租车，征婚交友，寻人寻物，创业合伙，本地服务，商品促销，一站式服务。",
    //link: window.location.origin,
    imgUrl:STATIC_ASSETS("images/share_logo.png")
  },
  classHome: {
    title:'',
    imgUrl:'',
   // link: window.location.origin,
    desc:'E网生活,让生活更便利。招聘求职，房屋租售，二手物品，拼车租车，征婚交友，寻人寻物，创业合伙，本地服务，商品促销，一站式服务。'
  },
  shopHome:{
    title: "_E网生活",//(北京站)
    desc: 'E网生活，让生活更便利。美食|酒店|旅游|休闲娱乐|生活服务|教育培训|家具建材|房产相关等店铺汇总',
  //  link:  window.location.origin,
  imgUrl: STATIC_ASSETS("images/share_logo.png")
  }
};



export const HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  CLIENT_ERROR: 400,
  AUTHENTICATE: 401,
  OVERDUE: 403, //token过期
  ILLEGAL: 402, //非法请求
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
};

export const REFRESH_STATUS = {
  NORMAL: 0,
  REFRESHING: 1,
  NO_MORE_DATA: 2
};
