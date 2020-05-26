import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import classNames from "classnames";
import IconFont from "@/components/iconfont";
import { STATIC_ASSETS } from "@/config/index";
import "./index.scss";

const CNAME = "shop-card";

export default class UserItem extends Component {
  constructor() {
    super(...arguments);
    this.state = {};
  }

  static defaultProps = {
    type: 1,
    data: "",
    onhandleClick: () => {}
  };

  renderTypeStatus1() {
    const type = 1;
    return (
      <View>
        <View className={`${CNAME}__content__bottom__view`}>
          <View className={`${CNAME}__content__bottom__view__left`}>
            <Text className={`${CNAME}__content__bottom__view__left__text`}>
              有效期至：2019-11-11 12:00
            </Text>
          </View>
          <View className={`${CNAME}__content__bottom__view__right`}>
            <Text className={`${CNAME}__content__bottom__view__right__btn2`}>
              退款
            </Text>
            <Text className={`${CNAME}__content__bottom__view__right__btn1`}>
              使用
            </Text>
          </View>
        </View>
      </View>
    );
  }

  renderTypeStatus2() {
    return (
      <View>
        <View className={`${CNAME}__content__bottom__view`}>
          <View className={`${CNAME}__content__bottom__view__left`}>
            <Text className={`${CNAME}__content__bottom__view__left__text`}>
              有效期至：2019-11-11 12:00
            </Text>
            <Text className={`${CNAME}__content__bottom__view__left__text1`}>
              使用时间：2019-12-30 15:23
            </Text>
          </View>
          <View className={`${CNAME}__content__bottom__view__right`}>
            <Text className={`${CNAME}__content__bottom__view__right__btn3`}>
              已使用
            </Text>
          </View>
        </View>
      </View>
    );
  }

  renderTypeStatus3() {
    return (
      <View>
        <View className={`${CNAME}__content__bottom__view`}>
          <View className={`${CNAME}__content__bottom__view__left`}>
            <Text className={`${CNAME}__content__bottom__view__left__text`}>
              有效期至：2019-11-11 12:00
            </Text>
          </View>
          <View className={`${CNAME}__content__bottom__view__right`}>
            <IconFont name="icon_guoqi" size={100} />
          </View>
        </View>
      </View>
    );
  }

  render() {
    const { type, data } = this.props;
    return (
      <View className={`${CNAME}`}>
        <Image
          className={`${CNAME}__content__img`}
          src={STATIC_ASSETS("images/bg/icon_youhuiquan.png")}
        />
        <View className={`${CNAME}__content`}>
          <View className={`${CNAME}__content__top`}>
            <View className={`${CNAME}__content__title`}>
              <Text className={`${CNAME}__content__title__text1`}>
                元海肴100代金券
              </Text>
              <Text className={`${CNAME}__content__title__text2`}>
                门店地址：奥林匹克公园店
              </Text>
            </View>

            <View className={`${CNAME}__content__pirce`}>
              <Text
                className={`${CNAME}__content__pirce__text`}
                style={type == 3 ? { color: "#ABABAB" } : {}}
              >
                50
              </Text>
              <Text
                className={`${CNAME}__content__pirce__text1`}
                style={type == 3 ? { color: "#ABABAB" } : {}}
              >
                元
              </Text>
            </View>
          </View>
          <View className={`${CNAME}__content__bottom`}>
            {type == 1 ? this.renderTypeStatus1() : null}
            {type == 2 ? this.renderTypeStatus2() : null}
            {type == 3 ? this.renderTypeStatus3() : null}
          </View>
        </View>
      </View>
    );
  }
}
