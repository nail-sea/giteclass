import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import classNames from "classnames";
import IconFont from "@/components/iconfont";
import { STATIC_ASSETS } from "@/config/index";
import "./index.scss";

const CNAME = "shop-card";

export default class CouponCard extends Component {
  constructor() {
    super(...arguments);
    this.state = {};
  }

  static defaultProps = {
    type: 1,
    data: "",
    form: '',
    onLowerShelf: () => {},
    onCouponOption: () => {},
    onCouponPay: () => {},
  };

  handleCouponManage(id, type){
    this.props.onLowerShelf(id, type);
  }

  handleCouponCenter(type){
    if(type == 'pay'){
      this.props.onCouponPay();
    } else {
      this.props.onCouponOption(type);
    }
    
  }

  renderCouponMangementBtn() {
    const { type, data, form } = this.props;
    const BaseClass = `${CNAME}__content__bottom__view__right__btn`
    return (
      <View className={`${CNAME}__content__bottom__view__right`}>
        {data.manage_coupon_type === "up_shelf" ? (
          <Text className={`${BaseClass}1`} onClick={this.handleCouponManage.bind(this, data.id, 'fetchDownshelfcoupon')}>
            下架
          </Text>
        ): null}
        {data.manage_coupon_type === "down_shelf" ? (
          <Text className={`${BaseClass}4`} onClick={this.handleCouponManage.bind(this, data.id, 'fetchReupshelfcoupon')}>
            重新上架
          </Text>
        ): null}
        {data.manage_coupon_type === "auditing"
          ? <Text className={`${BaseClass}2`} onClick={this.handleCouponManage.bind(this, data.id, 'fetchCancelpublishcoupon')}>
            取消
          </Text>
        : null}
        {data.manage_coupon_type === "audit_cancel" ? (
          <Text className={`${BaseClass}3`}>已取消</Text>
        ) : null}
        {data.manage_coupon_type === "overdue" && <IconFont name="icon_guoqi" size={100} />}
        {data.manage_coupon_type === "audit_fail" && <IconFont name="icon_weitongguo" size={100} />}
      </View>
    )
  }

  renderCouponCenterBtn() {
    const { type, data, form } = this.props;
    const BaseClass = `${CNAME}__content__bottom__view__right__btn`
    return (
      <View className={`${CNAME}__content__bottom__view__right`}>
        {data.current_coupon_status === "not_payment" ? (
          <Text className={`${BaseClass}2`} onClick={this.handleCouponCenter.bind(this, 'fetchCancelpaymentcouponorder')}>
            取消
          </Text>
        ): null}
        {data.current_coupon_status === "not_payment" ? (
          <Text className={`${BaseClass}1`} onClick={this.handleCouponCenter.bind(this, 'pay')}>
            去支付
          </Text>
        ): null}
        {data.current_coupon_status === "unused" ? (
          <Text className={`${BaseClass}2`} onClick={this.handleCouponCenter.bind(this, 'fetchRefundcoupon')}>
            退款
          </Text>
        ): null}
        {data.current_coupon_status === "unused" ? (
          <Text className={`${BaseClass}1`} onClick={this.handleCouponCenter.bind(this, 'fetchUsedcoupon')}>
            去使用
          </Text>
        ): null}
        {data.current_coupon_status === "used" ? (
          <Text className={`${BaseClass}3`}>
            已使用
          </Text>
        ): null}
        {data.current_coupon_status === "refund" ? (
          <Text className={`${BaseClass}3`}>
            已退款
          </Text>
        ): null}
        {data.current_coupon_status === "finished" && <IconFont name="icon_guoqi" size={100} />}
        {data.current_coupon_status === "overdue" && <IconFont name="icon_guoqi" size={100} />}
      </View>
    )
  }

  renderTypeStatus() {
    const { type, data, form } = this.props;
    const classStatus = `${CNAME}--${data.manage_coupon_type}`
    const textClass = 'content__bottom__view__left__text'
    return (
      <View>
        <View className={`${CNAME}__content__bottom__view`}>
          <View className={`${CNAME}__content__bottom__view__left`}>
            <Text className={`${CNAME}__${textClass}`}>
              有效期至：{data.format_use_end_time}
            </Text>
            {form == 'coupon-mangement' ? <View>
              <Text className={classNames(`${CNAME}__${textClass}1`, `${classStatus}__${textClass}1`)}>
                优惠券总数：{data.total_num} 
              </Text>
              <Text className={classNames(`${CNAME}__${textClass}1`, `${classStatus}__${textClass}1`)}>
                未发放：{data.remain_num}
              </Text>
            </View> : null}
            {form == 'coupon-center' && data.current_coupon_status === "used" ? <View>
              <Text className={`${CNAME}__${textClass}1`}>
                使用时间：{data.format_used_time}
              </Text>
            </View> : null}
          </View>
          <View>
            {/* 优惠券管理 */}
            {form == 'coupon-mangement' ? this.renderCouponMangementBtn() : null} 
            {/* 卡券中心 */}
            {form == 'coupon-center' ? this.renderCouponCenterBtn() : null}
          </View>
        </View>
      </View>
    );
  }

  render() {
    const { type, data, form } = this.props;
    const classStatus = `${CNAME}--${data.manage_coupon_type}`
    return (
      <View className={classNames(CNAME, classStatus)}>
        <Image
          className={`${CNAME}__content__img`}
          src={STATIC_ASSETS("images/bg/icon_youhuiquan.png")}
        />
        <View className={`${CNAME}__content`}>
          <View className={`${CNAME}__content__top`}>
            <View className={`${CNAME}__content__title`}>
              <Text className={`${CNAME}__content__title__text1`}>
                {data.coupon_name}
              </Text>
              <Text className={`${CNAME}__content__title__text2`} numberOfLines={1}>
                门店地址：{data.sub_address}
              </Text>
            </View>
            <View className={`${CNAME}__content__pirce`}>
              <Text className={classNames(`${CNAME}__content__pirce__text`, `${classStatus}__content__pirce__text`)}>
                {parseInt(data.current_coupon_status == 'not_payment' ? data.amount : data.price)}
              </Text>
              <Text className={classNames(`${CNAME}__content__pirce__text1`, `${classStatus}__content__pirce__text1`)}>
                元
              </Text>
            </View>
          </View>
          <View className={`${CNAME}__content__bottom`}>
            {this.renderTypeStatus()}
          </View>
        </View>
      </View>
    );
  }
}
