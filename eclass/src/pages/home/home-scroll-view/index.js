import Taro, { PureComponent } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { DqScrollView } from '@/components'
import './index.scss'
import { pxToPt } from '@/utils/style'
import { getPlatform } from '@/utils/common'

const BASE = 'home-scroll'
function calcScroll(scrollTop) {
	if (getPlatform().isWX) {
		const { screenWidth } = Taro.getSystemInfoSync()
		const designWidth = 750
		return scrollTop * designWidth / screenWidth
	}
	return scrollTop
}

export default class HomeScrollView extends PureComponent {
	static defaultProps = {
		headerShowScroll: 200,
		headerHeight: 100,
		tabBarHeight: 100,
		tabBarStickScroll: 300,
		listData: [],
		renderHeader: () => null,
		renderHideHeader: () => null,
		renderListItem: () => null,
		renderTabBar: () => null,
		doubleMode: false,
		showHideHeader:false
	}

	static options = {
		addGlobalClass: true
	}

	config = {
		disableScroll: true
	}

	state = {
		scrollTop: 0,
		innerScroll: false
	}

	onContainerScroll = (e) => {
		const { scrollTop } = e.target
		const { tabBarStickScroll, onTabBarStaticChange } = this.props
		const innerScroll =
			calcScroll(scrollTop) >= parseFloat(pxToPt(tabBarStickScroll))
		if (innerScroll !== this.state.innerScroll) {
			onTabBarStaticChange && onTabBarStaticChange(innerScroll)
		}
		this.setState({ scrollTop, innerScroll })
	}

	getHeaderStyle = () => {}

	getInnerScrollStyle = () => {
		const { tabBarHeight } = this.props
		const { innerScroll } = this.state
		return { paddingTop: innerScroll ? pxToPt(tabBarHeight) : 0 }
	}

	getHideHeaderTranslateY = () => {
		const { scrollTop } = this.state
		const { headerShowScroll, headerHeight } = this.props
		if (calcScroll(scrollTop) < parseFloat(pxToPt(headerShowScroll))) {
			return (
				pxToPt(-headerHeight) +
				(Taro.getEnv() === Taro.ENV_TYPE.WEAPP ? '' : 'px')
			)
		}
		if (
			calcScroll(scrollTop) <
			parseFloat(pxToPt(headerHeight + headerShowScroll))
		) {
			return (
				pxToPt(
					calcScroll(scrollTop) -
						parseFloat(pxToPt(headerHeight + headerShowScroll))
				) + (Taro.getEnv() === Taro.ENV_TYPE.WEAPP ? '' : 'px')
			)
		}
		return 0
	}

	gethideHeaderStyle = () => {
		const { headerHeight } = this.props
		return {
			height: pxToPt(headerHeight),
			transform: `translateY(${this.getHideHeaderTranslateY()})`
		}
	}

	renderHideHeader = () => {
		const { renderHideHeader } = this.props
		return (
			<View
				className={`${BASE} ${BASE}__hide-header`}
				style={this.gethideHeaderStyle()}
			>
				{renderHideHeader()}
			</View>
		)
	}

	renderTabBar = () => {
		const { renderTabBar, headerHeight } = this.props
		const { innerScroll } = this.state
		return (
			<View
				className={`${BASE} ${BASE}__tabbar`}
				style={{
					top: pxToPt(headerHeight),
					position: innerScroll ? 'fixed' : 'static'
				}}
			>
				{renderTabBar()}
			</View>
		)
	}

	render() {
		const {
			listData,
			renderListItem,
			renderHeader,
			onRefresh,
			onScrollToLower,
			hasMore,
			doubleMode,
			scrollStyle,
			showHideHeader
		} = this.props
		const { innerScroll, scrollTop } = this.state
		return (
			<DqScrollView
				scrollY
				className={`${BASE} ${BASE}__container`}
				onScroll={this.onContainerScroll}
				scrollTop={scrollTop}
				enableFlex
				onRefresh={onRefresh}
				hasMore={hasMore}
				moveDisabled={doubleMode}
				scrollStyle={scrollStyle}
			>
				{doubleMode && showHideHeader ? this.renderHideHeader() : null}
				{doubleMode ? renderHeader() : null}
				{/* <View style={{width: '100%', height: 300}} className={`${BASE}`} /> */}
				{doubleMode ? (
					<ScrollView
						onScrollToLower={onScrollToLower}
						enableFlex
						scrollY={innerScroll}
						className={`${BASE}__inner`}
						onScroll={this.onInnerScroll}
						style={this.getInnerScrollStyle()}
					>
						{this.renderTabBar()}
						{listData.length ? (
							listData.map((data, index) => renderListItem(data, index))
						) : null}
						<View className="DqScrollView__loadmore">
							{hasMore ? '正在加载中' : '更多内容，敬请期待'}
						</View>
					</ScrollView>
				) : (
					this.props.children
				)}
			</DqScrollView>
		)
	}
}
