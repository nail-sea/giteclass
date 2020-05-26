import Taro, { Component, PureComponent } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { SafeAreaView } from 'react-native'
import IconFont from '@/components/iconfont'
import Dq from '@/config/Dq'
import times from '@/utils/times'
import './index.scss'
import { STATIC_ASSETS } from '../../config'

export default class HeaderIndex extends PureComponent {
	static defaultProps = {
		title: '全国',
		isBack: false,
		isClassify: false,
		weather: {}
	}

	static options = {
		addGlobalClass: true
	}

	handleClick = (item) => {
		Dq.navigateTo({
			url: `/pages/location/location`
		})
	}

	render() {
		const { title, weather } = this.props
		const lunar = times.lunarCalendar()
		return (
			<SafeAreaView style={{backgroundColor:'#FF7B49'}}>
				<View className="header-index">
					{/* {this.props.isBack ? <View><IconFont name="ic_zhuanfa"  color={['#ff', 'rgb(50, 124, 39)']} size={300} /></View> : <View> </View>} */}
					<View className="header-index__address" onClick={this.handleClick}>
						{/* <Text>LOGO</Text> */}
						{/* <Image className='header-index__address__logo' src={STATIC_ASSETS('images/icon/logo_ewang.png')} /> */}
						<IconFont name="icon_fanbailogo" color={'#fff'} size={40} />
						<View className="header-index__address__text">
							<Text className="header-index__address__text__spot">•</Text>
							<Text className="header-index__address__text__text">{title}</Text>
							<IconFont name="ic_xiala" color={'#fff'} size={42} />
						</View>
					</View>
					<Text className="header-index__info">
						<Text>
							{weather.temperature}℃ {weather.weather} 农历 {lunar}
						</Text>
					</Text>

					{/* <View className="flex_1 text-center title"><Text>{this.props.tit}</Text></View>
          {this.props.isClassify ? <View>分类</View> : <View> </View>} */}
				</View>
			</SafeAreaView>
		)
	}
}
