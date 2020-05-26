import { PureComponent } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {
	Animated,
	Easing,
	Image,
	TouchableOpacity,
	PanResponder
} from 'react-native'
import './index.scss'
import SwiperHOC from './SwiperHOC'
import { formatStyle } from '@/utils/style'
const BASE = 'swiper-banner'
const SWIPER = 'swiper-banner__swiper'
const return_true = () => true
@SwiperHOC
export default class Swiper extends PureComponent {
	translateXAnimation = new Animated.Value(0)

	_panResponder = PanResponder.create({
		onMoveShouldSetPanResponder:return_true,
		onShouldBlockNativeResponder: return_true
	})

	_changeTranslateX = (translateX, duration) => {
		Animated.timing(this.translateXAnimation, {
			duration: duration * 1000,
			toValue: translateX,
			easing: Easing.linear
		}).start()
		let callback
		const promise = new Promise((resolve) => (callback = resolve))
		this.playTimer.translate = setTimeout(callback, duration * 1000)
		return promise
	}

	_getContainerStyle = () => {
		const { data, loop } = this.props
		return {
			width: this.width * data.length * (loop ? 3 : 1),
			transform: [ { translateX: this.translateXAnimation } ]
		}
	}

	render() {
		const { style } = this.props
		return (
			<View classnames={`${BASE} ${SWIPER}`} style={formatStyle(style)}>
				<Animated.View
					className={`${BASE} ${SWIPER}__wrap`}
					onTouchStart={this._onTouchStart}
					onTouchMove={this._onTouchMove}
					onTouchEnd={this._onTouchEnd}
					style={this._getContainerStyle()}
					{...this._panResponder.panHandlers}
				>
					{this._getRenderData().map((data, index) => (
						<TouchableOpacity
							style={formatStyle(style)}
							key={`swiper-banner-image-${index}`}
							onPress={this._onItemClick.bind(this, data)}
							activeOpacity={0.8}
						>
							<Image
								source={{ uri: data.img }}
								resizeMethod="resize"
								resizeMode="contain"
								className={`${BASE} ${SWIPER}__img`}
							/>
						</TouchableOpacity>
					))}
				</Animated.View>
			</View>
		)
	}
}
