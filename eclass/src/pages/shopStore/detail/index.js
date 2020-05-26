import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import { BasicButton, TitleBar, SkeletonDetail } from "@/components";
import { connect } from "@tarojs/redux";
import ItemHome from "../item-home";
import decorator from "@/config/decorator";
import IconFont from "@/components/iconfont";
import { STATIC_ASSETS } from "@/config/index";
import { stdConfig } from "@/utils/common";
import Tips from "@/utils/tips";
import Dq from "@/config/Dq";
import Platform from "@/platfrom";
import "./index.scss";
const CLASSNAME = "detail-container";
import Storage from "@/utils/storage";
import ENUM from "@/config/enum";

@connect(({ shopStore }) => ({
  ...shopStore
}))
@decorator()
class StoreDetail extends Component {
  state = {
    loading:true,
    loginState: 2
  };

  async componentDidMount() {
    const { shop_id } = this.$router.params;
    const loginState = await Storage.getInstance().getLoginState();
		this.setState({ loginState })
    await this.props.dispatch({
      type: "shopStore/fetchShopdetail",
      payload: {
        shop_id: shop_id
      }
    });
    this.setState({loading:false})
    this._sendShare()
  }

  _sendShare = () => {
    const { shop_id } = this.$router.params;
    const {shopDetail:data} = this.props
    const shareConfig = {
      title: data.name,
      desc: data.describe,
      link: `/pages/shopStore/detail/index?shop_id=${shop_id}&isShare=1`,
      imgUrl:
        data.logo
          ? data.logo
          : STATIC_ASSETS("images/share_logo.png")
    };
    Platform.sendShare(shareConfig)
  };

  gotoRushToBuy(id, shopId, remainNum) {
    const {loginState} = this.state;
    const { shop_id } = this.$router.params;
    if(loginState == ENUM.LOGINSTATUS){
      if (remainNum == 0) {
        Tips.toast("该优惠券已售完~");
        return;
      }
      Dq.navigateTo({
        url: `/pages/shopStore/rush-to-buy/index?couponId=${id}&shopId=${shopId}`
      });
    }else{
      Taro.showModal({
        title: "",
        content: "您还未登录哦",
        confirmText: "去登录",
        confirmColor : '#F87C6A',
        success: msg => {
          if (msg.confirm) {
            Dq.navigateTo({
              url: `${ENUM.LOGINURL}?url=shopId&shop_id=${shop_id}`
            });
          }
        }
      });
    }
    
  }

  renderTop() {
    const { shopDetail: shop } = this.props;
    const {loginState} = this.state;
    if (!shop) return;
    return (
      <View className={`${CLASSNAME}__top`}>
        <View className={`${CLASSNAME}__top__view`}>
          <View className={`${CLASSNAME}__top__view__img-box`}>
            <Image
              mode="aspectFill"
              className={`${CLASSNAME}__top__view__img`}
              src={shop.logo}
            />
          </View>
          <View className={`${CLASSNAME}__top__view__box`}>
            <Text className={`${CLASSNAME}__top__view__box__title`}>
              {shop.name}
            </Text>
            <View className={`${CLASSNAME}__top__view__view`}>
              <View className={`${CLASSNAME}__top__view__view__top`}>
                <View className={`${CLASSNAME}__top__view__view__top__text`}>
                  <Text className={`${CLASSNAME}__top__view__view__text__text`}>
                    {stdConfig.getDataShop(shop.primary_category)}
                  </Text>
                  <Text
                    className={`${CLASSNAME}__top__view__view__text__text-last`}
                  >
                    {stdConfig.getDataShop(
                      shop.primary_category,
                      shop.second_category
                    )}
                  </Text>
                </View>
                <Text
                  className={`${CLASSNAME}__top__view__view__text__text-last`}
                >
                  已售出{shop.sell_coupon_num}
                </Text>
              </View>
              <View className={`${CLASSNAME}__top__view__view__flex`}>
                <IconFont name="ic_phone" size={30} />
                <Text
                  className={`${CLASSNAME}__top__view__view__flex__text`}
                  onClick={() => {
                    if(loginState == ENUM.LOGINSTATUS){
                      Taro.makePhoneCall({
                        phoneNumber: shop.contact_phone
                      });
                    } else {
                      Taro.showModal({
                        title: "",
                        content: "您还未登录哦",
                        confirmText: "去登录",
                        confirmColor : '#F87C6A',
                        success: msg => {
                          if (msg.confirm) {
                          Dq.navigateTo({
                            url: `${ENUM.LOGINURL}?url=shopId&shop_id=${shop_id}&isShare=1`
                          });
                          }
                        }
                      });
                    }
                  }}
                >
                  联系Ta
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View className={`${CLASSNAME}__top__bottom`}>
          <IconFont name="icon_dingwei" size={34} />
          <Text className={`${CLASSNAME}__top__bottom__text`}>
            {shop.address.split(',').join('')}
          </Text>
        </View>
      </View>
    );
  }

  renderCoupon() {
    const {
      shopDetail: { name, coupon_list }
    } = this.props;
    return (
      <View className={`${CLASSNAME}__coupon-view`}>
        {coupon_list && coupon_list.length > 0 ? (
          <View>
            <View className={`${CLASSNAME}__coupon-view__title`}>
              <Text className={`${CLASSNAME}__coupon-view__title__text`}>
                优惠券
              </Text>
            </View>
            {coupon_list.map(item => {
              let btnText = item.remain_num == 0 ? "已售完" : "抢购"
              return (
                <View className={`${CLASSNAME}__coupon`}>
                  <Image
                    className={`${CLASSNAME}__coupon__img`}
                    src={STATIC_ASSETS("images/bg/icon_dikuang.png")}
                  />
                  <View key={item} className={`${CLASSNAME}__coupon__item`}>
                    <View className={`${CLASSNAME}__coupon__item__view`}>
                      <View
                        className={`${CLASSNAME}__coupon__item__title-view`}
                      >
                        <Text className={`${CLASSNAME}__coupon__item__title`}>
                          {name}
                          {parseInt(item.coupon_price)}元代金券
                        </Text>
                      </View>
                      <View className={`${CLASSNAME}__coupon__item__text-wrap`}>
                        <Text className={`${CLASSNAME}__coupon__item__text`}>
                          限{item.total_num}张
                        </Text>
                        {item.use_meet_price === 0 ? (
                          <Text
                            className={`${CLASSNAME}__coupon__item__text-last`}
                          >
                            全场通用
                          </Text>
                        ) : (
                            <Text
                              className={`${CLASSNAME}__coupon__item__text-last`}
                            >
                              满{item.use_meet_price}元可用
                          </Text>
                          )}
                      </View>
                      <View className={`${CLASSNAME}__coupon__cont`}>
                        <Text className={`${CLASSNAME}__coupon__cont__price`}>
                          ¥ {parseInt(item.price)}
                        </Text>
                        <Text className={`${CLASSNAME}__coupon__cont__default`}>
                          ¥ {parseInt(item.discount_price)}
                        </Text>
                      </View>
                    </View>
                    <View className={`${CLASSNAME}__coupon__item__right`}>
                      <BasicButton
                        size="normal"
                        label={btnText}
                        disabled={item.remain_num == 0}
                        // containerStyle={{ width: 80 }}
                        onClick={() =>
                          this.gotoRushToBuy(
                            item.id,
                            item.shop_id,
                            item.remain_num
                          )
                        }
                      >
                        <Text>{btnText}</Text>
                      </BasicButton>

                      <Text
                        className={`${CLASSNAME}__coupon__item__right__default`}
                      >
                        <Text style={{paddingRight:2}}>已售出</Text>
                        {parseInt(item.total_num) - parseInt(item.remain_num)}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        ) : null}
      </View>
    );
  }

  renderBottomItem() {
    const { recommend_shop } = this.props;
    return (
      <View className={`${CLASSNAME}__bottom`}>
        <View className={`${CLASSNAME}__bottom__title`}>
          <Text>附近优惠</Text>
        </View>
        <View className={`${CLASSNAME}__bottom__home`}>
          <View className={`${CLASSNAME}__bottom__home__item`}>
            <ItemHome data={recommend_shop} />
          </View>
        </View>
      </View>
    );
  }

  render() {
    const {
      shopDetail: { describe, image_url, name, coupon_list }
    } = this.props;
    const {loading} = this.state
    if (!image_url) return null;
    return (
      <View className={`${CLASSNAME}`}>
        <TitleBar title={name} />
        <SkeletonDetail loading={loading}>
          {this.renderTop()}

          {coupon_list && coupon_list.length > 0 ? (
            this.renderCoupon()
          ) : (
              <View></View>
            )}

          {describe ? (
            <View className={`${CLASSNAME}__content`}>
              <Text className={`${CLASSNAME}__content__title`}>商户介绍</Text>
              <View className={`${CLASSNAME}__content__view`}>
                <Text className={`${CLASSNAME}__content__view__text`}>
                  {describe}
                </Text>
              </View>
            </View>
          ) : null}

          {image_url && image_url.length > 0 ? (
            <View className={`${CLASSNAME}__content`}>
              <Text className={`${CLASSNAME}__content__title`}>商户照片</Text>
              <View className={`${CLASSNAME}__content__view`}>
                {image_url.map(item => {
                  return (
                    <Image
                      key={item}
                      className={`${CLASSNAME}__content__view__img`}
                      src={item}
                      mode="widthFix"
                    />
                  );
                })}
              </View>
            </View>
          ) : null}

          {/* {this.renderBottomItem()} */}
        </SkeletonDetail>
      </View>
    );
  }
}
export default StoreDetail;