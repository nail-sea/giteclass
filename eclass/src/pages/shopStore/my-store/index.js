import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { TitleBar, BasicButton } from "@/components";
import { STATIC_ASSETS } from "@/config";
import IconFont from "@/components/iconfont";
import decorator from "@/config/decorator";
import ENUM from '@/config/enum'
import Dq from "@/config/Dq";
import Tips from '@/utils/tips'
import "./index.scss";

const CLASSNAME = "my-container";
@connect(({ shopStore }) => ({
  ...shopStore
}))
@decorator({ needLogin: true })
class MyStore extends Component {
  config = {
    navigationBarTitleText: "店铺管理",
  }
  state = {
    list_item: [
      {
        head: STATIC_ASSETS("images/icon/icon_kaquan.png"),
        rank: 1,
        text: " 优惠券管理",
        url: "/pages/shopStore/Coupon-management/index"
      },
      {
        head: STATIC_ASSETS("images/icon/icon_zhangdanmingxi.png"),
        rank: 2,
        text: "账单明细",
        url: "/pages/shopStore/bill-detail/index"
      }
    ],
    userInfo: {},
    tips: {
      2: "您的店铺审核失败, 请联系管理员处理。",
      3: "您的店铺正在审核中，请耐心等待。"
    }
  };

  componentDidMount() {
   this.getShopInfo()
  }

  async getShopInfo() {
    const { dispatch } = this.props;
    const { shop_id } = this.$router.params;
    await dispatch({
      type: "shopStore/shopStatistics",
      payload:{
        shop_id: shop_id || ''
      }
    });
  }

  handleLink(url, shop_id) {
    const { myStore } = this.props
    if(myStore.audit_status == ENUM.AUDIT_STATUS_PASS){
      Dq.navigateTo({
        url: `${url}?shop_id=${shop_id}`
      });
    }else{
      Tips.toast(`您发布的店铺暂未通过审核，请耐心等待噢～`)
    }
  }

  handleQuickPublish = (shop_id, agent_uid) => {
    const { myStore } = this.props
    if(myStore.audit_status == ENUM.AUDIT_STATUS_PASS){
      Dq.navigateTo({
        url: `/pages/shopStore/Coupon-release/index?shop_id=${shop_id}` //shop_id=${shopId}&agent_uid=${agent_uid}
      });
    }else{
      Tips.toast(`您发布的店铺暂未通过审核，请耐心等待噢～`)
    }
  };

  changeStore = () =>{
    Dq.navigateTo({
      url:'/pages/shopStore/store-list/index'
    })
  }

  renderStatistics() {
    const { myStore } = this.props;
    const { userInfo } = this.state;
    return (
      <View>
        <View className={`${CLASSNAME}__count`}>
          <Text className={`${CLASSNAME}__count__title`}>店铺统计</Text>
          <View className={`${CLASSNAME}__count__view`}>
            <View className={`${CLASSNAME}__count__view__item`}>
              <Text className={`${CLASSNAME}__count__view__item__title`}>
                总浏览量
              </Text>
              <Text className={`${CLASSNAME}__count__view__item__num`}>
                {myStore.visit_num}
              </Text>
            </View>
            <View className={`${CLASSNAME}__count__view__item`}>
              <Text className={`${CLASSNAME}__count__view__item__title`}>
                当日浏览量
              </Text>
              <Text className={`${CLASSNAME}__count__view__item__num`}>
                {myStore.day_visit_num}
              </Text>
            </View>
            <View className={`${CLASSNAME}__count__view__item-last`}>
              <Text className={`${CLASSNAME}__count__view__item__title`}>
                总销量(张)
              </Text>
              <Text className={`${CLASSNAME}__count__view__item__num`}>
                {myStore.sell_coupon_num}
              </Text>
            </View>
          </View>
        </View>
        <View className={`${CLASSNAME}__count`}>
          <View className={`${CLASSNAME}__count__wrap`}>
            <Text className={`${CLASSNAME}__count__title`}>优惠券统计</Text>
            <Text
              className={`${CLASSNAME}__count__publish`}
              onClick={() => this.handleQuickPublish(myStore.id, myStore.agent_uid)}
            >
              快速发布
            </Text>
          </View>
          <View className={`${CLASSNAME}__count__view`}>
            <View className={`${CLASSNAME}__count__view__item`}>
              <Text className={`${CLASSNAME}__count__view__item__title`}>
                总发布
              </Text>
              <Text className={`${CLASSNAME}__count__view__item__num`}>
                {myStore.publish_coupon_num}
              </Text>
            </View>
            <View className={`${CLASSNAME}__count__view__item`}>
              <Text className={`${CLASSNAME}__count__view__item__title`}>
                已购买(张)
              </Text>
              <Text className={`${CLASSNAME}__count__view__item__num`}>
                {myStore.already_buy_num}
              </Text>
            </View>
            <View className={`${CLASSNAME}__count__view__item`}>
              <Text className={`${CLASSNAME}__count__view__item__title`}>
                已核销(张)
              </Text>
              <Text className={`${CLASSNAME}__count__view__item__num`}>
                {myStore.already_used_num}
              </Text>
            </View>
            <View className={`${CLASSNAME}__count__view__item-last`}>
              <Text className={`${CLASSNAME}__count__view__item__title`}>
                已退款(张)
              </Text>
              <Text className={`${CLASSNAME}__count__view__item__num`}>
                {myStore.already_refund_num}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  renderBottom() {
    const { list_item } = this.state;
    const { myStore } = this.props;
    return (
      <View className={`${CLASSNAME}__bottom`}>
        {list_item.map(item => {
          return (
            <View
              className={`${CLASSNAME}__bottom__item`}
              onClick={() => {
                this.handleLink(item.url, myStore.id);
              }}
            >
              <View className={`${CLASSNAME}__bottom__item__view`}>
                <Image
                  className={`${CLASSNAME}__bottom__item__img`}
                  src={item.head}
                />
                <Text className={`${CLASSNAME}__bottom__item__text`}>
                  {item.text}
                </Text>
              </View>
              <IconFont name="ic_zhankai_big" size={50} />
            </View>
          );
        })}
      </View>
    );
  }

  render() {
    const { myStore } = this.props;
    // const { userInfo, tips } = this.state;
    return (
      <View className={`${CLASSNAME}`}>
        <TitleBar title={myStore.name}/>
        {myStore.show_change_shop==='yes'?
         <View className={`${CLASSNAME}__change`} onClick={this.changeStore}>
         <IconFont name="icon_qiehuan" size="42"/>
         <Text className={`${CLASSNAME}__change__text`} >切换店铺</Text>
       </View>:null}
        <View className={`${CLASSNAME}__top`}>
          <View className={`${CLASSNAME}__top__view`}>
            <Image
              mode="aspectFill"
              className={`${CLASSNAME}__top__view__img`}
              src={myStore.logo}
            />
          </View>
          <View className={`${CLASSNAME}__top__box`}>
            <View className={`${CLASSNAME}__top__box__title`}>
              <Text className={`${CLASSNAME}__top__box__title__text`} numberOfLines={1}>
                {myStore.name}
              </Text>
              <Text className={`${CLASSNAME}__top__box__title__label`}>{ENUM.AUDITSTATUS[myStore.audit_status]}</Text>
            </View>
            <View className={`${CLASSNAME}__top__box__address`}>
              <IconFont name="icon_dingwei" size={36} />
              <Text className={`${CLASSNAME}__top__box__address__text`}>
                {myStore.address&&myStore.address.split(',').join('')}
              </Text>
            </View>
          </View>
        </View>
        <View>
            {this.renderStatistics()}
            {this.state.list_item && this.renderBottom()}
          </View>
        {/* shop_status 1=>上架  2=>下架 */}
        {/* {userInfo && userInfo.audit_status == 1 && userInfo.shop_status == 1 ? (
          <View>
            {this.renderStatistics()}
            {this.state.list_item && this.renderBottom()}
          </View>
        ) : (
          <View className={`${CLASSNAME}__shop-status`}>
            {userInfo && userInfo.audit_status ? (
              <Text>{tips[userInfo.audit_status]}</Text>
            ) : null}
            {userInfo && userInfo.shop_status == 2 ? (
              <Text>您的店铺已经下架，可以重新入驻。</Text>
            ) : null}
            {userInfo &&
            (userInfo.audit_status == 2 || userInfo.shop_status == 2) ? (
              <View className={`${CLASSNAME}__shop-btn`}>
                <BasicButton
                  size="large"
                  onClick={() => {
                    Dq.navigateTo({
                      url: "/pages/shopStore/apply-settled/index"
                    });
                  }}
                  label="重新入驻"
                />
              </View>
            ) : null}
          </View>
        )} */}
      </View>
    );
  }
}
export default MyStore;
