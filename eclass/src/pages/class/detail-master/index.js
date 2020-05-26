import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView, Button, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { TitleBar, BasicButton, SkeletonDetail, DqModal } from '@/components'
import DetailCommon from './common/index'
import ItemMaster from '@/pages/class/item-master/index'
import { getWindowHeight } from '@/utils/style'
import decorator from '@/config/decorator'
import Platform from '@/platfrom'
import IconFont from '@/components/iconfont'
import { HOST, STATIC_ASSETS } from '@/config'
import { is_Weixin, stopPropagation, getPlatform } from '@/utils/common'
import Tips from '@/utils/tips'
import './index.scss'
import ENUM from '@/config/enum'
import Dq from '@/config/Dq'
import display from '@/utils/display'
import Storage from "@/utils/storage";

@connect(({ cardModels, Auth }) => ({
	...cardModels,
	...Auth
}))
@decorator({ shareConfig: true })
class Index extends Component {
	config = {
		navigationBarTitleText: '详情管理',
		disableScroll: true
	}
	constructor() {
		super(...arguments)
		this.state = {
			detailLoading: true,
			total_count: 0,
			loading: false,
			hasMore: false,
			page: 1,
			isShare: 0, //用户是否通过分享进入 0=>否 1=>是
			shareShow: false, //分享遮罩层
			from: '',
			loginState: 2
		}
	}

	async getrecommendpost() {
		//获取推荐列表
		let data = await this.props.dispatch({
			type: 'cardModels/fetchGetrecommendpost',
			payload: {
				page: this.state.page
			}
		})
		this.setState((prevState) => ({
			page: prevState.page + 1,
			hasMore: data.list.length > 9,
			loading: false
		}))
	}

	loadRecommend = () => {
		if (!this.state.hasMore || this.state.loading) {
			return
		}
		this.setState({ loading: true }, () => {
			this.getrecommendpost()
		})
	}

	componentWillMount() {
		const { isShare } = this.$router.params
		if (isShare && isShare == 1) {
			this.setState({
				isShare
			})
		}
	}

	async componentDidMount() {
		const { dispatch } = this.props
		const { post_id, from } = this.$router.params

		const loginState = await Storage.getInstance().getLoginState();
		this.setState({ loginState })

	
		this.setState({ from })
		Taro.setStorage({ key: 'postId', data: post_id })
		await dispatch({
			type: 'cardModels/fetchCardDetail',
			payload: { post_id }
		}).then((res) => {
			Taro.setNavigationBarTitle({
				title: res.title
			})
		
			this.setState({ detailLoading: false })
			if (
				res.status == ENUM.POSTHAVEUP &&
				res.audit_status == ENUM.POSTHAVEPASS
			) {
				this._sendShare(res)
			}
		})
		this.getrecommendpost()
	}

	componentDidHide() {
		Platform.sendShare(null)
	}

	_onShare = (data) => {
		const platform = getPlatform()
		if (platform.isRN) {
			display.share({
				title: data.title,
				description: data.describe,
				link:`/pages/class/detail-master/index?post_id=${data.post_id}&isShare=1`,
				thumbImage:data.image_url && data.image_url[0],
				type:'news'
			})
		}else {
			this._sendShare(data)
		}
	}

	_sendShare = (data) => {
		const { post_id } = this.$router.params
		const shareConfig = {
			title: data.title,
			desc: data.describe,
			link: `/pages/class/detail-master/index?post_id=${post_id}&isShare=1`,
			imgUrl:
				data.image_url.length > 0
					? data.image_url[0]
					: STATIC_ASSETS("images/share_logo.png")
		}
		Platform.sendShare(shareConfig)
	}

	handlePhoneCall = (phone) => {
		const { post_id, from } = this.$router.params
		if(this.state.loginState == ENUM.LOGINSTATUS){
			display.showActionSheet({
				options: [
					{
						icon: 'ic_phone',
						label: `呼叫 ${phone}`,
						onPress: () => {
							Taro.makePhoneCall({
								phoneNumber: phone
							})
						}
					},
					{
						label: '取消'
					}
				],
				cancelIndex: 1
			})
		} else {
			Taro.showModal({
				title: "",
				content: "您还未登录哦",
				confirmText: "去登录",
				confirmColor : '#F87C6A',
				success: msg => {
				  if (msg.confirm) {
					Dq.navigateTo({
						url: `${ENUM.LOGINURL}?url=postId&post_id=${post_id}&share=1`
					});
				  }
				}
			});
		}
	}

	onToDetail = (id) => {
		//推荐跳转查看详情
		Taro.pageScrollTo({
			scrollTop: 0,
			duration: 20
		})
		Dq.redirectTo({
			url: `/pages/class/detail-master/index?post_id=${id}&isShare=${this.state
				.isShare}`
		})
	}

	onClickHome = () => {
		if (process.env.TARO_ENV === 'h5') {
			Dq.navigateTo({ url: HOST })
		} else {
			Dq.navigateTo({
				url: `/pages/home/index`
			})
		}
	}

	isWeixin = (e) => {
		stopPropagation(e)
		const platform = getPlatform()
		const { dispatch } = this.props
		const { post_id } = this.$router.params
		if (platform.isWeb) {
			if (is_Weixin()) {
				this.setState({ shareShow: true })
				//微信取消分享成功回调，点击分享按钮就默认分享成功
				dispatch({
					type: 'Auth/fetchShareCallback',
					payload: {
						post_id,
						type: 'post_detail',
						share_to: 'wx_friend'
					}
				})
			} else {
				//长按选择复制链接地址，打开微信分享
				location.href = 'weixin://'
			}
		} else {
			console.log('share click')
		}
	}

	onMaskClick = () => {
		this.setState({
			shareShow: false
		})
	}

	render() {
		const { cardDetail: data, recommendList } = this.props
		const { isShare, detailLoading, shareShow, from } = this.state
		const i_type = data.primary_category
		return (
			<View className="detail-master">
				<TitleBar title="详情"   /> 
				{/* is_back={isShare != 1} */}
				<SkeletonDetail loading={detailLoading}>
					<ScrollView
						scrollY
						className="detail-master__wrap"
						onScrollToLower={this.loadRecommend}
						style={{
							height: getWindowHeight(false, true, getPlatform().isRN ? 64 : 0)
						}}
					>
						{<DetailCommon data={data} from={from} />}
						<View className="detail-master__recommend">
							<View className="detail-master__recommend__title">
								<Text className="detail-master__recommend__title__text">
									为你推荐
								</Text>
							</View>
							{recommendList &&
							recommendList.length > 0 && (
								<View className="recommend-list">
									{recommendList.map(
										(item, index) =>
											item.post_id !== data.post_id ? (
												<ItemMaster
													key={item.post_id}
													// key={index}
													item_data={item}
													type="simpletext"
													onHandleDetail={this.onToDetail.bind(
														this,
														item.post_id,
														item.primary_category
													)}
												/>
											) : null
									)}
								</View>
							)}
						</View>
						<View className="list__bottom__loading">
							{this.state.loading ? (
								<Text className="list__bottom__loading-txt">正在加载中...</Text>
							) : null}
							{!this.state.hasMore ? (
								<Text className="list__bottom__loading-txt">更多内容，敬请期待</Text>
							) : null}
						</View>
					</ScrollView>
				</SkeletonDetail>
				{isShare == 1 && (
					<View
						className="detail-master__share"
						onClick={this.onClickHome}
						style={{
							backgroundImage: `url(${STATIC_ASSETS(
								'images/item/item_circle.png'
							)})`
						}}
					>
						<Text className="detail-master__share__text">去首页</Text>
					</View>
				)}
				<View className="detail-master__bottom">
					{data.status == ENUM.POSTHAVEUP &&
					data.audit_status == ENUM.POSTHAVEPASS ? (
						<View
							onClick={() => {
								this._onShare(data)
							}}
						>
							{process.env.TARO_ENV === 'weapp' ? (
								<Button
									openType="share"
									className="detail-master__bottom__share"
								>
									<IconFont size={46} name="icon_dikuangfenxiang" />
									<Text>分享</Text>
								</Button>
							) : process.env.TARO_ENV === 'rn' ? (
								<View
									className="detail-master__bottom__share"
									onClick = {this.onShare}
								>
									<IconFont size={46} name="icon_dikuangfenxiang" />
									<Text>分享</Text>
								</View>
							) : <View
							className="detail-master__bottom__share"
							onClick={this.isWeixin}
						>
							<IconFont size={46} name="icon_dikuangfenxiang" />
							<Text>分享</Text>
						</View>}
						</View>
					) : null}
					<View className="detail-master__bottom__btn">
						<BasicButton
							size="large"
							label="联系Ta"
							renderLabel={<IconFont size={40} name="ic_phone" color="#fff" />}
							onClick={this.handlePhoneCall.bind(this, data.contact_phone)}
						/>
					</View>
				</View>
				<DqModal show={shareShow} onMaskClick={this.onMaskClick}>
					<View className="mask_share" onClick={this.onMaskClick}>
						<Image
							className="mask_share__arrow"
							src={STATIC_ASSETS('images/bg/share_arrow.png')}
						/>
						{/* <Image
							className="mask_share__txt"
							src={STATIC_ASSETS('images/bg/share_txt.png')}
						/>
						<Image
							className="mask_share__btn"
							src={STATIC_ASSETS('images/bg/share_btn.png')}
						/> */}
					</View>
				</DqModal>
			</View>
		)
	}
}
export default Index
