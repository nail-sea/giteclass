import Taro, { Component, PureComponent } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import classNames from 'classnames'
import './index.scss'

export default class HeaderStatistics extends PureComponent {
	static defaultProps = {
		textStyle: '',
		text1: '',
		text2: '',
		text3: ''
	}

	render() {
		const { textStyle, text1, text2, text3 } = this.props
		return (
			<View className='header-statistics'>
				<View className={classNames('header-statistics__item', 'header-statistics__item__left')}>
					<Text className="header-statistics__item__text" style={textStyle}>{text1}</Text>
				</View>
				<View className={classNames('header-statistics__item', 'header-statistics__item__right', {'header-statistics__item__center': (text3.length > 0)})}>
					<Text className="header-statistics__item__text" style={textStyle}>{text2}</Text>
				</View>
				{text3.length > 0 && <View className={classNames('header-statistics__item', 'header-statistics__item__right')}>
					<Text className="header-statistics__item__text" style={textStyle}>{text3}</Text>
				</View>}
			</View>
		)
	}
}
