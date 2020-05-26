import Taro, { PureComponent } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'
import './index.scss'
const { windowHeight } = Taro.getSystemInfoSync()
class DqModal extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			visible: false,
			animationData: null
		}
		this.animation = this._initAnimation()
	}

	componentDidMount(){
		this.setState({
			visible:this.props.show
		})
	}

	componentWillReceiveProps(nextProps) {
		const { show } = nextProps
		if (show !== this.state.visible) {
			show && this._show()
			show || this._dismiss()
		}
	}

	_getAnimateType = () => {
		const { animation, animationOptions: { direction } } = this.props
		const map = {
			slide: {
				column: 'translateY',
				row: 'translateX'
			},
			fade: 'opacity',
			scale: 'scale'
		}
		return animation === 'slide' ? map[animation][direction] : map[animation]
	}

	_getAnimateToValue = (value) => {
    const { animation, animationOptions: { offset } } = this.props
		switch (animation) {
			case 'slide':
      return [offset, 0][value]
			case 'fade':
        return value
			case 'scale':
        return [1, 2][value]
			default:
        return [offset, 0][value]
		}
	}

	_createAnimation = (duration, easing, delay) => {
		return Taro.createAnimation({
			duration,
			timingFunction: easing,
			delay
		})
	}

	_initAnimation = () => {
		const { animationOptions: { duration, delay, easing } } = this.props
		return this._createAnimation(duration, easing, delay)
	}

	_animationStep = ({ type, toValue, duration, easing }) => {
		return new Promise((resolve) => {
			this.animation[type](toValue).step()
			this.setState({ animationData: this.animation.export() }, () => {
				setTimeout(resolve, duration)
			})
		})
	}

	_show = () => {
		const { onShow, animationOptions: { duration, delay, easing } } = this.props
		const type = this._getAnimateType()
		this.setState({ visible: true }, () => {
			onShow && onShow()
			this._animationStep({
				type,
				toValue: this._getAnimateToValue(0),
				duration: 16,
				easing: 'step-start'
			}).then(() => {
				this._animationStep({
					type,
					toValue: this._getAnimateToValue(1),
					delay,
					easing,
					duration
				})
			})
		})
	}

	_dismiss = () => {
		const {
			onDismiss,
			animationOptions: { duration, delay, easing }
		} = this.props
		const type = this._getAnimateType()
		this._animationStep({
			toValue: this._getAnimateToValue(0),
			type,
			duration,
			easing,
			delay
		}).then(() => {
			this.setState({ visible: false })
			onDismiss && onDismiss()
		})
	}

	_onContainerClick = (e) => {
		e.stopPropagation()
	}

	render() {
		const { onClose, containerStyle, onMaskClick, maskBgColor } = this.props
		const { visible } = this.state
		return (
			visible && (
				<View className='modal'>
					<View
						className='modal__mask'
						style={{ backgroundColor: maskBgColor }}
						onClick={onMaskClick}
					>
						<View className='modal__container' style={containerStyle}>
							<View
								className='modal__animate-container'
								animation={this.state.animationData}
								onClick={this._onContainerClick}
							>
								{this.props.children}
							</View>
						</View>
					</View>
				</View>
			)
		)
	}
}
DqModal.propTypes = {
	show: PropTypes.bool.isRequired,
	animation: PropTypes.oneOf([ 'slide', 'fade', 'scale', 'none' ]),
	animationOptions: PropTypes.object,
	containerStyle: PropTypes.object,
	maskBgColor: PropTypes.string,
	onClose: PropTypes.func,
	onMaskClick: PropTypes.func,
	onShow: PropTypes.func,
	onDismiss: PropTypes.func
}
DqModal.defaultProps = {
	show: false,
	animation: 'slide',
	animationOptions: {
		direction: 'column',
		offset: 300,
		easing: 'linear',
		duration: 200,
		delay: 0
	},
	containerStyle: null,
	maskBgColor: 'rgba(0,0,0,0.6)',
	onClose: () => {},
	onMaskClick: null,
	onShow: null,
	onDismiss: null
}
export default DqModal
