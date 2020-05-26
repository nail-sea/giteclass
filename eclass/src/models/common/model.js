
/*
  公用model
*/
import Api from '../../utils/request';
import Utils from '@/utils/utils';
import storage from '@/utils/storage';


export default {
  namespace: 'common',
  state: {
    advertList:{},
    noticesList:{}
  },

  effects: {
    *fetchAdvert({ payload = {} }, { call, put , select}) {
      let cur_area = storage.getInstance().getAreainfo();
      if(cur_area && cur_area.cur_area)payload.city_id = cur_area.cur_area.id;

      let res = yield call(Api.getAdvert, payload);
      if(res && res.list && res.list.length > 0){
        let list = []
        for(let key in res.list){
          let item = res.list[key];
          list.push({img:item.ad_img_url , rank:key , text:item.ad_img_title,target_url:item.target_url})
        }

        let { advertList } = yield select(state => state.common);
        if(!advertList[payload.ad_type] || (advertList[payload.ad_type] && Utils.comparisonObject(list , advertList[payload.ad_type]) == false)){
          advertList[payload.ad_type] = list;
          yield put({
            type: 'save',
            payload: {
              advertList
            }
          })
        }
      }

      return res;
    },
    *fetchNotices({ payload = {} }, { call, put ,select}) {
      let cur_area = storage.getInstance().getAreainfo();
      if(cur_area && cur_area.cur_area)payload.city_id = cur_area.cur_area.id;

      let res = yield call(Api.getNotices, payload);
      if(res && res.list && res.list.length > 0){
        let list = []
        for(let key in res.list){
          let item = res.list[key];
          list.push(`${item.notice_title}:${item.notice_content}`)
        }

        let { noticesList } = yield select(state => state.common);
        if(!noticesList[payload.notice_type] || (noticesList[payload.notice_type] && Utils.comparisonObject(list , noticesList[payload.notice_type]) == false)){
          noticesList[payload.notice_type] = list;
          yield put({
            type: 'save',
            payload: {
              noticesList
            }
          })
        }
      }

      return res;
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
