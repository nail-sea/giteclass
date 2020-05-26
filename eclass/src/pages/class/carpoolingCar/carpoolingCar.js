import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { TitleBar, ActionSheet } from '@/components'
import { connect } from '@tarojs/redux'
import { getWindowHeight, pxToPt } from '@/utils/style'
import { STATIC_ASSETS, SHAREINFO } from "@/config/index";
import stdArray, { stdConfig, stopPropagation } from '@/utils/common'
import IconFont from '@/components/iconfont'
import classNames from 'classnames'
import CarpoolingCarSearch from './search'
import decorator from '@/config/decorator'
import times from '@/utils/times'
import Dq from '@/config/Dq'
import display from '@/utils/display'
import Storage from "@/utils/storage";
import ENUM from "@/config/enum";
import Platform from "@/platfrom";
import './carpoolingCar.scss'

@connect(({ classModels }) => ({
	...classModels
}))
@decorator()
class Index extends Component {
	constructor() {
		super(...arguments)
		this.state = {
			loading: false,
			page: 1,
			hasMore: true,
			currentSearchTab: '',
			from: '',
			to: '',
			searchType: '',
			second_category: 2,
			loginState: 2
		}
	}
	config = {
		navigationBarTitleText: '拼车租车'
	}

	async componentDidMount() {
		const record_city = Storage.getInstance().getAreainfo(); //获取定位城市
		const cityName = record_city && record_city.cur_area ? record_city.cur_area.name : ''

		const loginState = await Storage.getInstance().getLoginState();
		this.setState({ loginState })
		this.getList()
		const shareConfig = {
			...SHAREINFO.classHome,
			imgUrl: STATIC_ASSETS(`images/item/carpoolingCar.png`),
			title: `${cityName}拼车租车_E网生活`,
			link:`/pages/class/carpoolingCar/carpoolingCar?share=1`
		  }
		  Platform.sendShare(shareConfig)
	}

	getList = async () => {
		//类目列表
		let data = await this.props.dispatch({
			type: 'classModels/fetchCategoryList',
			payload: {
				primary_category: 'carpoolingCar',
				second_category: this.state.second_category,
				__location: 2,
				page: this.state.page,
				start_address: this.state.from,
				end_address: this.state.to
			}
		})
		this.setState((prevState) => ({
			page: prevState.page + 1,
			hasMore: data.list.length > 9,
			loading: false
		}))
	}

	loadRecommend = () => {
		//加载更多
		if (!this.state.hasMore || this.state.loading) {
			return
		}
		this.setState({ loading: true }, () => {
			this.getList(this.state.currentTab - 1)
		})
	}

	onToDetail = (id, type) => {
		//查看详情
		Dq.navigateTo({
			url: `/pages/class/detail-master/index?post_id=${id}`
		})
	}

	handleRelease = () => {
		//去发布
		Dq.redirectTo({
			url: `/pages/class/carpoolingCar/release/index?classification_value=${this
				.state.second_category}`
		})
	}

	handlePhoneCall = (phone, e) => {
		stopPropagation(e)
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
						url: `${ENUM.LOGINURL}?url='carpoolingCar'`
					});
				  }
				}
			});
		}
		
	}

	handleChangeSecondCategory = (value) => {
		//点击切换乘客 车主
		if (this.state.loading) {
			return
		}
		this.setState({ second_category: value, loading: true, page: 1 }, () => {
			this.getList()
		})
	}

	handleSearch = () => {
		//点击搜索按钮
		if (this.state.loading) {
			return
		}
		this.setState({ searchType: '', loading: true, page: 1 }, () => {
			this.getList()
		})
	}

	handleInput = (data) => {
		//输入搜索词
		this.setState({ [this.state.searchType]: data })
	}

	handleShowSearch = (type) => {
		//点击展示搜索
		this.setState({ searchType: type })
	}

	render() {
		const {
			from,
			to,
			hasMore,
			loading,
			searchType,
			second_category
		} = this.state
		const { categoryList } = this.props

		const base_class = 'carpoolingCar__main-list__item'
		return (
			<View className={classNames('carpoolingCar', 'class-modal')}>
				<TitleBar title="拼车租车" />
				<View className="carpoolingCar__release-tips">
					<View className="carpoolingCar__release-tips__bg">
						<Text className="carpoolingCar__release-tips__text">
							没有合适的行程？点击快速发布
						</Text>
						<View
							className="carpoolingCar__release-tips__btn"
							onClick={this.handleRelease}
						>
							<Text className="carpoolingCar__release-tips__btn__text">
								发布
							</Text>
						</View>
					</View>
				</View>
				<ScrollView
					scrollY
					className="class-modal__wrap"
					onScrollToLower={this.loadRecommend}
					// style={{ height: getWindowHeight(false, true, pxToPt(90)) }}
					style={{ flex: 1 }}
				>
					<View className="carpoolingCar__main-content">
						{categoryList && categoryList.length > 0 ? (
							<View className="carpoolingCar__main-list">
								{categoryList.map((item, index) => {
									const arr_label = stdArray.splitString(
										item.extend ? item.extend.advantage : ''
									)
									return (
										<View
											className={`${base_class}`}
											key={item.post_id}
											onClick={this.onToDetail.bind(
												this,
												item.post_id,
												item.primary_category || 'carpoolingCar'
											)}
										>
											<View className={`${base_class}__header`}>
												<View
													className={`${base_class}__header__img`}
													onClick={this.handleDetail}
												>
													{item && item.avatar_url && item.avatar_url != '' ? (
														<Image
															mode="aspectFill"
															className={`${base_class}__header__img__img`}
															src={item.avatar_url}
														/>
													) : (
														<View className={`${base_class}__header__img__img`}>
															<IconFont name="icon_moren" size="85" />
														</View>
													)}
												</View>
												<View
													className={`${base_class}__header__content`}
													onClick={this.handleDetail}
												>
													<View className={`${base_class}__header__name`}>
														<Text
															className={`${base_class}__header__name__text`}
														>
															{item.uname || ''}
														</Text>
													</View>
													{stdConfig &&
													stdConfig.category &&
													arr_label.length > 0 ? (
														<View className={`${base_class}__header__tags`}>
															{arr_label.map((tag, index) => (
																<Text
																	className={`${base_class}__header__tags__item`}
																	key={tag}
																>
																	{stdConfig.getData(
																		'carpoolingCar',
																		second_category == 1
																			? 'someone_for_car_advantage'
																			: 'car_for_someone_advantage',
																		tag
																	)}
																</Text>
															))}
														</View>
													) : null}
												</View>
												{item.contact_phone ? (
													<View className={`${base_class}__header__call`}>
														<View
															className={`${base_class}__header__call__btn`}
															onClick={this.handlePhoneCall.bind(
																this,
																item.contact_phone
															)}
														>
															<IconFont
																name="ic_phone"
																color={'#FF8256'}
																size={28}
															/>
															<Text
																className={`${base_class}__header__call__btn__text`}
															>
																联系Ta
															</Text>
														</View>
													</View>
												) : null}
											</View>

											<View className={`${base_class}__info`}>
												<View className={`${base_class}__info__item`}>
													<IconFont
														name="icon_zuchedinbiaoshi"
														size="16"
														color={'#C8C8C8'}
													/>
													<Text className={`${base_class}__info__item__text`}>
														{item.extend.member_num}
														{second_category == 2 ? `座空闲 • ` : `人乘车 • `}
														{times.getRelativeDate(item.extend.date, true)}
													</Text>
												</View>
												<View className={`${base_class}__info__item`}>
													<IconFont
														name="icon_zuchedinbiaoshi"
														size="16"
														color={'#70DCC7'}
													/>
													<Text className={`${base_class}__info__item__text`}>
														{item.extend.start_address}
													</Text>
												</View>
												<View className={`${base_class}__info__item`}>
													<IconFont
														name="icon_zuchedinbiaoshi"
														size="16"
														color={'#F87C6A'}
													/>
													<Text className={`${base_class}__info__item__text`}>
														{item.extend.end_address}
													</Text>
												</View>
											</View>
											{item.describe ? (
												<View className={`${base_class}__tips`}>
													<Text>注：{item.describe}</Text>
												</View>
											) : null}
										</View>
									)
								})}
							</View>
						) : null}
						<View className="list__bottom__loading">
							{this.state.loading ? (
								<Text className="list__bottom__loading-txt">正在加载中...</Text>
							) : null}
							{!this.state.hasMore ? (
								<Text className="list__bottom__loading-txt">更多内容，敬请期待</Text>
							) : null}
						</View>
					</View>

					{process.env.TARO_ENV === 'rn' ? 
						<ActionSheet
							show={searchType != ''}
							onMaskClick={this.handleShowSearch.bind(this, '')}
							containerStyle={{ minHeight: pxToPt('900px') }}
						>
							<CarpoolingCarSearch
								searchText={searchType == 'from' ? from : to}
								onSearch={this.handleSearch}
								onHandleInput={this.handleInput}
							/>
						</ActionSheet>
					: null}
				</ScrollView>
				{process.env.TARO_ENV !== 'rn' && searchType != '' && <View className="carpoolingCar__search-modal">
					<View className="carpoolingCar__search-modal__mask" onClick={this.handleShowSearch.bind(this, '')}></View>
					<View className="carpoolingCar__search-modal__content">
						<CarpoolingCarSearch
							searchText={searchType == 'from' ? from : to}
							onSearch={this.handleSearch}
							onHandleInput={this.handleInput}
						/>
					</View>
				</View>}
				<View className="carpoolingCar__search">
					<View className="carpoolingCar__search__header">
						<View
							onClick={this.handleChangeSecondCategory.bind(this, 2)}
							className={classNames('carpoolingCar__search__header__btn', {
								'carpoolingCar__search__header__btn--active':
									second_category == 2
							})}
						>
							<Text className={classNames('carpoolingCar__search__header__btn__text', {'carpoolingCar__search__header__btn__text--active': second_category == 2})} >人找车</Text>
						</View>
						<View
							className={classNames('carpoolingCar__search__header__btn', {
								'carpoolingCar__search__header__btn--active':
									second_category == 1
							})}
							onClick={this.handleChangeSecondCategory.bind(this, 1)}
						>
							<Text className={classNames('carpoolingCar__search__header__btn__text', {'carpoolingCar__search__header__btn__text--active': second_category == 1})} >车找人</Text>
						</View>
					</View>
					<View className="carpoolingCar__search__input">
						<View
							className="carpoolingCar__search__input__item"
							onClick={this.handleShowSearch.bind(this, 'from')}
						>
							<IconFont
								name="icon_zuchedinbiaoshi"
								size="16"
								color={'#70DCC7'}
							/>
							{from ? (
								<Text className="carpoolingCar__search__input__item__text">
									{from}
								</Text>
							) : (
								<Text className="carpoolingCar__search__input__item__placeholder">
									从哪儿出发
								</Text>
							)}
						</View>
						<View
							className="carpoolingCar__search__input__item"
							onClick={this.handleShowSearch.bind(this, 'to')}
						>
							<IconFont
								name="icon_zuchedinbiaoshi"
								size="16"
								color={'#F87C6A'}
							/>
							{to ? (
								<Text className="carpoolingCar__search__input__item__text">
									{to}
								</Text>
							) : (
								<Text className="carpoolingCar__search__input__item__placeholder">
									想去哪儿
								</Text>
							)}
						</View>
					</View>
				</View>
			</View>
		)
	}
}
export default Index
