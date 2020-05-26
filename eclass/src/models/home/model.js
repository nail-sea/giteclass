import Taro from '@tarojs/taro'
import Api from '@/utils/request';
import storage from '@/utils/storage';
import Platfrom from '@/platfrom'
import Utils from '@/utils/utils';

export default {
  namespace: 'home',
  state: {
    locationTitle:'全国',
    locationWeather: {},
    statistical:{
      total_post_num: 0,
      total_visit_num: 0,
      total_member_num: 0
    },
    showItemList: [],
    currentTab:1,
    // allItemList: {
    //   // 1: { 1: [], page: 0 ,showPage:0},
    //   // 2: { 1: [], page: 0 ,showPage:0},
    // }
  },

  effects: {
    *fetchList({ payload = {} }, { call, put ,select}) {
      let {showItemList , currentTab} = yield select(state => state.home);
      let {homeAllItemList : allItemList } = yield select(state => state.storage);

      currentTab = payload.currentTab;

      const orderItem = allItemList[currentTab];
      const showPage = payload.page ? payload.page : (orderItem && orderItem.showPage ?  orderItem.showPage + 1 : 1)
      if(orderItem && showPage <= orderItem.page ){
        //缓存里有当前页内容
        allItemList[currentTab].showPage = showPage;
        yield put({
          type: 'save',
          payload: {
            showItemList: showItemList.concat(allItemList[currentTab][showPage]),
            // allItemList,
            currentTab
          }
        });
        yield put({
          type: 'storage/saveAction',
          payload: {
            homeAllItemList:allItemList,
          }
        })

        return {list:allItemList[currentTab][showPage]};
      }
      payload.page = orderItem && orderItem.page ? orderItem.page + 1 : 1;

      delete payload.currentTab;

      let result = yield call(Api.getHomeIndex, payload);
      if(result && result.list && result.list.length > 0){
        if(!orderItem){
          allItemList[currentTab ] = {1: [], page: 0 ,showPage:0}
        }
        allItemList[currentTab][payload.page] = result.list;
        allItemList[currentTab].page = payload.page;
        allItemList[currentTab].showPage = payload.page;

        yield put({
          type: 'save',
          payload: {
            showItemList: showItemList.concat(allItemList[currentTab][payload.page]),
            // allItemList,
            currentTab
          }
        });
        yield put({
          type: 'storage/saveAction',
          payload: {
            homeAllItemList:allItemList,
          }
        })
      }
      return result
    },
    *resetList({ payload = {} }, { call, put ,select}) {
      if(payload.state == 1){//删除所有缓存
        yield put({
          type: 'save',
          payload: {
            // allItemList:{},
            showItemList:[],
            currentTab:payload.currentTab
          }
        });
        yield put({
          type: 'storage/saveAction',
          payload: {
            homeAllItemList:{}
          }
        })
      }else if(payload.state == 2){//清空当前显示链表，重置显示页数
        let { homeAllItemList:allItemList } = yield select(state => state.storage);
        for(let key in allItemList){
          allItemList[key].showPage = 1
        }

        yield put({
          type: 'save',
          payload: {
            // allItemList,
            showItemList:[],
            currentTab:payload.currentTab
          }
        });
        yield put({
          type: 'storage/saveAction',
          payload: {
            homeAllItemList:allItemList,
          }
        })
        return true;
      }else if(payload.state == 3){//删除选择页签的缓存
        let { homeAllItemList:allItemList } = yield select(state => state.storage);

        allItemList[payload.currentTab] = {}

        yield put({
          type: 'save',
          payload: {
            // allItemList,
            showItemList:[],
            currentTab:payload.currentTab
          }
        });
        yield put({
          type: 'storage/saveAction',
          payload: {
            homeAllItemList:allItemList,
          }
        })
      }
    },
    *fetchGetStatistical({ payload = {} }, { call, put , select}) {
      let result = yield call(Api.getStatistical, payload);
      let { statistical } = yield select(state => state.home);
      if(result && Utils.comparisonObject(result , statistical) == false) {
        yield put({
          type: 'save',
          payload: {
            statistical: result
          }
        });
      }
    },

    *refreshLocationWeather({ payload = {} }, { call, put , select}) {
      let cur_area = storage.getInstance().getAreainfo();
      let address = ''
      
      if(cur_area.area_info.provinces){
        address = cur_area.area_info.provinces.name
      }
      if(cur_area.area_info.city){
        address = cur_area.area_info.city.name
      }
      if(cur_area.area_info.area && cur_area.area_info.area.id.length <= 6){
        address = cur_area.area_info.area.name
      }
      
      let result = yield Platfrom.sendWeather(address);
      if(result){
        yield put({
          type: 'save',
          payload: {
            locationWeather: result
          }
        });
      }
    },
    *refreshLocationTitle({ payload = {} }, { call, put , select}) {
      let { locationTitle } = yield select(state => state.home);

      if(Utils.comparisonObject(payload.title , locationTitle) == false) {
        yield put({
          type: 'save',
          payload: {
            showItemList: []
          }
        });
        yield put({
          type: 'storage/saveAction',
          payload: {
            homeAllItemList:{},
          }
        })

        yield put({
          type: 'save',
          payload: {
            locationTitle: payload.title
          }
        });
        yield put({
          type: 'refreshLocationWeather',
          payload: {
              address: payload.title
          }
        });
      }
      if(!payload.norefresh){
        Taro.eventCenter.trigger('EVENT_LOCATION_REFRESH')
      }
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  },

};
