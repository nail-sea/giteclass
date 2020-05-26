import Api from '@/utils/request';
import Taro from "@tarojs/taro";
import Tips from "@/utils/tips";
import Platfrom from "@/platfrom";
import Dq from "@/config/Dq";

export default {
  namespace: "shopStore",
  state: {
    CHANGE_SHOP_DETAIL: "change_shop_detail",
    GET_COUPON_DETAIL: "get_coupon_detail",
    GET_PAYMENT_PAGE: "get_payment_page",
    GET_MYSTORE_DETAIL: "get_mystore_detail",
    miniprogramshopGeo: {},
    shopDetail: {}, // 店铺详情
    couponDetail: {}, // 购买卡券页面
    myStore: {},
    couponManagementList: [], // 我的优惠券管理
    couponcenterList: [], // 我的卡券中心
    accountusedcouponlist: [], // 卡券明细
    changeshoplist:[]
  },
  effects: {
    *fetchShoplist({ payload }, { select, call, put }) {
      const result = yield call(Api.shoplist, payload);
      return result;
    },
    *fetchMiniprogramshopGeo({ payload }, { select, call, put }) {
      const result = yield call(Api.miniprogramshopGeo, payload);
      yield put({
        type: 'saveGeo',
        payload: {
          miniprogramshopGeo: result,
        }
      })
      return result;
    },
    *shopApplyEntry({ payload }, { select, call, put, take }) {
      const { address } = payload
      yield put({ type: 'fetchMiniprogramshopGeo', payload: { address } })
      yield take('fetchMiniprogramshopGeo/@@end') //直到监听到b结束才继续执行
      let geo = yield select(state => state.shopStore.miniprogramshopGeo)
      const payloadNew = { ...payload, ...geo }
      const result = yield call(Api.shopapplyentry, payloadNew);
      if (result) {
        Tips.toast("入驻成功", () => {
          Dq.redirectTo({
            url: "/pages/user/user"
          });
        });
      }
    },
    *publishCoupon({ payload }, { call }) {
      const result = yield call(Api.publishcoupon, payload);
      if (result) {
        Tips.toast("发布成功", () => {
          Dq.navigateBack({ delta: 1 })
        });
      }
    },
    *fetchShopdetail({ payload }, { call, put }) {
      const result = yield call(Api.shopdetail, payload);
      yield put({
        type: "save",
        payload: {
          type: "change_shop_detail",
          result
        }
      });
    },
    *fetchBuyCoupon({ payload }, { call, put }) {
      const result = yield call(Api.buyCoupon, payload);
      yield put({
        type: "save",
        payload: {
          type: "get_coupon_detail",
          result
        }
      });
    },
    *submitCouponOrder({ payload }, { call, put }) {
      const { trade_no } = yield call(Api.submitCouponOrder, payload);
      //Tips.loading("提交中");
      if (trade_no) {
        //Tips.loaded();
        Taro.showModal({
          title: `订单号${trade_no},立即去支付？`,
          content: "",
          confirmColor : '#F87C6A'
        }).then(res => {
          if (res.confirm) {
            Dq.navigateTo({
              url: `/pages/release/pay-for/index?trade_no=${trade_no}`
            });
          }
        });
      }
    },
    *paymentPage({ payload }, { call, put }) {
      const result = yield call(Api.confirmPayment, payload);
      yield put({
        type: "save",
        payload: {
          type: "get_payment_page",
          result
        }
      });
      return result;
    },
    *shopStatistics({ payload}, { call, put }) {
    const {shop_detail} = yield call(Api.statistics, payload);

      yield put({
        type: "save",
        payload: {
          type: "get_mystore_detail",
          result: shop_detail
        }
      });
     return shop_detail
    },
    *fetchCouponmanagement({ payload }, { select, call, put }) {
      const result = yield call(Api.couponmanagement, payload);
      if (result) {
        yield put({
          type: "saveCouponManagementList",
          payload: {
            couponManagementList: result.list || [],
            isRefresh: payload.page == 1
          }
        });
      }
      return result;
    },
    *fetchCouponcenter({ payload }, { select, call, put }) {
      const result = yield call(Api.couponcenter, payload);
      if (result) {
        yield put({
          type: "saveCouponcenterList",
          payload: {
            couponcenterList: result.list || [],
            isRefresh: payload.page == 1
          }
        });
      }
      return result;
    },
    *fetchAccountusedcouponlist({ payload }, { select, call, put }) {
      const result = yield call(Api.accountusedcouponlist, payload);
      if (result) {
        yield put({
          type: "saveAccountusedcouponlist",
          payload: {
            accountusedcouponlist: result.list || [],
            isRefresh: payload.page == 1
          }
        });
      }
      return result;
    },
    *fetchPayment({ payload }, { call, put }) {
      const result = yield call(Api.payment, payload);
      yield put({
        type: "save",
        payload: {
          type: "change_shop_detail",
          result
        }
      });
    },
    *fetchDownshelfcoupon({ payload }, { select, call, put, take }) {
      //优惠券下架
      let result = yield call(Api.downshelfcoupon, payload);
      if (result) {
        Taro.showToast({ title: "下架成功", icon: "none", duration: 2000 });
      }
      return result;
    },
    *fetchReupshelfcoupon({ payload }, { select, call, put, take }) {
      //优惠券上架
      let result = yield call(Api.reupshelfcoupon, payload);
      if (result) {
        Taro.showToast({ title: "重新上架成功", icon: "none", duration: 2000 });
      }
      return result;
    },
    *fetchCancelpublishcoupon({ payload }, { select, call, put, take }) {
      //取消
      let result = yield call(Api.cancelpublishcoupon, payload);
      if (result) {
        Taro.showToast({ title: "取消成功", icon: "none", duration: 2000 });
      }
      return result;
    },
    *fetchUsedcoupon({ payload }, { select, call, put, take }) {
      //卡券使用
      let result = yield call(Api.usedcoupon, payload);
      if (result) {
        Taro.showToast({ title: "使用成功", icon: "none", duration: 2000 });
      }
      return result;
    },
    *fetchCancelpaymentcouponorder({ payload }, { select, call, put, take }) {
      //卡券使用
      let result = yield call(Api.cancelpaymentcouponorder, payload);
      if (result) {
        Taro.showToast({ title: "取消成功", icon: "none", duration: 2000 });
      }
      return result;
    },
    *fetchRefundcoupon({ payload }, { select, call, put, take }) {
      //卡券退款
      let result = yield call(Api.refundcoupon, payload);
      if (result) {
        Taro.showToast({ title: "退款成功", icon: "none", duration: 2000 });
      }
      return result;
    },
    *fetchChangeShopList({payload}, { call, put }){
      const result = yield call(Api.changeshoplist, payload);
      yield put({
        type: "saveGeo",
        payload: {
          changeshoplist: result
        }
      })
      return result
    },
    *setdefaultshop({payload}, { put, call }){
      const result = yield call(Api.setdefaultshop, payload);
      if(result){
        yield put({
          type:'shopStatistics',
          payload:{}
        })
      }
      return result
    },
  },

  reducers: {
    save(state, { payload }) {
      switch (payload.type) {
        case state.CHANGE_SHOP_DETAIL:
          return {
            ...state,
            shopDetail: payload.result.shop_detail
          };
        case state.GET_COUPON_DETAIL:
          return {
            ...state,
            couponDetail: payload.result
          };
        case state.GET_MYSTORE_DETAIL:
          return {
            ...state,
            myStore: payload.result
          };
        default:
          return state;
      }
    },
    saveCouponManagementList(state, { payload }) {
      let couponManagementList = payload.isRefresh
        ? payload.couponManagementList
        : [...state.couponManagementList, ...payload.couponManagementList];
      return { ...state, ...{ couponManagementList } };
    },
    saveCouponcenterList(state, { payload }) {
      let couponcenterList = payload.isRefresh
        ? payload.couponcenterList
        : [...state.couponcenterList, ...payload.couponcenterList];
      return { ...state, ...{ couponcenterList } };
    },
    saveAccountusedcouponlist(state, { payload }) {
      let accountusedcouponlist = payload.isRefresh
        ? payload.accountusedcouponlist
        : [...state.accountusedcouponlist, ...payload.accountusedcouponlist];
      return { ...state, ...{ accountusedcouponlist } };
    },
    saveGeo(state, { payload }) {
      return { ...state, ...payload };
    },
  }
};
