import Taro, { PureComponent } from '@tarojs/taro'
import RNScrollView from './ScrollView/ScrollView'
import { StyleSheet } from 'react-native'
import { View, Text } from '@tarojs/components'
export default class RNDqScrollView extends PureComponent {
	static defaultProps = {
		hasMoreText: '正在加载中',
		noMoreText: '更多内容，敬请期待'
	}

	renderHeader = () => {}
	renderFooter = () => {
		const { hasMore, hasMoreText, noMoreText, noMore } = this.props
		return noMore ? (
			<View style={styles.bottomContainer}>
				<Text style={styles.bottomText}>{noMoreText}</Text>
			</View>
		) : hasMore ? (
			<View style={styles.bottomContainer}>
				<Text style={styles.bottomText}>{hasMoreText}</Text>
			</View>
		) : null
	}
	render() {
		const {
			hasMoreText,
			hasMore,
			noMoreText,
			scrollStyle,
			children,
			...scrollProps
		} = this.props
		return (
			<View style={[ styles.container, scrollStyle, {flex: 1} ]}>
				{this.renderHeader()}
				<RNScrollView {...scrollProps}>
					{children}
					{this.renderFooter()}
				</RNScrollView>
			</View>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1
		// marginBottom: 100
	},
	bottomContainer: {
		// paddingTop: 30,
		paddingBottom: 120,
		alignItems: 'center',
		backgroundColor: '#fff'
	},
	bottomText: {
		fontSize: 14,
		color: '#333'
	}
})
