import Taro, { PureComponent } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { Modal } from 'react-native'
import FormContext from '../context'
import * as utils from '../utils'
import IconFont from '@/components/iconfont'
import '../index.scss'
const BASE = 'dq-form'
const TAG = 'dq-form__tag-picker'
class TagPicker extends PureComponent {
	static defaultProps = {
		defaultLabel: '请选择',
		max: 3
	}
	static contextType = FormContext
	state = {
		value: [],
		active: false,
		showMask: false,
		statusBarHeight:0
	}

	componentDidMount() {
		const {statusBarHeight} = Taro.getSystemInfoSync()
		this.setState({statusBarHeight})
		this._setValue(this.props.range, this.props.value)
	}

	componentWillReceiveProps(nextProps) {
		//减少不必要的render开销，条件可以再优化
		if (!utils.isEqual(nextProps.range, this.props.range)) {
			this._setValue(nextProps.range, nextProps.value)
				.then(this.onConfirm)
		}
	}

	_setValue = (range = [], checkedValue = []) => {
		return new Promise(resolve => {
			const newValue = range.map((item) => ({
				...item,
				checked: checkedValue.includes(item.value)
			}))
			this.setState({ value: newValue }, resolve)
		})
	}

	setValue = (value) => {
		this._setValue(this.props.range, value)
			.then(this.onConfirm)
	}

	openMask = () => {
		this.setState({ showMask: true })
	}

	onConfirm = () => {
		const { onChange, name } = this.props
		this.setState({ showMask: false })
		const checkedValue = this.state.value
			.filter((item) => item.checked)
			.map((item) => item.value)
		if (this.context && name) {
			this.context.dispatch({
				type: 'change', payload: { name, value: checkedValue }
			})
		}
		onChange && onChange(checkedValue)
	}

	onCancel = () => {
		this.setState({ showMask: false })
		const value = this.getValue()
		this._setValue(this.props.range, value)
	}

	onTouchStart = () => this.setState({ active: true })

	onTouchEnd = () => this.setState({ active: false })

	onItemChange = (item) => {
		if (item.checked || this.getSelectedCount() < this.props.max) {
			item.checked = !item.checked
			this.setState({ value: [...this.state.value] })
		}
	}

	getValue = () => {
		const { name, value } = this.props
		return this.context.state[name] || value || []
	}

	getValueText = (value) => {
		const { range = [] } = this.props
		return range.filter(item => value.includes(item.value)).map((item) => item.label).join('、')
	}

	getContentClassName = () => {
		const { active } = this.state
		return `${BASE} ${TAG}__content ${active ? `${TAG}__content--active` : ''}`
	}

	getSelectedCount = () =>
		this.state.value.filter((item) => item.checked).length

	getNavStyle = () => ({paddingTop:this.state.statusBarHeight})

	renderTag = (item, index) => (
		<View
			key={`tag-item-${index}`}
			className={`${BASE} ${TAG}__mask__content__tag ${item.checked
				? `${TAG}__mask__content__tag--active`
				: ''}`}
			onClick={() => this.onItemChange(item)}
		>
			<Text
				className={`${BASE} ${TAG}__mask__content__tag__text ${item.checked
					? `${TAG}__mask__content__tag__text--active`
					: ''}`}
			>
				{item.label}
			</Text>
		</View>
	)

	renderMask = () => {
		const { max } = this.props
		const { value, showMask } = this.state
		return (
			<Modal
				className={`${BASE} ${TAG}__mask`}
				visible={showMask}
				onRequestClose={this.onCancel}
			>
				<View className={`${BASE} ${TAG}__mask__nav`} style={this.getNavStyle()}>
					<View
						className={`${BASE} ${TAG}__mask__nav__left`}
						onClick={this.onCancel}
					>
						<IconFont size={30} name="ic_back" color="#424242"/>
						<Text className={`${BASE} ${TAG}__mask__nav__text`}>返回</Text>
					</View>
					<Text
						className={`${BASE} ${TAG}__mask__nav__text`}
						onClick={this.onConfirm}
					>
						完成
					</Text>
				</View>
				<View className={`${BASE} ${TAG}__mask__title`}>
					<Text className={`${BASE} ${TAG}__mask__title__text`}>
						{`  最多可选${max}项`}(
						<Text className={`${BASE} ${TAG}__mask__title__active`}>
							{this.getSelectedCount()}
						</Text>
						/{max})
					</Text>
				</View>
				<View className={`${BASE} ${TAG}__mask__content`}>
					{value.map(this.renderTag)}
				</View>
			</Modal>
		)
	}

	renderText = () => {
		const value = this.getValue()
		if (value.length) {
			return (
				<Text className={`${BASE} ${TAG}__content__text`}>
					{this.getValueText(value)}
				</Text>
			)
		}
		const { defaultLabel } = this.props
		return (
			<Text
				className={`${BASE} ${TAG}__content__text ${TAG}__content__text--default`}
			>
				{defaultLabel}
			</Text>
		)
	}

	render() {
		return (
			<View className={`${BASE} ${TAG}`}>
				{this.renderMask()}
				<View
					className={this.getContentClassName()}
					onClick={this.openMask}
					onTouchStart={this.onTouchStart}
					onTouchEnd={this.onTouchEnd}
				>
					{this.renderText()}
				</View>
			</View>
		)
	}
}

export default TagPicker
