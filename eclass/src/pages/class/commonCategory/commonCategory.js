import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import {
  TitleBar,
  SearchBar,
  HeaderStatistics,
  SwiperBanner,
  ReleaseBtnFixed,
  Noticebar,
  TabBar,
  SkeletonList,
  DqScrollView
} from "@/components";
import { connect } from "@tarojs/redux";
import { getWindowHeight } from "@/utils/style";
import ItemMaster from "@/pages/class/item-master/index";
import { STATIC_ASSETS, SHAREINFO } from "@/config/index";
import Platform from "@/platfrom";
import ENUM, { ROUTER_CLASS, CATEGORY } from "@/config/enum";
import classNames from "classnames";
import decorator from "@/config/decorator";
import "./commonCategory.scss";
import { getPlatform } from "@/utils/common";
import Storage from '@/utils/storage'
import Dq from "@/config/Dq";                                                                  
var CNAME = null; //类目
var CTITLE = "";

//全局列表，不做state更新
var allItemList = {
  1: { list: [], page: 0 },
  2: { list: [], page: 0 },
  3: { list: [], page: 0 },
  4: { list: [], page: 0 },
  5: { list: [], page: 0 }
};



@connect(({ classModels , common}) => ({
  ...classModels,
  ...common
}))
@decorator()
class Index extends Component {
  constructor() {
    super(...arguments);
    CNAME = this.$router.params.name;
    CTITLE = CNAME ? CATEGORY[CNAME]["title"] : "";

    this.state = {
      listLoading:true,
      // loading: false,
      hasMore: true,
      showItemList: [],
      currentTab: 1,
      tabList: CNAME ? CATEGORY[CNAME]["tabList"] : [],
      isFixed: false,
      labelList: CNAME ? CATEGORY[CNAME]["labelList"] : [],
      labelCurrentTab: 1
    };
  }
  config = {
    navigationBarTitleText: getPlatform().isRN?'': this.$router.params.name ? CATEGORY[this.$router.params.name]['title'] : ''
  };

  getShowItemList(index) {
    //类目列表
    let msg = {
      primary_category: CNAME,
      __location: 2,
      page: allItemList[index + 1].page + 1
    };
    if (CNAME == "buyRentHouse_1" || CNAME == "buyRentHouse_2") {
      msg.primary_category = "buyRentHouse";
      msg.type = CNAME == "buyRentHouse_1" ? 1 : 2;
      msg.house_status = this.state.tabList[index].index;
    } else if (CNAME == "jobHunting_1" || CNAME == "jobHunting_2") {
      msg.primary_category = "jobHunting";
      msg.second_category = CNAME == "jobHunting_1" ? 2 : 1;
    } else {
      msg.second_category = this.state.tabList[index].index;
    }
    this.props
      .dispatch({
        type: "classModels/fetchCategoryList",
        payload: msg
      })
      .then(data => {
        let allItem = allItemList;
        let curItems = allItem[this.state.currentTab];
        (curItems.list = curItems.list.concat(data.list || [])),
          (curItems.page =
            data.list.length > 0 ? curItems.page + 1 : curItems.page),
            allItemList = allItem;
          this.setState({
            showItemList: allItem[this.state.currentTab].list,
            hasMore: data.list.length > 9,
            // loading: false,
            listLoading:false
          });
      });
  }

  getLabelStatistical() {
    //岗位福利
    this.props.dispatch({
      type: "classModels/fetchLabelStatistical",
      payload: {__location:3}
    });
  }
  getPositionStatistical() {
    //岗位推荐
    this.props.dispatch({
      type: "classModels/fetchPositionStatistical",
      payload: {__location:3}
    });
  }

  componentDidMount() {
    const record_city = Storage.getInstance().getAreainfo(); //获取定位城市
    const cityName = record_city && record_city.cur_area ? record_city.cur_area.name : ''
  
    if (CNAME == "buyRentHouse_1" || CNAME == "buyRentHouse_2") {
      this.props.dispatch({
        type: "classModels/fetchBuyRentHouseStatus",
        payload: {__location:3}
      });
    }
    

    let msg = {
      primary_category: CNAME
    };
    if (CNAME == "buyRentHouse_1" || CNAME == "buyRentHouse_2") {
      msg.primary_category = "buyRentHouse";
    } else if (CNAME == "jobHunting_1" || CNAME == "jobHunting_2") {
      msg.primary_category = "jobHunting";
    }
    msg.__location = 3;
    this.props.dispatch({
      type: "classModels/fetchCategoryStatistical",
      payload: msg
    });

    this.props.dispatch({
      type: "common/fetchAdvert",
      payload: {ad_price:5 , ad_type:msg.primary_category}
    })

    this.props.dispatch({
      type: "common/fetchNotices",
      payload: {notice_price:5 , notice_type:msg.primary_category}
    })

    this.getShowItemList(this.state.currentTab - 1);

    if (CNAME == "jobHunting_2") {
      this.getLabelStatistical();
      this.getPositionStatistical();
    }

    const shareConfig = {
      ...SHAREINFO.classHome,
      imgUrl: STATIC_ASSETS(`images/item/${msg.primary_category}.png`),
      title: `${cityName}${CTITLE}_E网生活`,
      link:`/pages/class/commonCategory/commonCategory?name=${CNAME}&share=1`
    }
    Platform.sendShare(shareConfig)
  }

  componentWillUnmount() {
    for(let key in allItemList){
      let item = allItemList[key];
      item.list = [];
      item.page = 0;
    }
  }

  refresh = () => {
    //重置全局保存的数据
    let item = allItemList[this.state.currentTab];
    item.list = [];
    item.page = 0;

    this.getShowItemList(this.state.currentTab - 1);
  }

  loadRecommend = () => {
    //加载更多
    if (!this.state.hasMore) {
      return;
    }
    // this.setState({ loading: true }, () => {
      this.getShowItemList(this.state.currentTab - 1);
    // });
  };
  
  handleTab = id => {
    // this.setState({ loading: true }, () => {
      this.setState({ currentTab: id});
    // });

    if (!allItemList[id] ||
      allItemList[id].list.length <= 0
    ) {
      this.getShowItemList(id - 1);
    } else {
      this.setState(prevState => ({
        showItemList: allItemList[id].list
      }));
    }
  };

  handleTabLabel = id => {
    // this.setState({ loading: true }, () => {
      this.setState({ labelCurrentTab: id});
    // });
  };

  handleModel = id => {
    this.handleTab(id + 1)
  };
  onToDetail = (id, type) => {
    //查看详情
    Dq.navigateTo({
      url: `/pages/class/detail-master/index?post_id=${id}`
    });
  };

  handleToSearch = () => {
    //跳转去搜索页
    Dq.redirectTo({
      url: `/pages/search/search?from=${CNAME}`
    });
  };
  handleToOwner = () => {
    Dq.redirectTo({
      url: ROUTER_CLASS[CATEGORY[CNAME]["paging"]["router"]]
    });
  };

  renderNoticebar() {
    const { noticesList } = this.props;
    const notList = noticesList["homepage"] || [];

    return (
      <View className="class-modal__notice">
        <Noticebar list={notList} />
      </View>
    );
  }

  //房屋租赁中间层
  renderBuyRentHouse(labelList) {
    const { buyRentHouseStatus , noticesList } = this.props;
    const arrname = CNAME.split('_');
    const notList = (CNAME && noticesList[arrname[0]]) || noticesList["homepage"];

    return (
      <View className={classNames("buyRentHouse", "__contentimg")}>
        <View className={`__contentimg__center`}>
          <Noticebar list={notList} />
          <View className={`__contentimg__center__label-con`}>
            {labelList.map((item, index) => {
              return (
                <View className={`__contentimg__center__label-con__item`}>
                  {index < 3 && (
                    <View key={item.id} onClick={this.handleModel.bind(this, item.id)}>
                      <Image
                        className={`__contentimg__center__label-con__item__img`}
                        src={STATIC_ASSETS(item.file)}
                      />
                      <Text
                        className={`__contentimg__center__label-con__item__title`}
                      >
                        {item.name}
                      </Text>
                      <Text
                        className={`__contentimg__center__label-con__item__content`}
                      >
                        {`约${
                          buyRentHouseStatus && buyRentHouseStatus[item.id]
                            ? buyRentHouseStatus[item.id]
                            : 0
                          }套房源`}
                      </Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  }

  renderJobhunting(labelTabList) {
    const { labelStatistical, positionStatistical } = this.props;
    const { labelCurrentTab } = this.state;
    const labelList_ =
      labelCurrentTab == 1 ? positionStatistical : labelStatistical;

    return (
      <View className={classNames(CNAME, "__contentimg")}>
        <View className="__contentimg-view" ref="tabBar">
          <TabBar
            tabList={labelTabList}
            currentTab={labelCurrentTab}
            isFixed={false}
            compStyle={{ flex: 1 }}
            onClick={this.handleTabLabel}
          />
        </View>
        <View className="__contentimg__label-con">
          {labelList_.map((item, index) => {
            return (
              <View className="__contentimg__label-con__item">
                {index < 6 && (
                  <View 
                    key={item.key} 
                    // onClick={this.handleModel.bind(this)}
                  >
                    <Image
                      className="__contentimg__label-con__item__img"
                      src={
                        index <= 2
                          ? STATIC_ASSETS("images/bg/bg_gangwei1.png")
                          : STATIC_ASSETS("images/bg/bg_gangweihui.png")
                      }
                    />
                    <Text className="__contentimg__label-con__item__title">
                      {item.label}
                    </Text>
                    <Text className="__contentimg__label-con__item__content">
                      约
                      <Text className="__contentimg__label-con__item__content__num">
                        {item.doc_count}
                      </Text>
                      个职位
                    </Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </View>
    );
  }

  //分页按钮
  renderPagingBtn() {
    return (
      <View className="fixed_jh_btn" onClick={this.handleToOwner.bind(this)}>
        <Image
          className="fixed_jh_btn__img"
          src={STATIC_ASSETS(CATEGORY[CNAME]["paging"]["file"])}
        />
      </View>
    );
  }

  getStatisticsText(index) {
    if (!CNAME || index >= CATEGORY[CNAME]["statistics"].length) {
      return "";
    }
    const { categoryStatistical } = this.props;
    const { name, file } = CATEGORY[CNAME]["statistics"][index];
    return name + categoryStatistical[file];
  }

  render() {
    const { advertList } = this.props;
    const { showItemList, labelList, listLoading , hasMore} = this.state;

    const arrname = CNAME && CNAME.split('_');
    const imgList = (CNAME && advertList[arrname[0]]) || advertList["homepage"] || [];

    return (
      <View className={classNames(CNAME, "class-modal")}>
        <TitleBar title={CTITLE} />
        <DqScrollView
          scrollStyle={{
            background: "#f4f4f4",
            height: getWindowHeight()
          }}
          onRefresh={this.refresh}
          onScrollToLower={this.loadRecommend}
          hasMore={hasMore}
        >
          <View className={`${CNAME}__content__title`}>
            <SearchBar
              logo="1"
              mode="logo"
              handleSearch={this.handleToSearch.bind(this)}
            />

            <HeaderStatistics
              text1={this.getStatisticsText(0)}
              text2={this.getStatisticsText(1)}
              text3={this.getStatisticsText(2)}
              textStyle={{ color: "#424242" }}
            ></HeaderStatistics>
          </View>
          <View className="class-modal__banner">
            <SwiperBanner data={imgList} autoplay loop  styleType="home"/>
          </View>

          {(CNAME == "buyRentHouse_1" || CNAME == "buyRentHouse_2") &&
            this.renderBuyRentHouse(labelList)}
          {CNAME && CATEGORY[CNAME]["noticebar"] && this.renderNoticebar()}

          {CNAME == "jobHunting_2" && this.renderJobhunting(labelList)}

          <View ref="tabBar" className="class-modal__tabBar-class">
            <TabBar
              tabList={this.state.tabList}
              currentTab={this.state.tabList.length>1?this.state.currentTab:''}
              isFixed={this.state.isFixed}
              onClick={this.handleTab}
              compStyle={{ width: "25%" }}
            />
          </View>
          <SkeletonList loading={listLoading}>
            {showItemList && showItemList.length > 0 && (
              <View className="class-modal__main-list">
                {showItemList.map((item, index) => {
                  return (
                    <ItemMaster
                      key={item.id}
                      item_data={item}
                      type={CNAME}
                      onHandleDetail={this.onToDetail.bind(
                        this,
                        item.post_id,
                        item.primary_category || "jobHunting"
                      )}
                    />
                  );
                })}
              </View>
            )}
          </SkeletonList>
        </DqScrollView>
        {CNAME && CATEGORY[CNAME]["paging"] && this.renderPagingBtn()}
        <ReleaseBtnFixed params={this.$router.params} />
      </View>
    );
  }
}
export default Index;