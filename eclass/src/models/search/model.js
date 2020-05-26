import Api from '../../utils/request';
import storage from '../../utils/storage';

export default {
  namespace: 'search',
  state: {
    // page:0,
    // showItems:[], //当前搜索显示链表
    // showRecommend:[], //当前显示推荐
    // listRecommend:{'home':[]}//搜索推荐{name:list}
  },

  effects: {
    *searchList({ payload = {} }, { call, put , select}) {;
      let url = null;
      if(payload.root == '/pages/home/index'){
        url = Api.getHomeIndex;
      }else if(payload.root == '/pages/shopStore/index'){
        url = Api.shoplist;
      }else{
        url = Api.categoryList;
      }
      const root = payload.root;
      delete payload.root;
      if(url){
        let result = yield call(url, payload);
        if((payload.key_word || payload.search_keyword)){
          // console.log("setHistorySearch",root);
          storage.getInstance().setHistorySearch(root , payload.key_word || payload.search_keyword);
        }
        return result;
      }
    },
    *refreshFetchList({ payload = {} }, { call, put }) {
      yield put({
        type: 'save',
        payload: {
          showItems: payload.showItems
        }
      });
    },
    *fetchRecommendsearch({ payload = {} }, { call, put ,select}) {
      // let { searchRecommendList } = yield select(state => state.storage);
      // if(!payload.force && searchRecommendList[payload.rs_type]){
      //   return searchRecommendList[payload.rs_type].list;
      // }
      delete payload.force;
      let cur_area = storage.getInstance().getAreainfo();
      if(cur_area && cur_area.cur_area)payload.city_id = cur_area.cur_area.id;

      let result = yield call(Api.getrecommendsearch, payload);
      if(result && result.list && result.list.length > 0){
        // searchRecommendList[payload.rs_type].list = result.list;
        // yield put({
        //   type: 'storage/saveAction',
        //   payload: {
        //     searchRecommendList
        //   }
        // });
        return result;
      }
      return false;
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveList(state, { payload }) {
      return { ...state , showItems : state.showItems.concat(payload.items) , page : payload.page};
    },
  },

};
