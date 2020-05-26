import Api from '@/utils/request';
import { stdConfig } from "@/utils/common";
import Storage from "@/utils/storage";
import Tips from "@/utils/tips";

export default {
  namespace: "Auth",
  state: {
    appOnLaunch: 2, // 1=>已绑定手机号  2=>未绑定手机号
    authorize: {}, //微信授权信息
    token: null,
    login_status: 2, // 1=>登陆  2=>未登陆
    signature: {}, //签名
    auth_program: {}, //授权信息，mobile , openid , unionid
    INSERT_AUTHORIZE: "insert_authorize", //写入授权信息，
    CHANGE_APP_ON_LAUNCH: "change_app_on_launch", //更改登陆状态
    GET_APP_LOGIN_STATUS: "get_app_login_token", //获取登陆token
    payForConfig: {}, //支付config
    PAYFOR_CONFIG_INFO: "payfor_config_info", //发起支付
    rechargePage: {}, //支付页面数据
    RECHARGEPAGE_CONFIG_INFO: "rechargepage_config_info", //发起支付页面数据
    AUTH_PROGRAM: "insert_auth_program" //授权信息
  },

  effects: {
    *getToken({ payload = {} }, { call, put }) {
      const { token, is_login } = yield call(Api.getToken, payload);
      Storage.getInstance().setToken(token);
      Storage.getInstance().setLoginState(is_login);

      yield put({
        type: "save",
        payload: {
          type: "get_app_login_token",
          token,
          login_status: is_login
        }
      });
    },
    *callbackAuth({ payload }, { call, put }) {
      const result = yield call(Api.callbackauth, payload);
      yield put({
        type: "save",
        payload: {
          type: "change_app_on_launch",
          payload: {
            is_mobile: result.is_mobile
            // == 1 ? false : true
          }
        }
      });
      yield put({
        type: "save",
        payload: {
          type: "insert_authorize",
          result
        }
      });
      return result;
    },
    // 获取分享微信配置
    *getShareConfig({ payload }, { call, put }) {
      const result = yield call(Api.getSignPackage, payload);

      yield put({
        type: "saveSignature",
        payload: {
          signature: result
        }
      });
      return result;
    },
    *fetchPostCategory({ payload}, { call, put }) {
      try{
        const result = yield call(Api.getSecondCategory, payload);
        if(result && result.jobHunting){
          stdConfig.category = result;
        }
        return result;
      }catch(err){
        stdConfig.isCategory = false;
        return null;
      }
    },
    *fetchShopCategory({ payload}, { call, put }) {
      try{
        console.log("fetchShopCategory-------");
        const result = yield call(Api.shopCategory, payload);
        if(result && result.food){
          stdConfig.shopcategory = result;
        }
        return result;
      }catch(err){
        stdConfig.isShopcategory = false;
        return null;
      }
    },
    *putAuthorize({ payload }, { call, put }) {
      const msg = payload;
      console.log("putAuthorize", msg);
      yield put({
        type: "save",
        payload: {
          type: "insert_authorize",
          result: msg
        }
      });
    },
    *submitSendPay({ payload }, { call, put }) {
      let { trade_no, charge_obj } = yield call(Api.Recharge, payload);
      charge_obj = typeof charge_obj === 'string'? JSON.parse(charge_obj): charge_obj
      if(charge_obj){
        yield put({
            type: "Auth/save",
            payload: {
                type: "payfor_config_info",
                result: {
                    trade_no,
                    charge_obj
                }
            }
        });
      } 
      return { trade_no, charge_obj }
    },
    *RechargeCallback({ payload }, { call, put , select}) {
      yield call(Api.RechargeCallback, payload);
    },
    *fetchRechargePage({ payload }, { call, select, put }) {
      const result = yield call(Api.rechargePage, {
        ...payload
      });
      yield put({
        type: "save",
        payload: {
          type: "rechargepage_config_info",
          result
        }
      });

      return result;
    },
    *fetchMiniProgramsAuth({ payload }, { call, put }) {
      const result = yield call(Api.miniProgramsAuth, payload);
      yield put({
        type: "save",
        payload: {
          type: "change_app_on_launch",
          payload: {
            is_mobile: result.is_mobile
            // == 1 ? false : true
          }
        }
      });
      yield put({
        type: "save",
        payload: {
          type: "insert_auth_program",
          result
        }
      });
      return result;
    },
    *fetchShareCallback({payload},{call,put}){
     yield call(Api.shareCallback, payload);
     
    }
  },

  reducers: {
    save(state, { payload }) {
      switch (payload.type) {
        case state.GET_APP_LOGIN_STATUS:
          return {
            ...state,
            token: payload.token,
            login_status: payload.login_status
          };
        case state.CHANGE_APP_ON_LAUNCH:
          return {
            ...state,
            appOnLaunch: payload.is_mobile
          };
        case state.INSERT_AUTHORIZE:
          return {
            ...state,
            authorize: payload.result
          };
        case state.PAYFOR_CONFIG_INFO:
          return {
            ...state,
            payForConfig: payload.result
          };
        case state.RECHARGEPAGE_CONFIG_INFO:
          return {
            ...state,
            rechargePage: payload.result
          };
        case state.AUTH_PROGRAM:
          return {
            ...state,
            auth_program: payload.result
          };

        default:
          return state;
      }
    },
    saveSignature(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
