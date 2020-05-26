import Taro, { Component } from "@tarojs/taro";
import { View, Text, ScrollView, Picker } from "@tarojs/components";
import { TitleBar, CountSearch, NoData } from "@/components";
import IconFont from "@/components/iconfont";
import { getWindowHeight } from "@/utils/style";
import { connect } from "@tarojs/redux";
import decorator from "@/config/decorator";
import utils from "@/utils/utils";
import times from '@/utils/times'

import "./index.scss";

@connect(({ user, shopStore, loading }) => ({
  ...shopStore,
  ...user,
  ...loading
}))
@decorator({ needLogin: true })
class Index extends Component {
  config = {
    navigationBarTitleText: "账单明细"
  };

  state = {
    end_time: "",
    start_time: "",
    search_id: "",
    s_t_e: "",
    e_t_e: "",
    page: 1,
    hasMore: true,
    loading: false
  };

  async componentDidMount() {
    const today = times.getFormatData("yyyy-MM-dd");
    const { dispatch } = this.props
    const { shop_id } = this.$router.params;
    this.setState(
      { start_time: today, end_time: today, s_t_e: today, e_t_e: today },
      () => {
        //this.getUserInfo();
        dispatch({
          type: "shopStore/shopStatistics",
          payload:{
            shop_id
          }
        }).then(res=>{
          const { id } = res
          this.setState({ shop_id:id, loading: true}, () => {
            this.getList();
          });
        })
      }
    );
  }

  // async getUserInfo() {
  //   let userInfo = await this.props.dispatch({
  //     type: "user/fetchMyInfo"
  //   });
  //   let shop_id = 9;
  //   if (userInfo) {
  //     shop_id = userInfo.is_shop || 9;
  //   }
  //   this.setState({ shop_id, loading: true }, () => {
  //     this.getList();
  //   });
  // }

  async getList() {
    const { page, shop_id, search_id, start_time, end_time } = this.state;
    let data = await this.props.dispatch({
      type: "shopStore/fetchAccountusedcouponlist",
      payload: {
        page,
        shop_id,
        mobile: search_id,
        start_date: start_time,
        end_date: end_time
      }
    });
    this.setState(prevState => ({
      page: prevState.page + 1,
      hasMore: data.length > 9,
      loading: false
    }));
  }

  handleChangeDate = (key, value) => {
    this.setState({ [key]: value });
  };

  handleSearch() {
    this.setState({ loading: true, page: 1 }, () => {
      this.getList();
    });
  }

  render() {
    const {
      start_time,
      end_time,
      search_id,
      s_t_e,
      e_t_e,
      loading,
      hasMore
    } = this.state;
    const { accountusedcouponlist: list } = this.props;
    const isLoading = this.props.effects[
      "shopStore/fetchAccountusedcouponlist"
    ];
    const CLASSNAME = "bill-wrap";
    return (
      <View className="bill-wrap">
        <TitleBar title="账单明细" />
        <ScrollView
          scrollY
          onScrollToLower={this.loadRecommend}
          style={{ height: getWindowHeight(false) }}
          className="bill-wrap__view"
        >
          <CountSearch
            s_t={start_time}
            e_t={end_time}
            s_t_e={s_t_e}
            e_t_e={e_t_e}
            search_id={search_id}
            onChange={this.handleChangeDate.bind(this)}
            onSearch={() => {
              this.handleSearch();
            }}
          />
          {list && list.length > 0 ? (
            <View>
              <View>
                {list.map((item, index) => {
                  return (
                    <View key={item.id} className="bill-wrap__item">
                      <View className="bill-wrap__item__top">
                        <Text className="bill-wrap__item__top__id">
                          {index + 1}
                        </Text>
                        <Text>时间：{item.format_used_time}</Text>
                      </View>
                      <View className="bill-wrap__item__content">
                        <View className="bill-wrap__item__content__view1">
                          <Text className="bill-wrap__title">手机号</Text>
                          <Text className="bill-wrap__cont">
                            {item.contact_phone}
                          </Text>
                        </View>
                        <View className="bill-wrap__item__content__view">
                          <Text className="bill-wrap__title">优惠券名称</Text>
                          <Text className="bill-wrap__cont">
                            {item.coupon_name}
                          </Text>
                        </View>
                      </View>
                    </View>
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
          ) : <NoData title="" tips={`还没有账单数据~`} />}
        </ScrollView>
      </View>
    );
  }
}
export default Index;