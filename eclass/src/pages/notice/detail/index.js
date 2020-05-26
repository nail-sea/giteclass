import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Text } from '@tarojs/components'
import { TitleBar, NoData, SkeletonList } from '@/components'
import { HOST_AGENT } from '@/config/index'
import { connect } from '@tarojs/redux'
import { getWindowHeight } from '@/utils/style'
import decorator from '@/config/decorator'
import ENUM from '@/config/enum'
import DetailItem from '../notice-item/detial-item'
import NoticeItem from '../notice-item/notice-item'
import Dq from '@/config/Dq'
import './index.scss'

@connect(({ notice, loading }) => ({
	...notice,
	...loading
}))
@decorator()
class Notice extends Component {
	config = {
		navigationBarTitleText: '消息详情'
	}

	state = {
		mes_type: '',
		mes_type_name: [ '消息通知', 'E网助手', '店铺通知' ],
		loading: true
	}

	async componentDidMount() {
		const { type } = this.$router.params
		await this.setState(
			{
				mes_type: type
			},
			() => {
				this.fetchNoticeList(1)
			}
		)
	}

	fetchNoticeList = async (page) => {
		const { dispatch } = this.props
		const { mes_type } = this.state

		await dispatch({
			type: 'notice/fetchNotice',
			payload: {
				page,
				pagesize: ENUM.HOME_PAGESIZE,
				mestype: mes_type
			}
		})
		this.setState({ loading: false })
	}

	loadRecommend = async () => {
		const { currentPage, isMore } = this.props.noticeList
		if (isMore) {
			return
		}
		this.fetchNoticeList(currentPage + 1)
	}

	// handleClick = data => {
	//   Dq.navigateTo({
	//     url:
	//       data === "3"
	//         ? "/pages/shopStore/my-store/index"
	//         : "/pages/shopStore/Coupon-management/index"
	//   });
	// };

	renderNoticeList = (meslist, isMore) => {
		const { mes_type } = this.state
		return (
			<View>
				{meslist.map((item) => {
					return (
						<View className="notice-view__view">
							<View className="notice-view__date" />
							{mes_type == 3 ? (
								<DetailItem data={item} onHandleClick={this.handleClick} />
							) : (
								<NoticeItem data={item} />
							)}
						</View>
					)
				})}
				{isMore ? <Text className="loading">已经是全部了哦~</Text> : null}
			</View>
		)
	}

	renderNodata = () => {
		return <NoData tips="这里还没有任何消息哦~" />
	}

	render() {
		const { mes_type_name, mes_type, loading } = this.state
		const { noticeList: { list, isMore, currentPage } } = this.props
		const isLoading = this.props.effects['notice/fetchNotice']

		return (
			<View className="notice-view">
				<TitleBar title={mes_type_name[mes_type - 1]} hideBottomBorder />
				<SkeletonList
          loading={loading}
          itemProps={{
						avatar:false,
						style:{
							width:'90%',
							marginTop:40,
							alignSelf:'center'
						}
					}}
					rows={4}
        >
					<ScrollView
						scrollY
						onScrollToLower={this.loadRecommend}
						style={{ height: getWindowHeight(false, true, 0) }}
					>
						{list && list.length > 0 ? (
							<View>
								{this.renderNoticeList(list, isMore)}
								{isLoading && <Text className="loading">正在加载中...</Text>}
							</View>
						) : (
							this.renderNodata()
						)}
					</ScrollView>
				</SkeletonList>
			</View>
		)
	}
}

export default Notice
