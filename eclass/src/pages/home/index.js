import Taro, { Component, PureComponent } from '@tarojs/taro'
import { Text, Image, ScrollView, Button, View } from '@tarojs/components'
import {
	HeaderIndex,
	SearchBar,
	HeaderStatistics,
	SwiperBanner,
	TabBar,
	Noticebar,
	DqScrollView
} from '@/components'
import { getWindowHeight } from '@/utils/style'
import SwiperIcon from './swiper-icon'
import { connect } from '@tarojs/redux'
import global from '../../utils/global'
import ENUM from '@/config/enum'
import { STATIC_ASSETS } from '@/config/index'
import ItemMaster from '@/pages/class/item-master/index'
import './home.scss'
import storage from '../../utils/storage'
import decorator from '@/config/decorator'
import Dq from '@/config/Dq'
import {HOST,SHAREINFO} from '@/config'
import Platform from "@/platfrom";
const iconList = [
	[
		{
			header: STATIC_ASSETS('images/item/carpoolingCar.png'),
			rank: 1,
			text: '拼车租车',
			url: 'carpoolingCar'
		},
		{
			header: STATIC_ASSETS('images/item/jobHunting.png'),
			rank: 2,
			text: '招聘求职',
			url: 'jobHunting_2'
		},
		{
			header: STATIC_ASSETS('images/item/secondHand.png'),
			rank: 3,
			text: '二手物品',
			url: 'secondHand'
		},
		{
			header: STATIC_ASSETS('images/item/buyRentHouse.png'),
			rank: 4,
			text: '租房买房',
			url: 'buyRentHouse_1'
		},
		{
			header: STATIC_ASSETS('images/item/localService.png'),
			rank: 5,
			text: '本地服务',
			url: 'localService'
		},
		{
			header: STATIC_ASSETS('images/item/wantedAny.png'),
			rank: 6,
			text: '寻人寻物',
			url: 'wantedAny'
		},
		{
			header: STATIC_ASSETS('images/item/localMeet.png'),
			rank: 7,
			text: '同城聚会',
			url: 'localMeet'
		},
		{
			header: STATIC_ASSETS('images/item/businessPartnership.png'),
			rank: 8,
			text: '创业合伙',
			url: 'businessPartnership'
		},
		{
			header: STATIC_ASSETS('images/item/dating.png'),
			rank: 9,
			text: '征婚交友',
			url: 'dating'
		},
		
		{
			header: STATIC_ASSETS('images/item/productPromotion.png'),
			rank: 10,
			text: '商品促销',
			url: 'productPromotion'
		}
	]
]


@connect(({ home, common }) => ({
	...home,
	...common
}))
@decorator()
class Index extends PureComponent {
	config = {
		navigationBarTitleText: 'E网生活',
		disableScroll: true
	}

	state = {
		currentTab: 1,
		tabList: [
			{ id: 1, name: '默认', index: 1 },
			{ id: 2, name: '最新', index: 2 },
			// { id: 3, name: '推荐', index: 3 },
			{ id: 3, name: '热门', index: 4 }
		],
		isFixed: false,

		hasMore: true
	}
	componentDidShow() {
		if (process.env.TARO_ENV === 'weapp') {
			if (
				typeof this.$scope.getTabBar === 'function' &&
				this.$scope.getTabBar()
			) {
				this.$scope.getTabBar().$component.setState({
					selected: 0
				})
			}
		}
	}

	componentWillMount() {
		// Platform.init(this.$router.params);
		// console.log("home-componentWillMount",this.$router)
	}

	async componentDidMount() {
		let storage_msg = storage.getInstance().getAreainfo()
		if (this.props.locationTitle == '全国') {
		
			if (storage_msg && storage_msg.cur_area) {
				this.props.dispatch({
					type: 'home/refreshLocationTitle',
					payload: {
						title: storage_msg.cur_area.name,
						norefresh: true
					}
				})
			}
		}
		
		const cityName =storage_msg && storage_msg.cur_area ? storage_msg.cur_area.name : ''
		const shareConfig={
			...SHAREINFO.defaut,
			title:`${cityName}${SHAREINFO.defaut.title}`,
			link:'?share=1'
		}
		Platform.sendShare(shareConfig)

		this.props.dispatch({
			type: 'location/getLocation',
			payload: {}
		})
		this.props.dispatch({
			type: 'home/fetchGetStatistical',
			payload: { __location: 3 }
		})

		this.props.dispatch({
			type: 'common/fetchAdvert',
			payload: { ad_price: 5, ad_type: 'homepage' }
		})

		this.props.dispatch({
			type: 'common/fetchNotices',
			payload: { notice_price: 5, notice_type: 'homepage' }
		})

		this.fetchList(0, 1)
		Taro.pageScrollTo &&
			Taro.pageScrollTo({
				scrollTop: 100,
				duration: 10
			})
		var that = this
		Taro.eventCenter.on('EVENT_LOCATION_REFRESH', (arg) => {
			// console.log("EVENT_LOCATION_REFRESH----------on");
			this.props.dispatch({
				type: 'home/resetList',
				payload: {
					state: 1
				}
			})

			that.fetchList(that.state.currentTab - 1)

			let storage_msg = storage.getInstance().getAreainfo()
			const cityName =storage_msg && storage_msg.cur_area ? storage_msg.cur_area.name : ''
			const shareConfig={
				...SHAREINFO.defaut,
				title:`${cityName}${SHAREINFO.defaut.title}`,
				link:'?share=1'
			}
			Platform.sendShare(shareConfig)
		})
	}

	componentWillUnmount() {
		// console.log("EVENT_LOCATION_REFRESH----------off");
		Taro.eventCenter.off('EVENT_LOCATION_REFRESH')

		this.props.dispatch({
			type: 'home/resetList',
			payload: {
				currentTab: 0,
				state: 2
			}
		})
	}

	fetchList = async (index, page) => {
		const { tabList } = this.state

		const order_type = tabList[index].index

		this.props
			.dispatch({
				type: 'home/fetchList',
				payload: {
					__location: 2,
					order_type,
					currentTab: index,
					page: page, //allItemList[order_type] ? (allItemList[order_type].page + 1) : 1,
					page_size: ENUM.HOME_PAGESIZE
				}
			})
			.then((data) => {
				if (data) {
					this.setState({
						hasMore: data.list.length > 0
					})
				}
			})
	}

	indexScroll = (event) => {
		if (process.env.TARO_ENV === 'weapp') {
			let that = this
			this.refs.tabBar
				.fields(
					{
						id: false, //是否返回节点id
						rect: true, //是否返回节点布局位置
						dataset: true, //返回数据集
						size: true, //返回宽高
						scrollOffset: true, //返回 scrollLeft,scrollTop
						properties: [ 'scrollX', 'scrollY' ] //监听属性名
					},
					function(res) {
						if (that.state.isFixed != res.top <= 0) {
							that.setState({ isFixed: res.top <= 0 })
						}
					}
				)
				.exec()
			// 这里 this.refs.input 访问的时候通过 `wx.createSeletorQuery` 取到的小程序原生组件
		} else if (process.env.TARO_ENV === 'h5') {
			if (
				this.state.isFixed !=
				event.detail.scrollTop >= this.refs.tabBar.vnode.dom.offsetTop
			) {
				this.setState({
					isFixed:
						event.detail.scrollTop >= this.refs.tabBar.vnode.dom.offsetTop
				})
			}
		}
	}

	onToPersonalPage = (uid) => {
		//查看个人主页
		Dq.navigateTo({
			url: `/pages/user/personal-page/index?uid=${uid}`
		})
	}

	handleTab = (id) => {
		// this.setState({ hasMore: true }, () => {
		this.setState({ hasMore: true, currentTab: id })
		// });
		// Taro.pageScrollTo({
		// 	scrollTop: 0,
		// 	duration:10
		// })

		this.props
			.dispatch({
				type: 'home/resetList',
				payload: {
					currentTab: id - 1,
					state: 2
				}
			})
			.then(() => {
				setTimeout(() => {
					this.fetchList(id - 1, 1) //切换回第一页
				}, 100)
			})
	}

	handleSearch = () => {
		Dq.navigateTo({
			url: '/pages/search/search?from=/pages/home/index'
		})
	}

	onToDetail = (id, type) => {
		//查看详情
		Dq.navigateTo({
			url: `/pages/class/detail-master/index?post_id=${id}`
		})
	}

	refresh = () => {
		// this.setState({
		//   refreshStatus: 1
		// });
		// Taro.showToast({
		//   title: "刷新",
		//   icon: "none"
		// });
		this.props
			.dispatch({
				type: 'home/resetList',
				payload: {
					state: 3,
					currentTab: this.state.currentTab - 1
				}
			})
			.then((res) => {
				this.fetchList(this.state.currentTab - 1, 1) //切换回第一页
			})

		// 模拟请求
		// setTimeout(() => {
		this.setState({
			refreshStatus: 2
		})
		// }, Math.random() * 1000);
	}

	loadMore = () => {
		// console.log("loadMore----------",this.state.hasMore)
		if (!this.state.hasMore) {
			return
		}
		// this.setState({ hasMore: true }, () => {
		this.fetchList(this.state.currentTab - 1)
		// });
	}

	render() {
		const {
			locationTitle,
			locationWeather,
			statistical,
			showItemList,
			advertList,
			noticesList
		} = this.props
		const { hasMore } = this.state

		const imgList = advertList['homepage'] || []
		const notList = noticesList['homepage'] || []
		console.log('===============')

		return (
			<View className="home">
				<DqScrollView
					scrollStyle={{
						backgroundColor: 'transparent',
						height: getWindowHeight(true, false)
					}}
					// contentContainerStyle={{ backgroundColor: '#fff' }}
					onRefresh={this.refresh}
					onScrollToLower={this.loadMore}
					hasMore={hasMore}
					onScroll={this.indexScroll}
					// refresherDisabled={true}
					stickyHeaderIndices={[ 3 ]}
				>
					<View className="home__header">
						<HeaderIndex
							title={locationTitle}
							weather={locationWeather}
							isBack={false}
							isClassify={false}
						/>
						<SearchBar
							title="搜索信息"
							handleSearch={this.handleSearch.bind(this)}
						/>
						<HeaderStatistics
							text1={`信息:` + statistical.total_post_num}
							text2={`人气:${statistical.total_visit_num}`}
							text3={`成员:${statistical.total_member_num}`}
						/>
					</View>
					<View className="home__link">
						<Noticebar list={notList} />
						<SwiperIcon list={iconList} />
					</View>
					<View className="home__banner" >
						<SwiperBanner data={imgList} autoplay loop styleType="home" />
					</View>
					<View ref="tabBar" className="home__tab-bar">
						<TabBar
							tabList={this.state.tabList}
							currentTab={this.state.currentTab}
							isFixed={this.state.isFixed}
							onClick={this.handleTab}
						/>
					</View>
					<View className="home__main-list">
						{showItemList.map((item, index) => {
							return (
								<ItemMaster
									key={item.post_id}
									item_data={item}
									type="home"
									onHandleDetail={this.onToDetail.bind(
										this,
										item.post_id,
										item.primary_category
									)}
									onHandleToPersonalPage={this.onToPersonalPage.bind(
										this,
										item.uid
									)}
								/>
							)
						})}
					</View>
				</DqScrollView>
				{/* <DqTabBar currentTab={0} /> */}
			</View>
		)
	}
}
export default Index
