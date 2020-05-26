import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import {
	TitleBar,
	CountDown,
	DqButton,
	ActionSheet,
	BasicButton
} from '@/components'
import IconFont from '@/components/iconfont'
import { STATIC_ASSETS } from '@/config'
import ENUM from '@/config/enum'
import decorator from '@/config/decorator'
import { stopPropagation } from '@/utils/common'
import { getWindowHeight ,formatStyle} from '@/utils/style'
import Dq from '@/config/Dq'
import utils from "@/utils/utils";
import './index.scss'
import Platform from '@/platfrom'

@connect(({ publish, shopStore, user }) => ({
	...publish,
	...shopStore,
	...user
}))
@decorator({ needLogin: true })
class Index extends Component {
	config = {
		disableScroll: true
	}
	state = {
		payMethod: [
			{
				key: 'e_coin',
				name: 'E币支付',
				iconPath: STATIC_ASSETS('images/icon/pay_1.png'),
				checked: true,
				flag: false
			},
			// {
			// 	key: 'integral',
			// 	name: '积分支付',
			// 	iconPath: STATIC_ASSETS('images/icon/pay_2.png'),
			// 	checked: false,
			// 	flag: false
			// },
			// {
			// 	key: 'wx',
			// 	name: '微信支付',
			// 	iconPath: STATIC_ASSETS('images/icon/pay_3.png'),
			// 	checked: false,
			// 	flag: false
			// } // flag=>false 可以支付  true=>不可以
		],
		selectedPayMethod: true,
		result: {},
		post_type: '',
		selectedKey: 'e_coin',
		payPage: '', //具体从哪调起支付页面
		showActionSheet: false
	}

	async componentDidMount() {
		const { trade_no } = this.$router.params
		
		if (trade_no) {
			this.fetchPayShop(trade_no)
		} else {
			this.fetchPayByPost()
		}
	}

	//请求店铺支付信息
	async fetchPayShop(trade_no) {
		const { dispatch } = this.props
		let result = await dispatch({
			type: 'shopStore/paymentPage',
			payload: {
				trade_no
			}
		})
		this.setState({
			result,
			payPage: 'shopStore' // 店铺购买优惠券
		})

		let list = [ ...this.state.payMethod ]
		list[1].flag = true //购买卡券积分不可用
		list[2].flag = true // 购买卡券微信支付不可用
		await this.setState({
			payMethod: list
		})
	}

	//请求帖子支付信息
	async fetchPayByPost() {
		const { dispatch, top } = this.props
		const { post_id, post_type, top_status } = this.$router.params
		if (post_type && post_type == 'releaseManagementTop' && !top.top_day) {
			Dq.redirectTo({
				url: `/pages/release/top/index?post_id=${post_id}&post_type=${post_type}`
			})
		}
	
		let result = await dispatch({
			type: 'publish/orderPayment',
			payload: {
				post_id
			}
		})

		this.setState({
			result,
			post_type
		})

		let statusFlag = (result && result.top_status == ENUM.TOPSTATUS) || top_status== ENUM.TOPSTATUS
	
		let list = [ ...this.state.payMethod ]
		list[1].flag = statusFlag || false //判断积分支付是否可用
		//console.log("fetchPayByPost", statusFlag);
		await this.setState({
			payMethod: list
		})
	}

	gotoRecharge() {
		const params = this.$router.params
		const paramsStr = utils.getUrlParams(params)
	
		Dq.navigateTo({
			url:`/pages/release/recharge/index${paramsStr}&from=payfor`
		});
	}

	handleCheckbox(index, e) {
		stopPropagation(e)
		const { payMethod } = this.state
		let item = payMethod[index]
		// if (item.key === "wx") {
		//   Taro.showToast({
		//     title: "微信支付还没有开通哦~",
		//     icon: "none",
		//     duration: 2000
		//   });
		//   return false;
		// }

		let result = payMethod.map((data, i) => {
			if (index === i) {
				data.checked = true
			} else {
				data.checked = false
			}
			return data
		})

		this.setState({
			payMethod: result,
			selectedPayMethod: result.some((item) => item.checked === true),
			selectedKey: item.key
		})
	}

	async handleSubmit() {
		const { dispatch, top, userInfo: { wx_openid } } = this.props
		const { result: { total_money, amount }, selectedKey, payPage } = this.state
		const { post_id, trade_no } = this.$router.params
		let trade_type // 交易模式：1、付款码 2、Native 3、JSAPI 4、APP 5、H5 6、小程序

		if (process.env.TARO_ENV === 'weapp') {
			trade_type = '6'
		} else if (process.env.TARO_ENV === 'h5') {
			trade_type = '5'
		}
		if (payPage == 'shopStore') {
			await dispatch({
				type: 'publish/couponPay',
				payload: {
					trade_no,
					pay_method: selectedKey,
					amount: amount,
					trade_type
				}
			}).then((res) => {
				if (res) {
					Taro.showToast({
						title: '支付成功',
						icon: 'success',
						duration: 2000
					})
					setTimeout(() => {
						Dq.redirectTo({
							url: `/pages/user/card-center/index`
						})
					}, 1000)
				}
			})
		} else if (
			this.state.post_type &&
			this.state.post_type == 'releaseManagementTop'
		) {
		
			if (selectedKey === 'wx') {	
				const { post_id, post_type, top_status } = this.$router.params
				Platform.sendPay(
					'publish/payTop',
					{ post_id, 	
						pay_method: selectedKey,
						amount: total_money,
						trade_type,
						top_day: top.top_day,
						top_total_money: top.top_total_money },
					function() {
						Taro.showToast({
							title: '置顶成功',
							icon: 'success',
							duration: 2000
						})
						setTimeout(() => {
							Dq.navigateTo({
								url: '/pages/user/release-management/index'
							})
						}, 2000)
					},
					`payfor`,
					wx_openid, // 判断是否需要登录的凭证
					{post_id,post_type,top_status}
				)
			}else{
				dispatch({
					type: 'publish/payTop',
					payload: {
						post_id,
						pay_method: selectedKey,
						amount: total_money,
						trade_type,
						top_day: top.top_day,
						top_total_money: top.top_total_money
					}
				}).then((res) => {
					if (res) {
						Taro.showToast({
							title: '置顶成功',
							icon: 'success',
							duration: 2000
						})
						setTimeout(() => {
							Taro.navigateBack({
								delta: 1 // 返回上一级页面。
							})
						}, 2000)
					}
				})
			}
			
		} else {
			if (selectedKey === 'wx') {
				Platform.sendPay(
					'publish/postOrderPay',
					{ post_id, amount: total_money },
					function() {
						Dq.navigateTo({
							url: `/pages/release/success/index?total_money=${total_money}&pay_method=wx`
						})
					},
					`payfor`,
					wx_openid,// 判断是否需要登录的凭证
					{post_id}
				)
			} else {
				dispatch({
					type: 'publish/postOrderPay',
					payload: {
						post_id,
						pay_method: selectedKey,
						amount: total_money,
						trade_type
					}
				}).then((res) => {
					if (res) {
						Dq.navigateTo({
							url: `/pages/release/success/index?total_money=${total_money}&pay_method=${selectedKey}`
						})
					}
				})
			}
		}
	}

	showActionSheet = () => {
		this.setState({
			showActionSheet: !this.state.showActionSheet
		})
	}

	renderPayShopStore() {
		const { result } = this.state
		return (
			<View className="pay-wrap__view__head">
				<View className="pay-wrap__view__head__view">
					<View className="pay-wrap__view__head__view__top">
						<Text className="pay-wrap__view__head__view__top__text">
							支付剩余时间：
						</Text>
						<CountDown endTime={result.order_expire_time} />
					</View>

					<View className="pay-wrap__view__head__view__bottom">
						<Text className="pay-wrap__view__head__view__price">
							¥{result.amount}
						</Text>
						<Text className="pay-wrap__view__head__view__name">
							{result.coupon_name}
						</Text>
					</View>
				</View>
			</View>
		)
	}

	renderPayContent() {
		const { result, post_type } = this.state
		const { top } = this.props
		return (
			<View>
				<View className="pay-wrap__view__top">
					{/* <Image
            className="pay-wrap__view__top__success"
            src={STATIC_ASSETS("images/icon/success.png")}
          ></Image> */}
					<View className="pay-wrap__view__top__view">
						<Text className="pay-wrap__view__top__view__text">
							付款金额：
							<Text className="pay-wrap__view__top__view__price">
								¥
								{post_type == 'releaseManagementTop' && top ? (
									top.top_total_money
								) : result ? (
									result.total_money
								) : (
									0
								)}
							</Text>
						</Text>
						<View
							className="pay-wrap__view__top__view__tips"
							onClick={this.showActionSheet}
						>
							<Text className="pay-wrap__view__top__view__t">限时折扣</Text>
							<Text className="pay-wrap__view__top__view__t">优惠明细</Text>
							<Text className="pay-wrap__view__top__view__circle pay-wrap__view__top__view__t">
								?
							</Text>
						</View>
					</View>
				</View>
				<View className="pay-wrap__view__center">
					<View className="pay-wrap__view__center__view-top">
						<View className="pay-wrap__view__center__view-top__text-box">
							<Text className="pay-wrap__view__center__view-top__text-box__title">
								用户昵称
							</Text>
							<Text className="pay-wrap__view__center__view__text">
								{result.uname}
							</Text>
						</View>
						<View className="pay-wrap__view__center__view-top__text-box1">
							<Text className="pay-wrap__view__center__view-top__text-box__title">
								发布类型
							</Text>
							<Text className="pay-wrap__view__center__view__text">
								{result.primary_category}
							</Text>
						</View>
					</View>
					<View className="pay-wrap__view__center__view">
						<View className="pay-wrap__view__center__view__title">
							<Text className="pay-wrap__view__center__view__title__text">
								发布内容
							</Text>
						</View>
						<Text className="pay-wrap__view__center__view__text">
							{result.describe}
							{result.content}
						</Text>
					</View>
				</View>
			</View>
		)
	}

	renderPayMethod() {
		const { result, payMethod, selectedPayMethod, payPage } = this.state
		return (
			<View className="pay-wrap__view__bottom">
				<View className="pay-wrap__view__bottom__view">
					<View className="pay-wrap__view__bottom__view__title">
						<Text className="pay-wrap__view__bottom__view__title__text">
							选择支付方式
						</Text>
						<Text
							className="pay-wrap__view__bottom__view__title__right"
							onClick={() => this.gotoRecharge()}
						>
							充值
						</Text>
					</View>
					<View className="pay-wrap__view__bottom__view__view">
						<Text className="pay-wrap__view__bottom__view__view__left">
							可用E币:{result && result.e_coin}
						</Text>
						<Text className="pay-wrap__view__bottom__view__view__right">
							可用积分:{result && result.integral}
						</Text>
					</View>
					<View className="pay-wrap__view__bottom__view__pay">
						{payMethod &&
							payMethod.map((item, index) => {
								if(item.flag) return null
								return (
									<View
										className="pay-wrap__view__bottom__view__pay__view"
										key={item.key}
										onClick={
											!item.flag ? this.handleCheckbox.bind(this, index) : null
										}
									>
										<View className="pay-wrap__view__bottom__view__pay__view__view-box">
											<Image
												className="pay-wrap__view__bottom__view__pay__view__view-box__img"
												src={item.iconPath}
											/>
											<Text className="pay-wrap__view__bottom__view__pay__view__text">
												{item.name}
												{index == 1 && payPage === '' ? (
													<Text
														style={formatStyle({
															color: 'rgba(248, 124, 106, 1)',
															marginLeft: '10px'
														})}
													>
														(积分不可用于信息置顶)
													</Text>
												) : null}
												{(index === 1||index===2) && payPage === 'shopStore' ? (
													<Text
														style={formatStyle({
															color: 'rgba(248, 124, 106, 1)',
															marginLeft: '10px'
														})}
													>
														(当前方式不可用)
													</Text>
												) : null}
											</Text>
										</View>
										{!item.flag ? (
											<View
												className="pay-wrap__view__bottom__view__pay__view__view"
												onClick={this.handleCheckbox.bind(this, index)}
											>
												<IconFont
													name="duihao_selected"
													color={
														item.checked ? '#F87C6A' : 'rgba(160,160,160,1 )'
													}
													size={40}
												/>
											
											</View>
										) : (
											<View className="pay-wrap__view__bottom__view__pay__view__view">
												<IconFont
													name="duihao_selected"
													color="rgba(160,160,160,.5 )"
													size={40}
												/>
											</View>
										)}
									</View>
								)
							})}
					</View>
				</View>
				<View className="pay-wrap__view__bottom__button">
					{/* <DqButton
            label="立即支付"
            disabled={!selectedPayMethod}
            onClick={this.handleSubmit.bind(this)}
          /> */}
					<BasicButton
						size="large"
						label="立即支付"
						onClick={this.handleSubmit.bind(this)}
					>
						立即支付
					</BasicButton>
				</View>
			</View>
		)
	}

	renderMoneyDetail() {
		const {
			result: { post_money, original_post_money, top_total_money, total_money }
		} = this.state
		return (
			<View className="money-wrap">
				<Text className="money-wrap__top">金额优惠明细</Text>
				<View className="money-wrap__center">
					<View className="money-wrap__center__view">
						<Text className="money-wrap__center__view__text">
							发帖价格（限时{post_money / original_post_money * 10}折）
						</Text>
						<View className="money-wrap__center__flex">
							<Text className="money-wrap__center__view__t1">
								¥{post_money}
							</Text>
							<Text className="money-wrap__center__view__t2">
								¥{original_post_money}
							</Text>
						</View>
					</View>
					<View className="money-wrap__center__view">
						<Text className="money-wrap__center__view__text">置顶信息</Text>
						<View>
							<Text className="money-wrap__center__view__t3">
								¥{parseInt(top_total_money)}
							</Text>
						</View>
					</View>
				</View>

				<View className="money-wrap__bottom">
					<View className="money-wrap__bottom__view">
						<Text className="money-wrap__bottom__view__text">商品总价</Text>
						<Text className="money-wrap__bottom__money">¥{total_money}</Text>
					</View>
					<Text className="money-wrap__bottom__tips">*实际优惠金额请以下单页为准</Text>
				</View>
			</View>
		)
	}

	render() {
		const { payPage, showActionSheet } = this.state
		return (
			<View className="pay-wrap">
				<ScrollView
					className="pay-wrap__view"
					scrollStyle={{ height: getWindowHeight(true, false) }}
				>
					<TitleBar title="" />
					{this.renderPayShopStore()}
					{this.renderPayMethod()}
				</ScrollView>
			</View>
		)
	}
}
export default Index
