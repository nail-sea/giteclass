import Taro, { getApp } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { stdConfig } from "@/utils/common";
import Storage from "@/utils/storage";
import ENUM from "@/config/enum";
import { getPlatform } from "../utils/common";
import { STATIC_ASSETS , SHAREINFO} from "@/config/index";
import Platform from "@/platfrom";
import Dq from "@/config/Dq";

const MonitorMesCount = () => {
  return new Promise(resolve => {
    Taro.eventCenter.on("getMessageCount", resolve);
  });
};

function withPage(opts = {}) {
  const opt = {
    needLogin: false
  };
  const options = { ...opt, ...opts };
  return function demoComponent(Component) {
    @connect(({ Auth,user }) => ({
      ...Auth,
      ...user
    }))
    class WithPage extends Component {

      async componentDidMount() {
        await this.checkToken();
        const resultConfig = await this.checkConfig();
        console.log("resultConfig",resultConfig);
        if(!resultConfig){
          return;
        }
        console.log("resultConfig11111",resultConfig);

        const resultShop = await this.checkConfigShop();
        console.log("resultShop",resultShop);

        if(!resultShop){
          return;
        }
        console.log("resultShop111111",resultShop);
        
        // const identify = await Storage.getInstance().getIdentify()
        //需要登录的页面跳转去登录页
        const { needLogin } = options;
        if (needLogin) {
          const loginState = await Storage.getInstance().getLoginState();
        
          if (loginState != ENUM.LOGINSTATUS) {
            Dq.redirectTo({
              url: ENUM.LOGINURL
            });
            return;
          }
          await this.props.dispatch({
            type: "user/fetchMyInfo",
            payload: {
              isRefresh: true
            }
          })
        }
        
        // console.log("======================");
        // MonitorMesCount();
        // Taro.eventCenter.trigger("getMessageCount");
        super.componentDidMount && super.componentDidMount();
        if (getPlatform().isRN) {
          super.componentDidShow && super.componentDidShow();
        }
       
        if(opts.shareConfig&&Object.keys(opts.shareConfig).length>0 ||opts.share){
          Platform.sendShare(opts.shareConfig)
        }
      }

      componentWillUnmount() {
        super.componentWillUnmount && super.componentWillUnmount();

        if (getPlatform().isRN) {
          super.componentDidHide && super.componentDidHide();
        }
      }

      //检查token
      async checkToken() {
        if (!stdConfig.isToken) {
          stdConfig.isToken = true;
          await Storage.getInstance().initModel();
          let token = Storage.getInstance().getToken();
          if (!token || token.length <= 0) {
            return this.props.dispatch({
              type: "Auth/getToken",
              payload: {}
            });
          }
        }
        return true;// Promise.resolve(true);
      }
      // 检查配置
      async checkConfig() {
        if (stdConfig.isCategory) {
          return true;
        }
        stdConfig.isCategory = true;
        let config = stdConfig.getData();
        if (!config) {
          return this.props.dispatch({
            type: "Auth/fetchPostCategory",
            payload: {}
          });
        }
        return true;//Promise.resolve(true);
      }

      async checkConfigShop() {
        if (stdConfig.isShopcategory) {
          return true;
        }
        stdConfig.isShopcategory = true;

        let config = stdConfig.getDataShop();
        if (!config) {
          return this.props.dispatch({
            type: "Auth/fetchShopCategory",
            payload: {}
          });
        }
        return true;//Promise.resolve(true);
      }

      // 点击分享的那一刻会进行调用
      async onShareAppMessage() {
        let { title, desc, link , imgUrl } = Platform.shareConfig;

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
        //代理身份分享带代理标示  ，不然带链接的标示(链接标示是全局参数，不是本地保存)
        if(Taro.$store.getState().user.identify){
          agentIdentify = Taro.$store.getState().user.identify;
        }else{
          agentIdentify = Storage.getInstance().getIdentify();
        }

        let _path = link || SHAREINFO.path;
        
        if(agentIdentify){
          _path = link ? (`${link}&identify=${agentIdentify}`) : `${SHAREINFO.path}?identify=${agentIdentify}`
        }

        return {
          title: title || SHAREINFO.title,
          path: _path,
          // imageUrl: imageUrl || defaultImageUrl
        };
      }
    }
    return WithPage;
  };
}
export default withPage;
