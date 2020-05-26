import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { TitleBar, NoData , DqInput } from "@/components";
import IconFont from "@/components/iconfont";
import { connect } from "@tarojs/redux";
import "./search.scss";

@connect(({ location }) => ({
  ...location
}))
class LocationSearch extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      searchText: "", //搜索内容
      title: "", //头部标题
      from: "" //跳转来的页面
    };
  }

  componentWillMount() {
    // console.log(this.$router);
    this.setState({
      title: this.$router.params.title || "",
      from: this.$router.params.from || "",
      searchText: this.$router.params.searchText || ""
    });
  }

  handleInput = (key, value) => {
    //搜索框输入事件
    this.setState({ [key]: value });
    // console.log(value);
    if (value.length > 0) {
      this.props.dispatch({
        type: "location/getLightCity",
        payload: {
          search_word: value
        }
      });
    }
    // this.props.dispatchGetLocationLightCity(value);
  };

  tagClick = item => {
    //点击标签事件
    // console.log(item);
    this.search(item.value);
  };

  handleSearch = () => {
    //点击搜索按钮事件
    const content = this.state.searchText;
    this.search(content);
  };

  search = async item => {
    await this.props
      .dispatch({
        type: "location/getLightCityInfo",
        payload: {
          district_sqe: item.district_sqe
        }
      })
      .then(res => {
        Taro.switchTab({
          url: `/pages/home/index`
        });
      });
  };

  onChoose = (item, index) => {
    // console.log(
    //   "LocationSearch",
    //   item.city_id,
    //   item.city_name,
    //   item.district_sqe,
    //   index
    // );
    this.search(item);
  };

  render() {
    const { searchText, title } = this.state;
    const { selectLightCity } = this.props;

    return (
      <View className="location-search">
        <TitleBar title={title} />
        <View className="location-search__header">
          <View className="location-search__header_icon">
            <IconFont name="ic_sousuo" color="#D1D1D1" size={34} />
          </View>
          <View className="location-search__header__input">
            <DqInput
              icon='icon_deal'
              placeholder="请输入搜索内容"
              value={searchText}
              onInput={this.handleInput.bind(this, "searchText")}
            />
          </View>
          <View
            className="location-search__header__btn"
            onClick={this.handleSearch.bind(this)}
          >
            <Text className="location-search__header__btn__text">{title}</Text>
          </View>
        </View>
        <View className={"location-search__panel"}>
          {selectLightCity.map((item, index) => {
            const c = "";
            return (
              <View
                key={'location-search-select-'+index}
                className="location-search__panel__item"
                onClick={this.onChoose.bind(this, item, index)}
              >
                <View className={"location-search__panel__item__text" + c}>
                  <Text className="location-search__panel__item__text__text">{item.city_name}</Text>
                </View>
              </View>
            );
          })}
          {(!selectLightCity || selectLightCity.length <= 0) &&
            searchText.length > 0 && (
              <View>
                <NoData
                  title={"“" + searchText + "”的搜索信息"}
                  tips="该地区还未开通E网,敬请期待"
                />
              </View>
            )}
        </View>
      </View>
    );
  }
}
export default LocationSearch;