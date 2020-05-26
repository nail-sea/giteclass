import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { Cascader, TitleBar, SearchBar } from "@/components";
import { connect } from "@tarojs/redux";
import IconFont from "@/components/iconfont";
import storage from "../../utils/storage";
import decorator from "@/config/decorator";
import classNames from 'classnames'
import Dq from "@/config/Dq";
import "./location.scss";

@connect(({ location }) => ({
  ...location
}))
@decorator()
class Location extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      searchText: "搜索信息", //搜索内容
      tagList:[]
    };
  }
  config = {
    navigationBarTitleText: "定位"
  };
  componentDidMount() {
    this.setState({
      tagList: this.getRecord()
    });
  }

  onSelect = () => {//选择完成之后跳转回首页
    Taro.navigateBack({ delta: 1 });
  };

  handleToSearch = () => {
    //跳转去搜索页
    Dq.navigateTo({
      url: `/pages/location/search/search`
    });
  };

  tagClick = (item , index) => {
    //点击标签事件
    console.log("tagClick",item);
    if (index != 0) {
      storage.getInstance().setAreainfo(item.record);
      this.props
        .dispatch({
          type: "home/refreshLocationTitle",
          payload: {
            title: item.value
          }
        })
        .then(res => {
          Taro.navigateBack({ delta: 1 });
        });
    } else {
      Taro.navigateBack({ delta: 1 });
      // Taro.switchTab({
      //   url: `/pages/home/index`
      // });
    }
  };
  delectClick = () => {
    let curitem = null;
    const record = storage.getInstance().getAreainfoRecord();
    const areainfo = storage.getInstance().getAreainfo();
    for (let key in record) {
      let item = record[key];
      if (areainfo.cur_area.id == item.cur_area.id) {
        curitem = item;
        break;
      }
    }

    storage.getInstance().resetAreainfoRecord([curitem])
    this.setState({
      tagList: this.getRecord()
    });
  }
  getRecord = () => {
    const record = storage.getInstance().getAreainfoRecord();
    const areainfo = storage.getInstance().getAreainfo();
    let r_arr = [];
    let tick = 1;
    for (let key in record) {
      let item = record[key];
      let info = {};
      info.id = tick;
      info.value = item.area_info[item.cur_area_type].name;
      info.record = record[key];
      if (areainfo.cur_area.id != item.cur_area.id) {
        r_arr.push(info);
        tick += 1;
      } else {
        info.id = 0;
        r_arr.unshift(info);
      }
    }
    return r_arr;
  };

  render() {
    const { searchText , tagList } = this.state;

    return (
      <View className="location">
        <TitleBar title="定位" />
        <View className="location__search">
          <SearchBar
            mode="search"
            title={searchText}
            handleSearch={this.handleToSearch.bind(this)}
          />
        </View>
        {tagList && tagList.length > 0 ? <View className="location__history">
          <View className="location__history__title">
            <Text className="location__history__title__text">定位/最近访问</Text>
            <View
              className="location__history__title-title_icon"
              onClick={this.delectClick.bind(this)}
            >
              <IconFont name="icon_shanchu" color="#A0A0A0" size={34} />
            </View>
          </View>
          <View className="location__history__list">
            {tagList.map((item, index) => (
              <View
                key={'location-tag-'+index}
                onClick={this.tagClick.bind(this, item , index)}
                className={classNames(`location__history__list__tags`, {'location__history__list__tags--active': index == 0} )}
              >
                {index == 0 && (
                  <IconFont name="ic_dingwei" color="#FFFFFF" size={30} />
                )}
                <Text 
                  className={classNames(`location__history__list__tags__text`, {'location__history__list__tags__text--active': index == 0} )}
                >{item.value}</Text>
              </View>
            ))}
          </View>
        </View> : null}
        <Cascader onSelect={this.onSelect.bind(this)} title="选择已覆盖的区域"/>
      </View>
    );
  }
}
export default Location;