import Taro, { PureComponent } from '@tarojs/taro'
import { pxToPt } from '@/utils/style'

export default function(WrapperComponent) {
	class SwiperHOC extends WrapperComponent {
		static defaultProps = {
			defaultIndex: 0,
			onChange(index) {},
			onClick(data) {},
			data: [],
			style: {}
		}

		startX = 0

		deltaX = 0

		width = 0

		playTimer = {}

		state = {
			translateX: 0,
			speed: 0
		}

		componentDidMount() {
			this.width = pxToPt(this.props.style.width)
			console.log('====================================');
			console.log('this.width = ', this.width,' this.props.style.width = ', this.props.style.width);
			console.log('====================================');
			if (this.props.autoplay) {
				this._startPlay()
			}
		}

		componentWillUnmount() {
			if (this.props.autoplay) {
				this._stopPlay()
			}
		}

		_startPlay = () => {
			this.playTimer.play = setTimeout(() => {
				const { loop, data } = this.props
				let nextIndex = this.props.currentIndex + 1
				if (!loop && nextIndex >= data.length) {
					nextIndex -= data.length
				}
				this._setIndex(nextIndex)
				this._startPlay()
			}, this.props.duration)
		}

		_stopPlay = () => {
			for (const key in this.playTimer) {
				const timer = this.playTimer[key]
				clearTimeout(timer)
			}
		}

		_setIndex = (nextIndex) => {
			const { loop, data, onChange } = this.props
			let translateX = -nextIndex * this.width
			return this._changeTranslateX(translateX, 0.3).then(() => {
				let _nextIndex = nextIndex
				if (loop) {
					if (nextIndex >= data.length * 2) {
						_nextIndex -= data.length
					} else if (nextIndex < data.length) {
						_nextIndex += data.length
					}
					if (_nextIndex !== nextIndex) {
						let _translateX = -_nextIndex * this.width
						this._changeTranslateX(_translateX, 0)
					}
				}
				onChange(_nextIndex)
			})
		}

		

		_onTouchStart = (evt) => {
			if (this.props.autoplay) {
				this._stopPlay()
			}
			if (Taro.getEnv() === Taro.ENV_TYPE.RN) {
				this.startX = evt.nativeEvent.pageX
			} else {
				this.startX = evt.touches[0].screenX
			}
		}

		_onTouchMove = (evt) => {
			let pageX
			const { data, loop, currentIndex } = this.props
			if (Taro.getEnv() === Taro.ENV_TYPE.RN) {
				pageX = evt.nativeEvent.pageX
			} else {
				pageX = evt.touches[0].screenX
			}
			let deltaX = pageX - this.startX

			if (!loop) {
				//处理滑动左边界
				if (currentIndex === 0 && deltaX > 0) {
					deltaX = Math.min(deltaX * 0.5, this.width / 5)
				}
				//处理滑动右边界
				if (currentIndex === data.length - 1 && deltaX < 0) {
					deltaX = Math.max(deltaX * 0.5, -this.width / 5)
				}
			}

			this.deltaX = deltaX
			const translateX = -currentIndex * this.width + deltaX
			this._changeTranslateX(translateX, 0)
		}

		_onTouchEnd = (evt) => {
			const { autoplay, currentIndex } = this.props
			let deltaIndex = 0
			if (Math.abs(this.deltaX) > this.width / 3) {
				deltaIndex += this.deltaX > 0 ? -1 : 1
			}
			let nextIndex = currentIndex + deltaIndex
			this.deltaX = 0
			this._setIndex(nextIndex).then(() => {
				if (autoplay) {
					this._startPlay()
				}
			})
		}

		_onItemClick = (data, e) => {
			e && e.stopPropagation && e.stopPropagation()
			const { onClick } = this.props
			onClick(data)
		}

		_getRenderData = () => {
			const { loop, data } = this.props
			if (loop) {
				return [ ...data, ...data, ...data ]
			}
			return [ ...data ]
		}
	}
	return SwiperHOC
}
