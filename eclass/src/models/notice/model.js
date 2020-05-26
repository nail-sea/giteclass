import Taro from '@tarojs/taro'
import Api from '@/utils/request';
import ENUM from "@/config/enum";

export default {
  namespace: "notice",
  state: {
    noticeList: {
      list: [],
      currentPage: 1,
      isMore: false
    },
    detail: "",
    count: "", //未读取消息数量
    mesType: {
      noticemesdata: {
        mes_num: 0,
        mes_type: 0,
        mes_data: []
      },
      sysmesdata: {
        mes_num: 0,
        mes_type: 0,
        mes_data: []
      },
      shopmesdata: {
        mes_num: 0,
        mes_type: 0,
        mes_data: []
      }
    }
  },

  effects: {
    *fetchNoticeType({ payload }, { call, put }) {
      let result = yield call(Api.getMesTypeCount, payload);
      if (!result) return;
      yield put({
        type: "saveTypeList",
        payload: {
          mesType: result
        }
      });
    },
    *fetchNotice({ payload }, { select, call, put }) {
      let result = yield call(Api.getMessage, payload);
      if(payload.page === 1){
        yield call(Api.readMessage, { mestype: payload.mestype });
        yield put({
          type: "getMessageCount",
          payload: {}
        });
        yield put({
          type: "fetchNoticeType",
          payload: {}
        });
      }
      // yield take("getMessageCount/@@end");
      const {
        noticeList: { list }
      } = yield select(state => state.notice);

      if (!result) return;
      const { meslist, page } = result;
      yield put({
        type: "save",
        payload: {
          noticeList: {
            list: payload.page === 1 ? meslist : [ ...list,...meslist],
            currentPage: page,
            isMore: ENUM.HOME_PAGESIZE > meslist.length ? true : false
          }
        }
      });
    },
    *readNotice({ payload }, { call, put }) {
      yield call(Api.readMessage, payload);
    },
    *getMessageCount({ payload }, { call, put }) {
      let result = yield call(Api.getMessageCount, payload);
      let count = result ?result[0] : 0;
      if(count===0){ count = ''}

      yield put({
        type: "saveCount",
        payload: {
          count: count>99?'99+':count
        }
      });
      
      if(process.env.TARO_ENV === 'h5' || process.env.TARO_ENV === 'rn'){
        //设置未读消息数
        Taro.setTabBarBadge({
          index: 1,
          text: count>99?'99+':count +''
        })
      }
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveCount(state, { payload }) {
      return { ...state, ...payload };
    },
    saveTypeList(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
