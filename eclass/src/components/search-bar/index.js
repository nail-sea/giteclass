import Taro, { Component, PureComponent } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { DqInput } from "@/components";
import IconFont from "@/components/iconfont";
import "./index.scss";
import Dq from "@/config/Dq";
import { STATIC_ASSETS } from "../../config";

export default class SearchBar extends PureComponent {
  static defaultProps = {
    mode: "main",
    title: "找工作、找房子、找二手"
  };

  state = {
    searchText: "",
    isSearch: false
  };

  handleClick = item => {
    Dq.navigateTo({
      url: `/pages/user/user`
    });
  };

  tagClick = item => {
    // console.log(item);
  };

  handleInput = (key, value) => {
    this.setState({ [key]: value });
  };

  showSearchBar = value => {
    // console.log("showSearchBar");
    this.setState({ isSearch: value });
  };

  handleSearch = () => {
    this.props.handleSearch();
  };

  render() {
    const { searchText, isSearch } = this.state;
    const { mode, title } = this.props;
    const tagList = [
      { id: 1, value: "第一个" },
      { id: 2, value: "普通技工" },
      { id: 3, value: "司机" },
      { id: 4, value: "最最最可爱的小星星" },
      { id: 5, value: "文员" },
      { id: 6, value: "啦啦啦~" }
    ];
    return (
      <View className="search-bar">
        {mode == "logo" && (
          <View
            className="search-bar__content__logo"
            onClick={this.handleSearch.bind(this)}
          >
            <View className="search-bar__content__logo__bg" />
            {/* <Image
              className="search-bar__content__logo_icon"
              src={STATIC_ASSETS("images/icon/logo.png")}
            /> */}
            <View className="search-bar__content__logo__ic_sousuo">
              <IconFont name="ic_sousuo" color="#D1D1D1" size={34} />
            </View>
            <Text className="search-bar__content__logo__input">{title}</Text>
          </View>
        )}
        {mode == "main" && (
          <View
            className="search-bar__content"
            onClick={this.handleSearch.bind(this)}
          >
            <View className="search-bar__content__bg"></View>
            <View className="search-bar__content__inner">
              <IconFont
                className="search-bar__content__ic_sousuo"
                name="ic_sousuo"
                color={"#fff"}
                size={34}
              />
              <Text className="search-bar__content__input">{title}</Text>
            </View>
          </View>
        )}
        {mode == "search" && (
          <View
            className="search-bar__content-search"
            onClick={this.handleSearch.bind(this)}
          >
            <View className="search-bar__content-search__icon">
              <IconFont name="ic_sousuo" color={"#D1D1D1"} size={34} />
            </View>
            <Text className="search-bar__content-search__input">{title}</Text>
          </View>
        )}
        {/* <View className='search-bar__btn'>搜索</View> */}

        {isSearch && (
          <View className="search-bar__side-bar">
            <View className="search-bar__side-bar__search-bar">
              <View
                className="search-bar__back"
                onClick={this.showSearchBar.bind(this, false)}
              >
                <Text>返回</Text>
              </View>
              <View className="search-bar__input">
                <DqInput
                  icon='icon_deal'
                  placeholder="请输入搜索内容"
                  value={searchText}
                  onInput={this.handleInput.bind(this, "searchText")}
                />
              </View>
              <View className="search-bar__btn">
                <Text className="search-bar__btn__text">搜索</Text>
              </View>
            </View>
            <View className="search-bar__side-bar__search-title">
              <Text>热门搜索</Text>
            </View>
            <View className="search-bar__side-bar__search-hot">
              {tagList.map(item => (
                <View
                  key={item.id}
                  className="search-bar__tags"
                  onClick={this.tagClick.bind(this, item)}
                >
                  <Text>{item.value}</Text>
                </View>
              ))}
            </View>
            <View className="search-bar__side-bar__search-title">
              <Text>历史搜索</Text>
            </View>
            <View className="search-bar__side-bar__search-hot">
              {tagList.map(item => (
                <View
                  key={item.id}
                  className="search-bar__tags"
                  onClick={this.tagClick.bind(this, item)}
                >
                  <Text>{item.value}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    );
  }
}
