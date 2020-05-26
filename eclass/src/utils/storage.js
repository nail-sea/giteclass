import Taro from "@tarojs/taro";

const STORAGE = {
  key_areainfo: "__eclass_areainfo_100",
  key_token: "__eclass_token",
  key_areainfo_record: "__eclass_areainfo_record_100",
  login_state: "__eclass_loginState",
  pass_state: "__eclass_passState",
  key_history_search: "__eclass_history_search",
  key_identify:"__eclass_identify",
  key_postid:"__eclass_postid",
  key_clause_check:"__eclass_clause_check",
};

function setCacheData(obj) {
  if (Taro.getEnv() !== Taro.ENV_TYPE.RN) {
    const { key, data } = obj;
    Taro.setStorageSync(key, data);
  } else {
    Taro.setStorage(obj);
  }
}

function getCacheData(obj) {
  if (Taro.getEnv() !== Taro.ENV_TYPE.RN) {
    const { key } = obj;
    return Taro.getStorageSync(key);
  }
  return Taro.getStorage(obj).then(res => res.data);
}

export default class storage {
  constructor() {
    this.instance = null;

    this.mToken = null;
    this.mAreainfo = null; //当前定位信息
    this.mAreainfo_record = []; //所有记录定位信息
    this.loginState = "";
    this.passState = "";
    this.mHistorySearch = null; //搜索历史记录 , {key=root :value=[]}
    this.mIdentify = null;//邀请码
    this.postId =null;//未绑定微信支付
    this.clauseCheck =null;//是否勾选用户协议
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new storage();
    }
    return this.instance;
  }

  initModel = () => {
    if (this.mToken) return Promise.resolve();
    return Promise.all([
      this.initPassState(), //第一次登陆 设置登陆密码
      this.initAreaInfo(),
      this.initToken(),
      this.initAreaInfoRecord(),
      this.initLoginState(),
      this.initHistorySearch(),
      this.initClauseCheck(),
      this.initIdentify()
      // this.initPostId()
    ]);
  };

  initToken = async () => {
    let token = await getCacheData({ key: STORAGE.key_token });
    this.mToken = token;
  };

  setToken(data) {
    this.mToken = data;
    return setCacheData({ key: STORAGE.key_token, data });
  }

  getToken() {
    //let token = this.mToken;
    /* if (!token) {
      token = getCacheData({ key: STORAGE.key_token });
      this.mToken = token;
    } */
    return this.mToken;
  }

  initClauseCheck = async () => {
    let clause_check = await getCacheData({ key: STORAGE.key_clause_check });
    this.clauseCheck = clause_check;
  };

  setClauseCheck(data) {
    this.clauseCheck = data;
    return setCacheData({ key: STORAGE.key_clause_check, data });
  }

  getClauseCheck() {
    return this.clauseCheck;
  }

  initLoginState = async () => {
    this.loginState = await getCacheData({ key: STORAGE.login_state });
    return this.loginState;
  };

  setLoginState(data) {
    this.loginState = data;
    return setCacheData({ key: STORAGE.login_state, data });
  }

  async getLoginState() {
    this.loginState = await getCacheData({ key: STORAGE.login_state });
    return this.loginState;
  }

  initPassState = async () => {
    this.passState = await getCacheData({ key: STORAGE.pass_state });
    if(this.passState == 'yes' || this.passState == 'no' || this.passState == ''){
      this.setPassState({})
      this.passState = {}
    }
    return this.passState;
  };

  setPassState(phone, data) {
    let passState = this.passState || {};
    if(passState == 'yes' || passState == 'no' || passState == ''){
      passState = {}
    }
    if(phone){
      passState[phone.toString()] = data
    }
    this.passState = passState;
    setCacheData({ key: STORAGE.pass_state, data: passState });
  }

  getPassState(phone) {
    let passState = this.passState || {};
    if(passState == 'yes' || passState == 'no' || passState == ''){
      passState = {}
    }
    if(phone){
      if(passState[phone.toString()]){
        return passState[phone.toString()];
      } else {
        return 'no'
      }
    } else {
      return passState;
    }
  }

  initHistorySearch = async () => {
    this.mHistorySearch = await getCacheData({
      key: STORAGE.key_history_search
    });
    return this.mHistorySearch;
  };

  setHistorySearch(key, data) {
    if (key.length <= 0) {
      return;
    }

    if (!this.mHistorySearch) {
      this.mHistorySearch = {};
    }
    if (!this.mHistorySearch[key]) {
      this.mHistorySearch[key] = [];
    }
    if (data && data instanceof Array) {
      this.mHistorySearch[key] = data;
      setCacheData({
        key: STORAGE.key_history_search,
        data: this.mHistorySearch
      });
    } else {
      var index = this.mHistorySearch[key].indexOf(data);
      if (index <= -1) {
        this.mHistorySearch[key].unshift(data);
        if (this.mHistorySearch[key].length > 20) {
          this.mHistorySearch[key].pop();
        }
        setCacheData({
          key: STORAGE.key_history_search,
          data: this.mHistorySearch
        });
      }
    }
  }

  getHistorySearch(key) {
    return this.mHistorySearch ? this.mHistorySearch[key] || [] : [];
  }

  getCurArea(area_info) {
    let arr = ["provinces", "city", "area", "county", "community"];
    for (let i = arr.length - 1; i >= 0; i--) {
      if (area_info[arr[i]] && area_info[arr[i]].id != 0) {
        return { info: area_info[arr[i]], type: arr[i] };
      }
    }
    return null;
  }

  initAreaInfo = async () => {
    this.mAreainfo = await getCacheData({ key: STORAGE.key_areainfo });
    return this.mAreainfo;
  };

  setAreainfo(data) {
    let cur_area = this.getCurArea(data.area_info);
    if (!cur_area) {
      return;
    }
    data.cur_area = cur_area.info; //区域
    data.cur_area_type = cur_area.type;
    data.area_level = Object.keys(data.area_info).length; //区域等级 1:小区 2:乡镇 3:区域 4:城市 5:省份
    if (
      this.mAreainfo_record == undefined ||
      this.mAreainfo_record == null ||
      Array.isArray(this.mAreainfo_record) == false
    ) {
      this.mAreainfo_record = [];
    }
    let is_reset = true;
    var that = this;
    for (let key in this.mAreainfo_record) {
      let info = this.mAreainfo_record[key];
      if (
        info.cur_area.id == data.cur_area.id &&
        info.area_level == data.area_level
      ) {
        is_reset = false;
        break;
      }
    }
    if (is_reset) {
      this.mAreainfo_record.unshift(data);
      if (this.mAreainfo_record.length > 8) {
        this.mAreainfo_record.pop();
      }

      setCacheData({
        key: STORAGE.key_areainfo_record,
        data: that.mAreainfo_record
      });
    }

    this.mAreainfo = data;
    setCacheData({
      key: STORAGE.key_areainfo,
      data: data
    });
  }

  getAreainfo() {
    return this.mAreainfo;
  }

  initAreaInfoRecord = async () => {
    this.mAreainfo_record = await getCacheData({
      key: STORAGE.key_areainfo_record
    });
    return this.mAreainfo_record;
  };
  resetAreainfoRecord(arr) {
    this.mAreainfo_record = arr;
    setCacheData({
      key: STORAGE.key_areainfo_record,
      data: this.mAreainfo_record
    });
  }
  getAreainfoRecord() {
    return this.mAreainfo_record;
  }

  initIdentify = async () => {
    let identify = await getCacheData({ key: STORAGE.key_identify });
    this.mIdentify = identify;
  };

  setIdentify(data) {//不保存本地 20200328    20200405保存本地
    this.mIdentify = data;
    return setCacheData({ key: STORAGE.key_identify, data });
  }

  getIdentify() {
    return this.mIdentify;
  }
  
}
