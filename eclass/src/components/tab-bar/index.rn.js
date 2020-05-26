import Taro, { Component, PureComponent } from '@tarojs/taro'
import { SafeAreaView} from 'react-native'
import { View, Text } from '@tarojs/components'
import {
	StyleSheet,
	Animated,
	Easing,
	Dimensions,
	TouchableOpacity
} from 'react-native'
import classNames from 'classnames'
import './index.scss'
const { width: winWidth } = Dimensions.get('window')
export default class TabBar extends PureComponent {
	static defaultProps = {
		tabClass: 'default',
		isFixed: false,
		currentTab: 1,
		tabList: [],
		compStyle: {},
		onClick: () => {}
	}

	constructor(props) {
		super(props)
		this.state = {
			value: new Animated.Value(0)
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.isFixed !== nextProps.isFixed) {
			if (nextProps.isFixed) {
				this.scale()
			} else {
				this.resize()
			}
		}
	}

	startAnimate(obj, toValue, duration) {
		return new Promise((resolve) => {
			Animated.timing(obj, {
				toValue,
				duration,
				easing: Easing.elastic(0)
			}).start(resolve)
		})
	}

	scale() {
		return this.startAnimate(this.state.value, 1, 300)
	}

	resize() {
		return this.startAnimate(this.state.value, 0, 300)
	}

	handleClick = (id) => {
		this.props.onClick(id)
	}

	getItemStyle = () => {
		const { value } = this.state
		const width = value.interpolate({
			inputRange: [ 0, 1 ],
			outputRange: [ 60, winWidth / 4 ]
		})
		return { width }
	}

	render() {
		const {
			tabClass,
			tabList,
			currentTab,
			isFixed,
			compStyle,
			isShow
		} = this.props
			return (
			<SafeAreaView>
				<View className={`tab-bar-${tabClass}`} pointerEvents='box-none'>
					{tabList.map((item) => {
						const current = item.id === currentTab
						return (
							<Animated.View
								key={item.id}
								className={classNames(
									'tab-bar-' + tabClass + '__item',
									current && 'tab-bar-' + tabClass + '__item--active'
								)}
								style={[ this.getItemStyle(), compStyle ]}
							>
								<TouchableOpacity
									onPress={this.handleClick.bind(this, item.id)}
									activeOpacity={0.8}
								>
									<Text
										className={classNames(
											'tab-bar-' + tabClass + '__item__text',
											current && 'tab-bar-' + tabClass + '__item--active__text'
										)}
									>
										{item.name}
									</Text>
								</TouchableOpacity>
								<View
									className={classNames(
										'tab-bar-' + tabClass + '__item__border',
										current && 'tab-bar-' + tabClass + '__item__border--active'
									)}
								/>
							</Animated.View>
						)
					})}
				</View>
			</SafeAreaView>
		)
	}
}
