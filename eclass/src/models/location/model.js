import Storage from '../../utils/storage'
import Api from '../../utils/request';
import Taro from "@tarojs/taro";
import ENUM from '../../config/enum';
import display from '../../utils/display';
import Platfrom from '@/platfrom'
import utils from '@/utils/utils'

function getLocationName(info) {
  if(!info){
    return null;
  }
  let ids = [];
  if (info.area_info.provinces) ids.push(info.area_info.provinces.name);
  if (info.area_info.city) ids.push(info.area_info.city.name);
  if (info.area_info.area) ids.push(info.area_info.area.name);
  if (info.area_info.county) ids.push(info.area_info.county.name);
  
  return ids.join(',')
}

function getMapStrLocation({addressComponent:{province,city,district,township}}){
  if  (city.length <= 0) {
    if (province.endsWith('市')) {
      province = province.substr(0,province.length - 1)
    }
    return `${province},${province}市,${district},${township}`
  }
  return `${province},${city},${district},${township}`
}

function compareLocation(str1 , str2){
  return str1 === str2;
}

export default {
    namespace: 'location',
    state: {
      isSendLocation:false,
      mapData: null,
      locationData:{},//定位城市队列
      selectPosition:[],//当前选择的城市
      selectLightCity:[]//城市高亮搜索
    },
  
    effects: {
      *getLocation({ payload = {} }, { call, put ,select}) {
        const isSendLocation = yield select(state => state.location.isSendLocation)
        if(isSendLocation)
        {
          return;
        }
        yield put({
          type: 'save',
          payload: {
            isSendLocation: true
          }
        });
        let msg = {};
        let result = yield Platfrom.sendLocation();
        if(result) {
          let storage_msg = Storage.getInstance().getAreainfo();
          let province = result.addressComponent.province;
          let map_strlocation = getMapStrLocation(result);
          if(!storage_msg){
            [msg.location , msg.location_level , msg.longitude , msg.latitude] = [map_strlocation , 4 , result.lng , result.lat];
            let msg_result = yield call(Api.getareainfo, msg);
            if(msg_result && msg_result.area_info.provinces && Number(msg_result.area_info.provinces.id) != 0){
              Storage.getInstance().setAreainfo({...msg_result , amap:map_strlocation});
              let cur_area = Storage.getInstance().getCurArea(msg_result.area_info);
              yield put({
                  type: 'home/refreshLocationTitle',
                  payload: {
                      title: cur_area.info.name
                  }
              });
            }
          }else{
            // let strlocation = getLocationName(storage_msg);
            console.log("strlocation",storage_msg.amap,map_strlocation);
            if(compareLocation(storage_msg.amap, map_strlocation) == false){
              let str_title = result.addressComponent.city.length <= 0 ? province : result.addressComponent.city;
              let res = yield Taro.showModal({title:'提示', content :(`当前定位城市是<${str_title}>,是否切换`),confirmColor : '#F87C6A'});
              if(res.confirm){
                [msg.location , msg.location_level , msg.longitude , msg.latitude] = [map_strlocation , 4 , result.lng , result.lat];
                let msg_result = yield call(Api.getareainfo, msg);
                if(msg_result && msg_result.area_info.provinces && Number(msg_result.area_info.provinces.id) != 0){
                  Storage.getInstance().setAreainfo({...msg_result , amap:map_strlocation});
                  let cur_area = Storage.getInstance().getCurArea(msg_result.area_info);
                  yield put({
                      type: 'home/refreshLocationTitle',
                      payload: {
                          title: cur_area.info.name
                      }
                  });
                }
              }
            }else{
            }
          }
        }else{
          let storage_msg = Storage.getInstance().getAreainfo();
          if (storage_msg && storage_msg.cur_area) {
            // yield put({
            //   type: "home/refreshLocationTitle",
            //   payload: {
            //     title: storage_msg.cur_area.name
            //   }
            // });
          } else {
            let msg_result = yield call(Api.getareainfo, {});
            if(msg_result && msg_result.area_info.provinces && Number(msg_result.area_info.provinces.id) != 0){
              Storage.getInstance().setAreainfo(msg_result);
              let cur_area = Storage.getInstance().getCurArea(msg_result.area_info);
              yield put({
                  type: 'home/refreshLocationTitle',
                  payload: {
                      title: cur_area.info.name
                  }
              });
            }
          }
        }
      },
      *getLevelArea({ payload = {} }, { call, put, select }) {
        const locationData = yield select(state => state.location.locationData)
        let data = locationData[payload.up_id]
        if(data){
          yield put({
            type: 'save',
            payload: {
                selectPosition: data
            }
          });
          return
        }
        let msg_result = yield call(Api.getLevelArea, payload);
        if(msg_result){
            let cityarr = msg_result;
            if(payload.up_id != 1){
              cityarr = [{city_id: "-1", city_name: "全部"}, ...cityarr]
            }
            yield put({
                type: 'saveLevelArea',
                payload: {
                    up_id:payload.up_id,
                    selectPosition: cityarr
                }
            });
        } else {
          yield put({
            type: 'save',
            payload: {
                selectPosition: []
            }
          });
        }
      },
      *getLightCity({ payload = {} }, { call, put }) {
        let msg_result = yield call(Api.getLightCity, payload);
        yield put({
          type: 'save',
          payload: {
              selectLightCity: !msg_result || utils.isNil(msg_result) ? []: msg_result
          }
        });
      },
      *getLightCityInfo({ payload = {} }, { call, put }) {
        let msg_result = yield call(Api.getLightCityInfo, payload);
        if(msg_result){
            Storage.getInstance().setAreainfo(msg_result);
            yield put({
                type: 'save',
                payload: {
                    mapData: msg_result
                }
            });
            let cur_area = Storage.getInstance().getCurArea(msg_result.area_info);
            const title = cur_area.info.name
            yield put({
                type: 'home/refreshLocationTitle',
                payload: {
                    title: title
                }
            });
            return msg_result
        }
      }
    },
  
    reducers: {
      save(state, { payload }) {
        return { ...state, ...payload };
      },
      saveLevelArea(state, { payload }) {
        const { selectPosition, up_id } = payload
        const locationData = {...{[up_id]: selectPosition}, ...state.locationData}
        return { ...state, ...{ selectPosition } , ...{ locationData }};
      },
    },
  
  };
  