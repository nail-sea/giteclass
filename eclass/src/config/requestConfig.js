import home from "../models/home/config";
import classUrl from "../models/class/config";
import loginRegister from "../models/login-register/config";
import location from "../models/location/config";
import user from "../models/user/config";
import notice from "../models/notice/config";
import publish from "../models/publish/config";
import card from "../models/card/config";
import auth from "../models/auth/config";
import shopStore from "../models/shopStore/config";
import search from "../models/search/config";
import common from "../models/common/config";
import storage from "../utils/storage";
import global from "../utils/global";

export const setLocation = (type, data) => {
  // console.log("setLocation", type);
  const info = storage.getInstance().getAreainfo();
  // console.log("Areainfo", info);
  if (info && type == 1) {
    //定位详细信息

    if (info.lng) data["lng"] = info.lng;
    if (info.lat) data["lat"] = info.lat;
    if (info.area_info.provinces)
      data["provinces_id"] = info.area_info.provinces.id;
    if (info.area_info.city) data["city_id"] = info.area_info.city.id;
    if (info.area_info.area) data["area_id"] = info.area_info.area.id;
    if (info.area_info.county) data["county_id"] = info.area_info.county.id;
    if (info.area_info.community)
      data["community_id"] = info.area_info.community.id;
  } else if (info && type == 2) {
    if (info.area_info.provinces)
      data["provinces_id"] = info.area_info.provinces.id;
    if (info.area_info.city) data["city_id"] = info.area_info.city.id;
    if (info.area_info.area) data["area_id"] = info.area_info.area.id;
    if (info.area_info.county) data["county_id"] = info.area_info.county.id;
    if (info.area_info.community)
      data["community_id"] = info.area_info.community.id;
  } else if (info && type == 3) {
    if (info.area_info.provinces)
      data["provinces_id"] = info.area_info.provinces.id;
  }
  //  else if (info && type == 3) {//区域IDS
  //     let ids = '';
  //     if (info.area_info.provinces) ids.push(info.area_info.provinces.id);
  //     if (info.area_info.city) ids.push(info.area_info.city.id);
  //     if (info.area_info.area) ids.push(info.area_info.area.id);
  //     if (info.area_info.county) ids.push(info.area_info.county.id);
  //     data['area_ids'] = '';
  //     for (let key in ids) {
  //         if (key != ids.length - 1) {
  //             data['area_ids'] += (ids[key] + ',');
  //         } else {
  //             data['area_ids'] += (ids[key]);
  //         }
  //     }
  //     // data['area_ids'] = (`${info.area_info.provinces.id},${info.area_info.city.id},${info.area_info.area.id},${info.area_info.county.id}`);
  // } else if (info && type == 4) {
  //     data['area_id'] = info.cur_area.id;   //区域id
  //     data['area_level'] = info.area_level; //区域等级
  //     if (info.lng) data['lng'] = info.lng;
  //     if (info.lat) data['lat'] = info.lat;
  // }
};

//公共请求参数
export const commonParams = data => {
  // commonParams.getData = (data) => {
  let msg = {};
  let token = null;
  let _token = storage.getInstance().getToken();
  if (_token && _token.length > 1) {
    token = _token;
  }
  if (data.__location) {
    setLocation(data.__location, msg);
    delete data.__location;
  }
  let identify = storage.getInstance().getIdentify();
  if(identify && identify.length > 1 && identify != 'null'){
    msg.identify = identify;
  }
  return {body:msg , token:token};
};

//请求映射文件
export const requestConfig = {
  uploadImageUrl: "/api/upload/upload", // 上传图片URL
  ...home,
  ...classUrl,
  ...loginRegister,
  ...location,
  ...user,
  ...notice,
  ...publish,
  ...card,
  ...auth,
  ...shopStore,
  ...search,
  ...common
};
