import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import { TitleBar, TabBar, NoData ,DqButton} from "@/components";
import { connect } from "@tarojs/redux";
import { getWindowHeight } from "@/utils/style";
import ENUM from "@/config/enum";
import CouponCard from "@/pages/user/components/coupon-card/index";
import decorator from "@/config/decorator";
import Dq from "@/config/Dq";
import "./index.scss";

const CNAME = "CARD_CENTER";

@connect(({ shopStore }) => ({
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
      tabList: [
        { key: 1, id: 1, name: "待支付", type: 'not_payment', isShow: true },
        { key: 2, id: 2, name: "未使用", type: 'unused', isShow: true },
        { key: 3, id: 3, name: "已使用", type: 'used', isShow: true },
        { key: 4, id: 4, name: "已过期", type: 'finished', isShow: true }
      ],
      tips: {
        fetchRefundcoupon: '确定退款？',
        fetchUsedcoupon: '请在现场使用优惠券，并向工作人员展示，一经使用，不可退款。最终解释权归商家所有',
        fetchCancelpaymentcouponorder: '确定取消支付？'
      }
    };
  }
  config = {
    navigationBarTitleText: "卡券中心",
    disableScroll:true
  };

  componentDidMount() {
    this.getList();
  }

  async getList() {
    //获取列表数据
    const { page, tabList, currentTab } = this.state;
    let data = await this.props.dispatch({
      type: "shopStore/fetchCouponcenter",
      payload: {
        page,
        coupon_status: tabList[currentTab - 1].type
      }
    });
    if(data.list.length <= 0 && currentTab == 1){
      let { tabList } = this.state
      tabList[0].isShow = false
      this.setState(({ tabList: tabList, currentTab: 2 }),() => {
        this.getList()
      })
    } else {
      this.setState(prevState => ({
        page: prevState.page + 1,
        hasMore: data.list.length > 9,
        loading: false
      }));
    }
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

  onCouponOption = async (coupon_id, shop_id, sub_trade_no, trade_no, coupon_name, price, type) => { // 取消 退款 使用
    const { tips } = this.state
    const btnText = type == 'fetchUsedcoupon' ? '确认使用' : '确定'
    let result = await Taro.showModal({ content: tips[type], confirmText: btnText ,confirmColor : '#F87C6A'});
    let parame = {
      coupon_id: coupon_id,
      shop_id: shop_id,
    }
    if(type == 'fetchUsedcoupon') {
      parame.sub_trade_no = sub_trade_no
    } else if (type == 'fetchCancelpaymentcouponorder') {
      parame.trade_no = trade_no
    }
    if(type == 'fetchRefundcoupon') { 
      parame = {
        coupon_id: coupon_id,
        coupon_name: coupon_name,
        price: price,
        sub_trade_no: sub_trade_no,
      }
    }
    if (result.confirm) {
      let data = await this.props.dispatch({
        type: `shopStore/${type}`,
        payload: parame
      });
      if (data) {
        this.setState({ loading: true, page: 1 }, () => {
          this.getList();
        });
      }
    }
  }

  onCouponPay = (trade_no) => {
    //去支付
    Dq.navigateTo({
      url: `/pages/release/pay-for/index?trade_no=${trade_no}`
    });
  };

  render() {
    const { currentTab, tabList, hasMore, loading } = this.state;
    const { couponcenterList } = this.props;
    const tabListFilter = tabList.filter(ele => {
      return ele.isShow
    })

    return (
      <View className={`${CNAME}`}>
        <View className={`${CNAME}__header`}>
          <TitleBar title="卡券中心"/>
          <TabBar
            tabList={tabListFilter}
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
					// stickyHeaderIndices={[ 0 ]}
          >
          <View className={`${CNAME}__tips`}>
            <Text className={`${CNAME}__tips__text`}>请在现场使用该优惠券，最终解释权归商家所有</Text>
          </View>
          {couponcenterList && couponcenterList.length > 0 ? (
            <View>
              <View className="main-list">
                {couponcenterList.map((item, index) => {
                  return (
                    <CouponCard 
                      type={currentTab} 
                      data={item} 
                      form={"coupon-center"}
                      onCouponOption={this.onCouponOption.bind(this, item.coupon_id, item.shop_id, item.sub_trade_no, item.trade_no, item.coupon_name, item.price)}
                      onCouponPay={this.onCouponPay.bind(this, item.trade_no)}
                    >
                    </CouponCard>
                  );
                })}
              </View>
              <View className="list__bottom__loading">
                {loading && (
                  <Text className="list__bottom__loading-txt">正在加载中...</Text>
                )}
                {!hasMore && (
                  <Text className="list__bottom__loading-txt">没有更多了</Text>
                )}
              </View>
            </View>
          ): <NoData title="" tips={`您还没有${tabList[currentTab - 1].name}的优惠券~`} /> }
          
        </ScrollView>
      </View>
    );
  }
}
export default CardCenter;