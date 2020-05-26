import Taro, { PureComponent } from '@tarojs/taro'
import { View, FlatList, RefreshControl, Text } from 'react-native'
import PropTypes from 'prop-types'
import './index.scss'
class RNListView extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {}
	}

	_onRefresh = () => {
		this.props.onRefresh()
	}

	_onEndReached = () => {
		this.props.onScrollToLower()
	}

	_renderHeader = () => {
		return this.props.renderHeader()
	}
	_renderItem = ({ item, index }) => {
		return this.props.renderItem(item, index)
	}

	_renderFooter = () => {
		return this.props.renderFooter()
	}

	_renderHasMore = () => {
		if (this.props.renderHasMore) {
			return this.props.renderHasMore()
		}
		return (
			<View className="listview__loadmore">
				<Text className="listview__loadmore__text">
					{this.props.hasMoreText}
				</Text>
			</View>
		)
	}

	_renderNoMore = () => {
		if (this.props.renderNoMore) {
			return this.props.renderNoMore()
		}
		return (
			<View className="listview__loadmore">
				<Text className="listview__loadmore__text">
					{this.props.noMoreText}
				</Text>
			</View>
		)
	}

	_renderWetherHasMore = () => {
		const { hasMore } = this.props
		return hasMore ? this._renderHasMore() : this._renderNoMore()
	}

	_renderEmpty = () => {
		if (this.props.renderEmpty) {
			return this.props.renderEmpty()
		}
		return (
			<View className="listview__empty">
				<Text listview__empty__text>目前没有任何内容</Text>
			</View>
		)
	}

	render() {
		const { data, refreshing, onRefresh,renderItem, ...restProps } = this.props
		return (
			<FlatList
				className="listview__list"
				data={data}
				renderItem={this._renderItem}
				ListHeaderComponent={this._renderHeader}
				ListFooterComponent={this._renderWetherHasMore}
				ListEmptyComponent={this._renderEmpty}
				refreshControl={
					<RefreshControl
						refreshing={refreshing || false}
						onRefresh={this._onRefresh}
						colors={[ '#F87C6A' ]}
					/>
				}
				onEndReached={this._onEndReached}
				onEndReachedThreshold={0.2}
				windowSize={300}
				initialNumToRender={10}
				onEndReachedThreshold={.1}
				{...restProps}
			/>
		)
	}
}
RNListView.propTypes = {
	data: PropTypes.array.isRequired,
	refreshing: PropTypes.bool,
	onRefresh: PropTypes.func,
	onScrollToLower: PropTypes.func,
	hasMore: PropTypes.bool,
	hasMoreText: PropTypes.string,
	noMoreText: PropTypes.string,
	renderItem: PropTypes.func,
	renderHeader: PropTypes.func,
	renderFooter: PropTypes.func,
	renderEmpty: PropTypes.func,
	renderHasMore: PropTypes.func,
	renderNoMore: PropTypes.func
}
RNListView.defaultProps = {
	data: [],
	refreshing: false,
	onRefresh: () => {},
	onScrollToLower: () => {},
	hasMore: false,
	hasMoreText: '上拉加载更多',
	noMoreText: '没有更多了',
	renderItem: () => {},
	renderHeader: () => {},
	renderFooter: () => {},
	renderEmpty: null,
	renderHasMore: null,
	renderNoMore: null
}

export default RNListView
