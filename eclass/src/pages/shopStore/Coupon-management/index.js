import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import { TitleBar, TabBar, NoData ,DqButton} from "@/components";
import { connect } from "@tarojs/redux";
import { getWindowHeight } from "@/utils/style";
import ENUM from "@/config/enum";
import CouponCard from "@/pages/user/components/coupon-card/index";
import { stopPropagation } from "@/utils/common";
import decorator from "@/config/decorator";
import Dq from "@/config/Dq";
import Tips from '@/utils/tips'
import "./index.scss";

const CNAME = "CARD_CENTER";

@connect(({ user, shopStore }) => ({
  ...user,
  ...shopStore
}))
@decorator({needLogin: true})
class CardCenter extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      loading: false,
      hasMore: true,
      page: 1,
      currentTab: 1,
      userInfo: {},
      tabList: [
        { key: 1, id: 1, name: "全部", type: "all" },
        { key: 2, id: 2, name: "审核中", type: "auditing" },
        { key: 3, id: 3, name: "已上架", type: "up_shelf" },
        { key: 4, id: 4, name: "已下架", type: "down_shelf" },
        { key: 5, id: 5, name: "已结束", type: "finished" }
      ],
      tips: {
        fetchDownshelfcoupon: '确定下架？',
        fetchReupshelfcoupon: '确定重新上架？',
        fetchCancelpublishcoupon: '确定取消发布优惠券？'
      }
    };
  }
  config = {
    navigationBarTitleText: "优惠券管理"
  };

  async componentDidMount() {
    const { dispatch, myStore } = this.props;
    const { shop_id } = this.$router.params;
    if(!myStore || !myStore.id){
      await dispatch({
        type: "shopStore/shopStatistics",
        payload:{
          shop_id
        }
      })
    }
    this.getList()
  }

  async getList() {
    const { myStore } = this.props;
    const { page, tabList, currentTab } = this.state;
    let data = await this.props.dispatch({
      type: "shopStore/fetchCouponmanagement",
      payload: {
        page,
        shop_id: myStore.id,
        type: tabList[currentTab - 1].type
      }
    });
    this.setState(prevState => ({
      page: prevState.page + 1,
      hasMore: data.list.length > 9,
      loading: false
    }));
  }

  loadRecommend = () => {
    //加载更多
    if (!this.state.hasMore || this.state.loading) {
      return;
    }
    this.setState({ loading: true }, () => {
      this.getList();
    });
  };

  handleTab = id => {
    //切换tab
    this.setState({ loading: true, currentTab: id, page: 1 }, () => {
      this.getList();
    });
  };

  onGoRelease = () => {
    //没有内容 去发布
    Dq.redirectTo({
      url: "/pages/release/release"
    });
  };

  onLowerShelf = async (id, type) => { // 下架 重新上架  取消
    const { tips } = this.state
    let result = await Taro.showModal({ content: tips[type] ,confirmColor: '#F87C6A' });
    if (result.confirm) {
      let data = await this.props.dispatch({
        type: `shopStore/${type}`,
        payload: {
          coupon_id: id
        }
      });
      if (data) {
        this.setState({ loading: true, page: 1 }, () => {
          this.getList();
        });
      }
    }
  }

  handleQuickPublish = () => {
    const { myStore } = this.props;
    if(myStore.audit_status == ENUM.AUDIT_STATUS_PASS){
      Dq.navigateTo({
        url: `/pages/shopStore/Coupon-release/index?shop_id=${myStore.id}` 
      });
    }else{
      Tips.toast(`您发布的店铺暂未通过审核，请耐心等待噢～`)
    }
    
  };

  render() {
    const { currentTab, tabList, hasMore, loading } = this.state;
    const { couponManagementList } = this.props;
    
    return (
      <View className={`${CNAME}`}>
        <View className={`${CNAME}__header`}>
          <TitleBar title="优惠券管理" />
          <TabBar
            tabList={tabList}
            currentTab={currentTab}
            compStyle={{ flex: 1 }}
            onClick={this.handleTab}
          />
        </View>
        <ScrollView
          scrollY
          className={`${CNAME}_wrap`}
          onScrollToLower={this.loadRecommend}
          style={{ height: getWindowHeight(false, true, 40) }}
        >
          <View className={`${CNAME}__tips`}>
            {/* <Text className={`${CNAME}__tips__text`}>请在现场使用该优惠券，最终解释权归商家所有</Text> */}
            <Text
              className={`${CNAME}__tips__publish`}
              onClick={this.handleQuickPublish}
            >
              快速发布
            </Text>
          </View>
          {couponManagementList && couponManagementList.length > 0 ? (
            <View>
              <View className="main-list">
                {couponManagementList.map((item, index) => {
                  return (
                    <CouponCard
                      type={currentTab}
                      data={item}
                      form={"coupon-mangement"}
                      onLowerShelf={this.onLowerShelf}
                    />
                  );
                })}
              </View>
              <View className="list__bottom__loading">
                {loading ? (
                  <Text className="list__bottom__loading-txt">正在加载中...</Text>
                ) : null}
                {!hasMore ? (
                  <Text className="list__bottom__loading-txt">没有更多数据</Text>
                ) : null}
              </View>
            </View>
          ) : <NoData title="" tips={`还没有${tabList[currentTab - 1].name}的优惠券~`} />}
        </ScrollView>
      </View>
    );
  }
}
export default CardCenter;