import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { DqInput , TitleBar} from "@/components";
import IconFont from "@/components/iconfont";
import { connect } from "@tarojs/redux";
import storage from "@/utils/storage";
import { ROUTER_CLASS } from "@/config/enum";
import Dq from "@/config/Dq";
import {getPlatform} from '@/utils/common'
import decorator from '@/config/decorator'

import "./search.scss";
import stdArray from "../../utils/common";

@connect(({ search }) => ({
  ...search
}))
@decorator()
class SearchPage extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      searchText: "", //搜索内容
      title: "搜索", //头部标题
      from: "", //跳转来的页面
      // tagList:[],//推荐链表
      // is_tag_refresh:false,//推荐刷新按钮
      // tag_page:1,//推荐页数
      recommend:{}//推荐
    };
  }

  componentDidMount() {
    // console.log(this.$router);
    let _from = this.$router.params.from;
    this.setState({
      title: this.$router.params.title || "搜索",
      from: _from || "",
      searchText: this.$router.params.searchText || "",
      historyList: storage.getInstance().getHistorySearch(_from) || []
    },()=>{
      this.recommendClick();
    })
    
  }

  handleInput = (key, value) => {
    //搜索框输入事件
    this.setState({ [key]: value });
  };

  historyClick = () => {
    //点击标签事件
    // console.log("historyClick");
    if (this.state.historyList.length > 0) {
      this.state.historyList = [];
      this.setState({ historyList: [] });
      storage.getInstance().setHistorySearch(this.state.from, []);
    }
  };
  recommendClick = (force) => {
    const arr_root = stdArray.splitString(this.state.from  , '_')
    if(arr_root.length <=0){
      return
    }
    let rs_type = arr_root[0]
    if(rs_type == '/pages/home/index'){
      rs_type = 'homepage'
    }else if(rs_type == '/pages/shopStore/index'){
      rs_type = 'coupon'
    }

    let page = this.state.recommend.page >= this.state.recommend.page_count ? 1 : this.state.recommend.page+1;

    this.props.dispatch({
      type: "search/fetchRecommendsearch",
      payload: {rs_price:3 , rs_type , force , page}
    }).then(res => {
      // console.log("fetchRecommendsearch",res)
      // if(res && res.list.length > 0){
        this.setState({ recommend:res});
      // }
    })
  };

  tagClick = item => {
    //点击标签事件
    // console.log(item);
    this.search(item);
  };

  tagDelClick = item => {
    //点击标签事件
    // console.log("tagDelClick");
    var index = this.state.historyList.indexOf(item);
    if (index > -1) {
      this.state.historyList.splice(index, 1);
      this.setState({ historyList: this.state.historyList });

      storage.getInstance().setHistorySearch(this.state.from, this.state.historyList);
    }
  };

  handleSearch = () => {
    //点击搜索按钮事件
    const content = this.state.searchText;
    this.search(content);
  };

  search = data => {
    if (data.length <= 0) {
      return;
    }
    let { dispatch } = this.props;
    let { from } = this.state;
    // console.log("search", from);
    // dispatch({
    //   type: "search/searchList",
    //   payload: {
    //     __location: 2,
    //     root: from,
    //     key_word: data
    //   }
    // });

    Dq.redirectTo({
      url: `/pages/search/searchList/searchList?from=${this.state.from}&searchText=${data}`
    });
  };

  handleBack = () => {
    if (getPlatform().isRN) {
      Dq.navigateBack({delta:1})
    } else {
      Dq.redirectTo({
        url: ROUTER_CLASS[this.state.from] || this.state.from
      });
    }
    // let page = Taro.getCurrentPages()
    // console.log(page)
  };

  render() {
    const { searchText, title, historyList, from , tagList , recommend} = this.state;
    // const { recommendList } = this.props;

    const bar_customBack = from != "/pages/home/index";
    return (
      <View className="search-page">
        <TitleBar
          title={title}
          customBack={true}
          handleBack={this.handleBack.bind(this)}
        />
        <View className="search-page__header">
          <View className="search-page__header_icon">
            <IconFont name="ic_sousuo" color="#D1D1D1" size={34} />
          </View>
          <View className="search-page__header__input">
            <DqInput
              icon='icon_deal'
              placeholder="请输入搜索内容"
              value={searchText}
              onInput={this.handleInput.bind(this, "searchText")}
              focus
            />
          </View>
          <View className='search-page__header__btn' onClick={this.handleSearch.bind(this)}><Text>{title}</Text></View>
        </View>
        {recommend.list && recommend.list.length > 0 && <View className="search-page__search-title">
            <Text className="search-page__search-title__text">推荐</Text>
            {recommend.is_show_refresh === 'yes' && <View
              className="search-page__search-title_icon"
              onClick={this.recommendClick.bind(this,true)}
            >
              <IconFont name="icon_shuaxin" color="#A0A0A0" size={34} />
            </View>}
        </View>}
        {recommend.list && recommend.list.length > 0 &&<View className="search-page__search-hot">
          {recommend.list.map(item => (
            <View
              key={item.sort}
              className="search-page__tags"
              onClick={this.tagClick.bind(this, item.rs_content)}
            >
              <Text className="search-page__tags__text">{item.rs_content}</Text>
            </View>
          ))}
        </View>}
        <View className="search-page__search-title">
          <Text className="search-page__search-title__text">历史搜索</Text>
          <View
            className="search-page__search-title_icon"
            onClick={this.historyClick.bind(this)}
          >
            <IconFont name="icon_shanchu" color="#A0A0A0" size={34} />
          </View>
        </View>
        {historyList && (
          <View className="search-page__search-history">
            {historyList.map(item => (
              <View className="search-page__history-list">
                <IconFont name="icon_shijian" color="#A0A0A0" size={34} />
                <Text
                  className="search-page__history-list__word"
                  onClick={this.tagClick.bind(this, item)}
                >
                  {item}
                </Text>
                <Text
                  className="search-page__history-list__del"
                  onClick={this.tagDelClick.bind(this, item)}
                >
                  ×
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  }
}
export default SearchPage;