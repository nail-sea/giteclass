import Taro, { PureComponent } from '@tarojs/taro'
import {
	View,
	Text,
	Modal,
	Animated,
	Easing,
	StyleSheet,
	TouchableOpacity,
	Dimensions
} from 'react-native'
import PropTypes from 'prop-types'
class DqModal extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			visible: props.show
		}
		this.animateValue = new Animated.Value(0)
	}

	componentWillReceiveProps(nextProps) {
		const { show } = nextProps
		if (show !== this.state.visible) {
			show && this._show()
			show || this._dismiss()
		}
	}

	_startAnimated = (obj, toValue, duration, easing) => {
		return new Promise((resolve) => {
			Animated.timing(obj, {
				toValue,
				duration,
				easing
			}).start(resolve)
		})
	}

	_getEasing = (easing) => {
		const easingMap = {
			ease: 'ease',
			'ease-in': 'in',
			'ease-out': 'out',
			'ease-in-out': 'inOut',
			linear: 'linear'
		}
		return Easing[easingMap[easing]] || Easing[easingMap['linear']]
	}

	_show = () => {
		const { animationOptions: { duration, delay, easing } } = this.props
		this.setState({ visible: true }, () => {
			this._startAnimated(
				this.animateValue,
				1,
				duration,
				this._getEasing(easing),
				delay
			)
		})
	}

	_dismiss = () => {
		const { animationOptions: { duration, delay, easing } } = this.props
		this._startAnimated(
			this.animateValue,
			0,
			duration,
			this._getEasing(easing),
			delay
		).then(() => {
			this.setState({ visible: false })
		})
	}

	_getFadeStyle = () => {
		return this.props.animation === 'fade'
			? { opacity: this.animateValue }
			: null
	}

	_getSlideStyle = () => {
		const { animationOptions } = this.props
		const translateMap = {
			column: 'translateY',
			row: 'translateX'
		}
		const direction =
			translateMap[animationOptions.direction] || translateMap.column
		return this.props.animation === 'slide'
			? {
					transform: [
						{
							[direction]: this.animateValue.interpolate({
								inputRange: [ 0, 1 ],
								outputRange: [ animationOptions.offset, 0 ]
							})
						}
					]
				}
			: null
	}

	_getScaleStyle = () => {
		return this.props.animation === 'scale'
			? {
					transform: [
						{
							scale: this.animateValue.interpolate({
								inputRange: [ 0, 1 ],
								outputRange: [ 0.01, 1 ]
							})
						}
					]
				}
			: null
	}

	render() {
		const {
			onClose,
			containerStyle,
			onShow,
			onDismiss,
			onMaskClick,
			maskBgColor
		} = this.props
		const { visible } = this.state
		return (
			<Modal
				visible={visible}
				onRequestClose={onClose}
				transparent
				onShow={onShow}
				onDismiss={onDismiss}
			>
				<TouchableOpacity
					onPress={onMaskClick}
					style={[ styles.mask, { backgroundColor: maskBgColor } ]}
					activeOpacity={1}
				>
					<View
						style={[ styles.container, containerStyle ]}
            >
						<Animated.View
							style={[
                this._getFadeStyle(),
								this._getSlideStyle(),
								this._getScaleStyle()
							]}
              onStartShouldSetResponder={() => true}
						>
							{this.props.children}
						</Animated.View>
					</View>
				</TouchableOpacity>
			</Modal>
		)
	}
}
const styles = StyleSheet.create({
	mask: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,.4)'
	},
	container: {
		flex: 1
	}
})
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
	maskBgColor: 'rgba(0,0,0,0.4)',
	onClose: () => {},
	onMaskClick: null,
	onShow: null,
	onDismiss: null
}

export default DqModal
