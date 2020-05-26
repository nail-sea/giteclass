import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import {
  TitleBar,
  SearchBar,
  NoData,
  SwiperBanner,
  TabSelect,
  SkeletonList,
  DropDown
} from "@/components";
import { connect } from "@tarojs/redux";
import decorator from "@/config/decorator";
import storage from "@/utils/storage";
import ENUM, { ROUTER_CLASS } from "@/config/enum";
import ItemHome from "./item-home";
import { STATIC_ASSETS, SHAREINFO } from "@/config/index";
import Dq from "@/config/Dq";
import { getWindowHeight } from "@/utils/style";
import Platform from "@/platfrom";
import {getPlatform, stdConfig} from "@/utils/common";
import './index.scss'
// if(process.env.TARO_ENV === 'weapp'){
//    require('./index.weapp.scss')
// }else{
//   require('./index.scss')
// }

@connect(({ shopStore, common }) => ({
  ...shopStore,
  ...common
}))
@decorator()
class SearchPage extends Component {
  config = {
    navigationBarTitleText: "店铺",
    disableScroll: getPlatform().isRN
  }
  constructor() {
    super(...arguments);
    this.state = {
      listLoading: true,
      page: 0,
      showItems: [], //当前搜索显示链表
      loading: false,
      hasMore: true,
      title: "店铺", //头部标题
      primary_category: null,
      second_category: null,
      date_type: null,
      sort_type: null,
      district_scope: null,
      isFixed: false,
      dropDownValue: {},
      dropDownDatas: []
    };
  }

  handleBack = () => {
    //当前页面返回，清除所有页面 返回跳来搜索的模块页
    Dq.redirectTo({
      url: ROUTER_CLASS[this.state.from] || this.state.from
    });
    let page = Taro.getCurrentPages();
  };

  componentDidShow() {
    if(process.env.TARO_ENV === 'weapp'){
      if (typeof this.$scope.getTabBar === 'function' && this.$scope.getTabBar()) {
        this.$scope.getTabBar().$component.setState({
          selected: 3
        })
      }  
    }
  }

 async componentDidMount() {
    await this.props.dispatch({
      type: "common/fetchAdvert",
      payload: { ad_price: 5, ad_type: 'coupon' }
    })
    this.setState({
      dropDownDatas: [
        {
          label: '分类',
          value: 'primary_category',
          children: [{ label: '全部分类' }, ...Object.entries(stdConfig.shopcategory).map(([value, obj]) => ({ value, label: obj.title , name:'primary_category', children:Object.entries(obj.list).map(([value,label]) => ({label, value, name:'second_category'}))}))]
        },
        {
          label: '时间',
          value: 'date_type',
          defaultValue: 'total',
          children: [
            { name: 'date_type',label: "全部", value: "total" },
            { name: 'date_type',label: "今天", value: "today" },
            { name: 'date_type',label: "昨天", value: "yesterday" },
            { name: 'date_type',label: "本周", value: "week" },
            { name: 'date_type',label: "本月", value: "month" },
            { name: 'date_type',label: "本年", value: "year" },
            { name: 'date_type',label: "3天", value: "3day" },
            { name: 'date_type',label: "7天", value: "7day" },
            { name: 'date_type',label: "30天", value: "30day" },
            { name: 'date_type',label: "90天", value: "90day" }
          ]
        },
        // {
        //   label: '地点',
        //   value: 'district_scope',
        //   defaultValue: 0,
        //   children: [
        //     { label: "不限", value: 0 },
        //     { label: "1km", value: 1 },
        //     { label: "3km", value: 3 },
        //     { label: "5km", value: 5 },
        //     { label: "10km", value: 10 }
        //   ]
        // },
        {
          label: '排序',
          value: 'sort_type',
          defaultValue: 'audit_time',
          children: [
            { name:'sort_type',label: "默认", value: "audit_time" },
            { name:'sort_type',label: "浏览量", value: "visit_num" },
            { name:'sort_type',label: "销售量", value: "sell_coupon_num" }
          ]
        }
      ]
    })
    this.sendSearchList(0);

  
    const record_city = storage.getInstance().getAreainfo(); //获取定位城市
    const cityName = record_city && record_city.cur_area ? record_city.cur_area.name : ''

    const shareConfig={
      ...SHAREINFO.shopHome,
      title:`${cityName}${SHAREINFO.shopHome.title}`,
      link:'/pages/shopStore/index?share=1'
    }
    Platform.sendShare(shareConfig)
  }

  handleToSearch = () => {
    //跳转去搜索页
    Dq.navigateTo({
      url: `/pages/search/search?from=/pages/shopStore/index`
    });
  };

  sendSearchList(page) {
    let msg = { ...this.state.dropDownValue };
   
    msg.__location = 1;
    msg.page = page + 1;
    this.props
      .dispatch({
        type: "shopStore/fetchShoplist",
        payload: msg
      })
      .then(data => {
        if (data && data.list && data.list.length > 0) {
          this.setState(prevState => ({
            listLoading: false,
            page: data.page,
            showItems:
              data.page > 1
                ? prevState.showItems.concat(data.list || [])
                : data.list,
            hasMore: data.list.length > 9,
            loading: false
          }));
        } else {
          this.setState({
            listLoading: false,
            loading: false,
            hasMore: data.list.length > 9,
            showItems: data.page > 1 ? this.state.showItems : []
          });
        }
      });
  }

  onDropDownChange = (dropDownValue) => {
    this.setState({ dropDownValue }, this.sendSearchList.bind(this, 0))
  }

  handleClear = id => {
    //清空当前选择
    this.state.tabSel
      .find(item => {
        return item.id == id;
      })
      .selector.forEach(item => {
        this.setState({ [item]: [0] });
      });
  };
  onToDetail = (id, type) => {
    //查看详情
    if (!type) {
      // const from_arr = this.state.from.split('/');
      type = "jobHunting";
    }
    Dq.navigateTo({
      url: `/pages/class/detail-master/index?post_id=${id}`
    });
  };

  onListScroll = event => {
    if (process.env.TARO_ENV === "weapp") {
      let that = this;
      this.refs.tabSelect
        .fields(
          {
            id: false, //是否返回节点id
            rect: true, //是否返回节点布局位置
            dataset: true, //返回数据集
            size: true, //返回宽高
            scrollOffset: true, //返回 scrollLeft,scrollTop
            properties: ["scrollX", "scrollY"] //监听属性名
          },
          function (res) {
            if (that.state.isFixed != res.top <= 0) {
              that.setState({ isFixed: res.top <= 0 });
            }
          }
        )
        .exec();
      // 这里 this.refs.input 访问的时候通过 `wx.createSeletorQuery` 取到的小程序原生组件
    } else if (process.env.TARO_ENV === "h5") {
      if (
        this.state.isFixed !=
        event.detail.scrollTop >= this.refs.tabSelect.vnode.dom.offsetTop
      ) {
        this.setState({
          isFixed:
            event.detail.scrollTop >= this.refs.tabSelect.vnode.dom.offsetTop
        });
      }
    }
  };

  loadRecommend = async () => {
    if (!this.state.hasMore || this.state.loading) {
      return;
    }
    this.setState({ loading: true }, () => {
      this.sendSearchList(this.state.page);
    });
  };

  //选择器
  renderTabSelect() {
    const {
      isFixed,
      dropDownDatas,
      dropDownValue
    } = this.state;
    return (
      <View ref="tabSelect" className="shop-store-select-content">
        <View className={isFixed ? (process.env.TARO_ENV === 'weapp' ? "shop-store-select--weapp--fixed" : "shop-store-select--fixed") : ""}>
          <DropDown
            data={dropDownDatas}
            value={dropDownValue}
            onChange={this.onDropDownChange}
            activeColor="#F87C6A"
          />
        </View>
      </View>
    );
  }
  render() {
    const { advertList } = this.props;
    const { title, showItems, listLoading } = this.state;

    const imgList = advertList['coupon'] || [];

    return (
      <View className={"shop-store"}>
        {/* <DqTabBar currentTab={3} /> */}
        <TitleBar title={title} is_back={false} />
        <ScrollView
          scrollY
          className="shop-store__wrap"
          onScrollToLower={this.loadRecommend}
          onScroll={this.onListScroll}
          style={{ height: getWindowHeight(false, true) }}
        >
          <View className="search-list__header">
            <SearchBar
              logo="1"
              mode="logo"
              title="搜索商铺"
              handleSearch={this.handleToSearch.bind(this)}
            />
          </View>
          <View className="shop-store__banner">
            <SwiperBanner data={imgList} loop autoplay />
          </View>
            {this.renderTabSelect()}
          <SkeletonList
            loading={listLoading}
            itemProps={{ avatarShape: 'square' }}
          >
            <View className="shop-store__list">
              <View>
                {showItems.map((item, index) => {
                  return <ItemHome key={item.id} data={item} />;
                })}
              </View>

              <View className="list__bottom__loading">
                {this.state.loading && (
                  <Text className="list__bottom__loading-txt">正在加载中...</Text>
                )}
                {!this.state.hasMore && (
                  <Text className="list__bottom__loading-txt">
                    更多内容，敬请期待
                  </Text>
                )}
              </View>
            </View>
          </SkeletonList>
        </ScrollView>
      </View>
    );
  }
}
export default SearchPage;