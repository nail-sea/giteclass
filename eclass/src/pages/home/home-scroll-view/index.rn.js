import Taro, { PureComponent } from '@tarojs/taro'
import {
	Animated,
	Easing,
	ScrollView,
	View,
	SafeAreaView,
	FlatList,
	StyleSheet,
	Dimensions,
	RefreshControl
} from 'react-native'
import './index.scss'
import { pxToPt } from '@/utils/style'

const BASE = 'home-scroll'

const { statusBarHeight } = Taro.getSystemInfoSync()

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
		renderTabBar: () => null
	}

	config = {
		disableScroll: true
	}

	_headerHeight = 0

	_tabbarHeight = 0

	state = {
		scrollAnimation: new Animated.Value(0),
		innerScrollable: false,
		headerHeight: 0,

	}

	onContainerScroll = (e) => {
		const { nativeEvent: { contentOffset: { y } } } = e
		const innerScrollable = y >= this._headerHeight
		this.setState({ innerScrollable })
	}

	setHeaderHeight = ({ nativeEvent }) => {
		this._headerHeight = nativeEvent.layout.height
		this.setState({ headerHeight: this._headerHeight })
	}

	gethideHeaderStyle = () => {
		const { headerHeight, headerShowScroll } = this.props
		const _scrollY = pxToPt(headerShowScroll)
		const height = pxToPt(headerHeight)

		const translateY = this.state.scrollAnimation.interpolate({
			inputRange: [ 0, _scrollY, _scrollY + height, _scrollY + height + 1 ],
			outputRange: [
				-height - statusBarHeight,
				-height - statusBarHeight,
				0,
				0
			]
		})
		return {
			height,
			transform: [ { translateY } ]
		}
	}

	getTabBarStyles = () => {
		const { headerHeight } = this.state
		const { headerHeight: hideHeaderHeight } = this.props
		const _scrollY = Math.max(headerHeight - pxToPt(hideHeaderHeight), 0)
		const translateY = this.state.scrollAnimation.interpolate({
			inputRange: [ 0, _scrollY, _scrollY + 100 ],
			outputRange: [ 0, 0, 100 ]
		})
		return {
			transform: [ { translateY } ]
		}
	}

	renderHeader = () => {
		return (
			<View onLayout={this.setHeaderHeight}>{this.props.renderHeader()}</View>
		)
	}

	renderHideHeader = () => {
		const { renderHideHeader } = this.props
		return (
			<Animated.View
				className={`${BASE}__hide-header`}
				style={this.gethideHeaderStyle()}
			>
				{renderHideHeader()}
			</Animated.View>
		)
	}

	renderTabBar = () => {
		const { renderTabBar } = this.props
		return (
			<Animated.View
				className={`${BASE} ${BASE}__tabbar`}
				style={this.getTabBarStyles()}
			>
				{renderTabBar()}
			</Animated.View>
		)
	}

	renderListItem = ({ item, index }) => this.props.renderListItem(item, index)

	render() {
		const { listData, onRefresh, onScrollToLower } = this.props
		const { innerScrollable } = this.state
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: '#FF7B49' }}>
				<View style={{ flex: 1 }}>
					<View
						style={{
							width: '100%',
							height: '50%',
							backgroundColor: '#f4f4f4',
							position: 'absolute',
							zIndex: 0,
							bottom: 0
						}}
					/>
					{this.renderHideHeader()}
					<Animated.ScrollView
						className={`${BASE} ${BASE}__container`}
						onScroll={Animated.event(
							[
								{
									nativeEvent: {
										contentOffset: { y: this.state.scrollAnimation }
									}
								}
							],
							{ useNativeDriver: true },
							{ listener: this.onContainerScroll }
						)}
						scrollEventThrottle={1}
						refreshControl={
							<RefreshControl
								onRefresh={onRefresh}
								refreshing={false}
								colors={[ '#F87C6A' ]}
							/>
						}
						showsVerticalScrollIndicator={false}
					>
						{this.renderHeader()}
						{this.renderTabBar()}
						<FlatList
							className={`${BASE} ${BASE}__inner`}
							data={listData}
							renderItem={this.renderListItem}
							scrollEnabled={innerScrollable}
							nestedScrollEnabled
							onEndReached={onScrollToLower}
							onEndReachedThreshold={0.1}
						/>
					</Animated.ScrollView>
				</View>
			</SafeAreaView>
		)
	}
}
