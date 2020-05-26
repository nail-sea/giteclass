import Taro, { PureComponent } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import PropTypes from 'prop-types'
import './index.scss'
class ListView extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {}
	}

	renderHeader = () => {
		return this.props.renderHeader()
	}

	renderFooter = () => {
		return this.props.renderFooter()
	}

	renderItem = (item, index) => {
		return this.props.renderItem(item, index)
	}

	render() {
		const { data } = this.props
		return (
			<View className='scrollview-container'>
				{this.renderHeader()}
				<ScrollView scrollY className='scrollview-list'>
					{data.map(this.renderItem)}
				</ScrollView>
				{this.renderFooter()}
			</View>
		)
	}
}

ListView.propTypes = {
	data: PropTypes.array,
	refreshing: PropTypes.bool,
	onRefresh: PropTypes.func,
	onScrollToLower: PropTypes.func,
	hasMore: PropTypes.bool,
	hasMoreText: PropTypes.string,
	noMoreText: PropTypes.string,
	renderItem: PropTypes.func,
	renderHeader: PropTypes.func,
	renderFooter: PropTypes.func
}
ListView.defaultProps = {
	data: [],
	refreshing: false,
	onRefresh: () => {},
	onScrollToLower: () => {},
	hasMore: false,
	hasMoreText: '上拉加载更多',
	noMoreText: '没有更多了',
	renderItem: () => {},
	renderHeader: () => {},
	renderFooter: () => {}
}

export default ListView
