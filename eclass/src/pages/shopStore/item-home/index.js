import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import { stdConfig } from "@/utils/common";
import Dq from "@/config/Dq";
import "./index.scss";

export default class ItemHome extends Component {
  state = {};

  handleDetail(id) {
    Dq.navigateTo({
      url: `/pages/shopStore/detail/index?shop_id=${id}`
    });
  }

  render() {
    const { data } = this.props 
    const CLASSNAME = "item_home";
    const sd_word = stdConfig.getDataShop(data.primary_category, data.second_category)
    return (
      <View className={`${CLASSNAME}`}>
        <View
          className={`${CLASSNAME}__top`}
          onClick={() => {
            this.handleDetail(data.id);
          }}
        >
          <View className={`${CLASSNAME}__top__view`}>
            <View className={`${CLASSNAME}__top__view__img-box`}>
              <Image
                mode="aspectFill"
                className={`${CLASSNAME}__top__view__img`}
                src={data.logo}
              />
            </View>
            <View className={`${CLASSNAME}__top__view__box`}>
              <Text className={`${CLASSNAME}__top__view__box__title`}>
                {data.name}
              </Text>
              <View className={`${CLASSNAME}__top__view__view`}>
                <Text className={`${CLASSNAME}__top__view__view__text-first`}>
                  {stdConfig.getDataShop(data.primary_category)}
                </Text>
                {sd_word ? <Text className={`${CLASSNAME}__top__view__view__text`}>
                  {sd_word}
                </Text> : null}
              </View>
              <Text className={`${CLASSNAME}__top__view__view__text-first`}>
                已售出{data.sell_coupon_num}
              </Text>
              <View className={`${CLASSNAME}__top__view__bottom`}>
                {data.coupon_list && data.coupon_list.length > 0 ? <Text className={`${CLASSNAME}__top__view__bottom__icon`}>
                  券
                </Text> : null}
                {data.coupon_list && data.coupon_list.map((item, index) => {
                  return (
                    <Text
                      // key={item.id}
                      key={'shop-store-item-coupon-'+index}
                      className={`${CLASSNAME}__top__view__bottom__icon__text`}
                    >
                      {parseInt(item.price)}代{parseInt(item.coupon_price)}元{" "}
                      {index + 1 === data.coupon_list.length ? null : '、'}
                    </Text>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
ItemHome.defaultProps = {
  data: {},
};