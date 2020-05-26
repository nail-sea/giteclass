import Taro, { PureComponent } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import SwiperHOC from './SwiperHOC'
import './index.scss'
import { pxToPt } from '@/utils/style'
const BASE = 'swiper-banner'
const SWIPER = 'swiper-banner__swiper'
@SwiperHOC
class Swiper extends PureComponent {
	static options = {
		addGlobalClass: true
	}

	_changeTranslateX = (translateX, speed = 0) => {
		let callback
		const promise = new Promise((resolve) => (callback = resolve))
		this.setState({ translateX, speed }, () => {
			this.playTimer.translate = setTimeout(callback, speed * 1000)
		})
		return promise
	}
	
	_getContainerStyle = () => {
		const { data, loop } = this.props
		let { translateX, speed } = this.state
		let width =this.width * data.length * (loop ? 3 : 1)
		let _translateX = translateX + 'px'
		if(Taro.getEnv() === Taro.ENV_TYPE.WEAPP){
			width = pxToPt(width)
			_translateX = translateX + 'rpx'
		}

		return {
			width,
			transition: `all ${speed}s`,
			transform: `translateX(${_translateX})`
		}
	}

	render() {
		const { style } = this.props
		const _style = {width:Taro.pxTransform(style.width), height:Taro.pxTransform(style.height)}
		return (
			<View className={`${BASE} ${SWIPER}`} style={_style}>
				<View
					onTouchEnd={this._onTouchEnd}
					onTouchStart={this._onTouchStart}
					onTouchMove={this._onTouchMove}
					className={` ${BASE} ${SWIPER}__wrap`}
					style={this._getContainerStyle()}
				>
					{this._getRenderData().map((data, index) => (
						<View
							style={_style}
							onClick={this._onItemClick.bind(this, data)}
							key={`swiper-banner-image-${index}`}
						>
							<Image
								src={data.img}
								className={`${BASE} ${SWIPER}__img`}
								mode="scaleToFill"
							/>
						</View>
					))}
				</View>
			</View>
		)
	}
}
export default Swiper