import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { TitleBar, DqStepper, DqButton, BasicButton } from '@/components'
import { getWindowHeight } from '@/utils/style'
import { getPlatform} from '@/utils/common'
import IconFont from '@/components/iconfont'
import decorator from '@/config/decorator'

import './index.scss'

@connect(({ shopStore }) => ({
	...shopStore
}))
@decorator()
class ShopStore extends Component {
	state = {
		coupon_num: 1
  }
  
  config = {
    disableScroll: getPlatform().isRN
  }

	componentDidMount() {
		const { couponId, shopId } = this.$router.params
		const { dispatch } = this.props
		dispatch({
			type: 'shopStore/fetchBuyCoupon',
			payload: {
				shop_id: shopId,
				coupon_id: couponId
			}
		})
	}

	handleGetNum(val) {
		this.setState({
			coupon_num: val
		})
	}

	submitCouponOrder() {
		const { dispatch } = this.props
		const { couponId, shopId } = this.$router.params
		const { coupon_num } = this.state
		if (coupon_num <= 0) {
			Taro.showToast({
				title: '最低购买1张',
				icon: 'none',
				duration: 2000
			})
			return false
		}
		dispatch({
			type: 'shopStore/submitCouponOrder',
			payload: {
				shop_id: shopId,
				coupon_id: couponId,
				coupon_num
			}
		})
	}

	render() {
		const { coupon_num } = this.state
		const CLASSNAME = 'buy-container'
		const { couponDetail: data } = this.props
		return (
			<View className={`${CLASSNAME}`}>
				<TitleBar title={data.shop_name} />
				<ScrollView style={{ height: getWindowHeight() }} scrollY>
					<View className={`${CLASSNAME}__top`}>
						<View className={`${CLASSNAME}__top__view`}>
							<View className={`${CLASSNAME}__top__view__img-box`}>
								<Image
									mode="aspectFill"
									className={`${CLASSNAME}__top__view__img`}
									src={data.logo}
								/>
							</View>
							<View className={`${CLASSNAME}__top__view__box`}>
								<Text className={`${CLASSNAME}__top__view__title`}>
									{data.coupon_name}
								</Text>
								<View className={`${CLASSNAME}__top__view__cont`}>
									<Text className={`${CLASSNAME}__top__view__cont__price`}>
										¥{data.price}
									</Text>
									<Text className={`${CLASSNAME}__top__view__cont__default`}>
										¥{data.discount_price}
									</Text>
								</View>
							</View>
						</View>
						<View className={`${CLASSNAME}__top__bottom-view`}>
							<View className={`${CLASSNAME}__top__bottom`}>
								<View className={`${CLASSNAME}__top__bottom__view`}>
									<IconFont
										name="duihao_default"
										size={24}
										color="rgba(160,160,160,.4)"
									/>
									<Text className={`${CLASSNAME}__top__bottom__view__text`}>
										随时退
									</Text>
								</View>
								<View className={`${CLASSNAME}__top__bottom__view`}>
									<IconFont
										name="duihao_default"
										size={24}
										color="rgba(160,160,160,.4)"
									/>
									<Text className={`${CLASSNAME}__top__bottom__view__text`}>
										过期自动退
									</Text>
								</View>
							</View>
							<View>
								<Text className={`${CLASSNAME}__top__bottom__view__text`}>
									已售出{data.sell_num}
								</Text>
							</View>
						</View>
					</View>
					<View className={`${CLASSNAME}__middle`}>
						<View className={`${CLASSNAME}__middle__view`}>
							<Text className={`${CLASSNAME}__middle__view__text`}>数量</Text>
							<DqStepper
								num={coupon_num}
								remainNum={data.remain_num}
								onHandleGetNum={this.handleGetNum.bind(this)}
							/>
						</View>
						<View className={`${CLASSNAME}__middle__view`}>
							<Text className={`${CLASSNAME}__middle__view__text`}>总价</Text>
							<Text className={`${CLASSNAME}__middle__view__price`}>
								¥{data.remain_num > 0 ? coupon_num * data.price : 0}
							</Text>
						</View>
					</View>
					<View className={`${CLASSNAME}__bg`}>
						<View className={`${CLASSNAME}__bg__tel`}>
							<Text className={`${CLASSNAME}__middle__view__text`}>手机号</Text>
							<Text className={`${CLASSNAME}__middle__view__text`}>
								{data.mobile}
							</Text>
						</View>
					</View>
					<View className={`${CLASSNAME}__notice`}>
						<Text className={`${CLASSNAME}__notice__title`}>购买须知</Text>
						<Text className={`${CLASSNAME}__notice__sub-title`}>有效期</Text>
						<Text className={`${CLASSNAME}__notice__text`}>
							{data.format_use_end_time}
						</Text>
						<Text className={`${CLASSNAME}__notice__sub-title`}>优惠细则</Text>
						<Text className={`${CLASSNAME}__notice__text`}>
							满{data.use_meet_price}元可用；
						</Text>
						<Text className={`${CLASSNAME}__notice__text`}>
							本券仅限店内使用，不支持外送服务；
						</Text>
						<Text className={`${CLASSNAME}__notice__text`}>
							不可累计使用，不兑现，不找零；
						</Text>
						<Text className={`${CLASSNAME}__notice__text`}>
							若退款，消费金额将以E币的方式返还至当前账户
						</Text>
						<Text className={`${CLASSNAME}__notice__text`}>最终解释权归商家所有</Text>
					</View>
          <View className={`${CLASSNAME}__button`}>
            {/* <DqButton label="立即抢购" onClick={() => this.submitCouponOrder()} /> */}
            <BasicButton
              size="large"
              label="立即抢购"
              onClick={() => this.submitCouponOrder()}
            >
              立即抢购
            </BasicButton>
            {/* disabled={true}  */}
          </View>
				</ScrollView>
			</View>
		)
	}
}
export default ShopStore
